"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import {
  Users,
  Newspaper,
  Bell,
  Mail,
  ArrowUpRight,
  PlusCircle,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getDashboardStats();
      if (res.status === 200 && res.data) {
        setStats(res.data);
      } else {
        setError(res.error || "Gagal memuat ringkasan dashboard.");
      }
    } catch (err: any) {
      setError(err.message || "Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const m = stats?.metrics;
  const counts = {
    news: {
      total: m?.news_total ?? stats?.counts?.news?.total ?? 0,
      published: m?.news_published ?? stats?.counts?.news?.published ?? 0,
      drafts: m?.news_draft ?? stats?.counts?.news?.drafts ?? 0,
    },
    announcements: {
      total:
        m?.announcements_total ??
        m?.announcements_active ??
        stats?.counts?.announcements?.total ??
        0,
      active:
        m?.announcements_active ?? stats?.counts?.announcements?.active ?? 0,
    },
    admissions: {
      total: m?.inquiries_total ?? stats?.counts?.admissions?.total ?? 0,
      new: m?.inquiries_new ?? stats?.counts?.admissions?.new ?? 0,
    },
    messages: {
      total: m?.messages_total ?? stats?.counts?.messages?.total ?? 0,
      unread: m?.messages_unread ?? stats?.counts?.messages?.unread ?? 0,
    },
    achievements: m?.achievements_count ?? stats?.counts?.achievements ?? 0,
    galleries: m?.galleries_count ?? stats?.counts?.galleries ?? 0,
    users: m?.users_count ?? stats?.counts?.users ?? 0,
  };

  const recentInquiries =
    stats?.latest_inquiries || stats?.recent_inquiries || [];
  const recentNews = stats?.latest_news || stats?.recent_news || [];
  const recentLogs = stats?.recent_logs || [];

  return (
    <AdminLayout title="Dashboard Pengelola">
      <div className="space-y-8">
        {/* Bright Royal Blue & White Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-royal to-blue-700 text-white rounded-3xl p-7 sm:p-9 shadow-lg shadow-royal/15">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-blue-50">
              Panel Kendali Sekolah Dharma Loka
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang di Portal Admin CMS
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
              Pantau pendaftaran calon siswa baru (PPDB), publikasikan berita kegiatan sekolah, dan kelola informasi secara langsung.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="p-3 rounded-xl bg-white/15 hover:bg-white/25 text-white transition border border-white/20 disabled:opacity-50 cursor-pointer"
              title="Segarkan Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-royal font-extrabold text-sm shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tulis Berita Baru</span>
            </Link>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
            <button
              onClick={fetchStats}
              className="text-xs font-bold underline hover:text-red-900"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: PPDB Inquiries */}
          <Link
            href="/admin/admissions"
            className="group p-6 rounded-3xl bg-white border border-blue-100 hover:border-royal/40 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center border border-blue-100">
                <Users className="w-6 h-6" />
              </div>
              {counts.admissions.new > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {counts.admissions.new} Baru
                </span>
              )}
            </div>
            <div className="mt-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Pendaftar PPDB
              </p>
              <p className="text-3xl font-extrabold text-primary-950 mt-1">
                {counts.admissions.total}
              </p>
              <p className="text-xs sm:text-sm font-bold text-royal mt-2 flex items-center gap-1">
                <span>Kelola Calon Siswa</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </p>
            </div>
          </Link>

          {/* Card 2: News & Articles */}
          <Link
            href="/admin/news"
            className="group p-6 rounded-3xl bg-white border border-blue-100 hover:border-royal/40 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center border border-blue-100">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-royal">
                {counts.news.published} Terbit
              </span>
            </div>
            <div className="mt-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Artikel & Berita
              </p>
              <p className="text-3xl font-extrabold text-primary-950 mt-1">
                {counts.news.total}
              </p>
              <p className="text-xs sm:text-sm font-bold text-royal mt-2 flex items-center gap-1">
                <span>{counts.news.drafts} Draft tersimpan</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </p>
            </div>
          </Link>

          {/* Card 3: Unread Messages */}
          <Link
            href="/admin/messages"
            className="group p-6 rounded-3xl bg-white border border-blue-100 hover:border-royal/40 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center border border-blue-100">
                <Mail className="w-6 h-6" />
              </div>
              {counts.messages.unread > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {counts.messages.unread} Belum Dibaca
                </span>
              )}
            </div>
            <div className="mt-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Pesan Kontak
              </p>
              <p className="text-3xl font-extrabold text-primary-950 mt-1">
                {counts.messages.total}
              </p>
              <p className="text-xs sm:text-sm font-bold text-royal mt-2 flex items-center gap-1">
                <span>Buka Kotak Masuk</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </p>
            </div>
          </Link>

          {/* Card 4: Announcements */}
          <Link
            href="/admin/announcements"
            className="group p-6 rounded-3xl bg-white border border-blue-100 hover:border-royal/40 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center border border-blue-100">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {counts.announcements.active} Aktif
              </span>
            </div>
            <div className="mt-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Pengumuman Sekolah
              </p>
              <p className="text-3xl font-extrabold text-primary-950 mt-1">
                {counts.announcements.total}
              </p>
              <p className="text-xs sm:text-sm font-bold text-royal mt-2 flex items-center gap-1">
                <span>Kelola Siaran</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </p>
            </div>
          </Link>
        </div>

        {/* Two Column Layout: Recent PPDB & Recent News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Recent PPDB Inquiries */}
          <div className="bg-white border border-blue-100 rounded-3xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-royal flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-primary-950">
                  Calon Siswa Terbaru (PPDB)
                </h3>
              </div>
              <Link
                href="/admin/admissions"
                className="text-xs sm:text-sm font-bold text-royal hover:text-royal-dark inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Memuat data pendaftar...
              </div>
            ) : !recentInquiries || recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Belum ada pengajuan pendaftaran baru.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inquiry: any) => {
                  const displayName =
                    inquiry.student_name || inquiry.parent_name || "Calon Siswa";
                  const displayLevel =
                    inquiry.student_level || inquiry.target_level || "Umum";
                  return (
                    <div
                      key={inquiry.id}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-bold text-primary-950 truncate">
                          {displayName}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                          <span className="uppercase px-2 py-0.5 rounded-md bg-blue-50 text-royal font-extrabold text-[11px] border border-blue-100">
                            {displayLevel}
                          </span>
                          <span>Wali: {inquiry.parent_name}</span>
                          <span>•</span>
                          <span className="font-medium text-slate-700">
                            {inquiry.phone}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                            inquiry.status === "new"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : inquiry.status === "contacted"
                              ? "bg-blue-50 text-royal border-blue-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {inquiry.status === "new"
                            ? "Baru"
                            : inquiry.status === "contacted"
                            ? "Dihubungi"
                            : inquiry.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Recent News */}
          <div className="bg-white border border-blue-100 rounded-3xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-royal flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-primary-950">
                  Artikel & Berita Terbaru
                </h3>
              </div>
              <Link
                href="/admin/news"
                className="text-xs sm:text-sm font-bold text-royal hover:text-royal-dark inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Memuat artikel berita...
              </div>
            ) : !recentNews || recentNews.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Belum ada artikel yang dibuat.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentNews.map((item: any) => (
                  <div
                    key={item.id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-primary-950 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="font-bold text-royal">
                          {item.category?.name || "Umum"}
                        </span>
                        <span>•</span>
                        <span>Oleh {item.author?.name || "Admin"}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {item.status === "published" ? "Terbit" : "Draft"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Activity Audit Trail */}
        <div className="bg-white border border-blue-100 rounded-3xl p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-royal flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-primary-950">
                Log Aktivitas Sistem
              </h3>
            </div>
            <Link
              href="/admin/logs"
              className="text-xs sm:text-sm font-bold text-royal hover:text-royal-dark"
            >
              Lihat Riwayat Lengkap →
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Memuat log aktivitas...
            </div>
          ) : !recentLogs || recentLogs.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Belum ada riwayat aktivitas tercatat.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentLogs.map((log: any) => (
                <div
                  key={log.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono px-2.5 py-1 rounded-lg bg-blue-50 text-royal text-xs uppercase font-bold border border-blue-100">
                      {log.action}
                    </span>
                    <span className="text-primary-950 font-medium">
                      {log.description || "Aktivitas pengelola sistem"}
                    </span>
                    <span className="text-slate-500 text-xs">
                      oleh{" "}
                      <strong className="text-slate-700">
                        {log.user?.name || "Sistem"}
                      </strong>
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono text-xs shrink-0">
                    {log.created_at
                      ? new Date(log.created_at).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
