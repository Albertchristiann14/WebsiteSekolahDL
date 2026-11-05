@echo off
title Menjalankan Sistem Sekolah Dharma Loka
color 0b
echo ===================================================================
echo      MEMULAI SISTEM WEB, CMS & SPMB SEKOLAH DHARMA LOKA
echo ===================================================================
echo.

:: 1. Memeriksa Database MySQL (Laragon)
echo [1/3] Memeriksa status MySQL Database...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo       [V] MySQL sudah aktif berjalan di Port 3306.
) else (
    echo       [..] MySQL belum aktif, menyalakan service MySQL...
    start "" "C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysqld.exe" --console
    timeout /t 3 /nobreak >nul
)

:: 2. Menjalankan Backend Laravel API di terminal terpisah
echo.
echo [2/3] Menjalankan Backend Laravel REST API (Port 8000)...
start "Dharma Loka - Backend Laravel API (Port 8000)" cmd /k "cd /d %~dp0backend && php artisan serve --host=127.0.0.1 --port=8000"

:: 3. Menjalankan Frontend Next.js di terminal terpisah
echo.
echo [3/3] Menjalankan Frontend Next.js (Port 3000)...
start "Dharma Loka - Frontend Next.js (Port 3000)" cmd /k "cd /d %~dp0 && npm start"

:: Tunggu 3 detik dan buka browser secara otomatis
timeout /t 3 /nobreak >nul
echo.
echo ===================================================================
echo   SEMUA LAYANAN TELAH BERHASIL DIAKTIFKAN:
echo   - Website Publik : http://localhost:3000
echo   - Portal Admin   : http://localhost:3000/admin/login
echo   - REST API       : http://127.0.0.1:8000/api
echo ===================================================================
echo.
echo Membuka browser...
start http://localhost:3000
timeout /t 2 /nobreak >nul
exit
