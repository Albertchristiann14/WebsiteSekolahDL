import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { facilitiesData } from "@/data/facilities";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FacilitiesHighlight() {
  // Show 4 key representative facilities in an asymmetric editorial mosaic
  const highlights = facilitiesData.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="facilities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <SectionHeader
            tag="Sarana & Prasarana"
            title="Ruang Eksplorasi & Lingkungan Belajar Standar Modern"
            subtitle="Dirancang secara ergonomis dan estetis untuk menunjang keamanan, kesehatan, serta kenyamanan siswa dalam mengembangkan seluruh potensinya."
          />
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Jelajahi Semua Fasilitas ({facilitiesData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetric 4-Item Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Large Facility Feature (Col 7) */}
          <div className="md:col-span-7 group relative rounded-xl overflow-hidden bg-slate-900 shadow-md min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-6 sm:p-8">
            <Image
              src={highlights[0].image}
              alt={highlights[0].name}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent" />
            
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-3 py-1 rounded bg-gold text-primary-950 text-xs font-bold uppercase tracking-wider">
                {highlights[0].category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {highlights[0].name}
              </h3>
              <p className="text-sm text-slate-200 line-clamp-2 max-w-xl">
                {highlights[0].headline}
              </p>
              <div className="flex items-center gap-2 text-xs text-gold-light pt-2">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{highlights[0].location}</span>
                <span>•</span>
                <span>Kapasitas: {highlights[0].capacity}</span>
              </div>
            </div>
          </div>

          {/* Secondary Stack (Col 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {highlights.slice(1, 3).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-sm flex-1 min-h-[200px] flex flex-col justify-end p-6"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent" />
                
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-sans">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-3 h-3 text-gold-light" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Full-Width Horizontal Feature */}
          <div className="md:col-span-12 group relative rounded-xl overflow-hidden bg-slate-900 shadow-md min-h-[220px] flex flex-col justify-end p-6 sm:p-8">
            <Image
              src={highlights[3].image}
              alt={highlights[3].name}
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <span className="inline-block px-2.5 py-0.5 rounded bg-primary-800 text-gold-light text-xs font-semibold uppercase tracking-wider">
                  {highlights[3].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  {highlights[3].name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-1">
                  {highlights[3].headline}
                </p>
              </div>
              <Link
                href="/facilities"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gold-light hover:text-white transition-colors"
              >
                <span>Lihat Foto Fasilitas Lainnya</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

