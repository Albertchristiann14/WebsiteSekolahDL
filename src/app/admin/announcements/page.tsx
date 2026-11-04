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
  X,
} from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
            <h2 className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight">
              Siaran & Pengumuman Resmi
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kelola pengumuman penting untuk siswa, orang tua murid, dan civitas sekolah.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-xs sm:text-sm shadow-md shadow-royal/15 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Pengumuman Baru</span>
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

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-sm text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
              Memuat data pengumuman...
            </div>
          ) : announcements.length === 0 ? (
            <div className="col-span-full py-16 text-center text-sm text-slate-500 bg-white border border-blue-100 rounded-3xl">
              Belum ada siaran pengumuman aktif.
            </div>
          ) : (
            announcements.map((item) => {
              const isExpired =
                item.valid_until && new Date(item.valid_until) < new Date();
              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl bg-white border flex flex-col justify-between transition-all shadow-sm hover:shadow-md ${
                    !item.is_active || isExpired
                      ? "border-slate-200 opacity-70"
                      : item.priority === "high"
                      ? "border-blue-300"
                      : "border-blue-100"
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          item.priority === "high"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : item.priority === "medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-royal border-blue-200"
                        }`}
                      >
                        {item.priority === "high"
                          ? "Prioritas Tinggi"
                          : item.priority === "medium"
                          ? "Prioritas Sedang"
                          : "Informasi"}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          isExpired
                            ? "bg-red-50 text-red-700"
                            : item.is_active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isExpired
                          ? "Kedaluwarsa"
                          : item.is_active
                          ? "Aktif"
                          : "Non-aktif"}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-primary-950 text-lg leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-4 h-4 text-royal" />
                      <span>
                        {item.valid_until
                          ? `Berlaku s/d ${new Date(
                              item.valid_until
                            ).toLocaleDateString("id-ID")}`
                          : "Berlaku Permanen"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-royal transition cursor-pointer"
                        title="Edit Pengumuman"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteModal({ id: item.id, title: item.title })
                        }
                        className="p-2 rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-600 transition cursor-pointer"
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
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-lg w-full p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-5 h-5 text-royal" />
                  <h3 className="text-lg font-extrabold text-primary-950">
                    {editingItem
                      ? "Edit Pengumuman"
                      : "Buat Pengumuman Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-primary-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                    Judul Pengumuman <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Jadwal Ujian Tengah Semester Genap TA 2026/2027"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                      Tingkat Prioritas
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                    >
                      <option value="low">Rendah (Info)</option>
                      <option value="medium">Sedang</option>
                      <option value="high">Tinggi (Penting)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                      Target Sasaran
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                    >
                      <option value="all">Semua Civitas</option>
                      <option value="parents">Orang Tua Murid</option>
                      <option value="students">Siswa</option>
                      <option value="teachers">
                        Guru & Tenaga Kependidikan
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                    Berlaku Sampai Tanggal
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                    Isi Pesan Pengumuman <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan detail pengumuman secara rinci..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="is_active_toggle"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-royal focus:ring-royal"
                  />
                  <label
                    htmlFor="is_active_toggle"
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    Aktifkan dan tampilkan di halaman beranda publik
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold shadow-md shadow-royal/15 transition flex items-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    <span>
                      {editingItem
                        ? "Simpan Perubahan"
                        : "Terbitkan Pengumuman"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-md w-full p-7 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-extrabold text-primary-950">
                  Hapus Pengumuman
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                Apakah Anda yakin ingin menghapus pengumuman{" "}
                <strong className="text-primary-950">
                  &ldquo;{deleteModal.title}&rdquo;
                </strong>
                ?
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white cursor-pointer"
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
