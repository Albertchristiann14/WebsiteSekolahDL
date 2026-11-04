<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admission extends Model
{
    protected $fillable = ['section_key', 'data'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}

