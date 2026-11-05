@echo off
title Mematikan Layanan Sekolah Dharma Loka
color 0c
echo ===================================================================
echo     MENGHENTIKAN LAYANAN WEB & API SEKOLAH DHARMA LOKA
echo ===================================================================
echo.
echo Menghentikan proses Next.js (node) dan Laravel (php artisan)...
taskkill /F /IM node.exe /T 2>NUL
taskkill /F /IM php.exe /T 2>NUL
echo.
echo [V] Seluruh layanan web dan backend telah dihentikan secara aman.
echo.
pause
