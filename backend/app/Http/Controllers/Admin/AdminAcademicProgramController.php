<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\AcademicProgram;
use App\Models\ActivityLog;

class AdminAcademicProgramController extends Controller
{
    public function index()
    {
        $programs = AcademicProgram::orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data' => $programs,
        ]);
    }

    public function show($id)
    {
        $program = AcademicProgram::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $program,
        ]);
    }

    public function update(Request $request, $id)
    {
        $program = AcademicProgram::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'short_name' => 'required|string|max:80',
            'level_badge' => 'nullable|string|max:100',
            'age_range' => 'nullable|string|max:100',
            'headline' => 'required|string|max:255',
            'overview' => 'required|string',
            'hero_image' => 'nullable|string',
            'features' => 'nullable|array',
            'curriculum_highlights' => 'nullable|array',
            'facilities' => 'nullable|array',
            'graduate_outcomes' => 'nullable|array',
            'extracurriculars' => 'nullable|array',
            'schedule' => 'nullable|string|max:100',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        $program->update($validated);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'program_updated',
            'subject_type' => AcademicProgram::class,
            'subject_id' => $program->id,
            'details' => ['name' => $program->name],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Program {$program->name} berhasil diperbarui.",
            'data' => $program,
        ]);
    }
}

