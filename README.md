# Sekolah Dharma Loka Pekanbaru — Premium School Profile & Admin CMS

Website profil resmi dan portal penerimaan peserta didik baru (PPDB) untuk **Sekolah Dharma Loka Pekanbaru**, dirancang dan dikembangkan dengan standar estetika institusi pendidikan premium serta sistem backend terintegrasi oleh **Krevia Digital**.

> 📖 **Dokumentasi Lengkap:** Silakan baca [PROJECT_DOCUMENTATION.md](file:///d:/Perkuliahan/Krevia/Portofolio/Sekolah/PROJECT_DOCUMENTATION.md) untuk rincian arsitektur, ERD basis data, endpoint API, dan panduan teknis mendalam.  
> ⚡ **Panduan Menjalankan:** Silakan baca [README_RUN.md](file:///d:/Perkuliahan/Krevia/Portofolio/Sekolah/README_RUN.md) atau jalankan `start-dev.bat`.

---

## ⚡ Cara Menjalankan Cepat (1-Klik)

1. Pastikan **Laragon** (MySQL) aktif.
2. Klik ganda berkas **`start-dev.bat`** di folder proyek.
3. Buka di browser:
   - **Situs Publik:** [http://localhost:3000](http://localhost:3000)
   - **Portal Admin CMS:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - **Backend REST API:** [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

### Akun Demo Staf Admin:
- **Super Admin:** `superadmin@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`
- **School Admin:** `admin@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`
- **Editor:** `editor@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`

---

## 1. Ikhtisar Proyek

- **Klien**: Sekolah Dharma Loka Pekanbaru (Yayasan Dharma Loka)
- **Pengembang & Desainer**: Krevia Digital
- **Jenjang Pendidikan**: TK • SD • SMP • SMA • SMK
- **Arah Desain**: *Premium Modern Education + Editorial Website*
- **Arsitektur**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion

Website ini dirancang secara khusus untuk menghindari pola-pola generik AI (tanpa card kit seragam berlebihan, tanpa gradient SaaS klise, tanpa all-caps berlebihan), menghadirkan tipografi editorial terpadu (*Plus Jakarta Sans* & *Lora Serif*), komposisi asimetris bernilai seni tinggi, dan pemisahan tegas antara data peraga (demo) dengan arsip resmi sekolah.

---

## 2. Struktur Halaman & Arsitektur

Website mencakup arsitektur multi-halaman lengkap:

1. **Beranda (`/`)**: Hero editorial sinematik, filosofi budi pekerti, tab jenjang terpadu (TK, SD, SMP, SMA, SMK), 6 pilar keunggulan, showcase sarana modern, jejak prestasi siswa, warta terkini, dan ajakan pendaftaran PPDB.
2. **Tentang Kami (`/about`)**: Sejarah sejak 1988, legalitas yayasan, visi & 5 misi sekolah, 4 pilar nilai luhur (Prajña, Sīla, Vīriya, Global-Local), serta profil kepemimpinan sekolah.
3. **Program Akademik (`/academics`)**: Tinjauan kurikulum trilingual (Indonesia, Inggris, Mandarin), modul sains inkuiri, dan ringkasan 5 jenjang.
4. **Detail Jenjang (`/academics/[slug]`)**: Halaman detail mendalam untuk masing-masing jenjang:
   - `/academics/tk` (Taman Kanak-Kanak)
   - `/academics/sd` (Sekolah Dasar)
   - `/academics/smp` (Sekolah Menengah Pertama)
   - `/academics/sma` (Sekolah Menengah Atas)
   - `/academics/smk` (Sekolah Menengah Kejuruan)
5. **Warta & Berita (`/news`)**: Indeks berita dengan filter interaktif kategori (Akademik, Prestasi, Kegiatan, Pengumuman, Opini) dan pencarian instan.
6. **Detail Berita (`/news/[slug]`)**: Tata letak artikel editorial nyaman baca (line-length < 80 karakter), foto utama, kutipan lead, tag topik, dan rekomendasi kabar terkait.
7. **Prestasi Siswa (`/achievements`)**: Hall of fame kejuaraan olimpiade sains, robotika AI, debat, wushu, dan IT network dari tingkat kota hingga internasional.
8. **Sarana & Prasarana (`/facilities`)**: Katalog fasilitas kampus modern dengan foto representatif, kapasitas, dan lokasi gedung.
9. **Galeri Kampus (`/gallery`)**: Album foto interaktif dengan filter kategori dan penampil modal **Lightbox** (navigasi keyboard Escape, Kiri, Kanan).
10. **Penerimaan Siswa Baru (`/admissions`)**: Portal informasi PPDB T.A. 2027/2028: gelombang pendaftaran, alur 5 langkah, syarat berkas per jenjang, konsultasi WhatsApp, formulir minat online, dan akordeon FAQ.
11. **Hubungi Kami (`/contact`)**: Alamat lengkap, nomor telepon, WhatsApp, email, jam layanan, formulir pesan interaktif, dan peta Google Maps.

---

## 3. Sistem Desain Visual

### Palet Warna
- **Primary Deep Navy** (`#102A43`): Merefleksikan kredibilitas akademik, keteguhan institusional, dan ketenangan martabat sekolah.
- **Royal Blue** (`#1D4ED8`): Aksen tautan interaktif dan energi inovasi modern.
- **Warm Gold** (`#D6A84F` / `#F7F2E7`): Simbol kemuliaan budi pekerti, kebijaksanaan (Prajña), dan prestasi luhur.
- **Canvas Neutrals** (`#FFFFFF` & `#F8FAFC`): Kanvas lapang yang memberikan kenyamanan membaca.
- **Slate Text** (`#1E293B` & `#526477`): Keterbacaan teks optimal berstandar kontras WCAG AAA.

### Tipografi
- **Antarmuka & Judul Utama**: `Plus Jakarta Sans` (Geometris bersih, berwibawa, modern)
- **Aksen Editorial & Filosofi**: `Lora` (Serif anggun yang menghadirkan wibawa tradisi akademis)

---

## 4. Panduan Menjalankan Proyek

Pastikan Anda telah menginstal **Node.js (v18+)** di perangkat Anda.

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

### 3. Membangun Versi Produksi
```bash
npm run build
npm run start
```

---

## 5. Daftar Placeholder & Data Resmi yang Diperlukan (Proposal Klien)

Seluruh data spesifik sekolah telah dipisahkan secara rapi di direktori `src/data/`. Berikut adalah daftar berkas dan data yang perlu diverifikasi serta dilengkapi dengan data resmi dari pihak Yayasan / Manajemen Sekolah Dharma Loka:

| Direktori & Berkas | Elemen yang Ditandai `[DEMO / OFFICIAL REQUIRED]` | Deskripsi Konfirmasi yang Diperlukan |
| :--- | :--- | :--- |
| `src/data/schoolInfo.ts` | Alamat Lengkap & Titik Peta | Konfirmasi nomor jalan, kode pos, dan titik koordinat Google Maps resmi. |
| `src/data/schoolInfo.ts` | Nomor Telepon & WhatsApp PPDB | Nomor saluran hotline pendaftaran dan telepon kantor sekretariat. |
| `src/data/schoolInfo.ts` | Akreditasi Resmi | Status akreditasi BAN-S/M resmi untuk masing-masing 5 jenjang. |
| `src/data/schoolInfo.ts` | Statistik & Alumni | Angka resmi jumlah alumni, siswa aktif, dan rasio pendidik. |
| `src/data/achievements.ts` | Nama Siswa & Kejuaraan | Konfirmasi daftar juara olimpiade sains & kejuaraan resmi terbaru. |
| `src/data/admissions.ts` | Tanggal Gelombang & Biaya | Surat Keputusan (SK) Yayasan mengenai jadwal gelombang dan struktur biaya resmi. |
| `src/data/gallery.ts` | Arsip Foto Kampus Asli | Penggantian foto stok representatif dengan foto asli kegiatan murid dan gedung Dharma Loka. |

---

## 6. Audit Standar & Aksesibilitas (Web Design Guidelines)

- **Semantic HTML**: Struktur heading hierarkis `h1`–`h4`, tag `<main id="main-content">`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`.
- **Skip to Content Link**: Tersedia di baris teratas dokumen untuk navigasi keyboard.
- **Visible Focus Rings**: Gaya cincin fokus `focus-visible:ring-2` di seluruh elemen interaktif tanpa menghilangkan outline default.
- **Aksesibilitas Tombol & Ikon**: Tombol ikonik dilengkapi `aria-label`, dan ikon dekoratif dilengkapi `aria-hidden="true"`.
- **Kontrol Animasi**: Mengakomodasi preferensi `prefers-reduced-motion: reduce` pengguna secara otomatis.
- **Responsive**: Diuji pada skala Desktop (1440px), Laptop (1280px), Tablet (768px), dan Mobile (390px / 320px).

