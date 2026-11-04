<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmissionInquiry extends Model
{
    protected $fillable = [
        'parent_name',
        'phone',
        'email',
        'student_level',
        'message',
        'status',
        'admin_notes',
    ];
}

