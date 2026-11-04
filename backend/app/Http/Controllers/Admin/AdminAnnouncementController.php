<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Models\ActivityLog;

class AdminAnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $query = Announcement::with('user:id,name');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where('title', 'like', "%{$s}%");
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
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:100',
            'priority' => 'required|in:normal,important,urgent',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:draft,active,archived',
            'is_homepage' => 'boolean',
            'attachment' => 'nullable|string',
        ]);

        $item = Announcement::create(array_merge($validated, [
            'user_id' => $request->user()->id,
        ]));

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'announcement_created',
            'subject_type' => Announcement::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title, 'priority' => $item->priority],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil diterbitkan.',
            'data' => $item,
        ], 201);
    }

    public function show($id)
    {
        $item = Announcement::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = Announcement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:100',
            'priority' => 'required|in:normal,important,urgent',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'required|in:draft,active,archived',
            'is_homepage' => 'boolean',
            'attachment' => 'nullable|string',
        ]);

        $item->update($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'announcement_updated',
            'subject_type' => Announcement::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil diperbarui.',
            'data' => $item,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $item = Announcement::findOrFail($id);
        $title = $item->title;

        $item->delete();

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'announcement_deleted',
            'subject_type' => Announcement::class,
            'subject_id' => $id,
            'details' => ['title' => $title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil dihapus.',
        ]);
    }
}

