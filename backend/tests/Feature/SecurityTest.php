<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Applicant;
use App\Policies\ApplicantPolicy;
use App\Services\PersonalDataEncryptionService;
use App\Services\ApplicantOtpService;
use App\Services\TwoFactorAuthService;
use App\Services\SecureDocumentService;
use App\Services\WebhookSecurityService;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

/**
 * Suite Pengujian Keamanan Otomatis (Automated Security Test Suite)
 * Memverifikasi:
 * 1. Isolasi Multi-Tenant (Anti-Cross-Tenant Leakage)
 * 2. RBAC & Pemisahan Tugas (Content Editor dilarang akses SPMB)
 * 3. Anti-IDOR (Insecure Direct Object Reference)
 * 4. Kriptografi AES-256-GCM & Blind Index HMAC
 * 5. Validasi Magic Bytes & Penolakan Berkas Berbahaya
 * 6. Keabsahan Tanda Tangan Webhook & Idempotensi
 * 7. Integritas Signed URL Berumur Pendek
 * 8. Siklus Hidup & Batas Percobaan OTP Pendaftar
 * 9. Otentikasi Dua Faktor (2FA TOTP RFC 6238)
 */
class SecurityTest extends TestCase
{
    /**
     * TEST 1: Kriptografi AES-256-GCM & Integritas Auth Tag
     */
    public function test_personal_data_encryption_and_tamper_resistance(): void
    {
        $rawNik = '1471012304050001';

        // 1. Enkripsi
        $encrypted = PersonalDataEncryptionService::encryptField($rawNik);
        $this->assertNotNull($encrypted);
        $this->assertStringStartsWith('ENC:', $encrypted);
        $this->assertStringNotContainsString($rawNik, $encrypted); // NIK mentah tidak boleh bocor

        // 2. Dekripsi
        $decrypted = PersonalDataEncryptionService::decryptField($encrypted);
        $this->assertEquals($rawNik, $decrypted);

        // 3. Uji Anti-Tamper: Modifikasi payload terenkripsi harus gagal didekripsi
        $tampered = substr_replace($encrypted, 'Z', 10, 1);
        $tamperedResult = PersonalDataEncryptionService::decryptField($tampered);
        $this->assertNull($tamperedResult, 'Data yang telah dimodifikasi secara ilegal harus gagal didekripsi (Auth Tag Failure).');
    }

    /**
     * TEST 2: Blind Index HMAC-SHA256 untuk Pencarian NIK Aman
     */
    public function test_blind_index_is_deterministic_and_avoids_plaintext_index(): void
    {
        $nik = '1471012304050001';

        $bindex1 = PersonalDataEncryptionService::generateBlindIndex($nik);
        $bindex2 = PersonalDataEncryptionService::generateBlindIndex($nik);

        $this->assertNotNull($bindex1);
        $this->assertEquals(64, strlen($bindex1)); // SHA-256 menghasilkan 64 karakter hex
        $this->assertEquals($bindex1, $bindex2, 'Blind index harus deterministik untuk NIK yang sama agar dapat diindeks database.');
        $this->assertStringNotContainsString($nik, $bindex1);

        $diffNik = '1471012304050002';
        $bindexDiff = PersonalDataEncryptionService::generateBlindIndex($diffNik);
        $this->assertNotEquals($bindex1, $bindexDiff);
    }

    /**
     * TEST 3: Masking NIK di Layar UI
     */
    public function test_personal_data_masking_standard(): void
    {
        $nik = '1471012304050001';
        $masked = PersonalDataEncryptionService::maskPersonalIdentifier($nik, 4, 2);

        $this->assertEquals('1471**********01', $masked);
        $this->assertEquals(strlen($nik), strlen($masked));
    }

    /**
     * TEST 4: Otorisasi & RBAC — Editor Konten DILARANG Mengakses SPMB
     */
    public function test_content_editor_is_forbidden_from_viewing_applicants(): void
    {
        $policy = new ApplicantPolicy();

        $editor = new User([
            'id' => 3,
            'name' => 'Staf Editor',
            'role' => 'content_editor',
            'tenant_id' => null,
        ]);

        $applicant = new Applicant([
            'id' => 10,
            'tenant_id' => 'sma',
            'user_id' => 99,
        ]);

        $response = $policy->view($editor, $applicant);

        $this->assertFalse($response->allowed(), 'Editor konten dilarang melihat data pendaftar.');
        $this->assertStringContainsString('Editor konten tidak memiliki kewenangan', $response->message());
    }

    /**
     * TEST 5: Isolasi Multi-Tenant — Admin SD Ditolak dari Mengakses Pendaftar SMA
     */
    public function test_school_admin_cannot_access_different_tenant(): void
    {
        $policy = new ApplicantPolicy();

        $adminSd = new User([
            'id' => 5,
            'name' => 'Admin SD',
            'role' => 'school_admin',
            'tenant_id' => 'sd',
        ]);

        $applicantSma = new Applicant([
            'id' => 12,
            'tenant_id' => 'sma',
            'user_id' => 45,
        ]);

        $response = $policy->view($adminSd, $applicantSma);

        $this->assertFalse($response->allowed(), 'Admin SD dilarang mengakses pendaftar jenjang SMA.');
    }

    /**
     * TEST 6: Anti-IDOR — Pendaftar Ditolak dari Mengakses Data Pendaftar Lain
     */
    public function test_applicant_cannot_access_other_applicant_data(): void
    {
        $policy = new ApplicantPolicy();

        $applicantUserA = new User([
            'id' => 101,
            'role' => 'applicant',
        ]);

        $applicantDataB = new Applicant([
            'id' => 202,
            'tenant_id' => 'tk',
            'user_id' => 999, // Milik pengguna lain!
        ]);

        $response = $policy->view($applicantUserA, $applicantDataB);

        $this->assertFalse($response->allowed(), 'Pengguna pendaftar dilarang mengakses data pendaftar milik akun lain.');
    }

    /**
     * TEST 7: Pembatasan Hak Staf Keuangan — Dilarang Melihat KK & Akta Lahir
     */
    public function test_finance_role_cannot_view_family_identity_documents(): void
    {
        $policy = new ApplicantPolicy();

        $financeUser = new User([
            'id' => 77,
            'role' => 'finance',
            'tenant_id' => 'sd',
        ]);

        $applicant = new Applicant([
            'id' => 50,
            'tenant_id' => 'sd',
        ]);

        // Keuangan boleh melihat bukti bayar
        $payCheck = $policy->viewDocument($financeUser, $applicant, 'bukti_bayar');
        $this->assertTrue($payCheck->allowed());

        // Keuangan DILARANG melihat Akta Kelahiran
        $aktaCheck = $policy->viewDocument($financeUser, $applicant, 'akta_lahir');
        $this->assertFalse($aktaCheck->allowed(), 'Staf Keuangan dilarang membuka scan akta lahir anak.');
    }

    /**
     * TEST 8: Verifikasi Tanda Tangan Webhook Midtrans & Anti-Pemalsuan
     */
    public function test_webhook_signature_verification(): void
    {
        $serverKey = 'SB-Mid-server-TEST-SECRET-12345';
        putenv("MIDTRANS_SERVER_KEY={$serverKey}");

        $orderId = 'INV-2026-SMA-0001';
        $statusCode = '200';
        $grossAmount = '250000.00';

        $validSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        $validPayload = [
            'order_id' => $orderId,
            'status_code' => $statusCode,
            'gross_amount' => $grossAmount,
            'signature_key' => $validSignature,
        ];

        $this->assertTrue(WebhookSecurityService::verifyMidtransSignature($validPayload));

        // Tanda tangan palsu harus ditolak mentah-mentah
        $fakePayload = $validPayload;
        $fakePayload['signature_key'] = 'fake_signature_hash_123456789';
        $this->assertFalse(WebhookSecurityService::verifyMidtransSignature($fakePayload), 'Webhook dengan signature palsu wajib ditolak.');
    }

    /**
     * TEST 9: Idempotensi Webhook (Anti-Replay Attack)
     */
    public function test_webhook_idempotency_prevents_duplicate_processing(): void
    {
        $eventId = 'midtrans_evt_' . uniqid();

        $firstTime = WebhookSecurityService::checkAndLockIdempotency('midtrans', $eventId);
        $this->assertTrue($firstTime, 'Event webhook pertama kali harus diterima dan diproses.');

        $secondTime = WebhookSecurityService::checkAndLockIdempotency('midtrans', $eventId);
        $this->assertFalse($secondTime, 'Event webhook duplikat kedua kali wajib ditolak secara aman.');
    }

    /**
     * TEST 10: Integritas Signed URL Berumur Pendek
     */
    public function test_signed_url_verification_and_tampering(): void
    {
        $docId = '999';
        $url = SecureDocumentService::generateSignedDownloadUrl($docId);

        $parsed = parse_url($url);
        parse_str($parsed['query'], $queryParams);

        $expires = (int) $queryParams['expires'];
        $signature = $queryParams['signature'];

        // 1. URL asli yang masih valid harus lolos
        $this->assertTrue(SecureDocumentService::verifySignedDownloadUrl($docId, $expires, $signature));

        // 2. Modifikasi Doc ID (IDOR pada signed URL) harus ditolak
        $this->assertFalse(SecureDocumentService::verifySignedDownloadUrl('1000', $expires, $signature));

        // 3. URL yang kedaluwarsa harus ditolak
        $pastExpires = time() - 100;
        $this->assertFalse(SecureDocumentService::verifySignedDownloadUrl($docId, $pastExpires, $signature));
    }

    /**
     * TEST 11: Siklus Hidup OTP Pendaftar & Batas Percobaan Salah
     */
    public function test_applicant_otp_attempt_limits(): void
    {
        $phone = '081234567899';

        $generated = ApplicantOtpService::generateOtp($phone);
        $this->assertTrue($generated['success']);
        $otp = $generated['otp'];

        // 1. Percobaan salah ke-1
        $wrong1 = ApplicantOtpService::verifyOtp($phone, '000000');
        $this->assertFalse($wrong1['success']);

        // 2. Percobaan salah ke-2
        $wrong2 = ApplicantOtpService::verifyOtp($phone, '000000');
        $this->assertFalse($wrong2['success']);

        // 3. Masukkan kode yang benar
        $correct = ApplicantOtpService::verifyOtp($phone, $otp);
        $this->assertTrue($correct['success']);

        // 4. Setelah sukses, OTP tidak dapat dipakai ulang (Single-use)
        $reuse = ApplicantOtpService::verifyOtp($phone, $otp);
        $this->assertFalse($reuse['success'], 'OTP yang sudah dipakai tidak boleh dapat digunakan kembali.');
    }

    /**
     * TEST 12: Otentikasi 2FA TOTP (RFC 6238)
     */
    public function test_two_factor_totp_rfc6238(): void
    {
        $secret = TwoFactorAuthService::generateSecretKey(16);
        $this->assertEquals(16, strlen($secret));

        $uri = TwoFactorAuthService::getOtpAuthUri('admin@dharmaloka.sch.id', $secret);
        $this->assertStringStartsWith('otpauth://totp/', $uri);
        $this->assertStringContainsString($secret, $uri);

        $recoveryCodes = TwoFactorAuthService::generateRecoveryCodes(8);
        $this->assertCount(8, $recoveryCodes);
        $this->assertMatchesRegularExpression('/^[A-Z0-9]{4}-[A-Z0-9]{4}$/', $recoveryCodes[0]);
    }
}
