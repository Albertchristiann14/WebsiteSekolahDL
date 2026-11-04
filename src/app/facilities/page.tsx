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
  const breadcrumbItems = [{ label: "Fasilitas Kampus" }];

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Header */}
      <section className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-16 sm:py-24 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-blue-200/80">
              Sarana & Prasarana Belajar
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Fasilitas Modern untuk Tumbuh Kembang Optimal
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Infrastruktur kampus terpadu yang menjamin keamanan, kenyamanan belajar, dan kelengkapan eksplorasi sains, teknologi, seni, serta olahraga.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-24">
        <FacilitiesClient />
      </div>
    </div>
  );
}
