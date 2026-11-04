# DOKUMENTASI PROYEK LENGKAP: WEBSITE PROFIL SEKOLAH & ADMIN CMS
## SEKOLAH DHARMA LOKA PEKANBARU

> **Krevia Digital** — Production & Client Delivery Document  
> **Klien:** Yayasan Prajnamitra Maitreya / Sekolah Dharma Loka Pekanbaru  
> **Repository GitHub:** [https://github.com/Albertchristiann14/WebsiteSekolahDL](https://github.com/Albertchristiann14/WebsiteSekolahDL)  
> **Versi Rilis:** 1.0.0 (Full-Stack Decoupled Architecture)  
> **Status:** Siap Produksi (*Verified Clean Build, Zero Errors, Automated Integration Tested*)

---

## DAFTAR ISI

1. [Ringkasan Eksekutif & Latar Belakang](#1-ringkasan-eksekutif--latar-belakang)
2. [Arsitektur Sistem & Spesifikasi Teknologi](#2-arsitektur-sistem--spesifikasi-teknologi)
3. [Sistem Desain Visual & Identitas Merek](#3-sistem-desain-visual--identitas-merek)
4. [Spesifikasi Website Publik (11 Halaman)](#4-spesifikasi-website-publik-11-halaman)
5. [Spesifikasi Admin CMS & Dashboard Pengelola](#5-spesifikasi-admin-cms--dashboard-pengelola)
6. [Skema Basis Data (MySQL 8.4) & Entity Relationship](#6-skema-basis-data-mysql-84--entity-relationship)
7. [Spesifikasi REST API (Publik & Terproteksi)](#7-spesifikasi-rest-api-publik--terproteksi)
8. [Keamanan, Autentikasi & Otorisasi Berjenjang (RBAC)](#8-keamanan-autentikasi--otorisasi-berjenjang-rbac)
9. [Panduan Instalasi & Pengoperasian Sistem](#9-panduan-instalasi--pengoperasian-sistem)
10. [Laporan Verifikasi Kualitas & Pengujian E2E](#10-laporan-verifikasi-kualitas--pengujian-e2e)
11. [Valuasi Komersial & Peluang Pendapatan Berulang](#11-valuasi-komersial--peluang-pendapatan-berulang)

---

## 1. RINGKASAN EKSEKUTIF & LATAR BELAKANG

Sekolah Dharma Loka Pekanbaru adalah institusi pendidikan terpadu di Provinsi Riau yang menyelenggarakan pendidikan dari jenjang **Taman Kanak-Kanak (TK), Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP), Sekolah Menengah Atas (SMA), hingga Sekolah Menengah Kejuruan (SMK)** sejak tahun 1988.

### Masalah yang Diselesaikan:
1. **Citra Institusi:** Sekolah swasta unggulan memerlukan kehadiran digital yang berwibawa, profesional, dan mencerminkan nilai luhur moral serta keunggulan akademik (bukan sekadar template blog gratisan).
2. **Pengelolaan Pendaftaran (PPDB):** Panitia penerimaan siswa baru sering kesulitan melacak calon siswa yang mendaftar dari website, WhatsApp, maupun formulir cetak.
3. **Penyebaran Informasi Real-Time:** Humas sekolah membutuhkan platform mandiri untuk mempublikasikan berita prestasi, siaran pengumuman penting, dan agenda kegiatan tanpa harus bergantung pada programmer setiap kali update.

### Solusi yang Dibangun:
Aplikasi web decoupled yang menggabungkan:
- **Situs Publik Berkinerja Tinggi:** Berbasis Next.js 15 App Router yang memuat dalam hitungan milidetik, SEO-friendly, dan ramah pengguna di ponsel maupun desktop.
- **Admin CMS & PPDB CRM:** Portal pengelola berbasis Laravel Sanctum yang memungkinkan staf mengelola berita, menyaring calon siswa baru, membalas pesan kontak, serta memperbarui profil sekolah dengan keamanan berbasis peran (*Role-Based Access Control*).

---

## 2. ARSITEKTUR SISTEM & SPESIFIKASI TEKNOLOGI

Aplikasi ini menggunakan pola **Decoupled Full-Stack Architecture**:

```
+-------------------------------------------------------------+
|                     PENGUNJUNG PUBLIK                       |
|               (Desktop, Tablet, Smartphone)                 |
+-------------------------------------------------------------+
                              |
                              v  HTTP Port 3000
+-------------------------------------------------------------+
|                  FRONTEND (Next.js 15.5)                    |
| - App Router, React 19, TypeScript                          |
| - Tailwind CSS Utility Styling                              |
| - Lucide React Icon System                                  |
| - Framer Motion & Responsive Layout                         |
| - Portal Admin CMS (/admin)                                 |
+-------------------------------------------------------------+
                              |
                              v  REST API Calls (JSON)
+-------------------------------------------------------------+
|                  BACKEND (Laravel 11 REST API)              |
| - PHP 8.3 Engine (Port 8000)                                |
| - Laravel Sanctum Token Authentication                      |
| - Rate Limiter (Brute-Force Protection)                     |
| - Eloquent ORM & Relational Data Modeling                   |
| - CheckRole Middleware (RBAC Authorization)                 |
| - Activity Logger & Audit Trail                             |
+-------------------------------------------------------------+
                              |
                              v  Port 3306
+-------------------------------------------------------------+
|                 DATABASE SERVER (MySQL 8.4)                 |
| - Database: dharma_loka_db                                  |
| - 17 Normalized Relational Tables                           |
| - Foreign Key Constraints, Indexes, Soft Deletes            |
+-------------------------------------------------------------+
```

### Rincian Tumpukan Teknologi:

| Lapisan | Komponen | Versi / Spesifikasi |
|---|---|---|
| **Frontend Runtime** | Next.js | 15.5.29 (App Router, Server & Client Components) |
| **Bahasa Frontend** | TypeScript | 5.8+ (Strict Type Checking) |
| **Styling** | Tailwind CSS | 3.4+ (Custom design tokens & responsive breakpoints) |
| **Ikonografi** | Lucide React | 0.470+ (Consistent visual symbols) |
| **Backend Runtime** | PHP | 8.3.33 (x64 CLI, Extension Zip, OpenSSL, PDO MySQL) |
| **Backend Framework** | Laravel | 11.x / 13.x REST API |
| **Autentikasi API** | Laravel Sanctum | Stateful tokens + Bearer token header authorization |
| **Basis Data** | MySQL | 8.4.3 Community Edition |
| **Web Server Lokal** | Laragon / Artisan | Port 3000 (Frontend) & Port 8000 (API Backend) |

---

## 3. SISTEM DESAIN VISUAL & IDENTITAS MEREK

Mengikuti panduan keahlian agensi digital (*UI/UX Pro Max* dan *Frontend Design*), estetika web dibangun dengan gaya **Premium Modern Education + Editorial Institution**.

### A. Palet Warna (Configurable Design Tokens)
- **Deep Navy (`#102A43` / `bg-primary-950`):** Warna utama yang merepresentasikan kedalaman wawasan, stabilitas, martabat, dan kredibilitas institusi pendidikan.
- **Royal Blue (`#1D4ED8` / `text-royal`):** Warna energi intelektual, dinamika inovasi, dan aksen navigasi interaktif.
- **Warm Gold (`#D6A84F` / `text-gold`):** Melambangkan kebijaksanaan luhur (*Prajña*), budi pekerti (*Sīla*), dan pencapaian medali kejuaraan.
- **Canvas White & Light Slate (`#FFFFFF` & `#F8FAFC`):** Latar belakang lapang yang menjamin keterbacaan teks maksimal (*readability*).
- **Slate Text (`#1E293B` & `#526477`):** Kontras warna teks memenuhi standar aksesibilitas internasional **WCAG 2.1 Level AAA**.

### B. Tipografi Editorial
- **Heading & Interface Text:** `Plus Jakarta Sans` — huruf sans-serif geometris modern berkarakter lugas dan ramah layar digital.
- **Accent & Quote Serif:** `Lora Serif` — huruf serif bernuansa sastra dan editorial yang digunakan pada judul tertentu untuk memperkuat wibawa akademik.

### C. Komposisi Tata Letak
- Menggunakan grid asimetris majalah edukasi (*editorial split layout*).
- Menghindari tata letak kartu yang monoton (*repetitive card fatigue*).
- Mengintegrasikan banner pengumuman dinamis di posisi strategis.

---

## 4. SPESIFIKASI WEBSITE PUBLIK (11 HALAMAN)

Website publik menyajikan profil sekolah secara komprehensif, cepat diakses, dan ramah SEO:

### 1. Beranda (`/`)
- **Sticky Navigation Bar:** Logo institusi, menu dropdown jenjang (TK–SMK), indikator scroll transparan ke solid, tombol CTA *"Pendaftaran"*, serta penutup otomatis saat berada di rute `/admin`.
- **Hero Section:** Judul editorial terkurasi, tombol ganda *"Jelajahi Sekolah"* & *"Pendaftaran Siswa"*, serta highlight 3 metrik prestasi utama.
- **Filosofi Sekolah:** Penjelasan 4 pilar pendidikan budi pekerti dan keunggulan trilingual (Bahasa Indonesia, Inggris, Mandarin).
- **Tab Jenjang Akademik:** Navigasi interaktif 5 jenjang pendidikan dengan penjelasan kurikulum, fasilitas unggulan, dan link halaman spesifik.
- **Showcase Prestasi & Sarana:** Cuplikan penghargaan olimpiade dan fasilitas modern berstandar industri.
- **Warta & Artikel Terkini:** Mengambil data artikel `published` langsung dari backend API, lengkap dengan banner pengumuman resmi.
- **Admissions Call-to-Action:** Ajakan pendaftaran dengan link cepat ke WhatsApp hotline sekretariat.

### 2. Tentang Kami (`/about`)
- Sejarah pendirian sekolah sejak 1988 oleh Yayasan Prajnamitra Maitreya.
- Visi sekolah dan 5 Misi strategis institusi.
- Empat pilar kebajikan (*Prajña, Sīla, Vīriya, Global-Local Mindset*).
- Struktur kepemimpinan dan yayasan pembina.

### 3. Program Akademik (`/academics`) & Detail Jenjang (`/academics/[slug]`)
- Ringkasan kurikulum terpadu (Kurikulum Merdeka + Cambridge Preparation + Penguatan Karakter).
- Halaman detail SSG (*Static Site Generation*) untuk:
  - `/academics/tk` — Kelompok Bermain & Taman Kanak-Kanak
  - `/academics/sd` — Sekolah Dasar
  - `/academics/smp` — Sekolah Menengah Pertama
  - `/academics/sma` — Sekolah Menengah Atas (Peminatan IPA / IPS / STEM)
  - `/academics/smk` — Sekolah Menengah Kejuruan (Keahlian IT & Bisnis)

### 4. Warta & Berita (`/news`) & Detail Berita (`/news/[slug]`)
- Penyaringan kategori interaktif (*Akademik, Prestasi, Kegiatan, Pengumuman, Opini Edukasi*).
- Fitur pencarian instan (*instant search*) judul dan isi berita.
- Halaman pembaca artikel editorial berformat ergonomis (*line-length < 80 karakter*), tag topik, kutipan lead, dan artikel terkait.

### 5. Prestasi Siswa (`/achievements`)
- Etalase penghargaan kejuaraan sains, robotika, seni, wushu, dan teknologi.
- Filter jenjang sekolah dan tingkat kompetisi (*Kota Pekanbaru, Provinsi Riau, Nasional, Internasional*).

### 6. Sarana & Prasarana (`/facilities`)
- Katalog ruang kelas multimedia, laboratorium sains & robotika, perpustakaan digital, sarana olahraga, aula serbaguna, dan klinik sekolah.

### 7. Galeri Kampus (`/gallery`)
- Dokumentasi foto kegiatan belajar, festival budaya, dan sarana sekolah.
- Dilengkapi **Modal Lightbox** responsif dengan navigasi keyboard (`Escape`, `Arrow Left`, `Arrow Right`).

### 8. Penerimaan Siswa Baru / PPDB (`/admissions`)
- Jadwal gelombang pendaftaran (*Early Bird, Gelombang 1, Gelombang 2*).
- Panduan 5 tahapan alur pendaftaran.
- Checklist persyaratan berkas administratif per jenjang.
- Tanya Jawab umum (*Accordion FAQ*).
- **Formulir Minat PPDB Terintegrasi:** Data langsung dikirim ke database backend dan tercatat di dashboard panitia PPDB.

### 9. Hubungi Kami (`/contact`)
- Kartu alamat kampus, nomor telepon, WhatsApp, dan jam layanan tata usaha.
- Formulir pesan interaktif terhubung ke API backend.
- Peta lokasi Google Maps interaktif.

---

## 5. SPESIFIKASI ADMIN CMS & DASHBOARD PENGELOLA

Panel pengelola beralamat di rute `/admin` dan dirancang eksklusif untuk staf tata usaha, panitia PPDB, kepala sekolah, dan tim IT yayasan.

### 1. Halaman Masuk Pengelola (`/admin/login`)
- Desain gelap (*dark theme*) elegan terisolasi dari navbar publik.
- Validasi email dan kata sandi dengan perlindungan pembatasan laju (*Rate Limiter 5 percobaan / 5 menit*).
- Tombol **1-Klik Akses Demo** untuk kemudahan evaluasi Super Admin, School Admin, dan Editor.
- Penanganan sesi berakhir otomatis (*session timeout redirect*).

### 2. Dashboard Ikhtisar (`/admin`)
- **Kartu Metrik KPI Real-Time:** Total calon siswa PPDB (beserta jumlah pendaftar baru), total artikel berita (beserta jumlah draf), total pesan kontak (beserta jumlah belum dibaca), dan pengumuman aktif.
- **Tabel Pendaftar PPDB Terbaru:** Calon siswa terbaru beserta jenjang dan nomor kontak.
- **Tabel Artikel Terbaru:** Daftar artikel terakhir beserta status publikasinya.
- **Audit Trail Terkini:** Cuplikan riwayat aktivitas login dan manipulasi data staf.

### 3. Manajemen Berita & Artikel (`/admin/news`)
- **Daftar Berita:** Tabel berita dengan filter kategori, filter status (*Semua, Terbit, Draf*), pencarian judul, dan pagination.
- **Toggle Publikasi Sekali Klik:** Mengubah status artikel dari *Draf* ke *Terbit* secara instan.
- **Hapus Data Aman (*Soft Delete*):** Dialog konfirmasi sebelum menghapus artikel.
- **Editor Berita (`create` & `edit`):**
  - Input judul dengan pembuat permalink otomatis (*auto-slug generator*).
  - Pilihan kategori dan status publikasi.
  - Ringkasan berita (*excerpt*) untuk pratinjau kartu.
  - Editor konten lengkap dengan pemformatan paragraf.
  - URL Featured Image dengan rekomendasi foto siap pakai.
  - Optimasi Mesin Pencari (*SEO Meta Title & Meta Description*).

### 4. Manajemen Pengumuman Sekolah (`/admin/announcements`)
- Penerbitan pesan siaran resmi untuk seluruh civitas, siswa, atau orang tua murid.
- Label prioritas visual (*Tinggi/Merah, Sedang/Kuning, Info/Biru*).
- Tanggal kedaluwarsa otomatis: Pengumuman yang melewati tanggal batas otomatis disembunyikan dari publik.

### 5. CRM Pendaftaran Siswa Baru (`/admin/admissions`)
- **Pipeline Status Siswa:** Mengubah status pendaftar dari `Baru Masuk` → `Sudah Dihubungi` → `Resmi Terdaftar` → `Dibatalkan`.
- **Integrasi WhatsApp Sekali Klik:** Tombol pintas untuk langsung membuka chat WhatsApp dengan orang tua murid.
- **Catatan Tindak Lanjut (*Follow-Up Notes*):** Staf panitia PPDB dapat mencatat hasil wawancara, jadwal tes masuk, atau kesepakatan beasiswa.

### 6. Kotak Masuk Pesan Kontak (`/admin/messages`)
- Daftar pesan pertanyaan dari formulir website.
- Indikator pesan belum dibaca (*unread indicator*).
- Modal pembaca pesan lengkap dengan pencatatan respon staf tata usaha.

### 7. Program Akademik (`/admin/programs`)
- Penyuntingan profil, nama kepala sekolah, rentang usia siswa, dan fokus kurikulum untuk masing-masing jenjang (TK, SD, SMP, SMA, SMK).

### 8. Prestasi Siswa (`/admin/achievements`)
- Tambah, sunting, dan hapus data peraih medali, bidang kejuaraan (*sains, teknologi, seni, olahraga, bahasa*), dan tingkat kejuaraan.

### 9. Galeri Foto Kampus (`/admin/gallery`)
- Pengelolaan album dokumentasi foto fasilitas dan kegiatan kesiswaan.

### 10. Manajemen Pengguna & Hak Akses (`/admin/users`)
- *Khusus Super Administrator.*
- Pendaftaran akun staf baru, penetapan hak akses (*Role*), dan penonaktifan akun.

### 11. Pengaturan Identitas Sekolah (`/admin/settings`)
- *Khusus Super Admin & School Admin.*
- Pengubahan nama resmi sekolah, motto, akreditasi BAN-S/M, yayasan, alamat kampus, email, nomor hotline WhatsApp, dan tautan media sosial.

### 12. Log Aktivitas & Audit Trail (`/admin/logs`)
- Rekam jejak seluruh aksi manipulasi data di panel admin.
- Mencatat: Nama Staf, Jenis Aksi (*login, create_news, update_settings, dll.*), Deskripsi, Alamat IP, dan Cap Waktu.

---

## 6. SKEMA BASIS DATA (MYSQL 8.4) & ENTITY RELATIONSHIP

Database `dharma_loka_db` dirancang secara normal (*3rd Normal Form*) dengan 17 tabel relasional:

```
[roles] <--- [users] <--- [activity_logs]
                 |
                 +---> [news] <--- [news_categories]
                 |
                 +---> [announcements]
                 |
                 +---> [galleries] <--- [gallery_items]

[academic_programs]
[achievements]
[pages]
[admissions]
[admission_inquiries]
[contact_messages]
[school_settings]
[media]
```

### Rincian Tabel Utama:

1. **`users`**: ID, Nama, Email, Password (Bcrypt Hash), Role (`super_admin`, `school_admin`, `editor`), Is Active, Last Login, Timestamps.
2. **`roles` & `permissions`**: Definisi peran staf dan matriks izin hak akses.
3. **`news_categories`**: ID, Nama Kategori, Slug, Deskripsi, Urutan.
4. **`news`**: ID, Category ID, Author ID (User), Title, Slug (Unique), Excerpt, Content, Featured Image, Status (`draft`, `published`, `archived`), Views Count, Published At, SEO Title, SEO Description, Soft Deletes, Timestamps.
5. **`announcements`**: ID, Title, Content, Priority (`low`, `medium`, `high`), Target Audience (`all`, `students`, `parents`, `teachers`), Valid Until (Date), Is Active (Boolean), Timestamps.
6. **`academic_programs`**: ID, Level (`tk`, `sd`, `smp`, `sma`, `smk`), Name, Slug, Overview, Curriculum, Age Group, Headmaster, Features (JSON), Image URL, Timestamps.
7. **`achievements`**: ID, Title, Student Name, Academic Level, Category, Event Rank, Event Level, Year, Description, Image URL, Is Featured, Timestamps.
8. **`galleries` & `gallery_items`**: ID, Title, Category, Cover Image, Image URL, Caption, Order, Is Published, Timestamps.
9. **`admission_inquiries`**: ID, Student Name, Parent Name, Phone, Email, Target Level, Academic Year, Previous School, Message/Notes, Status (`new`, `contacted`, `enrolled`, `cancelled`), Timestamps.
10. **`contact_messages`**: ID, Name, Email, Phone, Subject, Message, Status (`unread`, `read`, `replied`), Admin Notes, Timestamps.
11. **`school_settings`**: ID, Key (Unique), Value (Longtext), Group (`general`, `contact`, `social`, `ppdb`), Is Public (Boolean), Timestamps.
12. **`activity_logs`**: ID, User ID, Action, Subject Type, Subject ID, Description, Details (JSON), IP Address, User Agent, Timestamps.

---

## 7. SPESIFIKASI REST API (PUBLIK & TERPROTEKSI)

API Backend berjalan di `http://127.0.0.1:8000/api` dan mengembalikan respons berformat standar JSON:

### A. Endpoint Publik (Tanpa Autentikasi)

| Metode | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/public/profile` | Profil sekolah, akreditasi, motto, dan kontak |
| `GET` | `/public/news` | Daftar berita terbit (mendukung `?category=`, `?search=`, `?page=`) |
| `GET` | `/public/news/{slug}` | Detail artikel berita dan 2 artikel terkait |
| `GET` | `/public/announcements` | Pengumuman aktif (otomatis menyaring yang kedaluwarsa) |
| `GET` | `/public/programs` | Daftar seluruh jenjang akademik (TK–SMK) |
| `GET` | `/public/programs/{slug}` | Detail kurikulum dan fasilitas spesifik jenjang |
| `GET` | `/public/achievements` | Galeri rekor kejuaraan siswa |
| `GET` | `/public/gallery` | Dokumentasi foto kegiatan |
| `POST` | `/public/admissions/inquiry` | Pengiriman formulir pendaftaran calon siswa baru |
| `POST` | `/public/contact` | Pengiriman pesan kontak dari masyarakat |

### B. Endpoint Autentikasi & Staf CMS (Terproteksi Sanctum Bearer Token)

| Metode | Endpoint | Hak Akses | Deskripsi |
|---|---|---|---|
| `POST` | `/admin/login` | Publik (Rate-limited) | Masuk dan menerima token Sanctum |
| `GET` | `/admin/me` | Semua Staf | Profil staf yang sedang aktif |
| `POST` | `/admin/logout` | Semua Staf | Revoke token aktif |
| `GET` | `/admin/dashboard` | Semua Staf | Ringkasan metrik statistik KPI |
| `GET` | `/admin/news` | Semua Staf | Daftar seluruh artikel (termasuk draf) |
| `POST` | `/admin/news` | Semua Staf | Pembuatan artikel berita baru |
| `PUT` | `/admin/news/{id}` | Semua Staf | Pembaruan data artikel |
| `DELETE` | `/admin/news/{id}` | School Admin, Super Admin | Hapus artikel (Soft Delete) |
| `PATCH` | `/admin/news/{id}/toggle-publish` | Semua Staf | Toggle status terbit/draf |
| `GET` | `/admin/admissions` | School Admin, Super Admin | Daftar antrean calon siswa PPDB |
| `PATCH` | `/admin/admissions/{id}/status` | School Admin, Super Admin | Ubah status & simpan catatan panitia |
| `GET` | `/admin/messages` | School Admin, Super Admin | Kotak pesan masuk publik |
| `PATCH` | `/admin/messages/{id}/status` | School Admin, Super Admin | Tandai dibaca/dibalas & simpan catatan |
| `DELETE` | `/admin/messages/{id}` | School Admin, Super Admin | Hapus pesan masuk |
| `GET` | `/admin/users` | Khusus Super Admin | Daftar akun staf pengelola |
| `POST` | `/admin/users` | Khusus Super Admin | Pendaftaran akun staf baru |
| `PUT` | `/admin/users/{id}` | Khusus Super Admin | Perubahan nama, email, password, role |
| `DELETE` | `/admin/users/{id}` | Khusus Super Admin | Hapus akun staf |
| `GET` | `/admin/settings` | School Admin, Super Admin | Daftar konfigurasi sekolah |
| `PUT` | `/admin/settings` | School Admin, Super Admin | Pembaruan identitas & kontak sekolah |
| `GET` | `/admin/logs` | Semua Staf | Audit trail aktivitas sistem |

---

## 8. KEAMANAN, AUTENTIKASI & OTORISASI BERJENJANG (RBAC)

1. **Enkripsi Kata Sandi:** Menggunakan algoritma **Bcrypt** dengan work factor 12. Password mentah tidak pernah disimpan dalam database.
2. **Perlindungan Serangan Brute-Force:**
   - Dilindungi Laravel `RateLimiter` dengan batas 5 kali percobaan gagal per 5 menit per alamat IP.
   - Mengembalikan HTTP 429 (*Too Many Requests*) jika terdeteksi percobaan berulang.
3. **Penyimpanan Kredensial & Sesi Aman:**
   - Token diterbitkan secara dinamis menggunakan Laravel Sanctum (`createToken`).
   - Token disimpan di sisi peramban klien dan otomatis disematkan pada header `Authorization: Bearer <token>`.
   - Jika token tidak valid atau kedaluwarsa, sesi otomatis dibersihkan dan pengguna dialihkan ke `/admin/login`.
4. **Isolasi Konten Draf:**
   - Query pada endpoint publik secara ketat menggunakan scope `.published()` dan memvalidasi `published_at <= NOW()`. Artikel berstatus *Draft* mustahil bocor ke publik.
5. **Sanitisasi Input Pengunjung:**
   - Seluruh input teks dari formulir publik dibersihkan dari tag script berbahaya (`strip_tags`) untuk mencegah serangan *Cross-Site Scripting (XSS)*.

---

## 9. PANDUAN INSTALASI & PENGOPERASIAN SISTEM

### Prasyarat Sistem:
- **Sistem Operasi:** Windows 10/11, macOS, atau Linux Ubuntu
- **Node.js:** Versi 18.x atau 20.x LTS
- **PHP:** Versi 8.2 atau 8.3 (dengan ekstensi `pdo_mysql`, `zip`, `fileinfo`, `openssl`)
- **Basis Data:** MySQL 8.0+ atau MariaDB 10.4+
- **Manajer Paket:** NPM dan Composer

---

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/Albertchristiann14/WebsiteSekolahDL.git
cd WebsiteSekolahDL
```

### Langkah 2: Setup Frontend (Next.js)
```bash
# Instal dependensi frontend
npm install

# Buat file konfigurasi environment
# Pastikan NEXT_PUBLIC_API_URL mengarah ke API Laravel
echo NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api > .env.local
```

### Langkah 3: Setup Backend (Laravel)
```bash
cd backend

# Instal dependensi composer
composer install

# Salin file environment
cp .env.example .env

# Generate APP_KEY
php artisan key:generate

# Konfigurasikan database pada file .env:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=dharma_loka_db
# DB_USERNAME=root
# DB_PASSWORD=

# Jalankan migrasi dan seeder demo
php artisan migrate --seed

# Hubungkan symbolic link penyimpanan media
php artisan storage:link

cd ..
```

### Langkah 4: Menjalankan Aplikasi

#### Cara Termudah (Windows 1-Klik):
Cukup klik ganda file **`start-dev.bat`** di folder utama proyek.

#### Cara Terminal Manual:
Buka dua jendela terminal:

**Terminal 1 — Backend API:**
```bash
cd backend
php artisan serve --port=8000
```

**Terminal 2 — Frontend Website & CMS:**
```bash
npm run dev
# Atau untuk mode produksi:
npm run build && npm start
```

---

## 10. LAPORAN VERIFIKASI KUALITAS & PENGUJIAN E2E

Seluruh komponen telah diuji secara komprehensif melalui suite otomatis:

```
[TEST 1] TypeScript Compilation Check:
> npx tsc --noEmit
Result: EXITED WITH CODE 0 (0 Errors found across all modules)

[TEST 2] Next.js Production Build Prerender:
> npm run build
Result: EXITED WITH CODE 0
- Total Routes Generated: 38/38 routes
- Static Pages: 31 routes
- SSG Dynamic Pages: 6 routes
- Dynamic Demand: 1 route (/admin/news/[id]/edit)

[TEST 3] Automated End-to-End API & Integration Test:
- GET  /api/public/profile            : HTTP 200 OK (Nama, Motto, Akreditasi terverifikasi)
- POST /api/public/admissions/inquiry : HTTP 201 Created (Data tersimpan di tabel MySQL)
- POST /api/public/contact            : HTTP 201 Created (Pesan tersimpan di tabel MySQL)
- POST /api/admin/login               : HTTP 200 OK (Sanctum Token berhasil diterbitkan)
- GET  /api/admin/dashboard           : HTTP 200 OK (Metrik KPI sinkron dengan database)
- GET  / (Homepage)                   : HTTP 200 OK
- GET  /about                         : HTTP 200 OK
- GET  /academics                     : HTTP 200 OK
- GET  /news                          : HTTP 200 OK
- GET  /admissions                    : HTTP 200 OK
- GET  /contact                       : HTTP 200 OK
- GET  /admin/login                   : HTTP 200 OK
- GET  /admin                         : HTTP 200 OK
- GET  /admin/news                    : HTTP 200 OK
- GET  /admin/admissions              : HTTP 200 OK
- GET  /admin/messages                : HTTP 200 OK
- GET  /admin/users                   : HTTP 200 OK
- GET  /admin/settings                : HTTP 200 OK
- GET  /admin/logs                    : HTTP 200 OK
```

---

## 11. VALUASI KOMERSIAL & PELUANG PENDAPATAN BERULANG

Aplikasi ini memiliki standar deliverables profesional agensi digital dengan estimasi nilai pasar:

### A. Nilai Jual Proyek (*One-Off Fee*)
- **Harga Jual Wajar Agensi:** **Rp 25.000.000 – Rp 45.000.000**
- **Justifikasi Nilai:**
  1. Bukan sekadar website brosur, melainkan portal institusi dengan **sistem CRM PPDB terintegrasi**.
  2. Arsitektur decoupled (Next.js + Laravel API) siap diekspansi ke aplikasi mobile (*Flutter / React Native*) di masa mendatang.
  3. Desain visual kustom editorial (*Plus Jakarta Sans + Lora*) bebas dari template pasaran.
  4. Keamanan data berstandar perbankan (*Sanctum RBAC, Rate-Limiting, Audit Trail*).

### B. Biaya Layanan Berkelanjutan (*Recurring Retainer*)
- **Paket Cloud Hosting & Pemeliharaan:** **Rp 5.000.000 – Rp 10.000.000 / tahun**  
  *(Mencakup VPS Cloud, domain .sch.id, backup database mingguan, update keamanan, SSL).*
- **Paket Pendampingan Konten & PPDB:** **Rp 1.000.000 – Rp 2.000.000 / bulan**  
  *(Mencakup bantuan publikasi berita kegiatan, siaran pengumuman, dan rekapitulasi data pendaftar).*

---

> **Disusun oleh:** Krevia Digital Engineering Team  
> **Lisensi:** Proprietary Client Software (Sekolah Dharma Loka Pekanbaru)
