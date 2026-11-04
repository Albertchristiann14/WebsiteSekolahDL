import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Languages, 
  Cpu, 
  Compass, 
  Clock, 
  Sparkles 
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Program Akademik & Jenjang Pendidikan",
  description:
    "Jelajahi jenjang pendidikan terpadu di Sekolah Dharma Loka Pekanbaru: TK, SD, SMP, SMA, dan SMK dengan keunggulan kurikulum trilingual, STEM, dan budi pekerti.",
};

export default function AcademicsPage() {
  const breadcrumbItems = [{ label: "Akademik & Jenjang" }];

  return (
    <div className="bg-surface-subtle min-h-screen">
      
      {/* Page Header */}
      <section className="bg-primary-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#D6A84F 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} className="text-slate-300" />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded bg-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider mb-3 border border-gold/30">
              Pendidikan Terpadu Berkelanjutan
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
              Jenjang Pendidikan & Keunggulan Kurikulum
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Memandu anak melangkah dari fondasi karakter masa kanak-kanak hingga kesiapan karir industri global dan gerbang perguruan tinggi terkemuka.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Curriculum Pillars Banner */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center shrink-0">
                <Languages className="w-6 h-6 text-primary-900" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-950 mb-1">
                  Trilingual Literacy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kefasihan Bahasa Indonesia yang baku, Bahasa Inggris aktif dalam pergaulan saintifik, dan dasar aksara Mandarin berjenjang HSK.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-primary-900" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-950 mb-1">
                  Inquiry & STEM Learning
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pembelajaran berbasis laboratorium dan pemecahan masalah kontekstual yang mengasah nalar kritis serta keterampilan komputasi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-primary-900" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-950 mb-1">
                  Holistic Character Building
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Penanaman budi pekerti, mindfulness, dan empati sosial yang membentuk kedisiplinan dan akhlak terhormat.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Level List */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {academicLevels.map((lvl, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={lvl.slug}
              id={lvl.slug}
              className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                
                {/* Photo Column */}
                <div className={`lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-slate-900 ${isEven ? "lg:order-2" : ""}`}>
                  <Image
                    src={lvl.heroImage}
                    alt={lvl.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1.5 rounded bg-primary-900/90 text-gold-light text-xs font-bold border border-gold/40">
                      {lvl.levelBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-primary-950/90 backdrop-blur-sm text-xs text-slate-200 border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                      <span>Jam Pembelajaran</span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {lvl.schedule}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between ${isEven ? "lg:order-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-royal mb-1">
                        Jenjang {lvl.name} • {lvl.ageRange}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 font-sans leading-tight">
                        {lvl.headline}
                      </h2>
                    </div>

                    <p className="text-base text-slate-text leading-relaxed">
                      {lvl.overview}
                    </p>

                    {/* Features List */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Karakteristik & Keunggulan Jenjang
                      </h3>
                      <ul className="space-y-2.5">
                        {lvl.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curriculums preview */}
                    <div className="p-4 rounded-lg bg-surface-subtle border border-slate-200/80 space-y-2">
                      <div className="text-xs font-bold text-primary-950 uppercase tracking-wider">
                        Sorotan Kurikulum Utama:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {lvl.curriculumHighlights.map((curr) => (
                          <div key={curr.title} className="font-medium text-slate-800">
                            • {curr.title}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Link
                      href={`/academics/${lvl.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition-colors shadow-sm"
                    >
                      <span>Lihat Halaman Detail {lvl.shortName}</span>
                      <ArrowRight className="w-4 h-4 text-gold" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/admissions"
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-royal hover:underline"
                    >
                      <span>Info Pendaftaran Jenjang Ini →</span>
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

