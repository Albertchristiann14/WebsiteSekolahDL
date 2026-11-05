"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, TenantCode } from "@/lib/adminData";
import {
  Users,
  FileCheck2,
  CreditCard,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  FileText,
  Calendar,
  Building2,
  Download,
  Share2,
  Sparkles,
  Palette,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [auditLogs, setAuditLogs] = useState(AdminStore.getAuditLogs().slice(0, 6));

  const refreshData = () => {
    const tenantFilter = AdminStore.getActiveTenantFilter();
    setActiveTenant(tenantFilter);
    const all = AdminStore.getApplicants();
    const filtered =
      tenantFilter === "portal"
        ? all
        : all.filter((a) => a.tenantId === tenantFilter);
    setApplicants(filtered);
    setAuditLogs(AdminStore.getAuditLogs().slice(0, 6));
  };

  useEffect(() => {
    refreshData();
    const handleTenantChange = () => refreshData();
    window.addEventListener("admin_tenant_changed", handleTenantChange);
    return () => {
      window.removeEventListener("admin_tenant_changed", handleTenantChange);
    };
  }, []);

  // Compute metrics
  const totalApplicants = applicants.length;
  const pendingDocs = applicants.filter((a) => a.documentStatus === "pending").length;
  const needRevisionDocs = applicants.filter((a) => a.documentStatus === "revision_needed").length;
  const pendingPayments = applicants.filter((a) => a.paymentStatus === "pending_approval").length;
  const paidApplicants = applicants.filter((a) => a.paymentStatus === "paid").length;
  const acceptedApplicants = applicants.filter((a) => a.selectionStatus === "passed").length;
  const totalCapacity = activeTenant === "portal" ? 380 : 80;
  const quotaFilledPercentage = Math.min(100, Math.round((totalApplicants / totalCapacity) * 100));

  // Compute distributions for charts
  const trackDist = applicants.reduce((acc, a) => {
    acc[a.trackName] = (acc[a.trackName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const levelDist: Record<string, number> = {
    TK: 0,
    SD: 0,
    SMP: 0,
    SMA: 0,
    SMK: 0,
  };
  const allApplicants = AdminStore.getApplicants();
  allApplicants.forEach((a) => {
    const key = a.tenantId.toUpperCase();
    if (levelDist[key] !== undefined) {
      levelDist[key]++;
    }
  });

  return (
    <AdminLayout
      title="Dashboard Ringkasan SPMB & Konten"
      subtitle={`Memantau seluruh aktivitas institusi untuk ${
        activeTenant === "portal" ? "Semua Unit Jenjang (Yayasan)" : activeTenant.toUpperCase() + " Dharma Loka"
      }`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/appearance"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-bold hover:bg-indigo-100 transition cursor-pointer"
          >
            <Palette className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Desain Web Jenjang</span>
          </Link>
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-sm shadow-royal/20 hover:bg-royal-dark transition cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Kelola Calon Siswa</span>
          </Link>
          <Link
            href="/admin/news/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-royal" />
            <span className="hidden sm:inline">Tulis Berita Baru</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* ===================================================================
            1. KARTU METRIK RINGKASAN UTAMA (5.1)
        =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {/* Card 1: Total Pendaftar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Pendaftar
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-royal flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalApplicants}
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2 pendaftar hari ini</span>
              </p>
            </div>
          </div>

          {/* Card 2: Menunggu Verifikasi Berkas */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Verifikasi Berkas
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {pendingDocs}
              </p>
              <p className="text-[11px] font-semibold text-amber-700 mt-1">
                {needRevisionDocs > 0 ? `${needRevisionDocs} berkas butuh revisi` : "Semua berkas dicek"}
              </p>
            </div>
          </div>

          {/* Card 3: Konfirmasi Pembayaran */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Menunggu Bayar
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {pendingPayments}
              </p>
              <p className="text-[11px] font-semibold text-slate-500 mt-1">
                {paidApplicants} pendaftar lunas
              </p>
            </div>
          </div>

          {/* Card 4: Siswa Diterima / Lulus Seleksi */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Lulus Seleksi
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {acceptedApplicants}
              </p>
              <p className="text-[11px] font-semibold text-purple-700 mt-1">
                Siap daftar ulang
              </p>
            </div>
          </div>

          {/* Card 5: Kuota Terisi */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Kuota Terisi
              </span>
              <span className="text-xs font-extrabold text-royal">
                {quotaFilledPercentage}%
              </span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalApplicants} / {totalCapacity}
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-royal h-2 rounded-full transition-all duration-500"
                  style={{ width: `${quotaFilledPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. ACTIONABLE TASK LIST (DAFTAR TUGAS TINDAKAN CEPAT)
        =================================================================== */}
        {(pendingDocs > 0 || pendingPayments > 0) && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/50 to-white border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Perhatian: Terdapat {pendingDocs + pendingPayments} Tindakan Menunggu Respon Panitia
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {pendingDocs > 0 && `${pendingDocs} berkas calon siswa perlu diperiksa. `}
                  {pendingPayments > 0 && `${pendingPayments} bukti pembayaran transfer butuh konfirmasi.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {pendingDocs > 0 && (
                <Link
                  href="/admin/admissions/verification"
                  className="px-3.5 py-2 rounded-xl bg-royal text-white text-xs font-bold shadow-xs hover:bg-royal-dark transition"
                >
                  Periksa Berkas Sekarang →
                </Link>
              )}
              {pendingPayments > 0 && (
                <Link
                  href="/admin/admissions/payments"
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cek Pembayaran →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            3. GRAFIK REKAPITULASI & DISTRIBUSI (SVG VISUAL CHARTS)
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Grafik 1: Tren Pendaftaran 7 Hari Terakhir (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Tren Pendaftaran Calon Siswa (7 Hari Terakhir)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Volume registrasi daring akun baru di Sekolah Dharma Loka
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-royal border border-blue-200">
                Gelombang 1 Aktif
              </span>
            </div>

            {/* Interactive Bar Chart SVG */}
            <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
              {[
                { day: "Kamis, 29 Okt", count: 2, height: "35%" },
                { day: "Jumat, 30 Okt", count: 4, height: "55%" },
                { day: "Sabtu, 31 Okt", count: 5, height: "70%" },
                { day: "Minggu, 1 Nov", count: 3, height: "45%" },
                { day: "Senin, 2 Nov", count: 7, height: "85%" },
                { day: "Selasa, 3 Nov", count: 6, height: "75%" },
                { day: "Rabu, 4 Nov", count: 8, height: "100%" },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </span>
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden h-44 flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        idx === 6
                          ? "bg-royal"
                          : "bg-blue-400/80 group-hover:bg-royal"
                      }`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center truncate max-w-[54px]">
                    {bar.day.split(",")[0]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Total pekan ini: <strong>35 calon siswa baru</strong></span>
              <span className="text-emerald-600 font-bold">↑ 28% lebih tinggi dari periode lalu</span>
            </div>
          </div>

          {/* Grafik 2: Distribusi per Jenjang & Jalur (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Distribusi Pendaftar per Unit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sebaran siswa baru di setiap jenjang
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {[
                { label: "SMA Dharma Loka", code: "SMA", count: levelDist.SMA, color: "bg-indigo-600", percent: "33%" },
                { label: "SMP Dharma Loka", code: "SMP", count: levelDist.SMP, color: "bg-teal-600", percent: "20%" },
                { label: "SD Dharma Loka", code: "SD", count: levelDist.SD, color: "bg-sky-600", percent: "20%" },
                { label: "TK Dharma Loka", code: "TK", count: levelDist.TK, color: "bg-rose-500", percent: "15%" },
                { label: "SMK Dharma Loka", code: "SMK", count: levelDist.SMK, color: "bg-amber-600", percent: "12%" },
              ].map((unit) => (
                <div key={unit.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{unit.label}</span>
                    <span className="font-extrabold text-slate-900">{unit.count} Siswa ({unit.percent})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`${unit.color} h-2 rounded-full`} style={{ width: unit.percent }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin/admissions"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-royal hover:underline"
              >
                <span>Lihat rincian data per jenjang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================
            4. RECENT ACTIVITIES AUDIT FEED & QUICK SHORTCUTS
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom Kiri: Pendaftar Terbaru (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Calon Siswa Baru Terdaftar
                </h3>
                <p className="text-xs text-slate-500">
                  Daftar akun registrasi daring terkini
                </p>
              </div>
              <Link
                href="/admin/admissions"
                className="text-xs font-bold text-royal hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {applicants.slice(0, 5).map((app) => (
                <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-slate-900">
                        {app.registrationNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                        {app.tenantId.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 truncate">
                      {app.fullName}
                    </p>
                    <p className="text-xs text-slate-500">
                      Asal: {app.previousSchool} • {app.trackName}
                    </p>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        app.selectionStatus === "passed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : app.documentStatus === "revision_needed"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-blue-50 text-royal border-blue-200"
                      }`}
                    >
                      {app.selectionStatus === "passed"
                        ? "Lulus Seleksi"
                        : app.documentStatus === "revision_needed"
                        ? "Revisi Berkas"
                        : "Terverifikasi"}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {app.appliedAt.split(" ")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Log Aktivitas Sistem (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Jejak Aktivitas (Audit Log)
                </h3>
                <p className="text-xs text-slate-500">
                  Pencatatan real-time aksi staf & perubahan status
                </p>
              </div>
              <Link
                href="/admin/logs"
                className="text-xs font-bold text-royal hover:underline inline-flex items-center gap-1"
              >
                <span>Semua Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5 pt-1">
              {auditLogs.map((log, idx) => (
                <div key={`${log.id || 'log'}-${idx}`} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-extrabold text-slate-800">{log.userName}</span>
                    <span>{log.timestamp.split(" ")[1]}</span>
                  </div>
                  <p className="text-slate-700 line-clamp-2">
                    {log.description}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-400">
                    <span className="uppercase font-bold text-royal">{log.module}</span>
                    <span>•</span>
                    <span>IP: {log.ipAddress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
