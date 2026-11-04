<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Media;
use App\Models\ActivityLog;

class AdminMediaController extends Controller
{
    public function index(Request $request)
    {
        $media = Media::orderByDesc('created_at')->paginate($request->input('per_page', 24));

        return response()->json([
            'success' => true,
            'data' => $media->items(),
            'pagination' => [
                'current_page' => $media->currentPage(),
                'last_page' => $media->lastPage(),
                'per_page' => $media->perPage(),
                'total' => $media->total(),
            ],
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,webp,svg,pdf|max:5120', // Max 5MB
            'alt_text' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $mime = $file->getClientMimeType();
        $size = $file->getSize();
        $ext = $file->getClientOriginalExtension();

        // Secure randomized filename
        $safeName = Str::random(32) . '.' . $ext;
        $path = $file->storeAs('uploads/' . date('Y/m'), $safeName, 'public');
        $url = Storage::disk('public')->url($path);

        $media = Media::create([
            'user_id' => $request->user()->id,
            'filename' => $safeName,
            'original_name' => $originalName,
            'mime_type' => $mime,
            'size' => $size,
            'path' => $path,
            'url' => $url,
            'alt_text' => $request->alt_text ?? pathinfo($originalName, PATHINFO_FILENAME),
        ]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'media_uploaded',
            'subject_type' => Media::class,
            'subject_id' => $media->id,
            'details' => ['original_name' => $originalName, 'size_bytes' => $size],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Berkas berhasil diunggah.',
            'data' => $media,
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $media = Media::findOrFail($id);

        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Berkas media berhasil dihapus.',
        ]);
    }
}

