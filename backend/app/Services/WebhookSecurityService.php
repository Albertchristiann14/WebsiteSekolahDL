<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Service Keamanan Webhook & Idempotensi
 * Melindungi dari pemalsuan notifikasi pembayaran (Fake Midtrans Callback)
 * dan mencegah pemrosesan ganda (Double Invoicing / Replay Attack).
 */
class WebhookSecurityService
{
    /**
     * Verifikasi Tanda Tangan Webhook Midtrans
     * Algoritma resmi Midtrans: SHA512(order_id + status_code + gross_amount + ServerKey)
     *
     * @param array $payload Data notifikasi dari Midtrans
     * @return bool True jika tanda tangan valid
     */
    public static function verifyMidtransSignature(array $payload): bool
    {
        $orderId = $payload['order_id'] ?? '';
        $statusCode = $payload['status_code'] ?? '';
        $grossAmount = $payload['gross_amount'] ?? '';
        $incomingSignature = $payload['signature_key'] ?? '';

        $serverKey = env('MIDTRANS_SERVER_KEY', config('services.midtrans.server_key', ''));

        if (empty($orderId) || empty($statusCode) || empty($grossAmount) || empty($serverKey)) {
            Log::warning('Midtrans webhook gagal: Parameter payload atau ServerKey kosong.');
            return false;
        }

        $expectedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        return hash_equals($expectedSignature, $incomingSignature);
    }

    /**
     * Verifikasi Token Webhook WhatsApp Gateway (Fonnte / Wablas / WA Cloud API)
     */
    public static function verifyWhatsAppWebhookToken(?string $incomingToken): bool
    {
        $configuredSecret = env('WHATSAPP_WEBHOOK_SECRET', config('services.whatsapp.webhook_secret', ''));

        if (empty($configuredSecret) || empty($incomingToken)) {
            return false;
        }

        return hash_equals($configuredSecret, $incomingToken);
    }

    /**
     * Pengecekan Idempotensi (Anti-Replay Attack)
     * Memastikan payload webhook yang sama tidak diproses dua kali.
     *
     * @param string $source Asal webhook ('midtrans', 'whatsapp')
     * @param string $eventId ID unik transaksi/pesan
     * @return bool True jika event baru; False jika duplikat yang sudah pernah diproses
     */
    public static function checkAndLockIdempotency(string $source, string $eventId): bool
    {
        $idempotencyKey = "webhook_processed:{$source}:{$eventId}";

        // Gunakan atomic add di cache dengan TTL 3 hari (259200 detik)
        $isFirstTime = Cache::add($idempotencyKey, [
            'processed_at' => now()->toIso8601String(),
            'ip' => request()->ip(),
        ], 259200);

        if (!$isFirstTime) {
            Log::info("Webhook duplikat terdeteksi dan diabaikan secara aman (Idempotent): {$source} - {$eventId}");
            return false;
        }

        return true;
    }
}

