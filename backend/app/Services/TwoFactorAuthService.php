<?php

namespace App\Services;

use Exception;

/**
 * Service Otentikasi Dua Faktor (2FA) Berbasis Standar Industri RFC 6238 (TOTP)
 * Kompatibel dengan Google Authenticator, Microsoft Authenticator, dan 1Password.
 * Menggunakan algoritma standar HMAC-SHA1 tanpa dependensi eksternal yang rentan.
 */
class TwoFactorAuthService
{
    private const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    private const CODE_LENGTH = 6;
    private const TIME_STEP = 30; // 30 detik per kode TOTP

    /**
     * Hasilkan secret key acak 16 karakter Base32
     */
    public static function generateSecretKey(int $length = 16): string
    {
        $secret = '';
        $max = strlen(self::BASE32_CHARS) - 1;

        for ($i = 0; $i < $length; $i++) {
            $secret .= self::BASE32_CHARS[random_int(0, $max)];
        }

        return $secret;
    }

    /**
     * Hasilkan URL URI standar untuk QR Code (otpauth://)
     */
    public static function getOtpAuthUri(string $email, string $secret, string $issuer = 'Sekolah Dharma Loka'): string
    {
        $encodedIssuer = rawurlencode($issuer);
        $encodedEmail = rawurlencode($email);

        return "otpauth://totp/{$encodedIssuer}:{$encodedEmail}?secret={$secret}&issuer={$encodedIssuer}&algorithm=SHA1&digits=" . self::CODE_LENGTH . "&period=" . self::TIME_STEP;
    }

    /**
     * Verifikasi kode 6-digit TOTP yang dimasukkan staf
     * Mengizinkan window +/- 1 step (toleransi drift jam 30 detik)
     */
    public static function verifyTotp(string $secret, string $code): bool
    {
        $code = trim($code);
        if (strlen($code) !== self::CODE_LENGTH || !ctype_digit($code)) {
            return false;
        }

        $currentTimeSlice = (int) floor(time() / self::TIME_STEP);

        // Periksa waktu saat ini, 30 detik sebelumnya, dan 30 detik setelahnya
        for ($offset = -1; $offset <= 1; $offset++) {
            $calculatedCode = self::calculateCode($secret, $currentTimeSlice + $offset);
            if (hash_equals($calculatedCode, $code)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Hasilkan daftar kode pemulihan darurat (Emergency Recovery Codes)
     *
     * @param int $count Jumlah kode pemulihan
     * @return array Daftar kode format XXXX-XXXX
     */
    public static function generateRecoveryCodes(int $count = 8): array
    {
        $codes = [];
        for ($i = 0; $i < $count; $i++) {
            $part1 = strtoupper(bin2hex(random_bytes(2)));
            $part2 = strtoupper(bin2hex(random_bytes(2)));
            $codes[] = "{$part1}-{$part2}";
        }
        return $codes;
    }

    /**
     * Hitung kode TOTP untuk time slice tertentu (RFC 6238 / RFC 4226)
     */
    private static function calculateCode(string $secret, int $timeSlice): string
    {
        $secretKey = self::base32Decode($secret);

        // Pack counter menjadi 64-bit integer big-endian
        $timeBytes = pack('N*', 0) . pack('N*', $timeSlice);

        // Hitung HMAC-SHA1
        $hash = hash_hmac('sha1', $timeBytes, $secretKey, true);

        // Dynamic truncation
        $offset = ord(substr($hash, -1)) & 0x0F;
        $truncatedHash = substr($hash, $offset, 4);

        $value = unpack('N', $truncatedHash)[1] & 0x7FFFFFFF;
        $modulo = 10 ** self::CODE_LENGTH;

        return str_pad((string) ($value % $modulo), self::CODE_LENGTH, '0', STR_PAD_LEFT);
    }

    /**
     * Decode string Base32 menjadi biner
     */
    private static function base32Decode(string $b32): string
    {
        $b32 = strtoupper(rtrim($b32, '='));
        $l = strlen($b32);
        $n = 0;
        $j = 0;
        $binary = '';

        for ($i = 0; $i < $l; $i++) {
            $n = $n << 5;
            $pos = strpos(self::BASE32_CHARS, $b32[$i]);
            if ($pos === false) {
                continue;
            }
            $n = $n + $pos;
            $j = $j + 5;

            if ($j >= 8) {
                $j = $j - 8;
                $binary .= chr(($n & (0xFF << $j)) >> $j);
            }
        }

        return $binary;
    }
}
