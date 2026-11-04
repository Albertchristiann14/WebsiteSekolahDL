import React from "react";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Hubungi Kami & Lokasi Kampus",
  description:
    "Informasi kontak sekretariat, nomor telepon, alamat kampus, layanan hotline WhatsApp PPDB, dan formulir pesan resmi Sekolah Dharma Loka Pekanbaru.",
};

export default function ContactPage() {
  const breadcrumbItems = [{ label: "Hubungi Kami" }];

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
              Sekretariat & Layanan Orang Tua
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Kami Siap Mendampingi Keluarga Anda
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Kami menyambut hangat setiap pertanyaan, permohonan kunjungan kampus, maupun konsultasi masa depan pendidikan putra-putri Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-24">
        <ContactClient />
      </div>
    </div>
  );
}
