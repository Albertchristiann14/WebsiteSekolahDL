import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  Building, 
  BookOpen, 
  GraduationCap,
  Calendar,
  Phone
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { schoolInfo } from "@/data/schoolInfo";
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

  // Other levels for quick switcher
  const otherLevels = academicLevels.filter((lvl) => lvl.slug !== level.slug);

  return (
    <div className="bg-surface-subtle min-h-screen">
      
      {/* Hero Banner */}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded bg-gold/20 text-gold-light text-xs font-semibold uppercase tracking-wider border border-gold/30">
                {level.levelBadge} • {level.ageRange}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
                {level.name}
              </h1>
              <p className="text-lg sm:text-xl text-gold-light font-serif italic max-w-2xl">
                "{level.headline}"
              </p>
              <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
                {level.overview}
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl bg-primary-900/80 border border-slate-700 space-y-3 text-xs">
              <div className="text-gold font-bold uppercase tracking-wider text-[11px]">
                Informasi Singkat
              </div>
              <div className="flex items-center justify-between py-2 border-b border-primary-800">
                <span className="text-slate-400">Rentang Usia:</span>
                <span className="font-semibold text-white">{level.ageRange}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-primary-800">
                <span className="text-slate-400">Jam Belajar:</span>
                <span className="font-semibold text-white">{level.schedule}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400">Bahasa Pengantar:</span>
                <span className="font-semibold text-white">Indonesia, Inggris, Mandarin</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admissions"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-gold text-primary-950 font-bold text-xs hover:bg-gold-light transition-colors"
                >
                  <span>Daftar {level.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Section 1: Visual Feature & Core Strengths */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card bg-slate-900">
            <Image
              src={level.heroImage}
              alt={level.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 font-sans">
              Karakteristik & Keunggulan Khusus {level.shortName}
            </h2>
            <p className="text-slate-text leading-relaxed text-sm sm:text-base">
              Setiap tahapan usia memiliki kebutuhan emosional dan intelektual yang unik. Rancangan pembelajaran di {level.shortName} memadukan kurikulum yang menantang dengan bimbingan personal yang hangat.
            </p>
            <ul className="space-y-3">
              {level.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200/80 shadow-subtle">
                  <CheckCircle2 className="w-5 h-5 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-800">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Detailed Curriculum Modules */}
        <section className="space-y-8">
          <SectionHeader
            tag="Kurikulum & Pembelajaran"
            title="Pendekatan Pedagogis & Modul Pembelajaran Unggulan"
            subtitle="Memadukan standar Kurikulum Merdeka Kemendikbudristek dengan pengayaan kurikulum mandiri berwawasan internasional."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {level.curriculumHighlights.map((curr, idx) => (
              <div
                key={curr.title}
                className="p-8 rounded-xl bg-white border border-slate-200 shadow-card hover:border-gold/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-900 text-gold flex items-center justify-center font-bold text-sm mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-primary-950 font-sans mb-3">
                    {curr.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {curr.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-royal">
                  Kurikulum Terintegrasi
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Graduate Outcomes / Profil Lulusan */}
        <section className="p-8 sm:p-12 rounded-2xl bg-primary-950 text-white border border-primary-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
              Profil Lulusan & Capaian Belajar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white">
              Standar Kompetensi yang Dibawa Siswa Pasca Kelulusan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {level.graduateOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-primary-900/70 border border-primary-800 flex items-start gap-4"
              >
                <Award className="w-6 h-6 text-gold shrink-0 mt-1" aria-hidden="true" />
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Facilities & Extracurriculars Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Facilities Box */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-primary-900">
              <Building className="w-6 h-6 text-royal" aria-hidden="true" />
              <h3 className="text-xl font-bold font-sans text-primary-950">
                Sarana Khusus {level.shortName}
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Fasilitas penunjang aktivitas belajar yang didesain khusus sesuai karakteristik perkembangan siswa.
            </p>
            <ul className="space-y-2.5 pt-2">
              {level.facilities.map((fac, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-dark" aria-hidden="true" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Extracurriculars Box */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 text-primary-900">
              <Sparkles className="w-6 h-6 text-gold" aria-hidden="true" />
              <h3 className="text-xl font-bold font-sans text-primary-950">
                Klub & Ekstrakurikuler Pilihan
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              Mengasah bakat seni, ketangkasan olahraga, dan kepemimpinan di luar jam pelajaran formal.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {level.extracurriculars.map((ekskul, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  {ekskul}
                </span>
              ))}
            </div>
          </div>

        </section>

        {/* Section 5: Other Levels Switcher */}
        <section className="pt-8 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-primary-950 font-sans">
              Jelajahi Jenjang Pendidikan Lainnya di Dharma Loka
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherLevels.map((lvl) => (
              <Link
                key={lvl.slug}
                href={`/academics/${lvl.slug}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-royal hover:shadow-md transition-all text-center group"
              >
                <div className="text-xs font-bold text-royal uppercase tracking-wider mb-1">
                  Jenjang {lvl.slug.toUpperCase()}
                </div>
                <div className="text-sm font-bold text-primary-950 group-hover:text-royal transition-colors">
                  {lvl.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
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

