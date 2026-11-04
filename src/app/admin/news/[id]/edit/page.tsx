"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";

export default function AdminNewsEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, newsRes] = await Promise.all([
          adminApi.getCategories(),
          adminApi.getNewsDetail(id),
        ]);

        if (catRes.status === 200 && catRes.data) {
          setCategories(catRes.data);
        }

        if (newsRes.status === 200 && newsRes.data) {
          const item = newsRes.data;
          setTitle(item.title || "");
          setSlug(item.slug || "");
          setCategoryId(item.category_id || "");
          setStatus(item.status || "published");
          setExcerpt(item.excerpt || "");
          setContent(item.content || "");
          setFeaturedImage(item.featured_image || "");
          setSeoTitle(item.seo_title || "");
          setSeoDescription(item.seo_description || "");
        } else {
          setError(newsRes.error || "Gagal memuat detail artikel.");
        }
      } catch (err: any) {
        setError(err.message || "Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (targetStatus?: "draft" | "published") => {
    setError(null);
    setSuccess(null);
    if (!title.trim()) {
      setError("Judul artikel wajib diisi.");
      return;
    }
    if (!content.trim()) {
      setError("Konten artikel tidak boleh kosong.");
      return;
    }

    setSubmitting(true);
    const finalStatus = targetStatus || status;

    const payload = {
      title,
      slug: slug || undefined,
      category_id: categoryId ? Number(categoryId) : undefined,
      status: finalStatus,
      excerpt,
      content,
      featured_image: featuredImage || undefined,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt,
    };

    try {
      const res = await adminApi.updateNews(id, payload);
      if (res.status === 200) {
        setSuccess("Perubahan artikel berhasil disimpan.");
        setStatus(finalStatus);
      } else {
        setError(res.error || "Gagal memperbarui artikel berita.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Artikel Berita">
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-royal mb-3" />
          <p className="text-sm font-medium text-slate-500">Memuat data artikel berita...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit Artikel: ${title || "Tanpa Judul"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-100">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-royal transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
          <div className="flex items-center gap-3">
            {status === "published" && slug && (
              <Link
                href={`/news/${slug}`}
                target="_blank"
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-xs font-bold text-slate-700 transition border border-blue-200 inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-royal" />
                <span>Lihat Publik</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold shadow-sm shadow-blue-900/10 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-medium flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Main Content Card */}
          <div className="p-6 bg-white border border-blue-100 rounded-2xl space-y-5 shadow-sm">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Slug URL (Permalink)
              </label>
              <div className="flex items-center">
                <span className="px-3.5 py-2.5 bg-blue-50 border border-r-0 border-blue-200 rounded-l-xl text-xs font-mono font-semibold text-royal">
                  /news/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs font-mono text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Kategori Berita
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Status Terbit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("published")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Terbit
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      status === "draft"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Konten Lengkap Berita <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Media & Featured Image Card */}
          <div className="p-6 bg-white border border-blue-100 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-primary-950 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-royal" />
              <span>Gambar Utama (Featured Image)</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                URL Gambar Foto
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>

            {featuredImage && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-blue-200 aspect-video max-w-sm">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 bg-white border border-blue-100 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-primary-950">Optimasi Mesin Pencari (SEO)</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                SEO Meta Description
              </label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

