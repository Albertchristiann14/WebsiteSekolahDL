# Website Multi-Jenjang Sekolah Dharma Loka Pekanbaru

Website profil publik multi-jenjang (**Portal Induk**, **TK**, **SD**, **SMP**, **SMA**) + Sistem Penerimaan Murid Baru (**SPMB / PPDB Online**) + **Admin CMS Full-Stack** untuk **Sekolah Dharma Loka Pekanbaru, Riau**.

---

## 1. Fitur Utama & Arsitektur Multi-Tenant

### A. Multi-Tenant Satu Codebase (Subdomain & Pemilih Jenjang)
Mendukung deteksi otomatis melalui **Next.js Middleware** (`src/middleware.ts`) dan **Tenant Context** (`src/lib/tenantContext.tsx`):
- `dharmaloka.sch.id` (`?jenjang=portal`) — **Portal Induk Yayasan**
- `tk.dharmaloka.sch.id` (`?jenjang=tk`) — **TK Dharma Loka** (Tema Cerah Biru Muda & Emas Ceria)
- `sd.dharmaloka.sch.id` (`?jenjang=sd`) — **SD Dharma Loka** (Tema Royal Blue & Amber)
- `smp.dharmaloka.sch.id` (`?jenjang=smp`) — **SMP Dharma Loka** (Tema Indigo Sains & Cyan)
- `sma.dharmaloka.sch.id` (`?jenjang=sma`) — **SMA Dharma Loka** (Tema Deep Academic Blue & Gold)

Setiap jenjang memiliki konfigurasi dinamis di `src/config/tenants.ts`:
- Variabel CSS (`--primary`, `--primary-foreground`, `--accent`, `--surface`, `--muted`)
- Sambutan Kepala Sekolah & Profil Singkat per Jenjang
- NPSN, Status Akreditasi, Alamat, Nomor Telepon, Email, dan WhatsApp Khusus Jenjang
- Kuota SPMB, Rincian Biaya Pendidikan (Formulir, Uang Pangkal, SPP, Seragam), Program Unggulan, dan Ekstrakurikuler

### B. Halaman & Seksi Lengkap
1. **Portal Induk (`dharmaloka.sch.id`)**:
   - Hero Yayasan + Tombol Pilih Jenjang & Daftar SPMB
   - 4 Kartu Jenjang Interaktif (TK, SD, SMP, SMA) dengan sisa kuota & klik langsung ke beranda jenjang
   - Statistik Yayasan (Count-Up Animation), Nilai Karakter Budaya ("Cerdas, Berbudi, Berwawasan Global"), Berita Gabungan, Testimoni Wali Murid, dan CTA SPMB.
2. **Beranda Jenjang (`tk / sd / smp / sma`) — 10 Seksi Lengkap**:
   - Hero Slider (3 slide gambar + badge gelombang SPMB aktif)
   - Info Cepat 4 Kartu (Akreditasi A, Kurikulum, Ekstrakurikuler, Kuota SPMB)
   - Sambutan Kepala Sekolah + Kutipan & Link Selengkapnya
   - Statistik Jenjang (Count-Up saat masuk viewport)
   - Program Unggulan & Ekstrakurikuler per Jenjang
   - Carousel Prestasi Terbaru Siswa (Filter otomatis sesuai jenjang)
   - Berita Terbaru (3 Kartu) + Agenda Mendatang (3 Item + Google Calendar)
   - Galeri Foto Masonry (6 Foto) + Video Profil YouTube Lazy-Embed
   - Testimoni Orang Tua & Alumni
   - Banner CTA SPMB + Accordion FAQ Singkat
3. **Profil Sekolah (`/about` & `/facilities`)**:
   - Sambutan Kepala Sekolah / Yayasan, Visi & Misi, Timeline Sejarah (1998–2026), Tabel Legalitas & NPSN + Unduh SK PDF, Struktur Organisasi, dan Fasilitas Kampus.
4. **Direktori Guru & Staf / GTK (`/teachers`)**:
   - Grid kartu foto, nama, jabatan/mata pelajaran, jenjang, pendidikan, filter kategori (`Semua`, `Pimpinan`, `Guru`, `Staf`), pencarian instan, serta Modal Detail GTK (Biografi, Sertifikasi, Pengalaman).
5. **Prestasi Siswa (`/achievements`)**:
   - Filter Tahun, Tingkat (`Internasional`, `Nasional`, `Provinsi`, `Kota`), Kategori (`Akademik`, `Sains & Riset`, `Seni & Budaya`, `Olahraga`), dan Jenjang.
6. **Berita, Pengumuman & Agenda (`/news` & `/news/[slug]`)**:
   - Filter kategori, pencarian, pagination, halaman detail artikel dengan tombol Share (**WhatsApp**, **Facebook**, **Salin Tautan**), serta **Agenda Sekolah** (Tampilan Daftar & Kalender Bulanan + tombol **Tambah ke Google Calendar**).
7. **Galeri Foto & Video (`/gallery`)**:
   - Tab Semua Foto, Album Kegiatan (cover + jumlah foto), Lightbox interaktif, dan Tab **Arsip Video YouTube** dengan modal pemutar video.
8. **Hubungi Kami (`/contact`)**:
   - Formulir kontak tervalidasi **Zod** + proteksi anti-spam (Honeypot + tantangan matematika), peta interaktif Google Maps, jam layanan, dan WhatsApp per jenjang.
9. **SPMB / PPDB Online Lengkap (`/admissions`)**:
   - **Informasi & Kalkulator Biaya**: Banner gelombang aktif + Countdown Timer, Alur 5 Langkah, Sisa Kuota per Jenjang, dan **Kalkulator Simulasi Biaya Pendidikan**.
   - **Formulir Pendaftaran Wizard 6 Tahap**:
     1. Buat Akun Pendaftar + Simulasi **Verifikasi OTP 6-Digit (WhatsApp/Email)**
     2. Pilih Jenjang & Jalur Masuk (`Reguler`, `Prestasi Akademik`, `Prestasi Non-Akademik`, `Afirmasi`, `Pindahan`)
     3. Data Calon Siswa (Nama, NIK 16 digit, NISN, TTL, Alamat, Asal Sekolah)
     4. Data Orang Tua / Wali (Ayah, Ibu, Pekerjaan, Penghasilan, Kontak Darurat)
     5. Unggah Berkas Persyaratan (Drag & Drop + Validasi tipe/ukuran + **Kompresi Gambar Otomatis Sisi Klien via HTML5 Canvas**)
     6. Review & Kirim + **Auto-save Draft ke `localStorage`**
   - **Bukti Registrasi & Cetak PDF**: Nomor registrasi otomatis (`SPMB-2026-XXXX`), **QR Code Verifikasi**, rincian tagihan Virtual Account / QRIS, dan tombol **Cetak Bukti Pendaftaran (PDF)**.
   - **Dashboard Pendaftar**: Login dengan Nomor Registrasi (`SPMB-2026-0089` / `SPMB-2026-0112`), Timeline Progres 6 Tahap, dan **Cetak Kartu Peserta Tes & Observasi**.
   - **Cek Status & Pengumuman Kelulusan**: Input Nomor Registrasi + Tanggal Lahir untuk melihat hasil seleksi resmi dan langkah daftar ulang.

---

## 2. Struktur Folder Proyek

```text
├── backend/                          # Backend REST API (Laravel + Sanctum + MySQL)
├── src/
│   ├── config/
│   │   └── tenants.ts                # Konfigurasi Multi-Tenant (Portal, TK, SD, SMP, SMA)
│   ├── middleware.ts                 # Deteksi subdomain & injeksi header x-tenant-id
│   ├── lib/
│   │   ├── api.ts                    # Klien REST API ke Backend Laravel
│   │   ├── tenantContext.tsx         # Provider React + Injeksi CSS Variable per jenjang
│   │   ├── validations.ts            # Skema Zod (SPMB 6 Tahap, Kontak, Cek Status) & Kompresi Gambar
│   │   └── i18n.ts                   # Kamus Bahasa Indonesia (ID) & Inggris (EN)
│   ├── data/
│   │   ├── school.ts                 # Data profil yayasan, milestone sejarah, FAQ
│   │   ├── academics.ts              # Detail kurikulum TK, SD, SMP, SMA
│   │   ├── teachers.ts               # Direktori 12 Guru & Tenaga Kependidikan (GTK)
│   │   ├── achievements.ts           # Data prestasi siswa multi-jenjang
│   │   ├── news.ts                   # Artikel berita & pengumuman
│   │   ├── events.ts                 # Agenda sekolah & generator link Google Calendar
│   │   ├── gallery.ts                # Foto kegiatan, album, dan arsip video YouTube
│   │   └── spmbDummy.ts              # Data contoh pendaftar untuk uji coba Cek Status & Dashboard
│   ├── components/
│   │   ├── ui/
│   │   │   ├── DesignSystem.tsx      # Button (min 44px), Card, Badge, Accordion, Stepper, Modal, Toast, Skeleton
│   │   │   ├── CountUp.tsx           # Animasi angka saat masuk viewport (prefers-reduced-motion safe)
│   │   │   └── JsonLd.tsx            # Schema.org EducationalOrganization, Article, BreadcrumbList
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Header Sticky, Dropdown Profil & Akademik, Pemilih Jenjang, Bahasa ID/EN
│   │   │   ├── Footer.tsx            # Footer lengkap, Peta Mini Google Maps, NPSN, Tautan Antar-Jenjang
│   │   │   ├── FloatingActions.tsx   # Tombol WhatsApp Melayang (pesan otomatis) & Back-to-Top
│   │   │   └── PublicChrome.tsx      # Pemisah layout publik vs halaman Admin CMS
│   │   ├── home/
│   │   │   └── MultiTenantHome.tsx   # Komponen Beranda Portal Induk (5.1) & Beranda Jenjang 10 Seksi (5.2)
│   │   ├── admissions/
│   │   │   └── AdmissionsClient.tsx  # Sistem SPMB Online 4 Tab (Info/Kalkulator, Wizard 6 Tahap, Dashboard, Cek Status)
│   │   └── news/
│   │       └── ShareButtons.tsx      # Tombol Bagikan ke WhatsApp, Facebook, dan Salin Tautan
│   └── app/
│       ├── page.tsx                  # Halaman Utama (ISR 5 menit + MultiTenantHome)
│       ├── about/page.tsx            # Profil, Visi Misi, Timeline Sejarah, Legalitas SK PDF, Struktur Organisasi
│       ├── academics/page.tsx        # Kurikulum, Program Unggulan, Ekstrakurikuler, Kalender Akademik
│       ├── teachers/                 # Direktori Guru & Staf (GTK) + Modal Detail
│       ├── achievements/             # Halaman Prestasi Siswa Multi-Filter
│       ├── facilities/               # Halaman Fasilitas Sekolah
│       ├── news/                     # Indeks Berita, Pengumuman, Agenda Kalender Bulanan & Detail Artikel
│       ├── gallery/                  # Galeri Foto, Album, Lightbox, & Arsip Video YouTube
│       ├── admissions/               # Portal SPMB / PPDB Online
│       ├── contact/                  # Formulir Kontak Tervalidasi Zod + Google Maps
│       └── admin/                    # Dashboard Admin CMS Full-Stack
```

---

## 3. Cara Menjalankan Proyek

### Prasyarat
- **Node.js** >= 18.x
- **PHP** >= 8.2 & **Composer** (untuk Backend API Laravel)
- **MySQL** >= 8.0

### Langkah 1 — Jalankan Frontend (Next.js)
```bash
# 1. Install dependencies
npm install

# 2. Salin konfigurasi environment
cp .env.example .env.local

# 3. Jalankan mode development
npm run dev

# Atau jalankan mode production (lebih cepat & optimal)
npm run build
npm start
```
Buka **`http://localhost:3000`** di browser.

### Langkah 2 — Menguji Multi-Jenjang di Localhost
Anda dapat berpindah antar-jenjang dengan 2 cara:
1. Klik dropdown **"Portal Yayasan / Pilih Jenjang"** di pojok kiri atas Header.
2. Atau gunakan parameter URL / subdomain lokal:
   - Portal Induk: `http://localhost:3000/?jenjang=portal`
   - Jenjang TK: `http://localhost:3000/?jenjang=tk` (atau `http://tk.localhost:3000`)
   - Jenjang SD: `http://localhost:3000/?jenjang=sd` (atau `http://sd.localhost:3000`)
   - Jenjang SMP: `http://localhost:3000/?jenjang=smp` (atau `http://smp.localhost:3000`)
   - Jenjang SMA: `http://localhost:3000/?jenjang=sma` (atau `http://sma.localhost:3000`)

### Langkah 3 — Menguji Simulasi SPMB Online (`/admissions`)
- **Cek Status & Dashboard Pendaftar**: Gunakan Nomor Registrasi contoh berikut:
  - `SPMB-2026-0089` (Tanggal Lahir: `2014-05-14`) — Status: **LULUS SELEKSI**
  - `SPMB-2026-0112` (Tanggal Lahir: `2020-08-21`) — Status: **TERVERIFIKASI (JADWAL TES)**
  - `SPMB-2026-0145` (Tanggal Lahir: `2011-11-03`) — Status: **CADANGAN**
- **Pendaftaran Baru (Stepper 6 Tahap)**:
  - Saat meminta kode OTP pada Tahap 1, kode simulasi adalah **`123456`**.
