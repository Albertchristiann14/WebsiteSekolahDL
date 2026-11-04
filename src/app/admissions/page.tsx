import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AdmissionsClient } from "@/components/admissions/AdmissionsClient";

export const metadata: Metadata = {
  title: "Penerimaan Peserta Didik Baru (PPDB) 2027/2028",
  description:
    "Informasi resmi Penerimaan Peserta Didik Baru (PPDB) Sekolah Dharma Loka Pekanbaru untuk jenjang TK, SD, SMP, SMA, dan SMK. Jadwal gelombang, syarat berkas, beasiswa prestasi, dan alur pendaftaran.",
};

export default function AdmissionsPage() {
  const breadcrumbItems = [{ label: "Penerimaan Siswa Baru (PPDB)" }];

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
              Penerimaan Siswa Baru T.A. 2027/2028
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
              Mulai Langkah Prestasi dan Kemuliaan Karakter Bersama Kami
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Panduan lengkap pendaftaran calon peserta didik baru untuk jenjang TK, SD, SMP, SMA, dan SMK di Sekolah Dharma Loka Pekanbaru.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AdmissionsClient />
      </div>

    </div>
  );
}

