<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\NewsCategory;
use App\Models\News;
use App\Models\Announcement;
use App\Models\AcademicProgram;
use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\Achievement;
use App\Models\SchoolSetting;
use App\Models\Admission;
use App\Models\ActivityLog;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Roles & Permissions
        $roles = [
            [
                'name' => 'Super Administrator',
                'slug' => 'super_admin',
                'description' => 'Akses penuh ke seluruh sistem, manajemen user, setting sekolah, dan audit log.',
            ],
            [
                'name' => 'School Administrator',
                'slug' => 'school_admin',
                'description' => 'Mengelola konten sekolah, publikasi berita, pengumuman, program, galeri, dan prestasi.',
            ],
            [
                'name' => 'Content Editor',
                'slug' => 'editor',
                'description' => 'Membuat dan mengedit draf berita serta pengumuman; tanpa izin manajemen pengguna.',
            ],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['slug' => $r['slug']], $r);
        }

        // 2. Initial Admin Users
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@dharmaloka.sch.id'],
            [
                'name' => 'Super Administrator Dharma Loka',
                'password' => Hash::make('DharmaLoka@2026!'),
                'role' => 'super_admin',
                'status' => 'active',
            ]
        );

        $schoolAdmin = User::firstOrCreate(
            ['email' => 'admin@dharmaloka.sch.id'],
            [
                'name' => 'Admin Humas Dharma Loka',
                'password' => Hash::make('DharmaLoka@2026!'),
                'role' => 'school_admin',
                'status' => 'active',
            ]
        );

        $editor = User::firstOrCreate(
            ['email' => 'editor@dharmaloka.sch.id'],
            [
                'name' => 'Staf Editor Konten',
                'password' => Hash::make('DharmaLoka@2026!'),
                'role' => 'editor',
                'status' => 'active',
            ]
        );

        // 3. News Categories
        $categories = [
            ['name' => 'Akademik', 'slug' => 'akademik', 'description' => 'Warta kurikulum, jadwal ujian, dan kegiatan belajar mengajar.'],
            ['name' => 'Prestasi', 'slug' => 'prestasi', 'description' => 'Pencapaian kejuaraan, olimpiade sains, seni dan olahraga siswa.'],
            ['name' => 'Kegiatan Siswa', 'slug' => 'kegiatan', 'description' => 'Dokumentasi acara OSIS, ekstrakurikuler, dan pentas seni.'],
            ['name' => 'Pengumuman Resmi', 'slug' => 'pengumuman', 'description' => 'Informasi penting yayasan, surat edaran, dan agenda resmi.'],
            ['name' => 'Opini Edukasi', 'slug' => 'opini-edukasi', 'description' => 'Artikel pedagogi dan pemikiran dari tenaga pendidik Dharma Loka.'],
        ];

        $catMap = [];
        foreach ($categories as $idx => $c) {
            $catMap[$c['slug']] = NewsCategory::firstOrCreate(
                ['slug' => $c['slug']],
                array_merge($c, ['order' => $idx + 1])
            );
        }

        // 4. News Articles
        $newsItems = [
            [
                'title' => 'Tim Robotika Dharma Loka Raih Medali Emas di Ajang International Youth Robotic Competition',
                'slug' => 'prestasi-tim-robotika-dharma-loka-kejuaraan-internasional',
                'category_slug' => 'prestasi',
                'excerpt' => 'Inovasi robot pemilah sampah otomatis karya siswa SMP & SMA Dharma Loka berhasil menyisihkan ratusan peserta dari 14 negara dalam ajang bergengsi IYRC.',
                'content' => "Prestasi membanggakan kembali ditorehkan oleh generasi muda Riau di kancah internasional. Tim Robotika Sekolah Dharma Loka Pekanbaru sukses meraih penghargaan Medali Emas (Gold Award) dalam kategori Creative Innovative Project pada perhelatan International Youth Robotic Competition (IYRC).\n\nKarya yang diusung oleh tim adalah sebuah purwarupa 'EcoSmart Waste Sorter', yakni sistem pemilah sampah berbasis kecerdasan buatan dan sensor spektrofotometri optik mini yang mampu membedakan sampah organik, plastik daur ulang, dan logam dalam hitungan detik.\n\nKepala Sekolah SMA Dharma Loka menyampaikan apresiasi mendalam atas dedikasi para siswa dan guru pembimbing yang telah mempersiapkan prototipe ini selama lebih dari empat bulan. 'Pencapaian ini membuktikan bahwa siswa kita memiliki daya saing saintifik global dan kepedulian nyata terhadap solusi keberlanjutan lingkungan,' ujarnya dalam sambutan upacara bendera.\n\nPrestasi ini sekaligus menjadi bukti komitmen Yayasan Dharma Loka dalam memfasilitasi laboratorium terintegrasi STEM dan menyediakan ruang eksperimen bebas bagi siswa-siswi yang ingin mendalami teknologi masa depan.",
                'featured_image' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'is_featured' => true,
                'tags' => ['Robotika', 'Prestasi Internasional', 'STEM', 'Inovasi'],
                'seo_title' => 'Tim Robotika Dharma Loka Raih Medali Emas Internasional',
                'seo_description' => 'Inovasi robot pemilah sampah otomatis karya siswa SMP & SMA Dharma Loka raih emas di IYRC.',
            ],
            [
                'title' => 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2027/2028 Resmi Dibuka',
                'slug' => 'penerimaan-peserta-didik-baru-tahun-ajaran-2027-2028-dibuka',
                'category_slug' => 'pengumuman',
                'excerpt' => 'Sekolah Dharma Loka membuka pendaftaran Gelombang Early Bird untuk seluruh jenjang pendidikan dengan kemudahan beasiswa prestasi akademik dan non-akademik.',
                'content' => "Sekolah Dharma Loka Pekanbaru secara resmi mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2027/2028. Pendaftaran mencakup seluruh jenjang pendidikan terpadu, mulai dari Taman Kanak-Kanak (TK), Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP), Sekolah Menengah Atas (SMA), hingga Sekolah Menengah Kejuruan (SMK).\n\nPada periode Gelombang Early Bird yang berlangsung mulai November hingga akhir Desember, pihak yayasan menyediakan skema apresiasi khusus berupa potongan biaya pembangunan bagi calon siswa berprestasi serta program sibling discount untuk keluarga yang mendaftarkan lebih dari satu anak.\n\nPara orang tua dipersilakan untuk menjadwalkan 'School Tour' dan konsultasi edukasi tatap muka bersama tim akademik kami guna mengenal lebih dekat kultur belajar, sarana pembelajaran, serta kurikulum holistik yang diterapkan di Dharma Loka.\n\nInformasi lengkap persyaratan berkas, alur observasi minat bakat, dan simulasi biaya pendidikan dapat diakses melalui portal admisi online resmi kami atau langsung menghubungi layanan hotline WhatsApp Center.",
                'featured_image' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'is_featured' => true,
                'tags' => ['PPDB', 'Admisi', 'Pendaftaran', 'Beasiswa'],
                'seo_title' => 'PPDB Dharma Loka 2027/2028 Resmi Dibuka',
                'seo_description' => 'Pendaftaran siswa baru Sekolah Dharma Loka Pekanbaru gelombang early bird telah dibuka.',
            ],
            [
                'title' => 'Semarak Bulan Bahasa: Menenun Harmoni Budaya Lewat Karya Sastra & Debat Trilingual',
                'slug' => 'semarak-bulan-bahasa-dan-literasi-kebudayaan-2026',
                'category_slug' => 'kegiatan',
                'excerpt' => 'Ratusan siswa dari lima jenjang unjuk kebolehan dalam kompetisi pidato Mandarin, drama teater bahasa Indonesia, dan debat parlemen bahasa Inggris.',
                'content' => "Halaman dan auditorium Sekolah Dharma Loka dipenuhi antusiasme saat peringatan tahunan Bulan Bahasa dan Apresiasi Budaya Nusantara digelar meriah selama tiga hari berturut-turut.\n\nAcara ini memadukan unjuk kemahiran sastra Indonesia, pidato kefasihan bahasa Mandarin, hingga kompetisi British Parliamentary Debate yang diikuti para siswa jenjang SMP dan SMA. Siswa jenjang TK dan SD pun turut memukau dengan penampilan panggung dongeng rakyat nusantara.",
                'featured_image' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'is_featured' => false,
                'tags' => ['Bulan Bahasa', 'Literasi', 'Trilingual'],
                'seo_title' => 'Semarak Bulan Bahasa Dharma Loka',
                'seo_description' => 'Kompetisi pidato Mandarin, drama sastra Indonesia, dan debat parlemen Inggris di Dharma Loka.',
            ],
            [
                'title' => 'Rancangan Program Magang Industri Siswa SMK Dharma Loka Siap Diluncurkan',
                'slug' => 'rancangan-program-magang-industri-smk-dharma-loka',
                'category_slug' => 'akademik',
                'excerpt' => 'Draf panduan teknis penempatan praktik kerja lapangan bagi siswa jurusan Teknik Komputer Jaringan dan Desain Komunikasi Visual.',
                'content' => 'Ini adalah konten draf yang sedang ditinjau oleh tim kurikulum kejuruan dan belum siap untuk dirilis ke publik.',
                'featured_image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
                'status' => 'draft',
                'published_at' => null,
                'is_featured' => false,
                'tags' => ['SMK', 'Magang', 'Industri'],
                'seo_title' => 'Magang Industri SMK Dharma Loka',
                'seo_description' => 'Program magang siswa SMK Dharma Loka.',
            ],
        ];

        foreach ($newsItems as $n) {
            $catSlug = $n['category_slug'];
            unset($n['category_slug']);
            News::firstOrCreate(
                ['slug' => $n['slug']],
                array_merge($n, [
                    'category_id' => $catMap[$catSlug]->id ?? null,
                    'author_id' => $superAdmin->id,
                ])
            );
        }

        // 5. Announcements (Active & Non-Expired)
        $announcements = [
            [
                'title' => 'Pendaftaran Gelombang Early Bird PPDB 2027/2028 Tersedia Hingga 31 Desember 2026',
                'content' => 'Dapatkan potongan biaya pembangunan hingga 25% bagi calon siswa baru yang mendaftar pada Gelombang 1. Kuota terbatas 120 siswa pertama.',
                'category' => 'Admisi',
                'priority' => 'important',
                'start_date' => now()->subDays(10)->toDateString(),
                'end_date' => now()->addDays(60)->toDateString(),
                'status' => 'active',
                'is_homepage' => true,
            ],
            [
                'title' => 'Jadwal Libur Semester Ganjil & Pengambilan Laporan Hasil Belajar',
                'content' => 'Pengambilan rapor siswa dijadwalkan pada hari Jumat, 18 Desember 2026. Pembelajaran semester genap akan dimulai kembali pada 4 Januari 2027.',
                'category' => 'Akademik',
                'priority' => 'normal',
                'start_date' => now()->subDays(2)->toDateString(),
                'end_date' => now()->addDays(40)->toDateString(),
                'status' => 'active',
                'is_homepage' => true,
            ],
            [
                'title' => 'Pengumuman Uji Coba Server CBT Simulasi Asesmen Nasional',
                'content' => 'Uji coba server simulasi ANBK jenjang SMP dan SMA telah selesai dilaksanakan pada bulan September.',
                'category' => 'Teknis',
                'priority' => 'normal',
                'start_date' => now()->subDays(60)->toDateString(),
                'end_date' => now()->subDays(30)->toDateString(), // Expired!
                'status' => 'active', // Should automatically not display on frontend because end_date is past
                'is_homepage' => false,
            ],
        ];

        foreach ($announcements as $a) {
            Announcement::firstOrCreate(
                ['title' => $a['title']],
                array_merge($a, ['user_id' => $superAdmin->id])
            );
        }

        // 6. Academic Programs (5 Jenjang)
        $programs = [
            [
                'slug' => 'tk',
                'name' => 'Taman Kanak-Kanak (TK)',
                'short_name' => 'TK Dharma Loka',
                'level_badge' => 'Usia Dini (3 - 6 Tahun)',
                'age_range' => 'Playgroup & TK A - B',
                'headline' => 'Fondasi Emas Karakter, Kreativitas, dan Kegembiraan Belajar',
                'overview' => 'Pendidikan anak usia dini di TK Dharma Loka dirancang dengan pendekatan experiential learning dan active play.',
                'hero_image' => 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=80',
                'features' => ['Bilingual Learning Environment', 'Sentra Bermain & Belajar Terintegrasi', 'Rasio Guru Terjaga'],
                'curriculum_highlights' => [
                    ['title' => 'Montessori Exploration', 'description' => 'Stimulasi motorik dan kemandirian anak.'],
                    ['title' => 'Phonics Literacy', 'description' => 'Pengenalan fonik multibahasa sejak dini.'],
                ],
                'facilities' => ['Ruang Kelas Tematik Ber-AC', 'Taman Bermain Ramah Anak'],
                'graduate_outcomes' => ['Percaya diri dan siap melangkah ke jenjang SD'],
                'extracurriculars' => ['Tari Kreasi', 'Menggambar', 'English Storytelling'],
                'schedule' => 'Senin – Jumat | 07.45 – 11.30 WIB',
                'order' => 1,
            ],
            [
                'slug' => 'sd',
                'name' => 'Sekolah Dasar (SD)',
                'short_name' => 'SD Dharma Loka',
                'level_badge' => 'Dasar (6 - 12 Tahun)',
                'age_range' => 'Kelas 1 - 6',
                'headline' => 'Membangun Fondasi Akademik Kuat dan Kemuliaan Budi Pekerti',
                'overview' => 'SD Dharma Loka memadukan keunggulan Kurikulum Merdeka dengan penguatan literasi trilingual dan sains inkuiri.',
                'hero_image' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
                'features' => ['Penguatan Trilingual: Indonesia, Inggris, Mandarin', 'Pembiasaan Budi Pekerti Harian', 'Singapore Math Reasoning'],
                'curriculum_highlights' => [
                    ['title' => 'STEM Foundation', 'description' => 'Eksperimen sains laboratorium mini.'],
                    ['title' => 'Character Mentorship', 'description' => 'Pembinaan etika dan moralitas anak.'],
                ],
                'facilities' => ['Lab Komputer & Coding', 'Perpustakaan Literasi', 'Hall Olahraga'],
                'graduate_outcomes' => ['Nilai akademik unggul dan kecakapan trilingual aktif'],
                'extracurriculars' => ['Klub Robotika Cilik', 'Bulu Tangkis & Basket', 'Wushu'],
                'schedule' => 'Senin – Jumat | 07.15 – 13.45 WIB',
                'order' => 2,
            ],
            [
                'slug' => 'smp',
                'name' => 'Sekolah Menengah Pertama (SMP)',
                'short_name' => 'SMP Dharma Loka',
                'level_badge' => 'Menengah Pertama (12 - 15 Tahun)',
                'age_range' => 'Kelas 7 - 9',
                'headline' => 'Mengasah Nalar Kritis, Kepemimpinan, dan Potensi Saintifik',
                'overview' => 'Mendampingi siswa mengembangkan potensi intelektual melalui pembelajaran inkuiri dan proyek kepemimpinan.',
                'hero_image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
                'features' => ['Project-Based Learning', 'Bina Prestasi Olimpiade Sains (OSN)', 'Cambridge & HSK Preparation'],
                'curriculum_highlights' => [
                    ['title' => 'Applied Robotics Academy', 'description' => 'Rancang bangun robotika dan IoT.'],
                    ['title' => 'Critical Thinking Forum', 'description' => 'Latihan debat parlemen berbasis bukti.'],
                ],
                'facilities' => ['Lab Fisika-Biologi', 'Studio Musik Akustik', 'Lapangan Basket Standar FIBA'],
                'graduate_outcomes' => ['Nalar kritis kuat dan akses leluasa ke SMA/SMK unggulan'],
                'extracurriculars' => ['Robotika Kompetisi', 'English Debate', 'KIR Remaja'],
                'schedule' => 'Senin – Jumat | 07.15 – 14.30 WIB',
                'order' => 3,
            ],
            [
                'slug' => 'sma',
                'name' => 'Sekolah Menengah Atas (SMA)',
                'short_name' => 'SMA Dharma Loka',
                'level_badge' => 'Menengah Atas (15 - 18 Tahun)',
                'age_range' => 'Kelas 10 - 12',
                'headline' => 'Integritas Unggul, Wawasan Global, dan Gerbang Perguruan Tinggi Terkemuka',
                'overview' => 'Fokus keunggulan akademik berdaya saing global, persiapan seleksi PTN (SNBP/SNBT) dan kampus internasional.',
                'hero_image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80',
                'features' => ['Bimbingan Intensif Sukses PTN & Studi Luar Negeri', 'Karya Tulis Ilmiah Remaja', 'Sertifikasi IELTS & HSK'],
                'curriculum_highlights' => [
                    ['title' => 'Peminatan Sains Terapan', 'description' => 'Pendalaman Kalkulus, Fisika, dan Riset Sosial.'],
                    ['title' => 'University Pathway Mentorship', 'description' => 'Penyusunan portofolio akademik universitas.'],
                ],
                'facilities' => ['Lab Kimia & Fisika Standar Riset', 'Pusat E-Library', 'Auditorium 500 Tamu'],
                'graduate_outcomes' => ['Tingkat penerimaan tinggi di PTN favorit dan universitas dunia'],
                'extracurriculars' => ['Model United Nations (MUN)', 'Orkestra Siswa', 'Basket Prestasi'],
                'schedule' => 'Senin – Jumat | 07.15 – 15.15 WIB',
                'order' => 4,
            ],
            [
                'slug' => 'smk',
                'name' => 'Sekolah Menengah Kejuruan (SMK)',
                'short_name' => 'SMK Dharma Loka',
                'level_badge' => 'Vokasi Kejuruan (15 - 18 Tahun)',
                'age_range' => 'Kelas 10 - 12',
                'headline' => 'Keahlian Spesifik, Sertifikasi Profesi, dan Kesiapan Karier Industri',
                'overview' => 'Mencetak talenta vokasional profesional siap kerja dengan sertifikasi kompetensi BNSP dan mitra industri.',
                'hero_image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
                'features' => ['Standar Kompetensi Kerja Nasional Indonesia (SKKNI)', 'Sertifikasi BNSP', 'Bursa Kerja Khusus (BKK)'],
                'curriculum_highlights' => [
                    ['title' => 'Teknologi Informasi & Jaringan', 'description' => 'Cloud infrastructure & cybersecurity essentials.'],
                    ['title' => 'Bisnis & Akuntansi Digital', 'description' => 'Praktik sistem ERP akuntansi modern.'],
                ],
                'facilities' => ['Lab Server & Fiber Optik', 'Studio Desain Render Komputasi', 'Mini Bank'],
                'graduate_outcomes' => ['Ijazah resmi plus sertifikat profesi BNSP siap kerja'],
                'extracurriculars' => ['Klub Web Development', 'Desain Animasi', 'Wirausaha Mandiri'],
                'schedule' => 'Senin – Jumat | 07.15 – 15.30 WIB',
                'order' => 5,
            ],
        ];

        foreach ($programs as $p) {
            AcademicProgram::firstOrCreate(['slug' => $p['slug']], $p);
        }

        // 7. Achievements
        $achievements = [
            [
                'title' => 'Gold Medal Creative Project – Smart Eco Waste Management',
                'competition' => 'International Youth Robotic Competition (IYRC) [DEMO]',
                'organizer' => 'International Youth Robot Association',
                'level' => 'Internasional',
                'year' => '2026',
                'category' => 'Robotika & Coding',
                'student_name' => 'Nicholas Tan & Tim Robotika [DEMO]',
                'grade_and_level' => 'Kelas 11 SMA Dharma Loka',
                'medal_or_rank' => 'Medali Emas',
                'description' => 'Merancang robot otonom pemilah sampah cerdas berbasis AI dan mikrokontroler sensor optik.',
                'image' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
                'is_demo' => true,
            ],
            [
                'title' => 'Medali Perak Olimpiade Sains Nasional (OSN) Bidang Kimia',
                'competition' => 'Olimpiade Sains Nasional (OSN) Jenjang SMA [DEMO]',
                'organizer' => 'Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek',
                'level' => 'Nasional',
                'year' => '2026',
                'category' => 'Sains & Teknologi',
                'student_name' => 'Clarissa Angelica [DEMO]',
                'grade_and_level' => 'Kelas 12 SMA Dharma Loka',
                'medal_or_rank' => 'Medali Perak',
                'description' => 'Meraih peringkat 2 nasional dalam uji teori dan praktikum kimia analitik SMA.',
                'image' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
                'is_demo' => true,
            ],
            [
                'title' => 'Juara 1 Lomba Cepat Tepat Matematika & Logika Se-Sumatera',
                'competition' => 'Sumatera Mathematics Olympiad [DEMO]',
                'organizer' => 'Fakultas MIPA Universitas Negeri Riau',
                'level' => 'Provinsi',
                'year' => '2026',
                'category' => 'Matematika',
                'student_name' => 'Kevin Sanjaya & Matthew Lee [DEMO]',
                'grade_and_level' => 'Kelas 9 SMP Dharma Loka',
                'medal_or_rank' => 'Juara 1',
                'description' => 'Mempertahankan gelar juara bertahan dalam kecakapan nalar logika dan aljabar.',
                'image' => 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
                'is_featured' => true,
                'is_demo' => true,
            ],
        ];

        foreach ($achievements as $ach) {
            Achievement::firstOrCreate(['title' => $ach['title']], $ach);
        }

        // 8. Gallery
        $mainGallery = Gallery::firstOrCreate(
            ['slug' => 'kehidupan-kampus'],
            ['name' => 'Galeri Kampus & Aktivitas Belajar', 'description' => 'Dokumentasi foto kegiatan harian Sekolah Dharma Loka.']
        );

        $galleryPhotos = [
            [
                'title' => 'Eksperimen Spektrofotometri Laboratorium Kimia SMA',
                'category' => 'Kegiatan Belajar',
                'image' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Siswa kelas 12 melakukan uji larutan menggunakan instrumen digital presisi tinggi.',
                'date' => 'Oktober 2026',
                'aspect_ratio' => 'landscape',
            ],
            [
                'title' => 'Momen Kegembiraan Siswa TK di Sentra Sensori',
                'category' => 'Kegiatan Belajar',
                'image' => 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Stimulasi motorik halus anak melalui permainan taktil dan pencocokan warna ceria.',
                'date' => 'September 2026',
                'aspect_ratio' => 'portrait',
            ],
            [
                'title' => 'Perpustakaan Utama dan Diskusi Siswa',
                'category' => 'Fasilitas Kampus',
                'image' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Suasana hening dan inspiratif di lantai 2 perpustakaan pusat Dharma Loka.',
                'date' => 'Oktober 2026',
                'aspect_ratio' => 'landscape',
            ],
            [
                'title' => 'Final Kejuaraan Basket Pelajar Se-Riau',
                'category' => 'Seni & Olahraga',
                'image' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Kekompakan tim basket putra Dharma Loka dalam laga sport hall indoor.',
                'date' => 'Agustus 2026',
                'aspect_ratio' => 'landscape',
            ],
        ];

        foreach ($galleryPhotos as $idx => $photo) {
            GalleryItem::firstOrCreate(
                ['title' => $photo['title']],
                array_merge($photo, ['gallery_id' => $mainGallery->id, 'order' => $idx + 1])
            );
        }

        // 9. School Settings
        $settings = [
            'school_name' => 'Sekolah Dharma Loka Pekanbaru',
            'short_name' => 'Dharma Loka',
            'motto' => 'Prajña Pāramitā Hṛdaya',
            'motto_translation' => 'Mengembangkan Kebijaksanaan, Membina Budi Pekerti, Menggapai Prestasi Mulia',
            'foundation' => 'Yayasan Dharma Loka Pekanbaru',
            'established_year' => '1988',
            'accreditation' => 'Terakreditasi A (Unggul) [DEMO]',
            'phone' => '(0761) 123456 [DEMO]',
            'whatsapp' => '6281234567890',
            'whatsapp_formatted' => '+62 812-3456-7890 [DEMO]',
            'email' => 'sekretariat@dharmaloka.sch.id [DEMO]',
            'address' => 'Jl. Tuanku Tambusai / Komp. TVRI, Labuh Baru Barat, Payung Sekaki, Pekanbaru, Riau 28292 [DEMO]',
            'office_hours' => 'Senin – Jumat: 07.15 – 15.30 WIB | Sabtu: 07.15 – 12.30 WIB',
        ];

        foreach ($settings as $k => $v) {
            SchoolSetting::setVal($k, $v, 'identity', true);
        }

        // 10. Initial Activity Log
        ActivityLog::create([
            'user_id' => $superAdmin->id,
            'action' => 'system_init',
            'subject_type' => 'App\Models\User',
            'subject_id' => $superAdmin->id,
            'details' => ['message' => 'Sistem CMS Sekolah Dharma Loka berhasil diinisialisasi beserta data awal.'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'SystemSeeder/1.0',
        ]);
    }
}
