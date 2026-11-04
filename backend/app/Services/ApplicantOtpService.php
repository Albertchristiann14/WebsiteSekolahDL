<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Service OTP Pendaftar (WhatsApp / Email)
 * Memenuhi prinsip keamanan:
 * 1. Berumur singkat (TTL 5 Menit).
 * 2. Sekali pakai (One-Time Use).
 * 3. Dibatasi maksimal 3 kali salah tebak (Anti-Bruteforce).
 * 4. Rate-limited (Maksimal 3 permintaan per nomor HP dalam 15 menit).
 */
class ApplicantOtpService
{
    private const TTL_SECONDS = 300; // 5 Menit
    private const MAX_ATTEMPTS = 3;
    private const RATE_LIMIT_TTL = 900; // 15 Menit

    /**
     * Hasilkan OTP baru dan simpan di cache terproteksi
     */
    public static function generateOtp(string $identifier): array
    {
        $normalizedId = strtolower(trim($identifier));
        $rateLimitKey = "otp_rate_limit:{$normalizedId}";
        $requestCount = (int) Cache::get($rateLimitKey, 0);

        if ($requestCount >= 3) {
            return [
                'success' => false,
                'message' => 'Terlalu banyak permintaan OTP. Silakan tunggu 15 menit sebelum mencoba lagi.',
            ];
        }

        // Hasilkan 6 digit angka acak kriptografis
        $otp = (string) random_int(100000, 999999);
        $hashedOtp = hash('sha256', $otp);

        $cacheKey = "applicant_otp:{$normalizedId}";
        Cache::put($cacheKey, [
            'hash' => $hashedOtp,
            'attempts' => 0,
            'created_at' => time(),
        ], self::TTL_SECONDS);

        // Naikkan hitungan rate limit
        Cache::put($rateLimitKey, $requestCount + 1, self::RATE_LIMIT_TTL);

        // Jangan tulis plain OTP ke log produksi (UU PDP compliance)
        Log::info("OTP SPMB berhasil digenerate untuk target tersamarkan: " . substr($normalizedId, 0, 4) . '***');

        return [
            'success' => true,
            'otp' => $otp, // Diteruskan ke gateway WA / Email
            'expires_in_seconds' => self::TTL_SECONDS,
        ];
    }

    /**
     * Verifikasi kode OTP yang dimasukkan pendaftar
     */
    public static function verifyOtp(string $identifier, string $enteredCode): array
    {
        $normalizedId = strtolower(trim($identifier));
        $cacheKey = "applicant_otp:{$normalizedId}";
        $data = Cache::get($cacheKey);

        if (!$data) {
            return [
                'success' => false,
                'message' => 'Kode OTP tidak ditemukan atau telah kedaluwarsa (Masa aktif 5 menit).',
            ];
        }

        if ($data['attempts'] >= self::MAX_ATTEMPTS) {
            Cache::forget($cacheKey);
            return [
                'success' => false,
                'message' => 'Batas percobaan verifikasi telah terlampaui. Silakan minta kode OTP baru.',
            ];
        }

        $incomingHash = hash('sha256', trim($enteredCode));

        if (!hash_equals($data['hash'], $incomingHash)) {
            // Naikkan jumlah percobaan salah
            $data['attempts']++;
            Cache::put($cacheKey, $data, self::TTL_SECONDS);

            $remaining = self::MAX_ATTEMPTS - $data['attempts'];
            return [
                'success' => false,
                'message' => "Kode OTP salah. Sisa kesempatan: {$remaining} kali.",
            ];
        }

        // OTP Valid: Segera hapus agar tidak dapat digunakan kembali
        Cache::forget($cacheKey);

        return [
            'success' => true,
            'message' => 'Verifikasi nomor kontak berhasil.',
        ];
    }
}
