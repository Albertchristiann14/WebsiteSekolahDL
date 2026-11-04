<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Roles & Permissions
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('group')->default('general');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('role_permission', function (Blueprint $table) {
            $table->foreignId('role_id')->constrained()->cascadeOnDelete();
            $table->foreignId('permission_id')->constrained()->cascadeOnDelete();
            $table->primary(['role_id', 'permission_id']);
        });

        // 2. News Categories & News
        Schema::create('news_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('news_categories')->nullOnDelete();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable()->index();
            $table->boolean('is_featured')->default(false);
            $table->json('tags')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->unsignedBigInteger('views_count')->default(0);
            $table->softDeletes();
            $table->timestamps();

            $table->index(['status', 'published_at']);
        });

        // 3. Announcements
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->longText('content');
            $table->string('category')->default('Umum'); // Akademik, Pengumuman, Darurat
            $table->enum('priority', ['normal', 'important', 'urgent'])->default('normal');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable()->index();
            $table->enum('status', ['draft', 'active', 'archived'])->default('active');
            $table->boolean('is_homepage')->default(true);
            $table->string('attachment')->nullable();
            $table->timestamps();

            $table->index(['status', 'is_homepage']);
        });

        // 4. Academic Programs
        Schema::create('academic_programs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('short_name');
            $table->string('level_badge')->nullable();
            $table->string('age_range')->nullable();
            $table->string('headline');
            $table->text('overview');
            $table->string('hero_image')->nullable();
            $table->json('features')->nullable();
            $table->json('curriculum_highlights')->nullable();
            $table->json('facilities')->nullable();
            $table->json('graduate_outcomes')->nullable();
            $table->json('extracurriculars')->nullable();
            $table->string('schedule')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 5. Galleries & Items
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->nullable()->constrained('galleries')->nullOnDelete();
            $table->string('title');
            $table->string('category')->default('Kegiatan Belajar');
            $table->string('image');
            $table->text('caption')->nullable();
            $table->string('date')->nullable();
            $table->string('aspect_ratio')->default('landscape');
            $table->boolean('is_published')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 6. Achievements
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('competition');
            $table->string('organizer')->nullable();
            $table->string('level')->default('Nasional'); // Internasional, Nasional, Provinsi, Kota
            $table->string('year', 10);
            $table->string('category'); // Sains & Teknologi, Robotika, dll.
            $table->string('student_name');
            $table->string('grade_and_level')->nullable();
            $table->string('medal_or_rank');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_demo')->default(false);
            $table->timestamps();
        });

        // 7. Pages CMS
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->json('sections')->nullable();
            $table->longText('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // 8. Admissions (Settings & Inquiries)
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // waves, steps, requirements, faqs
            $table->json('data');
            $table->timestamps();
        });

        Schema::create('admission_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('parent_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('student_level');
            $table->text('message')->nullable();
            $table->enum('status', ['new', 'contacted', 'processed', 'enrolled', 'cancelled'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamps();

            $table->index('status');
        });

        // 9. School Settings
        Schema::create('school_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable();
            $table->string('group')->default('general'); // identity, contact, social, meta
            $table->boolean('is_public')->default(true);
            $table->timestamps();
        });

        // 10. Media Management
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('filename');
            $table->string('original_name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size'); // bytes
            $table->string('path');
            $table->string('url');
            $table->string('alt_text')->nullable();
            $table->timestamps();
        });

        // 11. Activity Logs
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action'); // created, updated, deleted, login, logout, published
            $table->string('subject_type')->nullable(); // Model class or resource name
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->json('details')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'action']);
        });

        // 12. Contact Messages
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->enum('status', ['unread', 'read', 'replied', 'archived'])->default('unread');
            $table->text('reply_message')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('media');
        Schema::dropIfExists('school_settings');
        Schema::dropIfExists('admission_inquiries');
        Schema::dropIfExists('admissions');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('academic_programs');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('news');
        Schema::dropIfExists('news_categories');
        Schema::dropIfExists('role_permission');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};

