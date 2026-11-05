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
            1. KARTU METRIK RINGKASAN UTAMA
        =================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Card 1: Total Pendaftar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2">
            <span className="text-xs font-medium text-slate-500">
              Total pendaftar
            </span>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-mono tabular-nums">
                {totalApplicants}
              </p>
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+2 hari ini</span>
              </p>
            </div>
          </div>

          {/* Card 2: Menunggu Verifikasi Berkas */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2">
            <span className="text-xs font-medium text-slate-500">
              Verifikasi berkas
            </span>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-mono tabular-nums">
                {pendingDocs}
              </p>
              <p className="text-[11px] font-medium text-amber-700 mt-0.5">
                {needRevisionDocs > 0 ? `${needRevisionDocs} butuh revisi` : "Semua diperiksa"}
              </p>
            </div>
          </div>

          {/* Card 3: Konfirmasi Pembayaran */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2">
            <span className="text-xs font-medium text-slate-500">
              Menunggu bayar
            </span>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-mono tabular-nums">
                {pendingPayments}
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                {paidApplicants} pendaftar lunas
              </p>
            </div>
          </div>

          {/* Card 4: Siswa Diterima / Lulus Seleksi */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2">
            <span className="text-xs font-medium text-slate-500">
              Lulus seleksi
            </span>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-mono tabular-nums">
                {acceptedApplicants}
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Siap daftar ulang
              </p>
            </div>
          </div>

          {/* Card 5: Kuota Terisi */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Kuota terisi
              </span>
              <span className="text-xs font-mono font-medium text-slate-700">
                {quotaFilledPercentage}%
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight font-mono tabular-nums">
                {totalApplicants} <span className="text-sm font-normal text-slate-400">/ {totalCapacity}</span>
              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-slate-900 h-1.5 rounded-full transition-all duration-300"
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
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">
                  {pendingDocs + pendingPayments} tindakan menunggu respon panitia
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {pendingDocs > 0 && `${pendingDocs} berkas calon siswa perlu diperiksa. `}
                  {pendingPayments > 0 && `${pendingPayments} bukti pembayaran transfer butuh konfirmasi.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {pendingDocs > 0 && (
                <Link
                  href="/admin/admissions/verification"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                >
                  Periksa berkas
                </Link>
              )}
              {pendingPayments > 0 && (
                <Link
                  href="/admin/admissions/payments"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
                >
                  Cek pembayaran
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            3. GRAFIK REKAPITULASI & DISTRIBUSI (SVG VISUAL CHARTS)
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Grafik 1: Tren Pendaftaran 7 Hari Terakhir (8 Cols) */}
          <div className="lg:col-span-8 p-5 rounded-xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Tren pendaftaran calon siswa (7 hari terakhir)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registrasi daring di seluruh unit sekolah
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-600 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                Gelombang 1
              </span>
            </div>

            {/* Bar Chart SVG */}
            <div className="h-48 w-full flex items-end justify-between gap-3 pt-4 pb-2 px-2 border-b border-slate-100">
              {[
                { day: "Kamis", count: 2, height: "25%" },
                { day: "Jumat", count: 4, height: "50%" },
                { day: "Sabtu", count: 5, height: "62%" },
                { day: "Minggu", count: 3, height: "37%" },
                { day: "Senin", count: 7, height: "87%" },
                { day: "Selasa", count: 6, height: "75%" },
                { day: "Rabu", count: 8, height: "100%" },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[11px] font-mono tabular-nums text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </span>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t h-36 flex items-end">
                    <div
                      className={`w-full rounded-t transition-colors ${
                        idx === 6
                          ? "bg-slate-900"
                          : "bg-slate-300 group-hover:bg-slate-400"
                      }`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 text-center truncate">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Total pekan ini: <strong className="font-mono tabular-nums text-slate-800">35 calon siswa</strong></span>
              <span className="text-emerald-600 font-medium">+28% vs pekan lalu</span>
            </div>
          </div>

          {/* Grafik 2: Distribusi per Jenjang & Jalur (4 Cols) */}
          <div className="lg:col-span-4 p-5 rounded-xl bg-white border border-slate-200 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Distribusi pendaftar per unit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sebaran calon siswa di setiap jenjang
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { label: "SMA Dharma Loka", code: "SMA", count: levelDist.SMA, percent: "33%" },
                { label: "SMP Dharma Loka", code: "SMP", count: levelDist.SMP, percent: "20%" },
                { label: "SD Dharma Loka", code: "SD", count: levelDist.SD, percent: "20%" },
                { label: "TK Dharma Loka", code: "TK", count: levelDist.TK, percent: "15%" },
                { label: "SMK Dharma Loka", code: "SMK", count: levelDist.SMK, percent: "12%" },
              ].map((unit, idx) => (
                <div key={unit.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{unit.label}</span>
                    <span className="font-mono tabular-nums text-slate-500">{unit.count} siswa ({unit.percent})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${idx === 0 ? "bg-slate-900" : "bg-slate-300"}`}
                      style={{ width: unit.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin/admissions"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900"
              >
                <span>Lihat rincian pendaftar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================
            4. RECENT ACTIVITIES AUDIT FEED & QUICK SHORTCUTS
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Kolom Kiri: Pendaftar Terbaru (7 Cols) */}
          <div className="lg:col-span-7 p-5 rounded-xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Pendaftar terbaru
                </h3>
                <p className="text-xs text-slate-500">
                  Calon siswa yang baru mendaftar secara daring
                </p>
              </div>
              <Link
                href="/admin/admissions"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {applicants.slice(0, 5).map((app) => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-slate-900">
                        {app.registrationNumber}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {app.tenantId.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {app.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {app.previousSchool} • {app.trackName}
                    </p>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                        app.selectionStatus === "passed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : app.documentStatus === "revision_needed"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {app.selectionStatus === "passed"
                        ? "Lulus seleksi"
                        : app.documentStatus === "revision_needed"
                        ? "Revisi berkas"
                        : "Terverifikasi"}
                    </span>
                    <p className="text-[10px] font-mono text-slate-400">
                      {app.appliedAt.split(" ")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Log Aktivitas Sistem (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Jejak aktivitas staf
                </h3>
                <p className="text-xs text-slate-500">
                  Pencatatan real-time perubahan data dan status
                </p>
              </div>
              <Link
                href="/admin/logs"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <span>Semua log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2 pt-1">
              {auditLogs.map((log, idx) => (
                <div key={`${log.id || 'log'}-${idx}`} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-800">{log.userName}</span>
                    <span className="font-mono">{log.timestamp.split(" ")[1]}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-2 text-xs">
                    {log.description}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-400">
                    <span className="font-mono text-slate-500">{log.module}</span>
                    <span>•</span>
                    <span className="font-mono">IP: {log.ipAddress}</span>
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
