<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;

/**
 * Service Enkripsi Data Pribadi Spesifik & Blind Index
 * Sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)
 * Menggunakan standar industri: AES-256-GCM (Authenticated Encryption with Associated Data)
 * dan HMAC-SHA256 Blind Index untuk pencarian cepat tanpa membocorkan NIK asli di indeks.
 */
class PersonalDataEncryptionService
{
    private const CIPHER = 'aes-256-gcm';
    private const IV_LENGTH = 12; // Standar GCM: 96 bit (12 bytes)
    private const TAG_LENGTH = 16; // Standar GCM: 128 bit (16 bytes)

    /**
     * Dapatkan kunci enkripsi 256-bit dari environment
     */
    private static function getEncryptionKey(): string
    {
        $rawKey = config('app.data_encryption_key', env('DATA_ENCRYPTION_KEY', env('APP_KEY')));
        
        if (str_starts_with($rawKey, 'base64:')) {
            $rawKey = base64_decode(substr($rawKey, 7));
        }

        // Turunkan menjadi kunci tepat 32 bytes (256 bit)
        return hash('sha256', $rawKey, true);
    }

    /**
     * Dapatkan pepper rahasia untuk Blind Index
     * TODO-SEC: Pastikan BLIND_INDEX_PEPPER diset terpisah di .env produksi dan disimpan di Secret Manager.
     */
    private static function getBlindIndexPepper(): string
    {
        return env('BLIND_INDEX_PEPPER', 'dl-pepper-secret-pdp-2026-strict-key-secure');
    }

    /**
     * Enkripsi field teks polos (NIK, NISN, No KK, Penghasilan) dengan AES-256-GCM
     *
     * @param string|null $plaintext Data sensitif teks polos
     * @return string|null String terenkripsi berformat base64 JSON payload
     */
    public static function encryptField(?string $plaintext): ?string
    {
        if ($plaintext === null || $plaintext === '') {
            return null;
        }

        $key = self::getEncryptionKey();
        $iv = random_bytes(self::IV_LENGTH);
        $tag = '';

        $ciphertext = openssl_encrypt(
            $plaintext,
            self::CIPHER,
            $key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            '', // AAD (Additional Authenticated Data)
            self::TAG_LENGTH
        );

        if ($ciphertext === false) {
            Log::error('Gagal mengenkripsi data pribadi dengan AES-256-GCM.');
            throw new Exception('Gagal memproses pengamanan data.');
        }

        $payload = [
            'v' => 1, // Versi kunci (memudahkan rotasi kunci)
            'iv' => base64_encode($iv),
            'tag' => base64_encode($tag),
            'data' => base64_encode($ciphertext),
        ];

        return 'ENC:' . base64_encode(json_encode($payload));
    }

    /**
     * Dekripsi field terenkripsi AES-256-GCM kembali ke teks polos
     *
     * @param string|null $encryptedPayload String terenkripsi berawalan 'ENC:'
     * @return string|null Teks polos hasil dekripsi
     */
    public static function decryptField(?string $encryptedPayload): ?string
    {
        if ($encryptedPayload === null || $encryptedPayload === '') {
            return null;
        }

        // Jika bukan format terenkripsi (misal data legacy), kembalikan apa adanya
        if (!str_starts_with($encryptedPayload, 'ENC:')) {
            return $encryptedPayload;
        }

        $rawJson = base64_decode(substr($encryptedPayload, 4));
        $payload = json_decode($rawJson, true);

        if (!is_array($payload) || !isset($payload['iv'], $payload['tag'], $payload['data'])) {
            Log::warning('Format payload enkripsi data pribadi tidak valid.');
            return null;
        }

        $key = self::getEncryptionKey();
        $iv = base64_decode($payload['iv']);
        $tag = base64_decode($payload['tag']);
        $ciphertext = base64_decode($payload['data']);

        $decrypted = openssl_decrypt(
            $ciphertext,
            self::CIPHER,
            $key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag
        );

        if ($decrypted === false) {
            Log::error('Dekripsi data pribadi gagal (Integritas Auth Tag tidak cocok / data rusak).');
            return null;
        }

        return $decrypted;
    }

    /**
     * Hasilkan Blind Index (HMAC-SHA256) untuk kolom sensitif (mis. NIK atau NISN)
     * Memungkinkan query WHERE nik_blind_index = ? tanpa menyimpan NIK polos di indeks.
     *
     * @param string|null $value NIK atau identitas yang akan dibuatkan indeks
     * @return string|null 64 karakter hash hex deterministik
     */
    public static function generateBlindIndex(?string $value): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        $normalized = trim($value);
        $pepper = self::getBlindIndexPepper();

        return hash_hmac('sha256', $normalized, $pepper);
    }

    /**
     * Masking data sensitif di UI (Contoh NIK: 3201************12)
     *
     * @param string|null $value Data teks polos
     * @param int $visibleFront Jumlah karakter depan yang terlihat
     * @param int $visibleBack Jumlah karakter belakang yang terlihat
     * @return string Data tersamarkan untuk tampilan layar
     */
    public static function maskPersonalIdentifier(?string $value, int $visibleFront = 4, int $visibleBack = 2): string
    {
        if (!$value) {
            return '-';
        }

        $len = strlen($value);
        if ($len <= ($visibleFront + $visibleBack)) {
            return str_repeat('*', $len);
        }

        $front = substr($value, 0, $visibleFront);
        $back = substr($value, -$visibleBack);
        $maskLength = $len - $visibleFront - $visibleBack;

        return $front . str_repeat('*', $maskLength) . $back;
    }
}

