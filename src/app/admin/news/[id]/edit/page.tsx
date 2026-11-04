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
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold mb-3" />
          <p className="text-sm text-slate-400">Memuat data artikel berita...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit Artikel: ${title || "Tanpa Judul"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
          <div className="flex items-center gap-3">
            {status === "published" && slug && (
              <Link
                href={`/news/${slug}`}
                target="_blank"
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition border border-slate-700 inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
                <span>Lihat Publik</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-primary-950 text-xs font-bold shadow-md shadow-gold/20 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Main Content Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Judul Artikel <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-base font-semibold text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Slug URL (Permalink)
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-xs font-mono text-slate-400">
                  /news/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-r-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Kategori Berita
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Status Terbit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("published")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                      status === "published"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    Terbit
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                      status === "draft"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Konten Lengkap Berita <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Media & Featured Image Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gold" />
              <span>Gambar Utama (Featured Image)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                URL Gambar Foto
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {featuredImage && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-700 aspect-video max-w-sm">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Optimasi Mesin Pencari (SEO)</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                SEO Meta Description
              </label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

