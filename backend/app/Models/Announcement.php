<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'category',
        'priority',
        'start_date',
        'end_date',
        'status',
        'is_homepage',
        'attachment',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_homepage' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Automatically filter active, non-expired announcements
    public function scopeActive($query)
    {
        $today = now()->toDateString();
        return $query->where('status', 'active')
                     ->where(function ($q) use ($today) {
                         $q->whereNull('start_date')
                           ->orWhere('start_date', '<=', $today);
                     })
                     ->where(function ($q) use ($today) {
                         $q->whereNull('end_date')
                           ->orWhere('end_date', '>=', $today);
                     });
    }

    public function getIsExpiredAttribute(): bool
    {
        return $this->end_date && $this->end_date->isPast();
    }
}

