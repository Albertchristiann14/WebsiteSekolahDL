<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdmissionInquiry;
use App\Models\Admission;
use App\Models\ActivityLog;

class AdminAdmissionsController extends Controller
{
    /**
     * List all inquiries with search & status filters.
     */
    public function getInquiries(Request $request)
    {
        $query = AdmissionInquiry::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('student_level')) {
            $query->where('student_level', $request->student_level);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('parent_name', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%");
            });
        }

        $items = $query->orderByDesc('created_at')->paginate($request->input('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $items->items(),
            'pagination' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'counts' => [
                'new' => AdmissionInquiry::where('status', 'new')->count(),
                'contacted' => AdmissionInquiry::where('status', 'contacted')->count(),
                'enrolled' => AdmissionInquiry::where('status', 'enrolled')->count(),
            ],
        ]);
    }

    /**
     * Update inquiry status and add internal follow-up notes.
     */
    public function updateInquiryStatus(Request $request, $id)
    {
        $inquiry = AdmissionInquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:new,contacted,processed,enrolled,cancelled',
            'admin_notes' => 'nullable|string',
        ]);

        $inquiry->update($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'inquiry_status_updated',
            'subject_type' => AdmissionInquiry::class,
            'subject_id' => $inquiry->id,
            'details' => ['status' => $inquiry->status, 'parent_name' => $inquiry->parent_name],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status calon siswa berhasil diperbarui.',
            'data' => $inquiry,
        ]);
    }

    /**
     * Delete an inquiry.
     */
    public function deleteInquiry(Request $request, $id)
    {
        $inquiry = AdmissionInquiry::findOrFail($id);
        $name = $inquiry->parent_name;

        $inquiry->delete();

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'inquiry_deleted',
            'subject_type' => AdmissionInquiry::class,
            'subject_id' => $id,
            'details' => ['parent_name' => $name],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data permohonan pendaftaran berhasil dihapus.',
        ]);
    }
}

