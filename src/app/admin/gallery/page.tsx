"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  Image as ImageIcon, 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2, 
  ExternalLink 
} from "lucide-react";

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("kegiatan");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadGalleries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getGalleries();
      if (res.status === 200 && res.data) {
        setGalleries(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleries();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      showToast("error", "Judul dan URL Foto wajib diisi.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      category,
      description,
      cover_image: imageUrl,
      is_published: true,
      items: [
        {
          image_url: imageUrl,
          caption: title,
        }
      ]
    };

    try {
      const res = await adminApi.createGallery(payload);
      if (res.status === 201 || res.status === 200) {
        showToast("success", "Foto berhasil ditambahkan ke galeri");
        setModalOpen(false);
        setTitle("");
        setImageUrl("");
        setDescription("");
        loadGalleries();
      } else {
        showToast("error", res.error || "Gagal menambahkan");
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
      const res = await adminApi.deleteGallery(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Foto galeri berhasil dihapus");
        setDeleteModal(null);
        loadGalleries();
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
    <AdminLayout title="Manajemen Galeri Foto">
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-primary-950 tracking-tight">Dokumentasi Aktivitas & Fasilitas</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kelola album foto kegiatan belajar, fasilitas, upacara, dan seni budaya sekolah.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-900/10 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Unggah Foto Baru</span>
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

        {/* Galleries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
              Memuat foto galeri...
            </div>
          ) : galleries.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-500 bg-white border border-blue-100 rounded-2xl">
              Belum ada foto dalam galeri.
            </div>
          ) : (
            galleries.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-blue-100 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-blue-300 transition"
              >
                <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                  <img
                    src={item.cover_image || (item.items?.[0]?.image_url) || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur border border-blue-100 text-[10px] font-bold uppercase text-royal shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-primary-950 text-sm truncate" title={item.title}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.description || "Dokumentasi kegiatan Sekolah Dharma Loka."}
                  </p>
                </div>

                <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px] font-semibold">
                    {item.items?.length || 1} Foto
                  </span>
                  <button
                    onClick={() => setDeleteModal(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-royal" />
                  <h3 className="text-base font-extrabold text-primary-950">Unggah Foto Galeri Baru</h3>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Judul Kegiatan / Fasilitas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Pentas Seni dan Budaya Harmoni Dharma Loka"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Kategori Galeri
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  >
                    <option value="kegiatan">Aktivitas Siswa</option>
                    <option value="fasilitas">Fasilitas Kampus</option>
                    <option value="akademik">Kegiatan Belajar & Lab</option>
                    <option value="seni">Seni & Budaya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Foto Gambar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Keterangan Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi kegiatan atau ruangan..."
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
                    <span>Simpan Foto</span>
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
                <h3 className="text-base font-extrabold text-primary-950">Hapus Foto Galeri</h3>
              </div>
              <p className="text-xs text-slate-600">
                Hapus item foto <strong>{deleteModal.title}</strong> dari galeri?
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

