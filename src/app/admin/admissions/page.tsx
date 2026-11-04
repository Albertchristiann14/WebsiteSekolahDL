"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import {
  Search,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  RefreshCw,
  Loader2,
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
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
      const res = await adminApi.updateAdmissionStatus(id, {
        status: newStatus,
      });
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
    setNotesInput(item.admin_notes || item.notes || "");
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
            <h2 className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight">
              Pendaftaran Calon Siswa Baru (PPDB)
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Pantau dan tindak lanjuti pengajuan pendaftaran dari orang tua calon siswa.
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-royal font-bold border border-blue-200 transition self-start sm:self-auto flex items-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan Data</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}>
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        )}

        {/* Filters and Search */}
        <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 w-full flex items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama orang tua, siswa, atau nomor HP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-royal hover:bg-royal-dark text-white rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Cari
            </button>
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="all">Semua Status</option>
              <option value="new">Baru Masuk</option>
              <option value="contacted">Sudah Dihubungi</option>
              <option value="enrolled">Resmi Terdaftar</option>
              <option value="cancelled">Dibatalkan</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="all">Semua Jenjang</option>
              <option value="TK">TK</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-blue-50/60 text-xs uppercase tracking-wider text-royal border-b border-blue-100 font-extrabold">
                <tr>
                  <th className="py-4 px-6">Wali / Calon Siswa</th>
                  <th className="py-4 px-6">Jenjang</th>
                  <th className="py-4 px-6">Kontak Orang Tua</th>
                  <th className="py-4 px-6">Pesan / Pertanyaan</th>
                  <th className="py-4 px-6">Status Pipeline</th>
                  <th className="py-4 px-6 text-right">Catatan Panitia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-14 text-center text-sm text-slate-500"
                    >
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
                      Memuat daftar pendaftaran PPDB...
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-14 text-center text-sm text-slate-500"
                    >
                      Tidak ada data pendaftar yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => {
                    const level =
                      item.student_level || item.target_level || "Umum";
                    const name =
                      item.student_name || item.parent_name || "Calon Siswa";
                    const hasNotes = Boolean(item.admin_notes || item.notes);

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-bold text-primary-950 text-base">
                              {name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Tanggal:{" "}
                              {new Date(item.created_at).toLocaleDateString(
                                "id-ID"
                              )}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-royal text-xs font-extrabold uppercase">
                            {level}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-xs sm:text-sm">
                          <p className="font-bold text-primary-950">
                            {item.parent_name}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-slate-600">
                            <a
                              href={`https://wa.me/${(item.phone || "")
                                .replace(/^0/, "62")
                                .replace(/[^\d]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{item.phone}</span>
                            </a>
                            {item.email && (
                              <a
                                href={`mailto:${item.email}`}
                                className="inline-flex items-center gap-1 text-royal hover:underline"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{item.email}</span>
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6 text-xs sm:text-sm text-slate-600 max-w-xs">
                          <p className="line-clamp-2">
                            {item.message || item.previous_school || "—"}
                          </p>
                        </td>

                        <td className="py-4 px-6">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className={`text-xs font-bold rounded-xl px-3 py-2 border focus:outline-none cursor-pointer ${
                              item.status === "new"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "contacted"
                                ? "bg-blue-50 text-royal border-blue-200"
                                : item.status === "enrolled"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            <option value="new">Baru Masuk</option>
                            <option value="contacted">Sudah Dihubungi</option>
                            <option value="enrolled">Resmi Terdaftar</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => openNotesModal(item)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                              hasNotes
                                ? "bg-blue-50 text-royal border-blue-200 hover:bg-blue-100"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-royal"
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>
                              {hasNotes ? "Lihat Catatan" : "+ Catatan"}
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-up Notes Modal */}
        {notesModal && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-md w-full p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-royal" />
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Catatan Tindak Lanjut PPDB
                  </h3>
                </div>
                <button
                  onClick={() => setNotesModal(null)}
                  className="text-slate-400 hover:text-primary-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <p className="text-sm font-extrabold text-primary-950">
                  {notesModal.parent_name}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Jenjang{" "}
                  {(
                    notesModal.student_level ||
                    notesModal.target_level ||
                    "Umum"
                  ).toUpperCase()}{" "}
                  • WhatsApp: {notesModal.phone}
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-2">
                  Catatan Internal Panitia PPDB
                </label>
                <textarea
                  rows={5}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Contoh: Sudah dihubungi via WhatsApp. Orang tua dijadwalkan kunjungan sekolah hari Sabtu pukul 09.00 WIB."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setNotesModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                >
                  Tutup
                </button>
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-royal/15 cursor-pointer"
                >
                  {savingNotes ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
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
