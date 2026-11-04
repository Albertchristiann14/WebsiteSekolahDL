"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  History, 
  Search, 
  Filter, 
  RefreshCw, 
  Loader2, 
  Clock, 
  User, 
  Shield 
} from "lucide-react";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("all");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getActivityLogs({
        action: actionFilter !== "all" ? actionFilter : undefined,
        limit: 50,
      });
      if (res.status === 200 && res.data) {
        setLogs(res.data);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [actionFilter]);

  return (
    <AdminLayout title="Log Aktivitas & Audit Trail">
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Audit Trail Sistem CMS</h2>
            <p className="text-xs text-slate-400">
              Catatan keamanan dan riwayat perubahan data yang dilakukan oleh seluruh akun pengelola.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="all">Semua Jenis Aksi</option>
              <option value="login">Login</option>
              <option value="create_news">Tambah Berita</option>
              <option value="update_news">Ubah Berita</option>
              <option value="delete_news">Hapus Berita</option>
              <option value="update_settings">Ubah Pengaturan</option>
            </select>
            <button
              onClick={loadLogs}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Segarkan Log"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Pengguna (Staf)</th>
                  <th className="py-3 px-4">Jenis Aksi</th>
                  <th className="py-3 px-4">Deskripsi Aktivitas</th>
                  <th className="py-3 px-4 text-right">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold" />
                      Memuat rekaman log...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-slate-400">
                      Belum ada riwayat aktivitas yang tercatat.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString("id-ID")}
                      </td>

                      <td className="py-3 px-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{item.user?.name || "Sistem"}</span>
                          {item.user?.role && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({item.user.role.name || item.user.role})
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold border border-slate-700">
                          {item.action}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-200">
                        {item.description}
                      </td>

                      <td className="py-3 px-4 text-xs font-mono text-slate-500 text-right">
                        {item.ip_address || "127.0.0.1"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

