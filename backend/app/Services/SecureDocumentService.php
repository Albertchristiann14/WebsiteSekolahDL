<?php

namespace App\Services;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Service Pengelolaan & Penyimpanan Berkas Pendaftaran SPMB Secara Aman
 * Mencegah celah:
 * - Unrestricted File Upload (Web Shell / Remote Code Execution)
 * - Metadata Information Disclosure (GPS EXIF leak)
 * - Stored XSS via SVG / HTML uploads
 * - Direct Object Download (Bypassing Auth via public directory access)
 */
class SecureDocumentService
{
    // MIME Types yang diizinkan (berdasarkan Magic Bytes biner asli)
    private const ALLOWED_MIMES = [
        'application/pdf' => 'pdf',
        'image/jpeg'      => 'jpg',
        'image/png'       => 'png',
    ];

    // Batas ukuran maksimal: 4 Megabytes
    private const MAX_SIZE_BYTES = 4 * 1024 * 1024;

    // Masa berlaku Signed URL: 5 Menit (300 detik)
    private const SIGNED_URL_TTL = 300;

    /**
     * Validasi, sanitasi, pembersihan EXIF, dan penyimpanan berkas ke PRIVATE storage
     *
     * @param UploadedFile $file Berkas yang diunggah
     * @param string $tenantId Jenjang (tk, sd, smp, sma, smk)
     * @param int|string $applicantId ID Pendaftar
     * @param string $docType Jenis dokumen (kk, akta, ijazah, rapor, pas_foto)
     * @return array Metadata berkas tersimpan
     */
    public static function storeDocument(UploadedFile $file, string $tenantId, $applicantId, string $docType): array
    {
        // 1. Validasi Ukuran Berkas
        if ($file->getSize() > self::MAX_SIZE_BYTES) {
            throw new Exception('Ukuran berkas melebihi batas maksimal 4 MB.');
        }

        // 2. Validasi Magic Bytes (Bukan hanya ekstensi nama file)
        $realPath = $file->getRealPath();
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedMime = finfo_file($finfo, $realPath);
        finfo_close($finfo);

        if (!array_key_exists($detectedMime, self::ALLOWED_MIMES)) {
            Log::warning("Percobaan unggah berkas dengan tipe MIME terlarang: {$detectedMime}");
            throw new Exception('Format berkas tidak diizinkan. Hanya menerima PDF, JPG, atau PNG.');
        }

        $safeExtension = self::ALLOWED_MIMES[$detectedMime];

        // 3. Bersihkan Metadata EXIF (GPS rumah, tipe kamera) jika gambar JPEG/PNG
        if ($detectedMime === 'image/jpeg' || $detectedMime === 'image/png') {
            self::stripExifMetadata($realPath, $detectedMime);
        }

        // 4. Buat Nama File Acak (UUID) untuk mencegah path traversal dan directory listing
        $uniqueToken = Str::uuid()->toString();
        $secureFileName = "doc_{$tenantId}_{$docType}_{$uniqueToken}.{$safeExtension}";
        $relativeFolder = "private/documents/{$tenantId}/{$applicantId}";

        // 5. Simpan ke Private Disk (Storage local non-public)
        $storedPath = $file->storeAs($relativeFolder, $secureFileName, 'local');

        if (!$storedPath) {
            throw new Exception('Gagal menyimpan dokumen ke direktori terproteksi.');
        }

        return [
            'file_name' => $secureFileName,
            'file_path' => $storedPath,
            'file_size_bytes' => filesize($realPath),
            'mime_type' => $detectedMime,
            'original_name' => preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $file->getClientOriginalName()),
            'stored_at' => now(),
        ];
    }

    /**
     * Buat Signed URL berumur pendek (5 Menit) untuk mengunduh/melihat dokumen
     *
     * @param int|string $documentId ID Dokumen
     * @return string URL bertanda tangan kriptografis HMAC-SHA256
     */
    public static function generateSignedDownloadUrl($documentId): string
    {
        $expires = time() + self::SIGNED_URL_TTL;
        $secret = config('app.key');
        
        $signature = hash_hmac('sha256', "doc_download:{$documentId}:{$expires}", $secret);

        $baseUrl = config('app.url', 'http://127.0.0.1:8000');
        return "{$baseUrl}/api/admin/documents/{$documentId}/download?expires={$expires}&signature={$signature}";
    }

    /**
     * Verifikasi integritas dan masa berlaku Signed URL
     */
    public static function verifySignedDownloadUrl($documentId, int $expires, string $signature): bool
    {
        // 1. Periksa apakah sudah kedaluwarsa
        if (time() > $expires) {
            return false;
        }

        // 2. Periksa kesesuaian tanda tangan HMAC-SHA256
        $secret = config('app.key');
        $expectedSignature = hash_hmac('sha256', "doc_download:{$documentId}:{$expires}", $secret);

        return hash_equals($expectedSignature, $signature);
    }

    /**
     * Header HTTP Keamanan untuk menyajikan berkas unduhan
     */
    public static function getSecureDownloadHeaders(string $mimeType, string $clientFilename): array
    {
        $sanitizedName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $clientFilename);

        return [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'attachment; filename="' . $sanitizedName . '"',
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'DENY',
            'Cache-Control' => 'private, no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ];
    }

    /**
     * Menghapus metadata EXIF dari gambar untuk melindungi privasi lokasi keluarga
     */
    private static function stripExifMetadata(string $filePath, string $mimeType): void
    {
        try {
            if ($mimeType === 'image/jpeg' && function_exists('imagecreatefromjpeg') && function_exists('imagejpeg')) {
                $image = @imagecreatefromjpeg($filePath);
                if ($image) {
                    imagejpeg($image, $filePath, 90); // Simpan ulang tanpa EXIF
                    imagedestroy($image);
                }
            } elseif ($mimeType === 'image/png' && function_exists('imagecreatefrompng') && function_exists('imagepng')) {
                $image = @imagecreatefrompng($filePath);
                if ($image) {
                    imagepng($image, $filePath, 8);
                    imagedestroy($image);
                }
            }
        } catch (\Throwable $e) {
            // Jika modul GD tidak terpasang, biarkan file tetap berjalan namun catat log
            Log::info("EXIF stripping dilewati: " . $e->getMessage());
        }
    }
}
