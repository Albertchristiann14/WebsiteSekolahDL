"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, Globe, Award, CheckCircle2 } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";

export function HeroSection() {
  return (
    <section
      aria-label="Profil Utama Sekolah Dharma Loka"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white text-primary-950 border-b border-blue-100"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Value Proposition (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Institutional Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-royal" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-royal">
                Pendidikan Terpadu TK • SD • SMP • SMA • SMK di Pekanbaru
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.15] text-primary-950">
              Membentuk Generasi{" "}
              <span className="font-serif italic font-semibold text-royal">
                Berbudi Pekerti Luhur
              </span>
              , Cerdas, dan Siap Menghadapi Masa Depan.
            </h1>

            {/* Lead Paragraph */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Sekolah Dharma Loka Pekanbaru menghadirkan lingkungan belajar yang aman, hangat, dan berprestasi—memadukan pembinaan karakter mulia, penguasaan tiga bahasa (Indonesia, Inggris, Mandarin), serta keunggulan sains dan teknologi.
            </p>

            {/* Reassurance Checklist for Parents */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-primary-900">
                <CheckCircle2 className="w-5 h-5 text-royal shrink-0" />
                <span>Terakreditasi A (Unggul)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-primary-900">
                <CheckCircle2 className="w-5 h-5 text-royal shrink-0" />
                <span>Trilingual Aktif</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-primary-900">
                <CheckCircle2 className="w-5 h-5 text-royal shrink-0" />
                <span>Lingkungan Ramah Anak</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-royal hover:bg-royal-dark rounded-xl shadow-lg shadow-royal/20 transition-all duration-200 group"
              >
                <span>Daftar Siswa Baru (PPDB)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/academics"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-royal bg-white hover:bg-blue-50 border-2 border-blue-200 rounded-xl transition-all duration-200"
              >
                <Compass className="w-5 h-5 text-royal" aria-hidden="true" />
                <span>Lihat Jenjang Pendidikan</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Bright Framed Photography Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-blue-900/10 aspect-[4/5] bg-blue-50">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85"
                alt="Suasana belajar kolaboratif siswa Sekolah Dharma Loka Pekanbaru"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/75 via-primary-950/15 to-transparent" />

              {/* Bottom Caption Inside Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-royal mb-1">
                  Ekosistem Pendidikan Terpadu
                </p>
                <p className="text-sm sm:text-base text-primary-950 font-bold leading-snug">
                  Pendampingan akademik & karakter berkesinambungan dari jenjang TK hingga SMA/SMK.
                </p>
              </div>
            </div>

            {/* Clean White Floating Badge */}
            <div className="hidden sm:flex absolute -top-5 -left-6 bg-white text-primary-950 p-4 rounded-2xl shadow-xl border border-blue-100 items-center gap-3.5 max-w-[260px]">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-royal shrink-0">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-royal">
                  Prestasi Nyata
                </p>
                <p className="text-sm font-extrabold text-primary-950 leading-tight mt-0.5">
                  120+ Medali Akademik & Non-Akademik
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spacious Stats Bar */}
        <div className="mt-16 lg:mt-24 pt-12 border-t border-blue-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {schoolInfo.stats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-blue-100/90 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-royal tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-base font-bold text-primary-950 mb-1">
                  {stat.label}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
