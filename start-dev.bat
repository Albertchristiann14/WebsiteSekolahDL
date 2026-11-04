@echo off
title Menjalankan Dharma Loka School Full-Stack (Next.js + Laravel API)
color 0b

echo =================================================================
echo   MEMULAI SISTEM FULL-STACK SEKOLAH DHARMA LOKA PEKANBARU
echo   Krevia Digital - Client Delivery
echo =================================================================
echo.

:: 1. Cek apakah MySQL di Laragon sudah berjalan
echo [1/3] Menyiapkan Database MySQL 8.4...
netstat -ano | findstr :3306 >nul 2>&1
if %errorlevel% neq 0 (
    echo       Menjalankan daemon MySQL Laragon di background...
    start /b "" "C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysqld.exe" "--datadir=C:\laragon\data\mysql-8.4" >nul 2>&1
    timeout /t 2 /nobreak >nul
) else (
    echo       MySQL sudah aktif di port 3306.
)

:: 2. Jalankan Laravel API Backend di Port 8000
echo.
echo [2/3] Menjalankan Backend Laravel REST API di http://127.0.0.1:8000 ...
start "Laravel REST API (:8000)" cmd /k "cd /d %~dp0backend && php artisan serve --port=8000"

:: 3. Jalankan Next.js Frontend di Port 3000
echo.
echo [3/3] Menjalankan Frontend Next.js di http://localhost:3000 ...
timeout /t 1 /nobreak >nul
start "Next.js Frontend (:3000)" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo =================================================================
echo   SEMUA SERVER BERHASIL DIJALANKAN!
echo.
echo   - Website Publik : http://localhost:3000/
echo   - Portal Admin   : http://localhost:3000/admin/login
echo   - REST API       : http://127.0.0.1:8000/api
echo.
echo   Kredensial Demo Admin:
echo   - Super Admin : superadmin@dharmaloka.sch.id / DharmaLoka@2026!
echo   - School Admin: admin@dharmaloka.sch.id / DharmaLoka@2026!
echo   - Editor      : editor@dharmaloka.sch.id / DharmaLoka@2026!
echo =================================================================
echo.
pause

