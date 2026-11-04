"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { academicLevels } from "@/data/academics";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AcademicProgramsSection() {
  const [selectedSlug, setSelectedSlug] = useState<string>(academicLevels[1].slug); // Default SD
  const activeProgram =
    academicLevels.find((p) => p.slug === selectedSlug) || academicLevels[0];

  return (
    <section
      className="py-24 lg:py-36 bg-blue-50/40 border-y border-blue-100"
      aria-labelledby="academics-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-16 gap-6">
          <SectionHeader
            tag="5 Jenjang Pendidikan Terpadu"
            title="Jalur Pendidikan Berkesinambungan dari Usia Dini hingga Siap Kuliah & Karier"
            subtitle="Pilih jenjang pendidikan di bawah ini untuk melihat kurikulum, fokus pembinaan, dan keunggulan di setiap tingkat usia."
          />
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-base font-bold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Bandingkan Seluruh Jenjang</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Interactive Level Selector Tabs */}
        <div
          role="tablist"
          aria-label="Pilih Jenjang Pendidikan"
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-10"
        >
          {academicLevels.map((prog) => {
            const isSelected = prog.slug === selectedSlug;
            return (
              <button
                key={prog.slug}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedSlug(prog.slug)}
                className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-royal text-white border-royal shadow-lg shadow-royal/20"
                    : "bg-white text-primary-950 border-blue-100 hover:border-royal/40 hover:bg-blue-50/50"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span
                    className={`text-xl sm:text-2xl font-extrabold tracking-tight uppercase ${
                      isSelected ? "text-white" : "text-primary-950"
                    }`}
                  >
                    {prog.slug}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-blue-50 text-royal"
                    }`}
                  >
                    {prog.shortName.split(" ")[0]}
                  </span>
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium line-clamp-1 ${
                    isSelected ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {prog.levelBadge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Program Showcase Panel */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] bg-blue-50">
              <Image
                src={activeProgram.heroImage}
                alt={activeProgram.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 text-white space-y-2.5">
                <span className="inline-block px-3.5 py-1 rounded-full bg-royal text-white text-xs font-bold uppercase tracking-wider shadow">
                  {activeProgram.levelBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  {activeProgram.name}
                </h3>
                <p className="text-sm sm:text-base text-blue-100">
                  {activeProgram.headline}
                </p>
              </div>
            </div>

            {/* Right Details Column (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-royal">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100">
                    <Clock className="w-4 h-4 text-royal" />
                    <span>{activeProgram.schedule}</span>
                  </span>
                </div>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {activeProgram.overview}
                </p>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Keunggulan & Fokus Pembelajaran {activeProgram.shortName}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeProgram.features.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                      >
                        <CheckCircle2
                          className="w-5 h-5 text-royal shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar: Graduate Profile + Detail Link */}
              <div className="pt-7 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-start gap-3 max-w-md">
                  <Sparkles className="w-5 h-5 text-royal shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-primary-950">Target Lulusan:</strong>{" "}
                    {activeProgram.graduateOutcomes[0]}
                  </p>
                </div>

                <Link
                  href={`/academics/${activeProgram.slug}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-royal text-white hover:bg-royal-dark text-sm sm:text-base font-bold transition-colors shrink-0 shadow-md shadow-royal/15"
                >
                  <span>Detail {activeProgram.shortName}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
