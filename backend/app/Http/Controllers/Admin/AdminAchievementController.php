<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Achievement;
use App\Models\ActivityLog;

class AdminAchievementController extends Controller
{
    public function index(Request $request)
    {
        $query = Achievement::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('level')) {
            $query->where('level', $request->level);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('student_name', 'like', "%{$s}%")
                  ->orWhere('competition', 'like', "%{$s}%");
            });
        }

        $items = $query->orderByDesc('year')->orderByDesc('created_at')->paginate($request->input('per_page', 10));

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
            'competition' => 'required|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'level' => 'required|string',
            'year' => 'required|string|max:10',
            'category' => 'required|string|max:100',
            'student_name' => 'required|string|max:150',
            'grade_and_level' => 'nullable|string|max:100',
            'medal_or_rank' => 'required|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_demo' => 'boolean',
        ]);

        $item = Achievement::create($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'achievement_created',
            'subject_type' => Achievement::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data prestasi berhasil ditambahkan.',
            'data' => $item,
        ], 201);
    }

    public function show($id)
    {
        $item = Achievement::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = Achievement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'competition' => 'required|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'level' => 'required|string',
            'year' => 'required|string|max:10',
            'category' => 'required|string|max:100',
            'student_name' => 'required|string|max:150',
            'grade_and_level' => 'nullable|string|max:100',
            'medal_or_rank' => 'required|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_demo' => 'boolean',
        ]);

        $item->update($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'achievement_updated',
            'subject_type' => Achievement::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data prestasi berhasil diperbarui.',
            'data' => $item,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $item = Achievement::findOrFail($id);
        $title = $item->title;

        $item->delete();

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'achievement_deleted',
            'subject_type' => Achievement::class,
            'subject_id' => $id,
            'details' => ['title' => $title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data prestasi berhasil dihapus.',
        ]);
    }
}

