-- =====================================================================
-- SKEMA LENGKAP DATABASE MULTI-TENANT SEKOLAH DHARMA LOKA PEKANBARU
-- Sistem Manajemen Konten (CMS) + Penerimaan Siswa Baru (SPMB / PPDB)
-- Didukung: MySQL 8.0+ / PostgreSQL
-- =====================================================================

-- 1. TABEL TENANTS (UNIT JENJANG PENDIDIKAN)
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(20) PRIMARY KEY,              -- 'portal', 'tk', 'sd', 'smp', 'sma', 'smk'
    name VARCHAR(255) NOT NULL,              -- 'Sekolah Menengah Atas Dharma Loka'
    short_name VARCHAR(50) NOT NULL,         -- 'SMA Dharma Loka'
    subdomain VARCHAR(100) NOT NULL UNIQUE,  -- 'sma.dharmaloka.sch.id'
    npsn VARCHAR(20) NULL,
    accreditation VARCHAR(20) DEFAULT 'A',
    sk_operational VARCHAR(255) NULL,
    established_year INT DEFAULT 1990,
    theme_primary VARCHAR(20) DEFAULT '#4F46E5',
    theme_accent VARCHAR(20) DEFAULT '#D97706',
    address TEXT NULL,
    phone VARCHAR(50) NULL,
    whatsapp VARCHAR(50) NULL,
    email VARCHAR(100) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. TABEL PENGGUNA & RBAC (ROLE-BASED ACCESS CONTROL)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NULL,              -- NULL jika Super Admin Yayasan (akses semua jenjang)
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NULL,
    password VARCHAR(255) NOT NULL,          -- Hash bcrypt / argon2
    role ENUM(
        'super_admin',      -- Super Admin Yayasan (semua jenjang, pengaturan, audit, master)
        'school_admin',     -- Admin Jenjang (mengelola seluruh fitur unit jenjangnya)
        'spmb_officer',     -- Panitia SPMB (verifikasi berkas, tes/seleksi, kelulusan)
        'content_editor',   -- Editor Konten (berita, galeri, pengumuman, agenda)
        'finance'           -- Keuangan (tagihan formulir, uang pangkal, rekonsiliasi transfer)
    ) NOT NULL DEFAULT 'school_admin',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    avatar VARCHAR(255) NULL,
    two_factor_secret VARCHAR(255) NULL,
    last_login_at TIMESTAMP NULL,
    last_login_ip VARCHAR(45) NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL
);

-- 3. AUDIT LOG (JEJAK AKTIVITAS KEAMANAN)
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    tenant_id VARCHAR(20) NULL,
    action VARCHAR(100) NOT NULL,            -- 'CREATE', 'UPDATE', 'DELETE', 'VERIFY_DOC', 'APPROVE_PAYMENT', 'CONVERT_STUDENT'
    module VARCHAR(50) NOT NULL,             -- 'spmb', 'news', 'finance', 'settings', 'auth'
    record_id VARCHAR(100) NULL,
    description TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    payload_before JSON NULL,
    payload_after JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. PENGATURAN SPMB: TAHUN AJARAN & GELOMBANG PENDAFTARAN
CREATE TABLE IF NOT EXISTS academic_years (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,               -- '2026/2027'
    is_active BOOLEAN DEFAULT FALSE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admission_waves (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    academic_year_id BIGINT UNSIGNED NOT NULL,
    wave_number INT NOT NULL,                -- 1, 2, 3
    title VARCHAR(100) NOT NULL,             -- 'Gelombang 1 - Early Bird Prestasi'
    registration_fee DECIMAL(12, 2) DEFAULT 250000.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    auto_close_on_quota BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admission_tracks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,              -- 'Reguler', 'Jalur Prestasi Akademik/Non-Akademik', 'Kemitraan/Alumni'
    slug VARCHAR(100) NOT NULL,
    quota INT NOT NULL DEFAULT 60,
    filled_count INT NOT NULL DEFAULT 0,
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    required_documents JSON NOT NULL,        -- ["kk", "akta", "rapor", "foto", "sertifikat_prestasi"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- 5. PENDAFTAR SPMB (REGISTRATION & APPLICANT DATA)
CREATE TABLE IF NOT EXISTS applicants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    wave_id BIGINT UNSIGNED NOT NULL,
    track_id BIGINT UNSIGNED NOT NULL,
    registration_number VARCHAR(50) NOT NULL UNIQUE, -- 'SMA-2026-G1-0001'
    
    -- Data Calon Siswa
    nik VARCHAR(20) NOT NULL,
    nisn VARCHAR(20) NULL,
    full_name VARCHAR(255) NOT NULL,
    gender ENUM('L', 'P') NOT NULL,
    birth_place VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    religion VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    previous_school VARCHAR(255) NOT NULL,
    school_origin_city VARCHAR(100) DEFAULT 'Pekanbaru',

    -- Data Orang Tua / Wali
    father_name VARCHAR(255) NOT NULL,
    father_job VARCHAR(100) NULL,
    mother_name VARCHAR(255) NOT NULL,
    mother_job VARCHAR(100) NULL,
    parent_whatsapp VARCHAR(50) NOT NULL,
    parent_email VARCHAR(100) NULL,
    parent_monthly_income VARCHAR(50) NULL,

    -- Status Tahapan
    document_status ENUM('pending', 'verified', 'revision_needed', 'rejected') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'pending_approval', 'paid', 'expired') DEFAULT 'unpaid',
    selection_status ENUM('registered', 'scheduled', 'tested', 'passed', 'waiting_list', 'rejected') DEFAULT 'registered',
    final_status ENUM('candidate', 'enrolled', 'withdrawn') DEFAULT 'candidate',

    -- Penjadwalan & Seleksi
    test_schedule_datetime DATETIME NULL,
    test_room VARCHAR(50) NULL,
    test_score_academic DECIMAL(5, 2) NULL,
    test_score_interview DECIMAL(5, 2) NULL,
    test_score_final DECIMAL(5, 2) NULL,
    selection_notes TEXT NULL,

    -- Catatan Verifikasi
    verification_notes TEXT NULL,
    verified_by BIGINT UNSIGNED NULL,
    verified_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (wave_id) REFERENCES admission_waves(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES admission_tracks(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_reg_num (registration_number),
    INDEX idx_nik (nik),
    INDEX idx_status (tenant_id, document_status, payment_status, selection_status)
);

-- 6. DOKUMEN BERKAS UNGGAHAN SPMB
CREATE TABLE IF NOT EXISTS applicant_documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    applicant_id BIGINT UNSIGNED NOT NULL,
    doc_type ENUM('kk', 'akta_lahir', 'rapor', 'pas_foto', 'sertifikat', 'surat_keterangan') NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT NULL,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
);

-- 7. TAGIHAN & PEMBAYARAN (INVOICING & PAYMENTS)
CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    applicant_id BIGINT UNSIGNED NOT NULL,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,     -- 'INV-2026-SMA-0001'
    invoice_type ENUM('registration_form', 'enrollment_down_payment', 'tuition_fee') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    due_date DATETIME NOT NULL,
    status ENUM('unpaid', 'pending_approval', 'paid', 'expired', 'refunded') DEFAULT 'unpaid',
    payment_method ENUM('midtrans_va', 'midtrans_qris', 'bank_transfer_manual', 'cash') DEFAULT 'bank_transfer_manual',
    payment_reference VARCHAR(100) NULL,
    payment_proof_file VARCHAR(500) NULL,
    paid_at DATETIME NULL,
    confirmed_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE,
    FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 8. MASTER DATA: ROMBEL, KELAS & SISWA AKTIF (HASIL KONVERSI)
CREATE TABLE IF NOT EXISTS classes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    academic_year_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(50) NOT NULL,                      -- 'X-MIPA 1', 'VII-A', 'TK-A Bintang'
    grade_level INT NOT NULL,                       -- 1..12 (atau 0 untuk TK)
    capacity INT NOT NULL DEFAULT 32,
    homeroom_teacher_name VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    applicant_id BIGINT UNSIGNED NULL UNIQUE,       -- Menghubungkan ke asal pendaftaran SPMB
    class_id BIGINT UNSIGNED NULL,
    nis VARCHAR(30) NOT NULL UNIQUE,                -- '26SMA0001'
    nisn VARCHAR(20) NULL UNIQUE,
    nik VARCHAR(20) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender ENUM('L', 'P') NOT NULL,
    birth_place VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    parent_whatsapp VARCHAR(50) NOT NULL,
    status ENUM('active', 'graduated', 'moved', 'inactive') DEFAULT 'active',
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE SET NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- 9. NOTIFIKASI WHATSAPP & EMAIL (GATEWAY LOGS)
CREATE TABLE IF NOT EXISTS notification_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    applicant_id BIGINT UNSIGNED NULL,
    channel ENUM('whatsapp', 'email', 'sms') DEFAULT 'whatsapp',
    recipient VARCHAR(100) NOT NULL,
    template_key VARCHAR(50) NOT NULL,              -- 'REGISTRATION_SUCCESS', 'DOC_REVISION', 'TEST_SCHEDULE', 'ANNOUNCEMENT_PASSED'
    message_body TEXT NOT NULL,
    status ENUM('queued', 'sent', 'delivered', 'failed') DEFAULT 'sent',
    gateway_response JSON NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
);

-- 10. CMS: BERITA, PENGUMUMAN, AGENDA, GTK, PRESTASI, GALERI
CREATE TABLE IF NOT EXISTS cms_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    author_id BIGINT UNSIGNED NULL,
    post_type ENUM('news', 'announcement', 'event') DEFAULT 'news',
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    excerpt TEXT NULL,
    content_html LONGTEXT NOT NULL,
    featured_image VARCHAR(500) NULL,
    status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
    is_pinned BOOLEAN DEFAULT FALSE,
    published_at DATETIME NULL,
    event_start_datetime DATETIME NULL,
    event_end_datetime DATETIME NULL,
    event_location VARCHAR(255) NULL,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY uniq_post_slug (tenant_id, post_type, slug)
);

CREATE TABLE IF NOT EXISTS staff_members (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_or_title VARCHAR(150) NOT NULL,            -- 'Guru Matematika & Robotika'
    subject VARCHAR(100) NULL,
    education VARCHAR(150) NOT NULL,                -- 'S.Pd, M.Si (Universitas Riau)'
    category ENUM('pimpinan', 'guru', 'staf') DEFAULT 'guru',
    photo_url VARCHAR(500) NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS school_achievements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    medal_rank VARCHAR(100) NOT NULL,               -- 'Juara 1 Emas'
    event_level ENUM('sekolah', 'kota', 'provinsi', 'nasional', 'internasional') DEFAULT 'nasional',
    category VARCHAR(100) DEFAULT 'Sains & Robotika',
    year INT NOT NULL,
    description TEXT NULL,
    photo_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

