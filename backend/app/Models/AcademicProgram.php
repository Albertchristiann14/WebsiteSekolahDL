<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicProgram extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'short_name',
        'level_badge',
        'age_range',
        'headline',
        'overview',
        'hero_image',
        'features',
        'curriculum_highlights',
        'facilities',
        'graduate_outcomes',
        'extracurriculars',
        'schedule',
        'is_published',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'curriculum_highlights' => 'array',
            'facilities' => 'array',
            'graduate_outcomes' => 'array',
            'extracurriculars' => 'array',
            'is_published' => 'boolean',
            'order' => 'integer',
        ];
    }
}

