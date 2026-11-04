<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Announcement;
use App\Models\AdmissionInquiry;
use App\Models\ContactMessage;
use App\Models\User;
use App\Models\Media;
use App\Models\ActivityLog;

class DashboardController extends Controller
{
    /**
     * Overview metrics for admin dashboard.
     */
    public function index()
    {
        $metrics = [
            'news_total' => News::count(),
            'news_published' => News::where('status', 'published')->count(),
            'news_draft' => News::where('status', 'draft')->count(),
            'announcements_active' => Announcement::active()->count(),
            'inquiries_new' => AdmissionInquiry::where('status', 'new')->count(),
            'inquiries_total' => AdmissionInquiry::count(),
            'messages_unread' => ContactMessage::where('status', 'unread')->count(),
            'messages_total' => ContactMessage::count(),
            'users_count' => User::count(),
            'media_count' => Media::count(),
            'total_views' => News::sum('views_count'),
        ];

        $latestNews = News::with(['category', 'author:id,name'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        $latestInquiries = AdmissionInquiry::orderByDesc('created_at')
            ->limit(5)
            ->get();

        $recentLogs = ActivityLog::with('user:id,name,role')
            ->orderByDesc('created_at')
            ->limit(8)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'metrics' => $metrics,
                'latest_news' => $latestNews,
                'latest_inquiries' => $latestInquiries,
                'recent_logs' => $recentLogs,
            ],
        ]);
    }
}

