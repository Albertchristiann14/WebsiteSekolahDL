"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  Award, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2, 
  Search,
  ExternalLink 
} from "lucide-react";

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteModal, setDeleteModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [studentName, setStudentName] = useState("");
  const [academicLevel, setAcademicLevel] = useState("sma");
  const [category, setCategory] = useState("sains");
  const [eventRank, setEventRank] = useState("Juara 1");
  const [eventLevel, setEventLevel] = useState("Nasional");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAchievements = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAchievements();
      if (res.status === 200 && res.data) {
        setAchievements(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat prestasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setStudentName("");
    setAcademicLevel("sma");
    setCategory("sains");
    setEventRank("Juara 1");
    setEventLevel("Nasional");
    setYear(new Date().getFullYear());
    setDescription("");
    setImageUrl("");
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setStudentName(item.student_name);
    setAcademicLevel(item.academic_level || "sma");
    setCategory(item.category || "sains");
    setEventRank(item.event_rank || "Juara 1");
    setEventLevel(item.event_level || "Nasional");
    setYear(item.year || new Date().getFullYear());
    setDescription(item.description || "");
    setImageUrl(item.image_url || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !studentName.trim()) {
      showToast("error", "Judul kompetisi dan nama siswa wajib diisi.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      student_name: studentName,
      academic_level: academicLevel,
      category,
      event_rank: eventRank,
      event_level: eventLevel,
      year: Number(year),
      description: description || undefined,
      image_url: imageUrl || undefined,
      is_featured: true,
    };

    try {
      if (editingItem) {
        const res = await adminApi.updateAchievement(editingItem.id, payload);
        if (res.status === 200) {
          showToast("success", "Prestasi siswa berhasil diperbarui");
          setModalOpen(false);
          loadAchievements();
        } else {
          showToast("error", res.error || "Gagal memperbarui");
        }
      } else {
        const res = await adminApi.createAchievement(payload);
        if (res.status === 201 || res.status === 200) {
          showToast("success", "Prestasi baru berhasil ditambahkan");
          setModalOpen(false);
          loadAchievements();
        } else {
          showToast("error", res.error || "Gagal menambahkan");
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
      const res = await adminApi.deleteAchievement(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Prestasi berhasil dihapus");
        setDeleteModal(null);
        loadAchievements();
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
    <AdminLayout title="Manajemen Prestasi Siswa">
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-primary-950 tracking-tight">Galeri Prestasi & Rekor</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Dokumentasi pencapaian siswa Dharma Loka di tingkat Kota, Provinsi, Nasional, dan Internasional.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-900/10 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Prestasi Baru</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between ${
            toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}><X className="w-4 h-4 text-slate-400 hover:text-slate-600" /></button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-blue-50/60 text-[11px] uppercase tracking-wider text-slate-600 border-b border-blue-100 font-bold">
                <tr>
                  <th className="py-3.5 px-5">Kompetisi & Prestasi</th>
                  <th className="py-3.5 px-5">Siswa / Tim</th>
                  <th className="py-3.5 px-5">Jenjang</th>
                  <th className="py-3.5 px-5">Peringkat & Tingkat</th>
                  <th className="py-3.5 px-5">Tahun</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
                      Memuat daftar prestasi...
                    </td>
                  </tr>
                ) : achievements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-500">
                      Belum ada data prestasi siswa tercatat.
                    </td>
                  </tr>
                ) : (
                  achievements.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-royal flex items-center justify-center border border-blue-200 shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-primary-950">{item.title}</p>
                            <span className="text-[11px] font-medium text-slate-500 capitalize">{item.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 text-xs font-semibold text-primary-950">
                        {item.student_name}
                      </td>

                      <td className="py-4 px-5 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-royal uppercase font-mono text-[10px] font-bold">
                          {item.academic_level}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-xs">
                        <p className="font-bold text-royal">{item.event_rank}</p>
                        <p className="text-[11px] text-slate-500">{item.event_level}</p>
                      </td>

                      <td className="py-4 px-5 text-xs font-mono font-semibold text-slate-600">
                        {item.year}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-lg text-slate-500 hover:text-royal hover:bg-blue-50 transition"
                            title="Edit Prestasi"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModal(item)}
                            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                            title="Hapus Prestasi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-royal" />
                  <h3 className="text-base font-extrabold text-primary-950">
                    {editingItem ? "Edit Prestasi Siswa" : "Tambah Prestasi Baru"}
                  </h3>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nama Kompetisi / Penghargaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Olimpiade Sains Nasional Bidang Informatika"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Nama Siswa / Tim <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Nama lengkap peraih prestasi"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Jenjang Sekolah
                    </label>
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    >
                      <option value="tk">TK</option>
                      <option value="sd">SD</option>
                      <option value="smp">SMP</option>
                      <option value="sma">SMA</option>
                      <option value="smk">SMK</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Peringkat
                    </label>
                    <input
                      type="text"
                      value={eventRank}
                      onChange={(e) => setEventRank(e.target.value)}
                      placeholder="Medali Emas / Juara 1"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Tingkat
                    </label>
                    <select
                      value={eventLevel}
                      onChange={(e) => setEventLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    >
                      <option value="Kota Pekanbaru">Kota Pekanbaru</option>
                      <option value="Provinsi Riau">Provinsi Riau</option>
                      <option value="Nasional">Nasional</option>
                      <option value="Internasional">Internasional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Tahun
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Kategori Bidang
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  >
                    <option value="sains">Sains & Matematika</option>
                    <option value="bahasa">Bahasa & Debat</option>
                    <option value="seni">Seni & Budaya</option>
                    <option value="olahraga">Olahraga</option>
                    <option value="teknologi">Teknologi & Robotik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Foto Dokumentasi (Opsional)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold transition flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>{editingItem ? "Simpan Perubahan" : "Tambahkan"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-primary-950">Hapus Prestasi</h3>
              </div>
              <p className="text-xs text-slate-600">
                Hapus catatan prestasi <strong>{deleteModal.title}</strong> ({deleteModal.student_name})?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setDeleteModal(null)} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700">
                  Batal
                </button>
                <button onClick={handleDelete} className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white">
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

