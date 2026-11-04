"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { adminApi } from "@/lib/api";
import { useAuth } from "@/lib/authContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("superadmin@dharmaloka.sch.id");
  const [password, setPassword] = useState("DharmaLoka@2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }

    if (searchParams?.get("expired")) {
      setErrorMessage("Sesi login Anda telah berakhir atau belum terautentikasi. Silakan klik Masuk di bawah.");
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await adminApi.login({ email, password });
      if (res.status === 200 && res.data?.token) {
        login(res.data.token, res.data.user);
      } else {
        setErrorMessage(
          res.error || "Gagal masuk. Periksa kembali email dan password Anda."
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || "Terjadi gangguan koneksi ke server backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillAndLogin = async (demoEmail: string, demoPass: string = "DharmaLoka@2026!") => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await adminApi.login({ email: demoEmail, password: demoPass });
      if (res.status === 200 && res.data?.token) {
        login(res.data.token, res.data.user);
      } else {
        setErrorMessage(res.error || "Gagal masuk.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi gangguan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/80 via-white to-blue-50/40 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg px-4">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-royal flex items-center justify-center text-white shadow-lg shadow-royal/25 group-hover:bg-royal-dark transition-colors">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-primary-950 tracking-tight block leading-none">
                SEKOLAH DHARMA LOKA
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-royal block mt-1">
                Portal Admin & CMS Sekolah
              </span>
            </div>
          </Link>
          <h1 className="pt-2 text-2xl sm:text-3xl font-extrabold text-primary-950 tracking-tight">
            Masuk ke Dashboard Pengelola
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Kelola berita, pengumuman, data PPDB, dan informasi sekolah dalam satu tempat.
          </p>
        </div>

        {/* Bright White Login Card */}
        <div className="mt-8 bg-white border border-blue-100 py-9 px-6 sm:px-10 shadow-xl shadow-blue-900/5 rounded-3xl">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-primary-950 uppercase tracking-wider mb-2"
              >
                Alamat Email Staf / Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@dharmaloka.sch.id"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-base text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-primary-950 uppercase tracking-wider mb-2"
              >
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-base text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-royal transition"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-base shadow-lg shadow-royal/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard Admin</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Quick-Fill Section */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-royal" />
              <span className="text-xs sm:text-sm font-bold text-primary-950">
                Pilih Akun Demo (Klik 1x untuk Langsung Masuk):
              </span>
            </div>

            <div className="mb-2.5">
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("superadmin@dharmaloka.sch.id")}
                className="w-full py-2.5 px-3 rounded-xl bg-royal text-white hover:bg-royal-dark text-xs font-black text-center transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>🏛️ Super Admin Yayasan (Semua Jenjang)</span>
              </button>
            </div>

            <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Admin Khusus Unit Jenjang:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("admin.tk@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white border border-rose-200 text-xs font-bold text-rose-700 text-center transition cursor-pointer"
              >
                🧸 Admin TK
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("admin.sd@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white border border-sky-200 text-xs font-bold text-sky-700 text-center transition cursor-pointer"
              >
                🎒 Admin SD
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("admin.smp@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 text-xs font-bold text-teal-700 text-center transition cursor-pointer"
              >
                🔬 Admin SMP
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("admin.sma@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-200 text-xs font-bold text-indigo-700 text-center transition cursor-pointer"
              >
                🎓 Admin SMA
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("admin.smk@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white border border-orange-200 text-xs font-bold text-orange-700 text-center transition cursor-pointer"
              >
                ⚙️ Admin SMK
              </button>
              <button
                type="button"
                onClick={() => handleQuickFillAndLogin("editor@dharmaloka.sch.id")}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-700 hover:text-white border border-slate-200 text-xs font-bold text-slate-700 text-center transition cursor-pointer"
              >
                📝 Editor Konten
              </button>
            </div>

            <p className="mt-2.5 text-xs text-slate-500 text-center">
              Password didukung: <code className="font-mono font-semibold text-royal">DharmaLoka@2026!</code> atau <code className="font-mono font-semibold text-royal">password</code>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/?jenjang=portal"
              className="text-sm font-bold text-slate-600 hover:text-royal transition inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Halaman Pusat Yayasan</span>
            </Link>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
          <ShieldCheck className="w-4 h-4 text-royal" />
          <span>Dilindungi Autentikasi Laravel Sanctum & Role-Based Access Control</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-blue-50/40 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-royal" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
