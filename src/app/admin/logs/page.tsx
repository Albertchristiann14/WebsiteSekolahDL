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
            <h2 className="text-xl font-extrabold text-primary-950 tracking-tight">Audit Trail Sistem CMS</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Catatan keamanan dan riwayat perubahan data yang dilakukan oleh seluruh akun pengelola.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-white border border-blue-200 text-xs font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal shadow-sm"
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
              className="p-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-600 hover:text-royal border border-blue-100 shadow-sm transition"
              title="Segarkan Log"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-blue-50/60 text-[11px] uppercase tracking-wider text-slate-600 border-b border-blue-100 font-bold">
                <tr>
                  <th className="py-3.5 px-5">Waktu</th>
                  <th className="py-3.5 px-5">Pengguna (Staf)</th>
                  <th className="py-3.5 px-5">Jenis Aksi</th>
                  <th className="py-3.5 px-5">Deskripsi Aktivitas</th>
                  <th className="py-3.5 px-5 text-right">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
                      Memuat rekaman log...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-slate-500">
                      Belum ada riwayat aktivitas yang tercatat.
                    </td>
                  </tr>
                ) : (
                  logs.map((item, idx) => (
                    <tr key={`${item.id || 'log'}-${idx}`} className="hover:bg-blue-50/30 transition">
                      <td className="py-3.5 px-5 text-xs font-mono text-slate-500 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString("id-ID")}
                      </td>

                      <td className="py-3.5 px-5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary-950">{item.user?.name || "Sistem"}</span>
                          {item.user?.role && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({item.user.role.name || item.user.role})
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-royal font-mono text-[10px] uppercase font-bold border border-blue-200">
                          {item.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-xs text-slate-700 font-medium">
                        {item.description}
                      </td>

                      <td className="py-3.5 px-5 text-xs font-mono text-slate-500 text-right">
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

