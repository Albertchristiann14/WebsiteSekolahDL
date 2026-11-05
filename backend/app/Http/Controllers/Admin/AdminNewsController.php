<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\ActivityLog;

class AdminNewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::with(['category', 'author:id,name']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('excerpt', 'like', "%{$s}%");
            });
        }

        $news = $query->orderByDesc('created_at')->paginate($request->input('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $news->items(),
            'pagination' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
            ],
            'categories' => NewsCategory::orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:news,slug',
            'category_id' => 'required|exists:news_categories,id',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'boolean',
            'tags' => 'nullable|array',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Ensure uniqueness if auto-generated
        $originalSlug = $slug;
        $counter = 1;
        while (News::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        $publishedAt = null;
        if ($validated['status'] === 'published') {
            $publishedAt = now();
        }

        $article = News::create([
            'category_id' => $validated['category_id'],
            'author_id' => $request->user()->id,
            'title' => $validated['title'],
            'slug' => $slug,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'],
            'featured_image' => $validated['featured_image'] ?? null,
            'status' => $validated['status'],
            'published_at' => $publishedAt,
            'is_featured' => $validated['is_featured'] ?? false,
            'tags' => $validated['tags'] ?? [],
            'seo_title' => $validated['seo_title'] ?? $validated['title'],
            'seo_description' => $validated['seo_description'] ?? ($validated['excerpt'] ?? null),
        ]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'news_created',
            'subject_type' => News::class,
            'subject_id' => $article->id,
            'details' => ['title' => $article->title, 'status' => $article->status],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berita berhasil disimpan.',
            'data' => $article,
        ], 201);
    }

    public function show($id)
    {
        $article = News::with(['category', 'author:id,name'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $article,
        ]);
    }

    public function update(Request $request, $id)
    {
        $article = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => "nullable|string|max:255|unique:news,slug,{$id}",
            'category_id' => 'required|exists:news_categories,id',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'boolean',
            'tags' => 'nullable|array',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
        ]);

        $publishedAt = $article->published_at;
        if ($validated['status'] === 'published' && !$publishedAt) {
            $publishedAt = now();
        }

        $article->update([
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => !empty($validated['slug']) ? Str::slug($validated['slug']) : $article->slug,
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'],
            'featured_image' => $validated['featured_image'] ?? $article->featured_image,
            'status' => $validated['status'],
            'published_at' => $publishedAt,
            'is_featured' => $validated['is_featured'] ?? false,
            'tags' => $validated['tags'] ?? [],
            'seo_title' => $validated['seo_title'] ?? $validated['title'],
            'seo_description' => $validated['seo_description'] ?? null,
        ]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'news_updated',
            'subject_type' => News::class,
            'subject_id' => $article->id,
            'details' => ['title' => $article->title, 'status' => $article->status],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berita berhasil diperbarui.',
            'data' => $article,
        ]);
    }

    public function togglePublish(Request $request, $id)
    {
        $article = News::findOrFail($id);

        $newStatus = $article->status === 'published' ? 'draft' : 'published';
        $publishedAt = $newStatus === 'published' ? ($article->published_at ?: now()) : null;

        $article->update([
            'status' => $newStatus,
            'published_at' => $publishedAt,
        ]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'news_status_toggle',
            'subject_type' => News::class,
            'subject_id' => $article->id,
            'details' => ['status' => $newStatus],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Status artikel berhasil diubah menjadi: {$newStatus}",
            'status' => $newStatus,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $article = News::findOrFail($id);
        $title = $article->title;

        $article->delete();

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'news_deleted',
            'subject_type' => News::class,
            'subject_id' => $id,
            'details' => ['title' => $title],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Artikel berita berhasil dihapus.',
        ]);
    }

    public function categories()
    {
        $cats = NewsCategory::orderBy('order')->get();
        if ($cats->isEmpty()) {
            $defaults = [
                ['name' => 'Akademik', 'slug' => 'akademik', 'description' => 'Warta kurikulum, jadwal ujian, dan KBM.', 'order' => 1],
                ['name' => 'Prestasi', 'slug' => 'prestasi', 'description' => 'Pencapaian kejuaraan dan olimpiade sains/seni/olahraga.', 'order' => 2],
                ['name' => 'Kegiatan Siswa', 'slug' => 'kegiatan', 'description' => 'Dokumentasi acara OSIS, ekstrakurikuler, dan pentas seni.', 'order' => 3],
                ['name' => 'Pengumuman Resmi', 'slug' => 'pengumuman', 'description' => 'Informasi penting yayasan, surat edaran, dan agenda.', 'order' => 4],
                ['name' => 'Opini Edukasi', 'slug' => 'opini-edukasi', 'description' => 'Artikel pedagogi dan pemikiran tenaga pendidik.', 'order' => 5],
            ];
            foreach ($defaults as $d) {
                NewsCategory::firstOrCreate(['slug' => $d['slug']], $d);
            }
            $cats = NewsCategory::orderBy('order')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $cats,
        ]);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'slug' => 'nullable|string|max:100|unique:news_categories,slug',
            'description' => 'nullable|string|max:255',
        ]);

        $slug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        
        $originalSlug = $slug;
        $counter = 1;
        while (NewsCategory::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        $order = (int) NewsCategory::max('order') + 1;

        $category = NewsCategory::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'order' => $order,
        ]);

        if ($request->user()) {
            ActivityLog::create([
                'user_id' => $request->user()->id,
                'action' => 'news_category_created',
                'subject_type' => NewsCategory::class,
                'subject_id' => $category->id,
                'details' => ['name' => $category->name, 'slug' => $category->slug],
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil ditambahkan.',
            'data' => $category,
        ], 201);
    }
}

