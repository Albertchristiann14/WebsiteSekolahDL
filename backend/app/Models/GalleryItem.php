<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    protected $fillable = [
        'gallery_id',
        'title',
        'category',
        'image',
        'caption',
        'date',
        'aspect_ratio',
        'is_published',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }
}

