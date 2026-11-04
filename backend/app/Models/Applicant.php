<?php

namespace App\Models;

use App\Casts\EncryptedPersonalData;
use App\Services\PersonalDataEncryptionService;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model Pendaftar SPMB Terproteksi UU PDP & Multi-Tenant Scoped
 */
class Applicant extends Model
{
    use HasFactory, TenantScoped;

    protected $fillable = [
        'tenant_id',
        'wave_id',
        'track_id',
        'user_id',
        'registration_number',
        'nik',
        'nisn',
        'nik_blind_index',
        'full_name',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'address',
        'previous_school',
        'school_origin_city',
        'father_name',
        'father_job',
        'mother_name',
        'mother_job',
        'parent_whatsapp',
        'parent_email',
        'parent_monthly_income',
        'document_status',
        'payment_status',
        'selection_status',
        'final_status',
        'test_schedule_datetime',
        'test_room',
        'test_score_academic',
        'test_score_interview',
        'test_score_final',
        'selection_notes',
        'verification_notes',
        'verified_by',
        'verified_at',
    ];

    /**
     * Enkripsi Otomatis Kolom Sensitif (AES-256-GCM)
     */
    protected function casts(): array
    {
        return [
            'nik' => EncryptedPersonalData::class,
            'nisn' => EncryptedPersonalData::class,
            'parent_monthly_income' => EncryptedPersonalData::class,
            'birth_date' => 'date',
            'verified_at' => 'datetime',
            'test_schedule_datetime' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        // Otomatis hasilkan blind index HMAC-SHA256 untuk kolom NIK
        static::saving(function (Applicant $applicant) {
            if (!empty($applicant->nik)) {
                $applicant->nik_blind_index = PersonalDataEncryptionService::generateBlindIndex($applicant->nik);
            }
        });
    }

    /**
     * Relasi ke Dokumen Berkas
     */
    public function documents()
    {
        return $this->hasMany(ApplicantDocument::class);
    }
}
