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
  Award, 
  ArrowUpRight, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  FileText,
  UserCheck,
  RefreshCw,
  ExternalLink
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
      drafts: m?.news_draft ?? stats?.counts?.news?.drafts ?? 0 
    },
    announcements: { 
      total: m?.announcements_total ?? m?.announcements_active ?? stats?.counts?.announcements?.total ?? 0, 
      active: m?.announcements_active ?? stats?.counts?.announcements?.active ?? 0 
    },
    admissions: { 
      total: m?.inquiries_total ?? stats?.counts?.admissions?.total ?? 0, 
      new: m?.inquiries_new ?? stats?.counts?.admissions?.new ?? 0 
    },
    messages: { 
      total: m?.messages_total ?? stats?.counts?.messages?.total ?? 0, 
      unread: m?.messages_unread ?? stats?.counts?.messages?.unread ?? 0 
    },
    achievements: m?.achievements_count ?? stats?.counts?.achievements ?? 0,
    galleries: m?.galleries_count ?? stats?.counts?.galleries ?? 0,
    users: m?.users_count ?? stats?.counts?.users ?? 0,
  };

  const recentInquiries = stats?.latest_inquiries || stats?.recent_inquiries || [];
  const recentNews = stats?.latest_news || stats?.recent_news || [];
  const recentLogs = stats?.recent_logs || [];

  return (
    <AdminLayout title="Dashboard Pengelola">
      <div className="space-y-8">
        
        {/* Welcome & Quick Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Selamat Datang di Portal CMS Dharma Loka
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Pantau pendaftaran calon siswa, publikasikan berita terkini, dan kelola informasi institusi secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 disabled:opacity-50"
              title="Segarkan Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-primary-950 font-bold text-xs sm:text-sm shadow-md shadow-gold/20 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tulis Berita Baru</span>
            </Link>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={fetchStats}
              className="text-xs underline hover:text-white font-medium"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: PPDB Inquiries */}
          <Link
            href="/admin/admissions"
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-gold/40 transition-all hover:-translate-y-0.5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
                <Users className="w-5 h-5" />
              </div>
              {counts.admissions.new > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {counts.admissions.new} Baru
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pendaftar PPDB
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {counts.admissions.total}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-gold transition">
                <span>Kelola Calon Siswa</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </Link>

          {/* Card 2: News & Articles */}
          <Link
            href="/admin/news"
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-600 transition-all hover:-translate-y-0.5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {counts.news.published} Terbit
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Artikel & Berita
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {counts.news.total}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-blue-400 transition">
                <span>{counts.news.drafts} Draft tersimpan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </Link>

          {/* Card 3: Unread Messages */}
          <Link
            href="/admin/messages"
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-600 transition-all hover:-translate-y-0.5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Mail className="w-5 h-5" />
              </div>
              {counts.messages.unread > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {counts.messages.unread} Belum Dibaca
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pesan Kontak
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {counts.messages.total}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-purple-400 transition">
                <span>Buka Kotak Masuk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </Link>

          {/* Card 4: Announcements & Achievements */}
          <Link
            href="/admin/announcements"
            className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-600 transition-all hover:-translate-y-0.5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                {counts.announcements.active} Aktif
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pengumuman Sekolah
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {counts.announcements.total}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-amber-400 transition">
                <span>Kelola Siaran</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </p>
            </div>
          </Link>

        </div>

        {/* Two Column Layout: Recent PPDB & Recent News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Recent PPDB Inquiries */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-gold" />
                <h3 className="text-base font-bold text-white">Calon Siswa Terbaru (PPDB)</h3>
              </div>
              <Link 
                href="/admin/admissions"
                className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-10 text-center text-xs text-slate-400">Memuat data pendaftar...</div>
            ) : !recentInquiries || recentInquiries.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">Belum ada pengajuan pendaftaran baru.</div>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {recentInquiries.map((inquiry: any) => (
                  <div key={inquiry.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {inquiry.student_name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-gold-light font-bold text-[10px]">
                          {inquiry.target_level}
                        </span>
                        <span>Ortu: {inquiry.parent_name}</span>
                        <span>•</span>
                        <span>{inquiry.phone}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        inquiry.status === "new"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : inquiry.status === "contacted"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>
                        {inquiry.status === "new" ? "Baru" : inquiry.status === "contacted" ? "Dihubungi" : inquiry.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Recent News */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Artikel & Berita Terbaru</h3>
              </div>
              <Link 
                href="/admin/news"
                className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-10 text-center text-xs text-slate-400">Memuat artikel berita...</div>
            ) : !recentNews || recentNews.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">Belum ada artikel yang dibuat.</div>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {recentNews.map((item: any) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="text-[11px] text-slate-300">
                          {item.category?.name || "Umum"}
                        </span>
                        <span>•</span>
                        <span>Oleh {item.author?.name || "Admin"}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}>
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-gold" />
              <h3 className="text-base font-bold text-white">Log Aktivitas Sistem</h3>
            </div>
            <Link 
              href="/admin/logs"
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              Lihat Riwayat Lengkap
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Memuat log aktivitas...</div>
          ) : !recentLogs || recentLogs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">Belum ada riwayat aktivitas tercatat.</div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {recentLogs.map((log: any) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase">
                      {log.action}
                    </span>
                    <span className="text-slate-300">{log.description}</span>
                    <span className="text-slate-500 text-[11px]">oleh {log.user?.name || "Sistem"}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px] shrink-0">
                    {log.created_at ? new Date(log.created_at).toLocaleString("id-ID") : "-"}
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

