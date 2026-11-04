import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Building,
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return academicLevels.map((lvl) => ({
    slug: lvl.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const level = academicLevels.find((lvl) => lvl.slug === slug);
  if (!level) return { title: "Jenjang Pendidikan Tidak Ditemukan" };

  return {
    title: `${level.name} - Sekolah Dharma Loka`,
    description: `${level.overview.slice(0, 160)}...`,
  };
}

export default async function AcademicDetailPage({ params }: Props) {
  const { slug } = await params;
  const level = academicLevels.find((lvl) => lvl.slug === slug);

  if (!level) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Akademik", href: "/academics" },
    { label: level.shortName },
  ];

  const otherLevels = academicLevels.filter((lvl) => lvl.slug !== level.slug);

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Hero Banner */}
      <section className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-16 sm:py-24 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs sm:text-sm font-bold uppercase tracking-wider border border-blue-200/80">
                {level.levelBadge} • {level.ageRange}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
                {level.name}
              </h1>
              <p className="text-lg sm:text-2xl text-royal font-serif italic max-w-2xl">
                &ldquo;{level.headline}&rdquo;
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                {level.overview}
              </p>
            </div>

            <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-lg shadow-blue-900/5 space-y-4 text-sm">
              <div className="text-royal font-extrabold uppercase tracking-wider text-xs">
                Ringkasan Jenjang {level.shortName}
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                <span className="text-slate-500">Rentang Usia:</span>
                <span className="font-bold text-primary-950">{level.ageRange}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                <span className="text-slate-500">Jam Belajar:</span>
                <span className="font-bold text-primary-950">{level.schedule}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Bahasa Pengantar:</span>
                <span className="font-bold text-primary-950">Indonesia, Inggris, Mandarin</span>
              </div>
              <div className="pt-3">
                <Link
                  href="/admissions"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-dark transition-colors shadow-md shadow-royal/15"
                >
                  <span>Daftar {level.shortName} Sekarang</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20 sm:py-28 space-y-24">
        {/* Section 1: Visual Feature & Core Strengths */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-blue-100 bg-blue-50">
            <Image
              src={level.heroImage}
              alt={level.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
              Karakteristik & Keunggulan Khusus {level.shortName}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Setiap tahapan usia memiliki kebutuhan emosional dan intelektual yang unik. Rancangan pembelajaran di {level.shortName} memadukan kurikulum yang terstruktur dengan bimbingan personal yang hangat.
            </p>
            <ul className="space-y-3.5">
              {level.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-blue-50/40 border border-blue-100">
                  <CheckCircle2 className="w-5 h-5 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm sm:text-base font-medium text-primary-950">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Detailed Curriculum Modules */}
        <section className="space-y-10">
          <SectionHeader
            tag="Kurikulum & Pembelajaran"
            title="Pendekatan Pedagogis & Modul Pembelajaran Unggulan"
            subtitle="Memadukan standar Kurikulum Nasional dengan pengayaan bahasa, sains, dan pembinaan karakter."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {level.curriculumHighlights.map((curr, idx) => (
              <div
                key={curr.title}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal border border-blue-100 flex items-center justify-center font-extrabold text-base mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-primary-950 mb-3">
                    {curr.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {curr.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-royal uppercase tracking-wider">
                  Kurikulum Terintegrasi
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Graduate Outcomes */}
        <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-royal to-blue-800 text-white shadow-xl shadow-royal/15">
          <div className="max-w-3xl mb-10">
            <span className="text-xs sm:text-sm font-bold text-blue-100 uppercase tracking-wider block mb-2">
              Profil Lulusan & Capaian Belajar
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Kompetensi yang Dibawa Siswa Setelah Menyelesaikan Jenjang {level.shortName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {level.graduateOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white/10 border border-white/20 flex items-start gap-4"
              >
                <Award className="w-6 h-6 text-white shrink-0 mt-1" aria-hidden="true" />
                <p className="text-sm sm:text-base text-blue-50 leading-relaxed">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Facilities & Extracurriculars Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/40 border border-blue-100 space-y-5">
            <div className="flex items-center gap-3 text-primary-950">
              <Building className="w-6 h-6 text-royal" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-primary-950">
                Sarana Khusus {level.shortName}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Fasilitas penunjang aktivitas belajar yang didesain khusus sesuai perkembangan siswa.
            </p>
            <ul className="space-y-3 pt-2">
              {level.facilities.map((fac, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-royal" aria-hidden="true" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/40 border border-blue-100 space-y-5">
            <div className="flex items-center gap-3 text-primary-950">
              <Sparkles className="w-6 h-6 text-royal" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-primary-950">
                Klub & Ekstrakurikuler Pilihan
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Mengasah bakat seni, ketangkasan olahraga, dan kepemimpinan di luar jam pelajaran formal.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {level.extracurriculars.map((ekskul, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white border border-blue-100 text-sm font-bold text-primary-950 shadow-sm"
                >
                  {ekskul}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Other Levels Switcher */}
        <section className="pt-10 border-t border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-xl font-extrabold text-primary-950">
              Jelajahi Jenjang Pendidikan Lainnya di Dharma Loka
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {otherLevels.map((lvl) => (
              <Link
                key={lvl.slug}
                href={`/academics/${lvl.slug}`}
                className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 hover:border-royal hover:bg-white hover:shadow-md transition-all text-center group"
              >
                <div className="text-xs font-bold text-royal uppercase tracking-wider mb-1">
                  Jenjang {lvl.slug.toUpperCase()}
                </div>
                <div className="text-base font-extrabold text-primary-950 group-hover:text-royal transition-colors">
                  {lvl.name}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {lvl.ageRange}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
