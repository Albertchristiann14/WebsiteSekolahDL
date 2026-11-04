"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  X, 
  MessageSquare, 
  FileText, 
  RefreshCw,
  Loader2,
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function AdminAdmissionsPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [notesModal, setNotesModal] = useState<any | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAdmissions({
        status: statusFilter !== "all" ? statusFilter : undefined,
        target_level: levelFilter !== "all" ? levelFilter : undefined,
        search: search || undefined,
      });
      if (res.status === 200 && res.data) {
        setInquiries(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, levelFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await adminApi.updateAdmissionStatus(id, { status: newStatus });
      if (res.status === 200) {
        showToast("success", "Status calon siswa berhasil diperbarui");
        loadData();
      } else {
        showToast("error", res.error || "Gagal memperbarui status");
      }
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  const openNotesModal = (item: any) => {
    setNotesModal(item);
    setNotesInput(item.notes || "");
  };

  const saveNotes = async () => {
    if (!notesModal) return;
    setSavingNotes(true);
    try {
      const res = await adminApi.updateAdmissionStatus(notesModal.id, {
        status: notesModal.status,
        notes: notesInput,
      });
      if (res.status === 200) {
        showToast("success", "Catatan follow-up berhasil disimpan");
        setNotesModal(null);
        loadData();
      } else {
        showToast("error", res.error || "Gagal menyimpan catatan");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Calon Siswa (PPDB CRM)">
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Pendaftaran Calon Siswa Baru</h2>
            <p className="text-xs text-slate-400">
              Pipeline tindak lanjut (follow-up) orang tua murid dan calon siswa baru Dharma Loka.
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition self-start sm:self-auto flex items-center gap-2 text-xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`p-4 rounded-xl border text-sm flex items-center justify-between ${
            toast.type === "success" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300" : "bg-red-950/80 border-red-500/50 text-red-300"
          }`}>
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
        )}

        {/* Filters and Search */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Cari nama siswa, orang tua, atau nomor HP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-slate-700"
            >
              Cari
            </button>
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="all">Semua Status</option>
              <option value="new">Baru (Perlu Dihubungi)</option>
              <option value="contacted">Sedang Diproses</option>
              <option value="enrolled">Diterima / Terdaftar</option>
              <option value="cancelled">Dibatalkan</option>
            </select>

            {/* Level Select */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="all">Semua Jenjang</option>
              <option value="tk">TK</option>
              <option value="sd">SD</option>
              <option value="smp">SMP</option>
              <option value="sma">SMA</option>
              <option value="smk">SMK</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3 px-4">Calon Siswa</th>
                  <th className="py-3 px-4">Jenjang</th>
                  <th className="py-3 px-4">Orang Tua / Kontak</th>
                  <th className="py-3 px-4">Asal Sekolah</th>
                  <th className="py-3 px-4">Status Pipeline</th>
                  <th className="py-3 px-4 text-right">Catatan & Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold" />
                      Memuat daftar pendaftaran PPDB...
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      Tidak ada pendaftar yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-semibold text-white">{item.student_name}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            Daftar: {new Date(item.created_at).toLocaleDateString("id-ID")} • TA {item.academic_year || "2026/2027"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded bg-primary-900/60 border border-gold/30 text-gold-light text-xs font-bold font-mono uppercase">
                          {item.target_level}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <p className="font-medium text-slate-200">{item.parent_name}</p>
                        <div className="flex items-center gap-3 mt-1 text-slate-400">
                          <a 
                            href={`https://wa.me/${item.phone.replace(/^0/, "62").replace(/[^\d]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                            title="Hubungi via WhatsApp"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1 hover:text-white"
                              title="Kirim Email"
                            >
                              <Mail className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {item.previous_school || "—"}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                            item.status === "new"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                              : item.status === "contacted"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/40"
                              : item.status === "enrolled"
                              ? "bg-gold/10 text-gold-light border-gold/40"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          <option value="new">Baru Masuk</option>
                          <option value="contacted">Sudah Dihubungi</option>
                          <option value="enrolled">Resmi Terdaftar</option>
                          <option value="cancelled">Dibatalkan</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => openNotesModal(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                            item.notes 
                              ? "bg-gold/10 text-gold border-gold/30 hover:bg-gold/20"
                              : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{item.notes ? "Lihat Catatan" : "+ Catatan"}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-up Notes Modal */}
        {notesModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-gold" />
                  <h3 className="text-base font-bold text-white">Catatan Tindak Lanjut PPDB</h3>
                </div>
                <button onClick={() => setNotesModal(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">{notesModal.student_name}</p>
                <p className="text-xs text-slate-400">
                  Jenjang {notesModal.target_level.toUpperCase()} • Ortu: {notesModal.parent_name} ({notesModal.phone})
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Catatan Internal Panitia PPDB
                </label>
                <textarea
                  rows={5}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Contoh: Sudah dihubungi tgl 4 Nov. Orang tua berminat dengan program sains STEM SMA. Dijadwalkan kunjungan sekolah Sabtu ini."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setNotesModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Tutup
                </button>
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-primary-950 text-xs font-bold transition flex items-center gap-2"
                >
                  {savingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

