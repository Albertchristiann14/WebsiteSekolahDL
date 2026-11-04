import React from "react";
import type { Metadata } from "next";
import { newsArticles } from "@/data/news";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { NewsListingClient } from "./NewsListingClient";

export const metadata: Metadata = {
  title: "Warta, Pengumuman & Berita Kampus",
  description:
    "Ikuti berita terkini seputar prestasi siswa, kegiatan akademik, pengumuman resmi penerimaan siswa baru, dan dinamika pembelajaran di Sekolah Dharma Loka Pekanbaru.",
};

export default function NewsPage() {
  const breadcrumbItems = [{ label: "Berita & Pengumuman" }];

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Header */}
      <section className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-16 sm:py-24 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-blue-200/80">
              Kabar Kampus Terkini
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Berita, Kegiatan & Pengumuman Resmi
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Dinamika keseharian siswa, rilis prestasi kejuaraan, artikel pendidikan, dan pengumuman resmi dari manajemen Sekolah Dharma Loka Pekanbaru.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-24">
        <NewsListingClient initialArticles={newsArticles} />
      </div>
    </div>
  );
}
