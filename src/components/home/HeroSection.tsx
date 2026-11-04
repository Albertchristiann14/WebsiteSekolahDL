"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Award, Users } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";

export function HeroSection() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden" aria-label="Hero Utama">
      {/* Editorial Decorative Background Elements */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#D6A84F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-royal/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary-900/90 border border-gold/30 text-xs text-gold-light shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              <span className="font-semibold tracking-wide">Pendidikan Terpadu TK • SD • SMP • SMA • SMK</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-[1.15]">
              Tempat Setiap Anak{" "}
              <span className="font-serif italic font-normal text-gold-light block sm:inline">
                Menemukan Potensi
              </span>{" "}
              & Membina Budi Pekerti
            </h1>

            {/* Subtitle / Description */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Sekolah Dharma Loka Pekanbaru memadukan keunggulan akademik, sains-teknologi abad 21, kefasihan trilingual, dan penanaman budi pekerti luhur dalam ekosistem belajar yang inspiratif.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/academics"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md text-base font-semibold text-primary-950 bg-gold hover:bg-gold-light active:bg-gold-dark shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-royal"
              >
                <span>Jelajahi Program Sekolah</span>
                <ArrowRight className="w-5 h-5 text-primary-950" aria-hidden="true" />
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md text-base font-semibold text-white bg-primary-900/90 hover:bg-primary-800 border border-slate-700 hover:border-gold/50 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-royal"
              >
                <span>Pendaftaran PPDB 2027/2028</span>
              </Link>
            </div>

            {/* Value Indicators Strip */}
            <div className="pt-6 border-t border-primary-900/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">A</div>
                <div className="text-xs text-slate-400 font-medium">Akreditasi Unggul [DEMO]</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">35+</div>
                <div className="text-xs text-slate-400 font-medium">Tahun Mengabdi</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">5 Jenjang</div>
                <div className="text-xs text-slate-400 font-medium">Satu Kampus Terpadu</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composition with Layered Photography (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Large Photography */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-primary-800/80 aspect-[4/5] bg-primary-900">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="Siswa-siswi Sekolah Dharma Loka berkolaborasi dalam suasana pembelajaran modern"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                
                {/* Photo Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-lg bg-primary-950/80 backdrop-blur-sm border border-slate-700/60 text-xs text-slate-200">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                    <span>Kolaborasi Pembelajaran Inovatif</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Menumbuhkan jiwa kepemimpinan & nalar kritis sejak dini
                  </div>
                </div>
              </div>

              {/* Floating Floating Accent Card (Bottom Left) */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 p-4 rounded-lg bg-white text-slate-900 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3.5 max-w-xs animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-gold-soft flex items-center justify-center text-gold-dark shrink-0">
                  <Award className="w-5 h-5 text-gold-dark" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary-950">
                    Olimpiade & Prestasi Robotika
                  </div>
                  <div className="text-[11px] text-slate-500">
                    120+ Penghargaan Internasional & Nasional [DEMO]
                  </div>
                </div>
              </div>

              {/* Top Right Floating Pill */}
              <div className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-full bg-royal text-white text-xs font-bold shadow-lg border border-white/20 hidden sm:block">
                Trilingual Curriculum
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

