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
              Sekretariat & Hubungan Masyarakat
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
              Koneksi Terbuka dengan Komunitas Kami
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Kami menyambut hangat setiap pertanyaan, permohonan kunjungan, maupun konsultasi masa depan pendidikan putra-putri Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <ContactClient />
      </div>

    </div>
  );
}

