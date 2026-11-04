<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GalleryItem;
use App\Models\ActivityLog;

class AdminGalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryItem::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $items = $query->orderBy('order')->orderByDesc('created_at')->paginate($request->input('per_page', 12));

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
            'category' => 'required|string|max:100',
            'image' => 'required|string',
            'caption' => 'nullable|string|max:500',
            'date' => 'nullable|string|max:50',
            'aspect_ratio' => 'nullable|in:landscape,portrait,square',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        $item = GalleryItem::create($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'gallery_created',
            'subject_type' => GalleryItem::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil ditambahkan.',
            'data' => $item,
        ], 201);
    }

    public function show($id)
    {
        $item = GalleryItem::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'image' => 'required|string',
            'caption' => 'nullable|string|max:500',
            'date' => 'nullable|string|max:50',
            'aspect_ratio' => 'nullable|in:landscape,portrait,square',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        $item->update($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'gallery_updated',
            'subject_type' => GalleryItem::class,
            'subject_id' => $item->id,
            'details' => ['title' => $item->title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil diperbarui.',
            'data' => $item,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);
        $title = $item->title;

        $item->delete();

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'gallery_deleted',
            'subject_type' => GalleryItem::class,
            'subject_id' => $id,
            'details' => ['title' => $title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Foto galeri berhasil dihapus.',
        ]);
    }
}

