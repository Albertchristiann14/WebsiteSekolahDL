<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\Admin\AdminAnnouncementController;
use App\Http\Controllers\Admin\AdminAcademicProgramController;
use App\Http\Controllers\Admin\AdminAchievementController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminAdmissionsController;
use App\Http\Controllers\Admin\AdminContactMessageController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminSchoolSettingController;
use App\Http\Controllers\Admin\AdminMediaController;
use App\Http\Controllers\Admin\AdminActivityLogController;

/*
|--------------------------------------------------------------------------
| Public API Routes (For Public Website)
|--------------------------------------------------------------------------
*/
Route::prefix('public')->group(function () {
    Route::get('/profile', [PublicController::class, 'getProfile']);
    Route::get('/news', [PublicController::class, 'getNews']);
    Route::get('/news/categories', [PublicController::class, 'getNewsCategories']);
    Route::get('/news/{slug}', [PublicController::class, 'getNewsDetail']);
    Route::get('/announcements', [PublicController::class, 'getAnnouncements']);
    Route::get('/programs', [PublicController::class, 'getAcademicPrograms']);
    Route::get('/programs/{slug}', [PublicController::class, 'getAcademicProgramDetail']);
    Route::get('/achievements', [PublicController::class, 'getAchievements']);
    Route::get('/gallery', [PublicController::class, 'getGallery']);

    // Public Form Submissions
    Route::post('/admissions/inquiry', [PublicController::class, 'submitAdmissionInquiry']);
    Route::post('/contact', [PublicController::class, 'submitContactMessage']);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Available as both /auth/... and /admin/...)
|--------------------------------------------------------------------------
*/
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/admin/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
    Route::post('/admin/change-password', [AuthController::class, 'changePassword']);
});

/*
|--------------------------------------------------------------------------
| Protected CMS Admin Routes (Sanctum Authenticated)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
    // 1. Dashboard Overview
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // 2. News Management (Editor, School Admin, Super Admin)
    Route::apiResource('news', AdminNewsController::class);
    Route::patch('news/{id}/toggle-publish', [AdminNewsController::class, 'togglePublish']);

    // 3. Announcements Management (Editor, School Admin, Super Admin)
    Route::apiResource('announcements', AdminAnnouncementController::class);

    // 4. Academic Programs Management (School Admin, Super Admin)
    Route::get('programs', [AdminAcademicProgramController::class, 'index']);
    Route::get('programs/{id}', [AdminAcademicProgramController::class, 'show']);
    Route::put('programs/{id}', [AdminAcademicProgramController::class, 'update'])
        ->middleware('role:school_admin,super_admin');

    // 5. Achievements Management (School Admin, Super Admin)
    Route::apiResource('achievements', AdminAchievementController::class)
        ->middleware('role:school_admin,super_admin');

    // 6. Gallery Management (School Admin, Super Admin)
    Route::apiResource('gallery', AdminGalleryController::class)
        ->middleware('role:school_admin,super_admin');

    // 7. Admissions & Inquiries Management
    Route::get('admissions/inquiries', [AdminAdmissionsController::class, 'getInquiries']);
    Route::patch('admissions/inquiries/{id}/status', [AdminAdmissionsController::class, 'updateInquiryStatus']);
    Route::delete('admissions/inquiries/{id}', [AdminAdmissionsController::class, 'deleteInquiry'])
        ->middleware('role:school_admin,super_admin');

    // 8. Contact Messages Management
    Route::get('contact-messages', [AdminContactMessageController::class, 'index']);
    Route::get('contact-messages/{id}', [AdminContactMessageController::class, 'show']);
    Route::post('contact-messages/{id}/reply', [AdminContactMessageController::class, 'reply']);
    Route::delete('contact-messages/{id}', [AdminContactMessageController::class, 'destroy'])
        ->middleware('role:school_admin,super_admin');

    // 9. Media Uploads & Assets
    Route::get('media', [AdminMediaController::class, 'index']);
    Route::post('media/upload', [AdminMediaController::class, 'upload']);
    Route::delete('media/{id}', [AdminMediaController::class, 'destroy'])
        ->middleware('role:school_admin,super_admin');

    // 10. School Settings (School Admin & Super Admin)
    Route::get('settings', [AdminSchoolSettingController::class, 'index'])
        ->middleware('role:school_admin,super_admin');
    Route::post('settings', [AdminSchoolSettingController::class, 'update'])
        ->middleware('role:school_admin,super_admin');

    // 11. User Management (SUPER ADMIN ONLY)
    Route::apiResource('users', AdminUserController::class)
        ->middleware('role:super_admin');

    // 12. Activity Logs (SUPER ADMIN ONLY)
    Route::get('activity-logs', [AdminActivityLogController::class, 'index'])
        ->middleware('role:super_admin');
});
