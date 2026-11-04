<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolSetting;
use App\Models\ActivityLog;

class AdminSchoolSettingController extends Controller
{
    public function index()
    {
        $settings = SchoolSetting::all()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($validated['settings'] as $key => $val) {
            SchoolSetting::setVal($key, $val, 'identity', true);
        }

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'school_settings_updated',
            'subject_type' => SchoolSetting::class,
            'subject_id' => null,
            'details' => ['keys' => array_keys($validated['settings'])],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan profil sekolah berhasil disimpan.',
        ]);
    }
}

