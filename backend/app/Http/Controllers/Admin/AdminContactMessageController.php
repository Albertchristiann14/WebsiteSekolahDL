<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactMessage;
use App\Models\ActivityLog;

class AdminContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('subject', 'like', "%{$s}%");
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
            'unread_count' => ContactMessage::where('status', 'unread')->count(),
        ]);
    }

    public function show($id)
    {
        $msg = ContactMessage::findOrFail($id);

        if ($msg->status === 'unread') {
            $msg->update(['status' => 'read']);
        }

        return response()->json([
            'success' => true,
            'data' => $msg,
        ]);
    }

    public function reply(Request $request, $id)
    {
        $msg = ContactMessage::findOrFail($id);

        $validated = $request->validate([
            'reply_message' => 'required|string',
        ]);

        $msg->update([
            'reply_message' => $validated['reply_message'],
            'status' => 'replied',
            'replied_at' => now(),
        ]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'contact_message_replied',
            'subject_type' => ContactMessage::class,
            'subject_id' => $msg->id,
            'details' => ['recipient' => $msg->email, 'subject' => $msg->subject],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tanggapan pesan berhasil dicatat.',
            'data' => $msg,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $msg = ContactMessage::findOrFail($id);
        $name = $msg->name;

        $msg->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesan kontak berhasil dihapus.',
        ]);
    }
}

