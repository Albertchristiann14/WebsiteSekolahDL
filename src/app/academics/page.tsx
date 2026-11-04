import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Languages,
  Cpu,
  Compass,
  Clock,
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Program Akademik & Jenjang Pendidikan",
  description:
    "Jelajahi jenjang pendidikan terpadu di Sekolah Dharma Loka Pekanbaru: TK, SD, SMP, SMA, dan SMK dengan keunggulan kurikulum trilingual, STEM, dan budi pekerti.",
};

export default function AcademicsPage() {
  const breadcrumbItems = [{ label: "Akademik & Jenjang" }];

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Page Header */}
      <section className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-16 sm:py-24 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-blue-200/80">
              Pendidikan Terpadu Berkelanjutan
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Jenjang Pendidikan & Keunggulan Kurikulum
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Memandu putra-putri Anda melangkah dari fondasi karakter masa kanak-kanak hingga kesiapan karier industri dan gerbang perguruan tinggi terkemuka.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Curriculum Pillars Banner */}
      <section className="py-14 bg-blue-50/40 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-royal flex items-center justify-center shrink-0">
                <Languages className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-primary-950 mb-1">
                  Literasi Trilingual Aktif
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Kefasihan Bahasa Indonesia yang baik, Bahasa Inggris aktif, dan penguasaan Bahasa Mandarin berjenjang.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-royal flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-primary-950 mb-1">
                  Sains, Riset & STEAM
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pembelajaran berbasis laboratorium dan pemecahan masalah nyata yang mengasah nalar kritis serta teknologi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-royal flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-primary-950 mb-1">
                  Pembinaan Budi Pekerti
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Penanaman etika, sopan santun, dan empati sosial yang membentuk kedisiplinan serta akhlak mulia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Level List */}
      <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
        {academicLevels.map((lvl, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={lvl.slug}
              id={lvl.slug}
              className="bg-white rounded-3xl shadow-md shadow-blue-900/5 border border-blue-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Photo Column */}
                <div
                  className={`lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-blue-50 ${
                    isEven ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={lvl.heroImage}
                    alt={lvl.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-royal text-white text-xs font-bold shadow">
                      {lvl.levelBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-100">
                    <div className="flex items-center gap-2 text-royal uppercase tracking-wider text-xs font-bold">
                      <Clock className="w-4 h-4 text-royal" aria-hidden="true" />
                      <span>Jadwal Pembelajaran</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-primary-950 mt-1">
                      {lvl.schedule}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between ${
                    isEven ? "lg:order-1" : ""
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-royal mb-2">
                        Jenjang {lvl.name} • {lvl.ageRange}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950 leading-tight">
                        {lvl.headline}
                      </h2>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                      {lvl.overview}
                    </p>

                    {/* Features List */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5">
                        Keunggulan Utama Jenjang {lvl.shortName}
                      </h3>
                      <ul className="space-y-3">
                        {lvl.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curriculums preview */}
                    <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2.5">
                      <div className="text-xs font-bold text-royal uppercase tracking-wider">
                        Fokus Kurikulum:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-primary-950">
                        {lvl.curriculumHighlights.map((curr) => (
                          <div key={curr.title} className="font-semibold">
                            • {curr.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Link
                      href={`/academics/${lvl.slug}`}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-sm sm:text-base transition-colors shadow-md shadow-royal/15"
                    >
                      <span>Lihat Detail Kurikulum {lvl.shortName}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/admissions"
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-bold text-royal hover:underline"
                    >
                      <span>Daftar PPDB Jenjang Ini →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
