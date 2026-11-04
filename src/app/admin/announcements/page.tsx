"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  Bell, 
  PlusCircle, 
  Edit, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  Calendar, 
  Users, 
  X,
  AlertTriangle
} from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ id: number; title: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [targetAudience, setTargetAudience] = useState("all");
  const [validUntil, setValidUntil] = useState("");
  const [isActive, setIsActive] = useState(true);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAnnouncements();
      if (res.status === 200 && res.data) {
        setAnnouncements(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat pengumuman");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setContent("");
    setPriority("medium");
    setTargetAudience("all");
    setValidUntil("");
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setContent(item.content);
    setPriority(item.priority || "medium");
    setTargetAudience(item.target_audience || "all");
    setValidUntil(item.valid_until ? item.valid_until.substring(0, 10) : "");
    setIsActive(Boolean(item.is_active));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast("error", "Judul dan isi pengumuman wajib diisi.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      content,
      priority,
      target_audience: targetAudience,
      valid_until: validUntil || null,
      is_active: isActive,
    };

    try {
      if (editingItem) {
        const res = await adminApi.updateAnnouncement(editingItem.id, payload);
        if (res.status === 200) {
          showToast("success", "Pengumuman berhasil diperbarui");
          setModalOpen(false);
          loadAnnouncements();
        } else {
          showToast("error", res.error || "Gagal memperbarui");
        }
      } else {
        const res = await adminApi.createAnnouncement(payload);
        if (res.status === 201 || res.status === 200) {
          showToast("success", "Pengumuman berhasil diterbitkan");
          setModalOpen(false);
          loadAnnouncements();
        } else {
          showToast("error", res.error || "Gagal menerbitkan");
        }
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setSubmitting(true);
    try {
      const res = await adminApi.deleteAnnouncement(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Pengumuman berhasil dihapus");
        setDeleteModal(null);
        loadAnnouncements();
      } else {
        showToast("error", res.error || "Gagal menghapus");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Pengumuman Sekolah">
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Siaran & Pengumuman Resmi</h2>
            <p className="text-xs text-slate-400">
              Kelola pesan penting untuk siswa, orang tua murid, dan civitas akademika.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-primary-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Pengumuman Baru</span>
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

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold" />
              Memuat data pengumuman...
            </div>
          ) : announcements.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl">
              Belum ada siaran pengumuman aktif.
            </div>
          ) : (
            announcements.map((item) => {
              const isExpired = item.valid_until && new Date(item.valid_until) < new Date();
              return (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl bg-slate-900 border flex flex-col justify-between transition-all ${
                    !item.is_active || isExpired 
                      ? "border-slate-800 opacity-60" 
                      : item.priority === "high" 
                      ? "border-red-500/40 shadow-lg shadow-red-500/5" 
                      : "border-slate-800"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                        item.priority === "high"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : item.priority === "medium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}>
                        {item.priority === "high" ? "Prioritas Tinggi" : item.priority === "medium" ? "Prioritas Sedang" : "Informasi"}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        isExpired 
                          ? "bg-red-950 text-red-400" 
                          : item.is_active 
                          ? "bg-emerald-950 text-emerald-400" 
                          : "bg-slate-800 text-slate-500"
                      }`}>
                        {isExpired ? "Kedaluwarsa" : item.is_active ? "Aktif" : "Non-aktif"}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{item.valid_until ? `s/d ${new Date(item.valid_until).toLocaleDateString("id-ID")}` : "Tanpa batas"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-gold transition"
                        title="Edit Pengumuman"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ id: item.id, title: item.title })}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
                        title="Hapus Pengumuman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Create / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-5 h-5 text-gold" />
                  <h3 className="text-base font-bold text-white">
                    {editingItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
                  </h3>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Judul Pengumuman <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Jadwal Ujian Tengah Semester Genap TA 2026/2027"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Tingkat Prioritas
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="low">Rendah (Info)</option>
                      <option value="medium">Sedang</option>
                      <option value="high">Tinggi (Penting)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Target Sasaran
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="all">Semua Civitas</option>
                      <option value="parents">Orang Tua Murid</option>
                      <option value="students">Siswa</option>
                      <option value="teachers">Guru & Tenaga Kependidikan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Berlaku Sampai Tanggal
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">Kosongkan jika berlaku permanen.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Isi Pesan Pengumuman <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan detail pengumuman secara rinci..."
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active_toggle"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-gold focus:ring-gold"
                  />
                  <label htmlFor="is_active_toggle" className="text-xs text-slate-300 cursor-pointer">
                    Aktifkan dan tampilkan di banner publik
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-primary-950 text-xs font-bold shadow transition flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>{editingItem ? "Simpan Perubahan" : "Terbitkan Pengumuman"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Hapus Pengumuman</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Apakah Anda yakin ingin menghapus pengumuman <strong>"{deleteModal.title}"</strong>?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-semibold text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

