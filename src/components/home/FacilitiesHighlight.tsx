import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { facilitiesData } from "@/data/facilities";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FacilitiesHighlight() {
  const featuredFacilities = facilitiesData.slice(0, 4);

  return (
    <section
      className="py-24 lg:py-36 bg-blue-50/40 border-y border-blue-100"
      aria-labelledby="facilities-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-20 gap-6">
          <SectionHeader
            tag="Sarana & Prasarana Modern"
            title="Fasilitas Lengkap untuk Mendukung Eksplorasi Bakat & Akademik"
            subtitle="Setiap ruang belajar di Sekolah Dharma Loka dirancang dengan standar kenyamanan, pencahayaan, dan keamanan terbaik bagi siswa."
          />
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 text-base font-bold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Lihat Seluruh Fasilitas</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Primary Large Showcase (7 cols) */}
          <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-white shadow-lg border border-blue-100 min-h-[420px] sm:min-h-[500px] flex flex-col justify-end">
            <Image
              src={featuredFacilities[0].image}
              alt={featuredFacilities[0].name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/35 to-transparent" />
            <div className="relative p-7 sm:p-10 text-white space-y-3.5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-royal text-white text-xs font-bold uppercase tracking-wider">
                {featuredFacilities[0].category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                {featuredFacilities[0].name}
              </h3>
              <p className="text-sm sm:text-base text-blue-50 max-w-xl leading-relaxed">
                {featuredFacilities[0].description}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {featuredFacilities[0].features.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20"
                  >
                    <Check className="w-3.5 h-3.5 text-blue-200" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {featuredFacilities.slice(1, 4).map((fac) => (
              <div
                key={fac.id}
                className="group bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row gap-5 items-center"
              >
                <div className="relative w-full sm:w-36 h-44 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-blue-50">
                  <Image
                    src={fac.image}
                    alt={fac.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-royal">
                    {fac.category}
                  </span>
                  <h4 className="text-lg font-extrabold text-primary-950 mt-1 mb-1.5 group-hover:text-royal transition-colors">
                    {fac.name}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
