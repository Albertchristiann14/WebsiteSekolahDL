import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FacilitiesClient } from "./FacilitiesClient";

export const metadata: Metadata = {
  title: "Sarana & Prasarana Kampus Terpadu",
  description:
    "Eksplorasi fasilitas pembelajaran modern Sekolah Dharma Loka Pekanbaru: perpustakaan digital, lab sains, studio robotika AI, sport hall indoor, dan auditorium seni.",
};

export default function FacilitiesPage() {
  const breadcrumbItems = [{ label: "Sarana & Prasarana" }];

  return (
    <div className="bg-surface-subtle min-h-screen">
      
      {/* Header */}
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
              Sarana Penunjang Belajar
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
              Fasilitas Modern untuk Tumbuh Kembang Maksimal
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Infrastruktur terintegrasi yang menjamin rasa aman, kenyamanan ergonomis, dan kelengkapan eksplorasi saintifik bagi seluruh siswa lima jenjang.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <FacilitiesClient />
      </div>

    </div>
  );
}

