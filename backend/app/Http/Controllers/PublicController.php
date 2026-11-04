<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\Announcement;
use App\Models\AcademicProgram;
use App\Models\Achievement;
use App\Models\GalleryItem;
use App\Models\SchoolSetting;
use App\Models\Admission;
use App\Models\AdmissionInquiry;
use App\Models\ContactMessage;

class PublicController extends Controller
{
    /**
     * School profile metadata & settings.
     */
    public function getProfile()
    {
        $settings = SchoolSetting::where('is_public', true)->get()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => [
                'name' => $settings['school_name'] ?? 'Sekolah Dharma Loka Pekanbaru',
                'shortName' => $settings['short_name'] ?? 'Dharma Loka',
                'motto' => $settings['motto'] ?? 'Prajña Pāramitā Hṛdaya',
                'mottoTranslation' => $settings['motto_translation'] ?? 'Mengembangkan Kebijaksanaan, Membina Budi Pekerti, Menggapai Prestasi Mulia',
                'foundation' => $settings['foundation'] ?? 'Yayasan Dharma Loka Pekanbaru',
                'establishedYear' => $settings['established_year'] ?? '1988',
                'accreditation' => $settings['accreditation'] ?? 'Terakreditasi A (Unggul) [DEMO]',
                'phone' => $settings['phone'] ?? '(0761) 123456 [DEMO]',
                'whatsapp' => $settings['whatsapp'] ?? '6281234567890',
                'whatsappFormatted' => $settings['whatsapp_formatted'] ?? '+62 812-3456-7890 [DEMO]',
                'email' => $settings['email'] ?? 'sekretariat@dharmaloka.sch.id [DEMO]',
                'address' => $settings['address'] ?? 'Pekanbaru, Riau',
                'officeHours' => $settings['office_hours'] ?? 'Senin – Jumat: 07.15 – 15.30 WIB',
            ],
        ]);
    }

    /**
     * Get published news with pagination and category filtering.
     * DRAFT CONTENT NEVER APPEARS HERE.
     */
    public function getNews(Request $request)
    {
        $query = News::published()->with(['category', 'author:id,name']);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('excerpt', 'like', "%{$s}%");
            });
        }

        if ($request->boolean('featured_only')) {
            $query->where('is_featured', true);
        }

        $perPage = min(max((int) $request->input('per_page', 9), 1), 30);
        $news = $query->orderByDesc('published_at')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $news->items(),
            'pagination' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
            ],
        ]);
    }

    /**
     * Get single news article by slug.
     */
    public function getNewsDetail(string $slug)
    {
        $article = News::published()
            ->with(['category', 'author:id,name'])
            ->where('slug', $slug)
            ->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Artikel tidak ditemukan atau belum dipublikasikan.',
            ], 404);
        }

        // Increment views
        $article->increment('views_count');

        // Related news
        $related = News::published()
            ->where('id', '!=', $article->id)
            ->where('category_id', $article->category_id)
            ->limit(2)
            ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'published_at']);

        return response()->json([
            'success' => true,
            'data' => $article,
            'related' => $related,
        ]);
    }

    /**
     * Get all news categories with published count.
     */
    public function getNewsCategories()
    {
        $categories = NewsCategory::withCount(['news' => function ($q) {
            $q->published();
        }])->orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Get active announcements (auto-filters expired).
     */
    public function getAnnouncements(Request $request)
    {
        $query = Announcement::active();

        if ($request->boolean('homepage_only')) {
            $query->where('is_homepage', true);
        }

        $announcements = $query->orderByDesc('priority')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $announcements,
        ]);
    }

    /**
     * Get all published academic programs.
     */
    public function getAcademicPrograms()
    {
        $programs = AcademicProgram::where('is_published', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $programs,
        ]);
    }

    /**
     * Get single academic program by slug.
     */
    public function getAcademicProgramDetail(string $slug)
    {
        $program = AcademicProgram::where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program akademik tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $program,
        ]);
    }

    /**
     * Get achievements list.
     */
    public function getAchievements(Request $request)
    {
        $query = Achievement::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('level')) {
            $query->where('level', $request->level);
        }

        if ($request->boolean('featured_only')) {
            $query->where('is_featured', true);
        }

        $achievements = $query->orderByDesc('year')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $achievements,
        ]);
    }

    /**
     * Get gallery photos with category filter.
     */
    public function getGallery(Request $request)
    {
        $query = GalleryItem::where('is_published', true);

        if ($request->filled('category') && $request->category !== 'Semua') {
            $query->where('category', $request->category);
        }

        $items = $query->orderBy('order')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * Public submission: Admissions Inquiry.
     */
    public function submitAdmissionInquiry(Request $request)
    {
        $validated = $request->validate([
            'student_name' => 'nullable|string|max:120',
            'parent_name' => 'required|string|max:120',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:100',
            'student_level' => 'nullable|string|in:tk,sd,smp,sma,smk',
            'target_level' => 'nullable|string|in:tk,sd,smp,sma,smk',
            'academic_year' => 'nullable|string|max:20',
            'previous_school' => 'nullable|string|max:150',
            'message' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
        ]);

        $level = $validated['student_level'] ?? $validated['target_level'] ?? 'sd';
        $notes = $validated['message'] ?? $validated['notes'] ?? null;

        $inquiry = AdmissionInquiry::create([
            'student_name' => strip_tags($validated['student_name'] ?? 'Calon Siswa'),
            'parent_name' => strip_tags($validated['parent_name']),
            'phone' => strip_tags($validated['phone']),
            'email' => $validated['email'] ?? null,
            'student_level' => $level,
            'target_level' => $level,
            'academic_year' => $validated['academic_year'] ?? '2026/2027',
            'previous_school' => $validated['previous_school'] ?? null,
            'message' => $notes ? strip_tags($notes) : null,
            'notes' => $notes ? strip_tags($notes) : null,
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih, permohonan informasi PPDB Anda telah kami terima.',
            'id' => $inquiry->id,
        ], 201);
    }

    /**
     * Public submission: Contact Message.
     */
    public function submitContactMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:100',
            'phone' => 'nullable|string|max:30',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        $msg = ContactMessage::create([
            'name' => strip_tags($validated['name']),
            'email' => $validated['email'],
            'phone' => isset($validated['phone']) ? strip_tags($validated['phone']) : null,
            'subject' => strip_tags($validated['subject']),
            'message' => strip_tags($validated['message']),
            'status' => 'unread',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan Anda berhasil dikirim ke sekretariat Sekolah Dharma Loka.',
            'id' => $msg->id,
        ], 201);
    }
}

