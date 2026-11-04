"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { academicLevels } from "@/data/academics";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AcademicProgramsSection() {
  const [activeSlug, setActiveSlug] = useState<string>("sd");
  const activeLevel = academicLevels.find((lvl) => lvl.slug === activeSlug) || academicLevels[1];

  return (
    <section className="py-20 lg:py-28 bg-surface-canvas border-y border-slate-200/80" aria-labelledby="academic-section-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <SectionHeader
            tag="Jenjang Pendidikan"
            title="Satu Ekosistem Terpadu dari Usia Dini Hingga Pendidikan Menengah"
            subtitle="Kurikulum progresif yang berkesinambungan membimbing putra-putri Anda melangkah dari fondasi karakter dasar hingga kesiapan karir industri dan perguruan tinggi dunia."
          />
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Bandingkan Semua Jenjang</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist" aria-label="Pilih Jenjang Sekolah">
          {academicLevels.map((lvl) => {
            const isSelected = lvl.slug === activeSlug;
            return (
              <button
                key={lvl.slug}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${lvl.slug}`}
                id={`tab-${lvl.slug}`}
                onClick={() => setActiveSlug(lvl.slug)}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-primary-900 text-white shadow-md border-b-2 border-gold"
                    : "bg-white text-slate-700 hover:text-primary-900 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                  isSelected ? "bg-primary-800 text-gold" : "bg-slate-100 text-slate-600"
                }`}>
                  {lvl.slug.toUpperCase()}
                </span>
                <span>{lvl.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Program Showcase (Editorial Split-Panel) */}
        <div
          id={`panel-${activeLevel.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeLevel.slug}`}
          className="bg-white rounded-xl shadow-card border border-slate-200/90 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Photography Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[480px] bg-slate-900">
              <Image
                src={activeLevel.heroImage}
                alt={`Pembelajaran di jenjang ${activeLevel.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
              
              {/* Level Badge Overlay */}
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-md bg-primary-900/90 backdrop-blur-sm text-gold-light text-xs font-bold border border-gold/40">
                  {activeLevel.levelBadge}
                </span>
              </div>

              {/* Bottom Schedule Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-primary-950/90 backdrop-blur-sm border border-slate-700/60 text-xs text-slate-200">
                <div className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                  Jadwal Waktu Belajar
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {activeLevel.schedule}
                </div>
              </div>
            </div>

            {/* Informational Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                
                <div>
                  <div className="text-xs font-semibold text-royal uppercase tracking-wider mb-1">
                    {activeLevel.ageRange}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-primary-950 leading-tight">
                    {activeLevel.headline}
                  </h3>
                </div>

                <p className="text-base text-slate-text leading-relaxed">
                  {activeLevel.overview}
                </p>

                {/* Key Program Highlights */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Keunggulan & Kurikulum Utama
                  </h4>
                  <ul className="space-y-2.5">
                    {activeLevel.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extracurriculars Preview */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-500 mr-2">
                    Ekstrakurikuler Pilihan:
                  </span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                    {activeLevel.extracurriculars.map((ekskul, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-xs bg-slate-100 text-slate-700 font-medium"
                      >
                        {ekskul}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <Link
                  href={`/academics/${activeLevel.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary-900 text-white font-semibold text-sm hover:bg-primary-800 transition-colors shadow-sm"
                >
                  <span>Pelajari Selengkapnya {activeLevel.shortName}</span>
                  <ArrowRight className="w-4 h-4 text-gold" aria-hidden="true" />
                </Link>
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-royal hover:text-royal-dark transition-colors"
                >
                  <span>Daftar Jenjang Ini</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

