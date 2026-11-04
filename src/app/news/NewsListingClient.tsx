"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Bell,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { newsArticles, NewsArticle } from "@/data/news";
import { schoolEvents, buildGoogleCalendarUrl } from "@/data/events";
import { Badge, Card } from "@/components/ui/DesignSystem";
import { publicApi } from "@/lib/api";

export function NewsListingClient({
  initialArticles,
}: {
  initialArticles?: NewsArticle[];
} = {}) {
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "agenda">("berita");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles || newsArticles);
  const [announcements, setAnnouncements] = useState<any[]>([
    {
      id: "ann-1",
      title: "Pembukaan Pendaftaran SPMB Gelombang 1 (Early Bird) T.A. 2026/2027",
      content:
        "Pendaftaran calon peserta didik baru jenjang TK, SD, SMP, dan SMA Dharma Loka Pekanbaru resmi dibuka. Dapatkan potongan Uang Pangkal hingga 50% untuk jalur prestasi.",
      priority: "important",
      date: "15 Februari 2026",
    },
    {
      id: "ann-2",
      title: "Jadwal Pelaksanaan Open House & Trial Class Gratis TK-SD",
      content:
        "Kami mengundang calon orang tua murid untuk mengikuti Campus Tour dan kelas percobaan gratis pada Sabtu, 16 Mei 2026 pukul 08.00 WIB.",
      priority: "normal",
      date: "02 Maret 2026",
    },
  ]);

  const itemsPerPage = 6;

  useEffect(() => {
    let mounted = true;
    publicApi
      .getNews({ limit: 24 })
      .then((res) => {
        if (!mounted || res.status !== 200 || !res.data) return;
        const rawList = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).items)
          ? (res.data as any).items
          : [];
        if (rawList.length > 0) {
          const mapped: NewsArticle[] = rawList.map((item: any) => ({
            id: String(item.id),
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt || "",
            content: item.content
              ? String(item.content).split(/\n\n+/)
              : [item.excerpt || ""],
            category: item.category?.name || "Pengumuman Resmi",
            date: item.published_at
              ? new Date(item.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Terbaru",
            author: item.author?.name || "Tim Humas Dharma Loka",
            readTime: "4 menit baca",
            image:
              item.featured_image ||
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
            isFeatured: Boolean(item.is_featured),
            isDemo: false,
          }));
          setArticles(mapped);
        }
      })
      .catch(() => {});

    publicApi
      .getAnnouncements()
      .then((res) => {
        if (mounted && res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          setAnnouncements(res.data);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["Semua"]);
    articles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat =
        selectedCategory === "Semua" || a.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / itemsPerPage)
  );
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Kalender Bulanan Juni 2026 (30 hari)
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const eventDayMap: Record<number, typeof schoolEvents> = {};
  schoolEvents.forEach((evt) => {
    const day = Number(evt.date.split("-")[2]);
    if (!eventDayMap[day]) eventDayMap[day] = [];
    eventDayMap[day].push(evt);
  });

  return (
    <div className="space-y-10">
      {/* Main Section Tabs: Berita / Pengumuman / Agenda & Kalender */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "berita", label: "Berita & Artikel", icon: Newspaper },
            { id: "pengumuman", label: "Pengumuman Resmi", icon: Bell },
            {
              id: "agenda",
              label: "Agenda & Kalender Bulanan",
              icon: Calendar,
            },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer ${
                  active
                    ? "bg-royal text-white shadow-md shadow-royal/20"
                    : "bg-blue-50/70 hover:bg-blue-100 text-primary-950 border border-blue-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "berita" && (
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari judul berita atau kegiatan..."
              className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white border border-blue-200 text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
        )}
      </div>

      {/* TAB 1: DAFTAR BERITA DENGAN KATEGORI & PAGINATION */}
      {activeTab === "berita" && (
        <div className="space-y-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary-950 text-white"
                    : "bg-blue-50/60 hover:bg-blue-100 text-slate-700 border border-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {paginatedArticles.length === 0 ? (
            <Card className="p-14 text-center space-y-3">
              <p className="text-lg font-extrabold text-primary-950">
                Artikel Berita Tidak Ditemukan
              </p>
              <p className="text-sm text-slate-500">
                Silakan gunakan kata kunci lain atau pilih kategori &ldquo;Semua&rdquo;.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {paginatedArticles.map((article) => (
                <Card
                  key={(article as any).id || article.slug}
                  className="overflow-hidden flex flex-col justify-between group hover:border-royal/50 transition-all"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-blue-50 overflow-hidden">
                      <Image
                        src={
                          (article as any).featuredImage ||
                          (article as any).image ||
                          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 text-royal text-xs font-extrabold shadow-xs">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-primary-950 leading-snug group-hover:text-royal transition-colors">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-royal"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-11 h-11 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-primary-950 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 rounded-xl text-xs font-extrabold cursor-pointer ${
                      currentPage === page
                        ? "bg-royal text-white"
                        : "bg-white border border-blue-200 text-primary-950 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="w-11 h-11 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-primary-950 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PENGUMUMAN RESMI SEKOLAH */}
      {activeTab === "pengumuman" && (
        <div className="space-y-4 max-w-4xl">
          {announcements.map((ann, idx) => (
            <Card key={ann.id || idx} className="p-6 sm:p-7 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge
                  variant={ann.priority === "important" ? "gold" : "blue"}
                >
                  {ann.priority === "important"
                    ? "Pengumuman Penting"
                    : "Siaran Resmi Sekolah"}
                </Badge>
                <span className="text-xs font-semibold text-slate-500">
                  {ann.date ||
                    (ann.created_at
                      ? new Date(ann.created_at).toLocaleDateString("id-ID")
                      : "Tahun Ajaran 2026/2027")}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-primary-950">
                {ann.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {ann.content}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 3: AGENDA SEKOLAH (DAFTAR + KALENDER BULANAN + TAMBAH KE KALENDER) */}
      {activeTab === "agenda" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kalender Bulanan Visual (5 Cols) */}
          <Card className="lg:col-span-5 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div>
                <span className="text-xs font-extrabold uppercase text-royal">
                  Kalender Bulanan
                </span>
                <h3 className="text-lg font-extrabold text-primary-950">
                  Mei – Juni 2026
                </h3>
              </div>
              <Badge variant="blue">{schoolEvents.length} Agenda</Badge>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-slate-400">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((day) => {
                const hasEvents = Boolean(eventDayMap[day]);
                return (
                  <div
                    key={day}
                    title={
                      hasEvents
                        ? eventDayMap[day].map((e) => e.title).join(", ")
                        : undefined
                    }
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold border ${
                      hasEvents
                        ? "bg-royal text-white border-royal shadow-xs"
                        : "bg-slate-50/70 text-slate-700 border-slate-100"
                    }`}
                  >
                    <span>{day}</span>
                    {hasEvents && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-500">
              * Tanggal berwarna biru menandakan adanya agenda resmi sekolah. Klik tombol <strong>+ Tambah ke Kalender</strong> di samping untuk menyimpan pengingat di HP Anda.
            </p>
          </Card>

          {/* Daftar Agenda Lengkap (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {schoolEvents.map((evt) => (
              <Card key={evt.id} className="p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="blue">{evt.category}</Badge>
                  <span className="text-xs font-mono font-bold text-royal">
                    Tanggal: {evt.date}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-primary-950">
                  {evt.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-royal" />
                      {evt.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-royal" />
                      {evt.location}
                    </span>
                  </div>
                  <a
                    href={buildGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-royal text-royal hover:text-white font-extrabold transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Tambah ke Kalender</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
