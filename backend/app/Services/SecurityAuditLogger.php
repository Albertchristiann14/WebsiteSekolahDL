<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Service Audit Log Keamanan & Deteksi Anomali
 * Memenuhi standar UU PDP & OWASP ASVS 4.0 Level 2 (Section 8: Data Protection & Audit Trails).
 * Mencatat akses data sensitif, unmasking NIK, pembukaan berkas, dan ekspor massal.
 */
class SecurityAuditLogger
{
    private const MASS_EXPORT_THRESHOLD = 20; // Batas jumlah baris untuk memicu peringatan ekspor massal
    private const SENSITIVE_VIEW_BURST_THRESHOLD = 30; // 30 akses dokumen per 5 menit = Anomali

    /**
     * Catat aktivitas umum sistem
     */
    public static function log(
        string $action,
        string $module,
        ?string $recordId = null,
        array $details = [],
        ?string $tenantId = null
    ): void {
        try {
            $user = auth()->user();
            $ip = request()->ip() ?? '127.0.0.1';
            $userAgent = request()->userAgent() ?? 'Unknown Agent';

            // Jangan biarkan data mentah seperti password atau plaintext NIK masuk ke audit log
            $sanitizedDetails = self::sanitizeLogPayload($details);

            ActivityLog::create([
                'user_id' => $user?->id,
                'tenant_id' => $tenantId ?? $user?->tenant_id,
                'action' => strtoupper($action),
                'subject_type' => $module,
                'subject_id' => $recordId,
                'details' => $sanitizedDetails,
                'ip_address' => $ip,
                'user_agent' => substr($userAgent, 0, 500),
            ]);
        } catch (\Throwable $e) {
            // Jangan gagalkan alur bisnis utama jika logging database tersendat, tapi tulis ke syslog
            Log::error("Gagal menulis audit log: " . $e->getMessage());
        }
    }

    /**
     * Catat secara eksplisit saat staf membuka NIK/NISN/KK yang tersamarkan (Unmasking PII)
     */
    public static function logUnmasking(int $userId, string $applicantId, string $fieldName, string $reason = 'Verifikasi Berkas SPMB'): void
    {
        self::log('UNMASK_PII', 'admissions', $applicantId, [
            'field_unmasked' => $fieldName,
            'reason' => $reason,
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    /**
     * Catat pembukaan berkas fisik siswa & deteksi potensi pengunduhan massal (Scraping)
     */
    public static function logDocumentAccess(int $userId, string $documentId, string $docType): void
    {
        self::log('ACCESS_DOCUMENT', 'documents', $documentId, [
            'doc_type' => $docType,
        ]);

        // Deteksi Anomali Burst Akses Dokumen
        $burstKey = "audit_burst_docs:{$userId}";
        $currentCount = (int) Cache::get($burstKey, 0) + 1;
        Cache::put($burstKey, $currentCount, 300); // 5 Menit window

        if ($currentCount >= self::SENSITIVE_VIEW_BURST_THRESHOLD) {
            Log::warning("SECURITY ALERT: Terdeteksi pola unduh berkas massal oleh User ID {$userId}. Total: {$currentCount} berkas dalam 5 menit.");
            self::log('SECURITY_ALERT_BURST_DOWNLOAD', 'security', (string) $userId, [
                'alert' => 'Aktivitas pengunduhan dokumen dalam frekuensi mencurigakan.',
                'count' => $currentCount,
            ]);
        }
    }

    /**
     * Catat ekspor data ke Excel/CSV
     */
    public static function logMassExport(int $userId, string $module, int $rowCount, string $reason): void
    {
        $isMassive = $rowCount >= self::MASS_EXPORT_THRESHOLD;

        self::log('EXPORT_DATA', $module, null, [
            'row_count' => $rowCount,
            'reason' => $reason,
            'is_high_volume' => $isMassive,
        ]);

        if ($isMassive) {
            Log::warning("SECURITY ALERT: Ekspor data massal {$rowCount} baris oleh User ID {$userId}. Alasan: {$reason}");
        }
    }

    /**
     * Filter agar password, token, atau NIK mentah tidak masuk ke log database
     */
    private static function sanitizeLogPayload(array $payload): array
    {
        $sensitiveKeys = ['password', 'password_confirmation', 'token', 'secret', 'two_factor_secret', 'nik', 'kk'];

        foreach ($payload as $key => $val) {
            if (in_array(strtolower($key), $sensitiveKeys)) {
                $payload[$key] = '***REDACTED***';
            } elseif (is_array($val)) {
                $payload[$key] = self::sanitizeLogPayload($val);
            }
        }

        return $payload;
    }
}
