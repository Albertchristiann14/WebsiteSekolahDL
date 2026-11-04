import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/DesignSystem";
import { AdmissionsClient } from "@/components/admissions/AdmissionsClient";
import { JsonLd, buildFaqJsonLd } from "@/components/ui/JsonLd";
import { admissionFAQs } from "@/data/admissions";

export const metadata: Metadata = {
  title: "SPMB / PPDB Online — Pendaftaran, Simulasi Biaya & Cek Kelulusan",
  description:
    "Portal Sistem Penerimaan Murid Baru (SPMB / PPDB) Online Sekolah Dharma Loka Pekanbaru jenjang TK, SD, SMP, dan SMA. Dilengkapi kalkulator biaya, pendaftaran 6 tahap, dan cek pengumuman kelulusan.",
};

export default function AdmissionsPage() {
  const faqSchema = buildFaqJsonLd(admissionFAQs);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={faqSchema} />
      <section className="bg-gradient-to-b from-blue-50/80 to-white pt-10 pb-12 border-b border-blue-100 no-print">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumb items={[{ label: "SPMB / PPDB Online" }]} />
          <div className="max-w-3xl space-y-3 mt-4">
            <Badge variant="emerald">Tahun Ajaran 2026/2027</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-950 leading-tight">
              Sistem Penerimaan Murid Baru (SPMB) Online
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Layanan pendaftaran terpadu jenjang TK, SD, SMP, dan SMA Dharma Loka Pekanbaru. Transparan, ramah perangkat mobile, dan dilengkapi fitur simpan otomatis (auto-save).
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <AdmissionsClient />
        </div>
      </section>
    </div>
  );
}
