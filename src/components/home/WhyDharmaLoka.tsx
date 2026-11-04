import React from "react";
import { 
  Award, 
  HeartHandshake, 
  Cpu, 
  Languages, 
  Compass, 
  Building2 
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function WhyDharmaLoka() {
  const pillars = [
    {
      icon: Award,
      title: "Keunggulan Akademik Berstandar Tinggi",
      description: "Didukung kurikulum mendalam yang mempersiapkan siswa menguasai sains, matematika bernalar analitis, dan bimbingan sukses seleksi perguruan tinggi negeri maupun dunia.",
    },
    {
      icon: HeartHandshake,
      title: "Pembinaan Budi Pekerti & Karakter Utuh",
      description: "Pendidikan budi pekerti diterapkan secara konsisten dalam pembiasaan harian, menumbuhkan rasa hormat, welas asih, integritas moral, dan empati sosial.",
    },
    {
      icon: Languages,
      title: "Kefasihan Trilingual Terintegrasi",
      description: "Penguasaan aktif Bahasa Indonesia sebagai jati diri bangsa, Bahasa Inggris sebagai bahasa pergaulan global, serta Bahasa Mandarin berjenjang HSK.",
    },
    {
      icon: Cpu,
      title: "Kurikulum Sains, Coding & Robotika Abad 21",
      description: "Laboratorium STEM dan AI yang membiasakan siswa memecahkan masalah kontekstual melalui proyek riset ilmiah nyata sejak jenjang dini.",
    },
    {
      icon: Building2,
      title: "Fasilitas Kampus Terpadu & Modern",
      description: "Kompleks pembelajaran mandiri yang lengkap dengan perpustakaan digital, sport hall indoor, auditorium teater, dan laboratorium lengkap.",
    },
    {
      icon: Compass,
      title: "Pengembangan Minat & Bakat Multidimensi",
      description: "Lebih dari 20 ragam klub ekstrakurikuler meliputi orkestra musik, robotika, debat internasional, wushu bela diri, dan karya ilmiah remaja.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-primary-950 text-white relative overflow-hidden" aria-labelledby="why-heading">
      {/* Decorative gradient glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-royal/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            tag="Keunggulan Sekolah"
            title="Mengapa Mempercayakan Masa Depan Putra-Putri Anda di Dharma Loka?"
            subtitle="Kami menghadirkan lingkungan belajar yang menantang secara intelektual, menguatkan secara moral, dan aman secara emosional."
            align="center"
            theme="dark"
          />
          <div className="mt-4 flex justify-center">
            <DemoBadge label="Pilar Keunggulan Berdasarkan Rancangan Kurikulum Sekolah" />
          </div>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-xl bg-primary-900/60 border border-primary-800/80 hover:border-gold/50 transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-800 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-primary-950 transition-colors">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans mb-3 group-hover:text-gold-light transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

