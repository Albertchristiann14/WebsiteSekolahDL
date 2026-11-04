# Panduan Menjalankan Aplikasi Sekolah Dharma Loka

Aplikasi ini terdiri dari 3 komponen utama:
1. **Database:** MySQL 8.4 (Port 3306)
2. **Backend:** Laravel REST API (Port 8000)
3. **Frontend:** Next.js 15 App Router (Port 3000)

---

## Cara 1: Sekali Klik (Paling Mudah)

Cukup **klik ganda (double-click)** berkas:
👉 **`start-dev.bat`** di folder proyek ini.

Skrip ini akan otomatis membuka MySQL, menjalankan backend Laravel di port 8000, dan menjalankan frontend Next.js di port 3000.

---

## Cara 2: Manual Lewat Terminal

Jika ingin menjalankan secara manual, buka 2 terminal:

### Terminal 1 — Backend (Laravel API):
```powershell
# Pastikan MySQL di Laragon sudah menyala (Klik 'Start All' di aplikasi Laragon)
cd backend
php artisan serve --port=8000
```
> Backend akan aktif di: `http://127.0.0.1:8000`

### Terminal 2 — Frontend (Next.js):
```powershell
# Di folder utama proyek (d:\Perkuliahan\Krevia\Portofolio\Sekolah)
npm run dev
```
> Frontend akan aktif di: `http://localhost:3000`

---

## Tautan Akses

- **Situs Publik Sekolah:** [http://localhost:3000](http://localhost:3000)
- **Portal Login Admin CMS:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **API Endpoint:** [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

---

## Akun Login Staf Demo

Pada halaman login terdapat tombol **1-Klik Isi Cepat**, atau gunakan:

- **Super Admin:** `superadmin@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`
- **School Admin:** `admin@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`
- **Editor:** `editor@dharmaloka.sch.id` | Sandi: `DharmaLoka@2026!`

