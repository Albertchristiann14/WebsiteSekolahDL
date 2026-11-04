"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Image as ImageIcon
} from "lucide-react";

export default function AdminNewsCreatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await adminApi.getCategories();
        if (res.status === 200 && res.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setCategoryId(res.data[0].id);
          }
        }
      } catch (err: any) {
        setError("Gagal memuat kategori.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (targetStatus?: "draft" | "published") => {
    setError(null);
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
      excerpt: excerpt || title.substring(0, 160),
      content,
      featured_image: featuredImage || undefined,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt || title.substring(0, 160),
    };

    try {
      const res = await adminApi.createNews(payload);
      if (res.status === 201 || res.status === 200) {
        router.push("/admin/news");
      } else {
        setError(res.error || "Gagal menyimpan artikel berita.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Tulis Artikel Berita Baru">
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
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-xs font-bold text-slate-700 transition border border-blue-200 cursor-pointer disabled:opacity-50"
            >
              Simpan Sebagai Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold shadow-sm shadow-blue-900/10 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Publikasikan Sekarang</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-medium flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{error}</span>
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Siswa Dharma Loka Raih Medali Emas Olimpiade Sains Nasional"
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
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManuallyEdited(true);
                  }}
                  placeholder="siswa-dharma-loka-raih-medali-emas"
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
                  disabled={loadingCategories}
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
                    Terbitkan Langsung
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
                    Simpan Sebagai Draft
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
                placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu berita..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Konten Lengkap Berita <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan isi liputan kegiatan atau pengumuman secara lengkap di sini. Mendukung pemisahan paragraf secara otomatis."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white font-sans leading-relaxed"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Tip: Pisahkan paragraf dengan menekan enter dua kali.
              </p>
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
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>

            {/* Quick Unsplash Preset Suggestions */}
            <div>
              <p className="text-[11px] font-medium text-slate-500 mb-2">Atau pilih contoh gambar edukasi siap pakai:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFeaturedImage("https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80")}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[11px] font-semibold text-royal border border-blue-200 transition"
                >
                  Kegiatan Kelas
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedImage("https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80")}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[11px] font-semibold text-royal border border-blue-200 transition"
                >
                  Prestasi Sains
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedImage("https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80")}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[11px] font-semibold text-royal border border-blue-200 transition"
                >
                  Perpustakaan & Riset
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedImage("https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80")}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[11px] font-semibold text-royal border border-blue-200 transition"
                >
                  Pentas Seni Budaya
                </button>
              </div>
            </div>

            {featuredImage && (
              <div className="mt-3 relative rounded-xl overflow-hidden border border-blue-200 aspect-video max-w-sm">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as any).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80";
                  }}
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
                placeholder="Kosongkan jika ingin menyamakan dengan judul artikel"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
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
                placeholder="Kosongkan jika ingin menyamakan dengan ringkasan"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

