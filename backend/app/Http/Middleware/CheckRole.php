<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user || !$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Akun tidak aktif atau belum terautentikasi.',
            ], 403);
        }

        if (in_array($user->role, $roles) || $user->isSuperAdmin()) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Anda tidak memiliki hak akses untuk tindakan ini.',
            'required_roles' => $roles,
            'current_role' => $user->role,
        ], 403);
    }
}

