import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/DesignSystem";
import { TeachersClient } from "./TeachersClient";

export const metadata: Metadata = {
  title: "Direktori Guru & Tenaga Kependidikan (GTK)",
  description:
    "Daftar lengkap pimpinan sekolah, dewan guru tersertifikasi, pembina olimpiade, laoshi Bahasa Mandarin, dan konselor Sekolah Dharma Loka Pekanbaru.",
};

export default function TeachersPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-b from-blue-50/80 to-white pt-10 pb-14 border-b border-blue-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumb items={[{ label: "Guru & Staf (Direktori GTK)" }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <Badge variant="blue">Pendidik Profesional & Tersertifikasi</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-950 leading-tight">
              Direktori Guru & Tenaga Kependidikan (GTK)
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Putra-putri Anda didampingi oleh pendidik berpengalaman lulusan perguruan tinggi terbaik di dalam dan luar negeri yang berdedikasi membina prestasi sekaligus budi pekerti.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <TeachersClient />
        </div>
      </section>
    </div>
  );
}

