<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Applicant;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

/**
 * Policy Otorisasi Pendaftar SPMB & Pencegahan IDOR
 * Mengimplementasikan Prinsip Hak Akses Minimum (Principle of Least Privilege)
 */
class ApplicantPolicy
{
    use HandlesAuthorization;

    /**
     * Hak akses melihat detail data pendaftar
     */
    public function view(User $user, Applicant $applicant): Response
    {
        // 1. Super Admin memiliki akses penuh antar jenjang
        if ($user->role === 'super_admin') {
            return Response::allow();
        }

        // 2. Editor Konten DILARANG KERAS mengakses data pendaftar
        if ($user->role === 'content_editor' || $user->role === 'editor') {
            return Response::deny('Editor konten tidak memiliki kewenangan mengakses data pendaftar.');
        }

        // 3. Admin Jenjang & Panitia SPMB hanya boleh melihat pendaftar di jenjangnya sendiri
        if (in_array($user->role, ['school_admin', 'spmb_officer'])) {
            if ($applicant->tenant_id === $user->tenant_id) {
                return Response::allow();
            }
            return Response::deny('Anda tidak memiliki wewenang untuk memeriksa data pendaftar jenjang lain.');
        }

        // 4. Staf Keuangan hanya boleh melihat data yang berkaitan dengan tagihan
        if ($user->role === 'finance') {
            if (empty($user->tenant_id) || $applicant->tenant_id === $user->tenant_id) {
                return Response::allow();
            }
            return Response::deny('Akses tagihan dibatasi sesuai jenjang.');
        }

        // 5. Anti-IDOR Pendaftar: Pendaftar hanya boleh mengakses datanya sendiri
        if ($user->role === 'applicant') {
            if ($applicant->user_id === $user->id) {
                return Response::allow();
            }
            return Response::deny('Anda dilarang mengakses data pendaftar lain.');
        }

        return Response::deny('Akses tidak diizinkan.');
    }

    /**
     * Hak akses mengunduh atau memeriksa berkas dokumen spesifik
     * Khusus: Staf keuangan tidak diizinkan membuka Akta Lahir & Kartu Keluarga
     */
    public function viewDocument(User $user, Applicant $applicant, string $docType): Response
    {
        // Verifikasi izin dasar pendaftar terlebih dahulu
        $baseCheck = $this->view($user, $applicant);
        if (!$baseCheck->allowed()) {
            return $baseCheck;
        }

        // Staf Keuangan HANYA boleh melihat bukti bayar/slip transfer, dilarang melihat berkas identitas keluarga
        if ($user->role === 'finance') {
            if (in_array($docType, ['bukti_bayar', 'slip_transfer', 'invoice'])) {
                return Response::allow();
            }
            return Response::deny('Staf Keuangan tidak memiliki kewenangan melihat dokumen kependudukan anak/orang tua.');
        }

        return Response::allow();
    }

    /**
     * Hak akses mengubah / memverifikasi status
     */
    public function verify(User $user, Applicant $applicant): Response
    {
        if ($user->role === 'super_admin') {
            return Response::allow();
        }

        if (in_array($user->role, ['school_admin', 'spmb_officer']) && $applicant->tenant_id === $user->tenant_id) {
            return Response::allow();
        }

        return Response::deny('Hanya Panitia SPMB atau Admin Jenjang terkait yang dapat memverifikasi berkas.');
    }
}
