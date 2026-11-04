<?php

namespace App\Casts;

use App\Services\PersonalDataEncryptionService;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

/**
 * Eloquent Cast untuk Enkripsi Otomatis Kolom Sensitif (AES-256-GCM)
 */
class EncryptedPersonalData implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($value === null) {
            return null;
        }

        return PersonalDataEncryptionService::decryptField((string) $value);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($value === null) {
            return null;
        }

        return PersonalDataEncryptionService::encryptField((string) $value);
    }
}

