<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = [
        'title',
        'competition',
        'organizer',
        'level',
        'year',
        'category',
        'student_name',
        'grade_and_level',
        'medal_or_rank',
        'description',
        'image',
        'is_featured',
        'is_demo',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_demo' => 'boolean',
        ];
    }
}

