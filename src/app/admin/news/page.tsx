"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";

export default function AdminNewsListPage() {
  const [news, setNews] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
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
      const [newsRes, catRes] = await Promise.all([
        adminApi.getNews({
          search: search || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          category_id: categoryFilter ? Number(categoryFilter) : undefined,
          page,
        }),
        adminApi.getCategories(),
      ]);

      if (newsRes.status === 200 && newsRes.data) {
        setNews(newsRes.data);
        setMeta(newsRes.meta);
      }
      if (catRes.status === 200 && catRes.data) {
        setCategories(catRes.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, categoryFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadData();
  };

  const handleTogglePublish = async (id: number) => {
    setActionLoading(true);
    try {
      const res = await adminApi.togglePublishNews(id);
      if (res.status === 200) {
        showToast(
          "success",
          res.message || "Status publikasi berhasil diperbarui"
        );
        loadData();
      } else {
        showToast("error", res.error || "Gagal memperbarui status publikasi");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setActionLoading(true);
    try {
      const res = await adminApi.deleteNews(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Artikel berhasil dihapus");
        setDeleteModal(null);
        loadData();
      } else {
        showToast("error", res.error || "Gagal menghapus artikel");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Berita & Artikel">
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight">
              Daftar Artikel & Berita Sekolah
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kelola liputan kegiatan, prestasi siswa, dan artikel informasi untuk orang tua.
            </p>
          </div>
          <Link
            href="/admin/news/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-xs sm:text-sm shadow-md shadow-royal/15 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </Link>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all ${toast.type === "success"
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
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-primary-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 w-full flex items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan judul berita..."
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
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="all">Semua Status</option>
              <option value="published">Hanya Terbit</option>
              <option value="draft">Hanya Draft</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={loadData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-royal border border-blue-200 transition cursor-pointer"
              title="Segarkan"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-blue-50/60 text-xs uppercase tracking-wider text-royal border-b border-blue-100 font-extrabold">
                <tr>
                  <th className="py-4 px-6">Artikel</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Penulis</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6">Tanggal Terbit</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
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
                      Memuat data artikel...
                    </td>
                  </tr>
                ) : news.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-14 text-center text-sm text-slate-500"
                    >
                      Tidak ada artikel yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          {item.featured_image ? (
                            <img
                              src={item.featured_image}
                              alt={item.title}
                              className="w-14 h-14 object-cover rounded-xl border border-blue-100 shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-royal shrink-0">
                              Foto
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-primary-950 truncate max-w-xs sm:max-w-md text-base">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-400 font-mono truncate max-w-xs mt-0.5">
                              /news/{item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs">
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-royal font-bold">
                          {item.category?.name || "Umum"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm font-medium text-slate-600">
                        {item.author?.name || "Admin"}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleTogglePublish(item.id)}
                          disabled={actionLoading}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer ${item.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            }`}
                          title="Klik untuk mengubah status"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${item.status === "published"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                              }`}
                          />
                          <span>
                            {item.status === "published" ? "Terbit" : "Draft"}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-xs font-medium text-slate-500">
                        {item.published_at
                          ? new Date(item.published_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          : "Belum terbit"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {item.status === "published" && (
                            <Link
                              href={`/news/${item.slug}`}
                              target="_blank"
                              className="p-2 rounded-xl text-slate-500 hover:text-royal hover:bg-blue-50 transition"
                              title="Lihat Halaman Publik"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/news/${item.id}/edit`}
                            className="p-2 rounded-xl text-slate-500 hover:text-royal hover:bg-blue-50 transition"
                            title="Edit Artikel"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              setDeleteModal({
                                id: item.id,
                                title: item.title,
                              })
                            }
                            className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Hapus Artikel"
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

          {/* Pagination Controls */}
          {meta && meta.last_page > 1 && (
            <div className="p-5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-600">
              <span>
                Halaman <strong>{meta.current_page}</strong> dari{" "}
                <strong>{meta.last_page}</strong> (Total {meta.total} artikel)
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-royal font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-100 transition"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={page >= meta.last_page}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-royal font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-100 transition"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-md w-full p-7 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-primary-950">
                  Konfirmasi Hapus Artikel
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Apakah Anda yakin ingin menghapus artikel{" "}
                <strong className="text-primary-950">
                  &ldquo;{deleteModal.title}&rdquo;
                </strong>
                ?
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={actionLoading}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  <span>Hapus Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
