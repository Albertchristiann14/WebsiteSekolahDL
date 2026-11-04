"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Bell } from "lucide-react";
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
                    const formatted = newsRes.data.map((item: any) => ({
                        id: item.id.toString(),
                        slug: item.slug,
                        title: item.title,
                        excerpt: item.excerpt,
                        category: item.category?.name || "Umum",
                        date: item.published_at
                            ? new Date(item.published_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "Terbaru",
                        readTime: "3 menit baca",
                        featuredImage:
                            item.featured_image ||
                            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
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
        <section
            className="py-24 lg:py-36 bg-blue-50/30 border-t border-blue-100"
            aria-labelledby="news-heading"
        >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
                {/* Active Announcement Banner */}
                {announcements.length > 0 && (
                    <div className="mb-14 space-y-4">
                        {announcements.map((ann) => (
                            <div
                                key={ann.id}
                                className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start sm:items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-royal flex items-center justify-center shrink-0">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="inline-block text-xs font-bold uppercase tracking-wider bg-blue-50 text-royal px-2.5 py-0.5 rounded-full mr-2.5 mb-1 sm:mb-0">
                                            Pengumuman Sekolah
                                        </span>
                                        <strong className="text-base font-extrabold text-primary-950">
                                            {ann.title}
                                        </strong>
                                        <p className="text-sm text-slate-600 mt-1">
                                            {ann.content}
                                        </p>
                                    </div>
                                </div>
                                {ann.valid_until && (
                                    <span className="text-xs font-semibold text-royal bg-blue-50 px-3 py-1.5 rounded-lg shrink-0">
                                        Berlaku s/d {new Date(ann.valid_until).toLocaleDateString("id-ID")}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-20 gap-6">
                    <SectionHeader
                        tag="Berita & Pengumuman"
                        title="Kabar Terkini dan Agenda Kegiatan Sekolah Dharma Loka"
                        subtitle="Ikuti informasi kegiatan belajar, prestasi siswa, serta pengumuman resmi bagi orang tua dan wali murid."
                    />
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-base font-bold text-royal hover:text-royal-dark shrink-0 group"
                    >
                        <span>Lihat Semua Berita</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </div>

                {/* Editorial Split Grid: 1 Featured + 3 Side Articles */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Main Featured Article (Col 7) */}
                    <article className="lg:col-span-7 bg-white rounded-3xl border border-blue-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                        <div>
                            <Link
                                href={`/news/${featured.slug}`}
                                className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-blue-50 mb-6"
                            >
                                <Image
                                    src={featured.featuredImage}
                                    alt={featured.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 55vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3.5 py-1.5 rounded-full bg-royal text-white text-xs font-bold uppercase tracking-wider shadow">
                                        {featured.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-royal" aria-hidden="true" />
                                    <span>{featured.date}</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-royal" aria-hidden="true" />
                                    <span>{featured.readTime || "3 menit baca"}</span>
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950 mb-4 group-hover:text-royal transition-colors leading-snug">
                                <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
                            </h3>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed line-clamp-3 mb-6">
                                {featured.excerpt}
                            </p>
                        </div>

                        <Link
                            href={`/news/${featured.slug}`}
                            className="inline-flex items-center gap-2 text-base font-bold text-royal group-hover:text-royal-dark"
                        >
                            <span>Baca Artikel Selengkapnya</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                    </article>

                    {/* Side Column (Col 5): 3 Spacious Cards */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                        {sideArticles.map((article, idx) => (
                            <article
                                key={article.id || idx}
                                className="p-5 sm:p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                            >
                                <div className="flex gap-5 items-center">
                                    <Link
                                        href={`/news/${article.slug}`}
                                        className="relative w-28 h-28 sm:w-36 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-blue-50"
                                    >
                                        <Image
                                            src={article.featuredImage}
                                            alt={article.title}
                                            fill
                                            sizes="150px"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-semibold">
                                            <span className="text-royal uppercase">
                                                {article.category}
                                            </span>
                                            <span>•</span>
                                            <span>{article.date}</span>
                                        </div>
                                        <h4 className="font-bold text-base sm:text-lg text-primary-950 group-hover:text-royal transition-colors line-clamp-2 leading-snug">
                                            <Link href={`/news/${article.slug}`}>{article.title}</Link>
                                        </h4>
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
