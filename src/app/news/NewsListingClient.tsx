"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { NewsArticle } from "@/data/news";
import { publicApi } from "@/lib/api";

interface Props {
  initialArticles: NewsArticle[];
}

const CATEGORIES = ["Semua", "Akademik", "Prestasi", "Kegiatan", "Pengumuman", "Opini Edukasi"] as const;

export function NewsListingClient({ initialArticles }: Props) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchFreshArticles = async () => {
      try {
        const res = await publicApi.getNews({ per_page: 50 });
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const formatted: NewsArticle[] = res.data.map((item: any) => ({
            id: item.id.toString(),
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt,
            content: typeof item.content === "string" ? [item.content] : (item.content || []),
            category: (item.category?.name as any) || "Kegiatan",
            date: item.published_at 
              ? new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              : "Terbaru",
            author: item.author?.name || "Humas Dharma Loka",
            authorRole: "Tim Redaksi Sekolah",
            readTime: "3 min baca",
            featuredImage: item.featured_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
            tags: [item.category?.name || "Berita", "Sekolah"],
          }));
          setArticles(formatted);
        }
      } catch {
        // Fallback to initialArticles
      }
    };

    fetchFreshArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "Semua" || article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist" aria-label="Kategori Berita">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary-900 text-white shadow-sm"
                    : "bg-surface-subtle text-slate-700 hover:bg-slate-100 hover:text-primary-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] max-w-sm">
          <label htmlFor="news-search" className="sr-only">
            Cari artikel warta
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            id="news-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, kata kunci, topik..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-subtle border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal"
          />
        </div>

      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1" aria-live="polite">
        <span>
          Menampilkan <strong>{filteredArticles.length}</strong> artikel {selectedCategory !== "Semua" ? `dalam kategori "${selectedCategory}"` : ""}
        </span>
        {(searchQuery || selectedCategory !== "Semua") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Semua");
            }}
            className="text-royal font-semibold hover:underline"
          >
            Reset filter pencarian
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300 space-y-3">
          <div className="text-base font-bold text-primary-950">
            Tidak ada artikel yang sesuai kriteria pencarian
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Coba gunakan kata kunci yang lebih umum atau pilih kategori berita lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Semua");
            }}
            className="px-4 py-2 rounded bg-primary-900 text-white text-xs font-semibold hover:bg-primary-800 transition-colors"
          >
            Kembali ke Semua Kategori
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-shadow duration-200 group"
            >
              <div>
                {/* Image */}
                <Link
                  href={`/news/${article.slug}`}
                  className="block relative aspect-[16/10] bg-slate-900 overflow-hidden"
                >
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded bg-primary-900/90 text-gold-light text-xs font-bold uppercase tracking-wider shadow">
                      {article.category}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-950 font-sans leading-snug group-hover:text-royal transition-colors line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[150px]">
                  {article.author}
                </span>
                <Link
                  href={`/news/${article.slug}`}
                  className="font-semibold text-royal hover:text-royal-dark inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

