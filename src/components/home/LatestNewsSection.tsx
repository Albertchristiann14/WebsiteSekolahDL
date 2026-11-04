"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Tag, Bell } from "lucide-react";
import { newsArticles as fallbackNews } from "@/data/news";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { publicApi } from "@/lib/api";

export function LatestNewsSection() {
  const [news, setNews] = useState<any[]>(fallbackNews);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const [newsRes, annRes] = await Promise.all([
          publicApi.getNews({ per_page: 4 }),
          publicApi.getAnnouncements(),
        ]);

        if (newsRes.status === 200 && Array.isArray(newsRes.data) && newsRes.data.length > 0) {
          // Normalize API news to component structure
          const formatted = newsRes.data.map((item: any) => ({
            id: item.id.toString(),
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt,
            category: item.category?.name || "Umum",
            date: item.published_at 
              ? new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              : "Terbaru",
            readTime: "3 min baca",
            featuredImage: item.featured_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
          }));
          setNews(formatted);
        }

        if (annRes.status === 200 && Array.isArray(annRes.data)) {
          setAnnouncements(annRes.data.slice(0, 2));
        }
      } catch {
        // Fallback data is preserved
      }
    };

    fetchDynamicData();
  }, []);

  const featured = news[0] || fallbackNews[0];
  const sideArticles = news.slice(1, 4);

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200/80" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Announcement Alert Banner if any */}
        {announcements.length > 0 && (
          <div className="mb-12 space-y-3">
            {announcements.map((ann) => (
              <div 
                key={ann.id}
                className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-800 px-2 py-0.5 rounded mr-2">
                      Pengumuman Resmi
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">{ann.title}</strong>
                    <span className="text-xs text-slate-600 block sm:inline sm:ml-2">
                      {ann.content}
                    </span>
                  </div>
                </div>
                {ann.valid_until && (
                  <span className="text-[11px] font-mono text-amber-800 shrink-0">
                    s/d {new Date(ann.valid_until).toLocaleDateString("id-ID")}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <SectionHeader
            tag="Warta & Informasi"
            title="Kabar Terkini, Pengumuman, dan Jejak Inspirasi Kampus"
            subtitle="Ikuti dinamika kegiatan, prestasi terkini, serta pengumuman penting seputar agenda akademik dan kesiswaan Sekolah Dharma Loka."
          />
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Semua Berita</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Editorial Split Grid: 1 Big Featured + 3 Side Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Featured Article (Col 7) */}
          <article className="lg:col-span-7 flex flex-col justify-between group">
            <div>
              <Link href={`/news/${featured.slug}`} className="block relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 shadow-md mb-6">
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-royal text-white text-xs font-bold uppercase tracking-wider shadow">
                    {featured.category}
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{featured.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{featured.readTime || "3 min"}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary-950 mb-3 group-hover:text-royal transition-colors leading-snug">
                <Link href={`/news/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
                {featured.excerpt}
              </p>
            </div>

            <Link
              href={`/news/${featured.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-royal group-hover:text-royal-dark mt-2"
            >
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </article>

          {/* Side Column (Col 5): 3 Compact Articles */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-slate-200">
            {sideArticles.map((article, idx) => (
              <article key={article.id || idx} className="py-6 first:pt-0 last:pb-0 group">
                <div className="flex gap-4 sm:gap-5">
                  <Link
                    href={`/news/${article.slug}`}
                    className="relative w-28 h-24 sm:w-36 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-slate-900 shadow-sm"
                  >
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5 font-medium">
                        <span className="text-royal font-semibold uppercase">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-primary-950 group-hover:text-royal transition-colors line-clamp-2 leading-snug">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-1 hidden sm:block">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
