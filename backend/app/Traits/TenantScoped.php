<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

/**
 * Global Scope untuk Isolasi Multi-Tenant Otomatis
 * Memastikan pengembang tidak mungkin lupa menambahkan `WHERE tenant_id = ...`
 * pada setiap query basis data.
 */
class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $user = Auth::user();

        // 1. Jika pengguna memiliki tenant_id spesifik (Unit Admin TK/SD/SMP/SMA/SMK),
        // paksa filter HANYA data jenjang tersebut. Tidak ada pengecualian!
        if ($user && !empty($user->tenant_id)) {
            $builder->where($model->getTable() . '.tenant_id', $user->tenant_id);
            return;
        }

        // 2. Jika Super Admin, izinkan melihat semua data atau filter dari header x-tenant-id
        if ($user && $user->role === 'super_admin') {
            $headerTenant = request()->header('x-tenant-id') ?? request()->query('tenant_id');
            if ($headerTenant && $headerTenant !== 'portal' && $headerTenant !== 'all') {
                $builder->where($model->getTable() . '.tenant_id', $headerTenant);
            }
            return;
        }

        // 3. Jika request publik dengan konteks jenjang (subdomain atau query param)
        $publicTenant = request()->header('x-tenant-id') ?? request()->query('jenjang');
        if ($publicTenant && in_array($publicTenant, ['tk', 'sd', 'smp', 'sma', 'smk'])) {
            $builder->where($model->getTable() . '.tenant_id', $publicTenant);
        }
    }
}

/**
 * Trait untuk dipasang pada Model yang memiliki kolom `tenant_id`
 */
trait TenantScoped
{
    public static function bootTenantScoped(): void
    {
        static::addGlobalScope(new TenantScope());

        // Otomatis isi tenant_id saat menyimpan record baru jika belum diisi
        static::creating(function (Model $model) {
            if (empty($model->tenant_id) && Auth::check()) {
                $user = Auth::user();
                if (!empty($user->tenant_id)) {
                    $model->tenant_id = $user->tenant_id;
                }
            }
        });
    }

    /**
     * Helper scope untuk mengabaikan isolasi tenant secara eksplisit
     * HANYA boleh dipanggil oleh Super Admin atau modul background job terjadwal.
     */
    public function scopeWithoutTenantScope(Builder $query): Builder
    {
        return $query->withoutGlobalScope(TenantScope::class);
    }
}

