import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AdmissionsClient } from "@/components/admissions/AdmissionsClient";

export const metadata: Metadata = {
  title: "Penerimaan Peserta Didik Baru (PPDB) 2026/2027",
  description:
    "Informasi resmi Penerimaan Peserta Didik Baru (PPDB) Sekolah Dharma Loka Pekanbaru untuk jenjang TK, SD, SMP, SMA, dan SMK. Jadwal gelombang, syarat berkas, beasiswa prestasi, dan alur pendaftaran.",
};

export default function AdmissionsPage() {
  const breadcrumbItems = [{ label: "Penerimaan Siswa Baru (PPDB)" }];

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
              Penerimaan Siswa Baru T.A. 2026/2027
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Mulai Langkah Prestasi dan Kemuliaan Karakter Bersama Kami
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Panduan lengkap dan formulir pendaftaran calon peserta didik baru untuk jenjang TK, SD, SMP, SMA, dan SMK di Sekolah Dharma Loka Pekanbaru.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-24">
        <AdmissionsClient />
      </div>
    </div>
  );
}
