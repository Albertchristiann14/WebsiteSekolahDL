import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Download,
  FileCheck2,
  Building2,
  Users,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge, Card } from "@/components/ui/DesignSystem";
import { schoolInfo } from "@/data/schoolInfo";
import { UNIT_TENANTS } from "@/config/tenants";

export const metadata: Metadata = {
  title: "Profil, Sejarah, Visi Misi & Legalitas Resmi",
  description:
    "Profil lengkap Sekolah Dharma Loka Pekanbaru: Sambutan Pimpinan, Visi & Misi, Timeline Sejarah sejak 1988, Dokumen Legalitas NPSN & Akreditasi A, serta Struktur Organisasi.",
};

const historyMilestones = [
  {
    year: "1988",
    title: "Pendirian Yayasan Pendidikan Dharma Loka",
    description:
      "Tokoh pendidikan dan masyarakat di Kota Pekanbaru mendirikan Yayasan Pendidikan Dharma Loka dengan visi menghadirkan pendidikan berkarakter budi pekerti luhur.",
  },
  {
    year: "1990 – 1992",
    title: "Pembukaan Unit TK & SD Dharma Loka",
    description:
      "Unit Taman Kanak-Kanak (TK) dan Sekolah Dasar (SD) resmi beroperasi dan mendapat sambutan hangat dari keluarga di Pekanbaru.",
  },
  {
    year: "1996 – 2001",
    title: "Ekspansi Jenjang SMP & SMA Terpadu",
    description:
      "Melengkapi kesinambungan pendidikan dasar dan menengah dengan pendirian SMP (1996) dan SMA Dharma Loka (2001) di kampus terpadu Jl. Tuanku Tambusai.",
  },
  {
    year: "2015",
    title: "Implementasi Kurikulum Trilingual & Sertifikasi Internasional",
    description:
      "Penguatan program Bahasa Indonesia, Inggris (Cambridge Prep), dan Mandarin (HSK Center) secara terintegrasi dari TK hingga SMA.",
  },
  {
    year: "2022 – Sekarang",
    title: "Transformasi Kampus Digital, STEAM & Raihan Akreditasi A Unggul",
    description:
      "Seluruh jenjang meraih predikat Terakreditasi A (Unggul), dilengkapi laboratorium robotika IoT, smart classroom, dan sistem manajemen informasi modern.",
  },
];

const legalityDocuments = [
  {
    unit: "Yayasan Pendidikan Dharma Loka",
    npsn: "AHU-0012849.AH.01.04",
    accreditation: "Badan Hukum Pendidikan Resmi",
    skNumber: "SK Kemenkumham RI & Akta Notaris Pendirian 1988",
    fileTitle: "Salinan_SK_Kemenkumham_Yayasan_Dharma_Loka.pdf",
  },
  {
    unit: "TK Dharma Loka Pekanbaru",
    npsn: "10496511",
    accreditation: "Terakreditasi A (Unggul) — BAN-PAUD",
    skNumber: "SK Disdik Kota Pekanbaru No. 421.1/Disdik-PAUD/089",
    fileTitle: "Sertifikat_Akreditasi_A_TK_Dharma_Loka.pdf",
  },
  {
    unit: "SD Dharma Loka Pekanbaru",
    npsn: "10403982",
    accreditation: "Terakreditasi A (Unggul — Nilai 96)",
    skNumber: "SK Disdik Kota Pekanbaru No. 421.2/Disdik-SD/114",
    fileTitle: "Sertifikat_Akreditasi_A_SD_Dharma_Loka.pdf",
  },
  {
    unit: "SMP Dharma Loka Pekanbaru",
    npsn: "10403983",
    accreditation: "Terakreditasi A (Unggul — Nilai 97)",
    skNumber: "SK Disdik Kota Pekanbaru No. 421.3/Disdik-SMP/205",
    fileTitle: "Sertifikat_Akreditasi_A_SMP_Dharma_Loka.pdf",
  },
  {
    unit: "SMA Dharma Loka Pekanbaru",
    npsn: "10403984",
    accreditation: "Terakreditasi A (Unggul — Nilai 98)",
    skNumber: "SK Disdik Provinsi Riau No. 421.4/Disdik-Riau/SMA/312",
    fileTitle: "Sertifikat_Akreditasi_A_SMA_Dharma_Loka.pdf",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 to-white pt-10 pb-16 border-b border-blue-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumb items={[{ label: "Profil Sekolah" }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <Badge variant="blue">Tentang Institusi Kami</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-950 leading-tight">
              Lebih dari Tiga Dekade Membina Kecerdasan & Budi Pekerti Luhur
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Mengenal sejarah perjalanan, filosofi pendidikan, legalitas resmi, serta struktur kepemimpinan Sekolah Dharma Loka Pekanbaru.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-blue-100">
            {[
              { label: "Sambutan Pimpinan", href: "#sambutan" },
              { label: "Visi, Misi & Nilai", href: "#visi-misi" },
              { label: "Sejarah (Timeline)", href: "#sejarah" },
              { label: "Legalitas & NPSN", href: "#legalitas" },
              { label: "Struktur Organisasi", href: "#struktur" },
            ].map((anchor) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className="px-4 py-2 rounded-xl bg-white hover:bg-royal hover:text-white text-primary-950 border border-blue-200 text-xs sm:text-sm font-bold transition shadow-2xs"
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 1. SAMBUTAN PIMPINAN (#sambutan) */}
      <section id="sambutan" className="py-20 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-blue-50 shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="Kampus Sekolah Dharma Loka Pekanbaru"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="blue">Sambutan Yayasan & Direktorat Pendidikan</Badge>
              <h2 className="text-3xl font-extrabold text-primary-950">
                “Prajña Pāramitā Hṛdaya — Kebijaksanaan yang Berakar pada Hati Nurani”
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Sejak didirikan pada tahun {schoolInfo.establishedYear}, {schoolInfo.name} hadir dengan keyakinan bahwa keberhasilan pendidikan seorang anak tidak hanya diukur dari deretan piala atau skor akademik semata, melainkan dari bagaimana ia menghormati orang tua, berempati kepada sesama, dan menggunakan ilmunya untuk kebaikan masyarakat.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Dengan dukungan tenaga pendidik tersertifikasi, fasilitas laboratorium modern, serta komunikasi yang terbuka bersama wali murid, kami terus berkomitmen menjadi rumah kedua yang aman dan inspiratif bagi putra-putri Anda dari jenjang TK, SD, SMP, hingga SMA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISI, MISI & NILAI KARAKTER (#visi-misi) */}
      <section
        id="visi-misi"
        className="py-20 bg-blue-50/40 border-y border-blue-100 scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-5 p-8 sm:p-10 bg-royal text-white border-royal flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
                  Visi Institusi
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                  {schoolInfo.vision}
                </h2>
              </div>
              <p className="text-xs text-blue-100 pt-8 border-t border-white/20 mt-8">
                Semboyan Resmi: {schoolInfo.motto} ({schoolInfo.mottoTranslation})
              </p>
            </Card>

            <Card className="lg:col-span-7 p-8 sm:p-10 space-y-6">
              <Badge variant="blue">Misi Pendidikan</Badge>
              <h3 className="text-2xl font-extrabold text-primary-950">
                Langkah Nyata Mewujudkan Visi Sekolah
              </h3>
              <ul className="space-y-3.5">
                {schoolInfo.mission.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-xl bg-blue-50 text-royal font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      0{idx + 1}
                    </span>
                    <span className="text-slate-700 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 4 Nilai Inti */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolInfo.coreValues.map((val) => (
              <Card key={val.title} className="p-6 space-y-2.5">
                <CheckCircle2 className="w-6 h-6 text-royal" />
                <h4 className="text-lg font-extrabold text-primary-950">
                  {val.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEJARAH SEKOLAH — TIMELINE VERTIKAL (#sejarah) */}
      <section id="sejarah" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="blue">Perjalanan Pengabdian</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Jejak Sejarah Sekolah Dharma Loka (1988 – Sekarang)
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10 border-l-2 border-blue-200 space-y-10">
            {historyMilestones.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-royal ring-4 ring-blue-100" />
                <Card className="p-6 sm:p-7 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-royal font-mono font-extrabold text-xs">
                    Tahun {m.year}
                  </span>
                  <h3 className="text-xl font-extrabold text-primary-950">
                    {m.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {m.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEGALITAS RESMI, NPSN & SERTIFIKAT AKREDITASI (#legalitas) */}
      <section
        id="legalitas"
        className="py-20 bg-blue-50/40 border-y border-blue-100 scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <Badge variant="emerald">Terverifikasi Kemendikbudristek & BAN-PDM</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Dokumen Legalitas, NPSN & Akreditasi Resmi
            </h2>
            <p className="text-slate-600 text-base">
              Transparansi izin operasional dan sertifikat akreditasi setiap unit jenjang pendidikan di bawah naungan Yayasan Pendidikan Dharma Loka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalityDocuments.map((doc) => (
              <Card
                key={doc.unit}
                className="p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-royal flex items-center justify-center">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <Badge variant="emerald">{doc.accreditation}</Badge>
                  </div>
                  <h3 className="text-lg font-extrabold text-primary-950">
                    {doc.unit}
                  </h3>
                  <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <p>
                      <strong>NPSN / Reg:</strong>{" "}
                      <span className="font-mono text-primary-950 font-bold">
                        {doc.npsn}
                      </span>
                    </p>
                    <p>
                      <strong>SK Izin:</strong> {doc.skNumber}
                    </p>
                  </div>
                </div>

                <a
                  href={`/admissions?doc=${encodeURIComponent(doc.fileTitle)}`}
                  download={doc.fileTitle}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-royal text-royal hover:text-white text-xs font-extrabold flex items-center justify-center gap-2 transition border border-blue-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Salinan Sertifikat (PDF)</span>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRUKTUR ORGANISASI (#struktur) */}
      <section id="struktur" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="blue">Tata Kelola Institusi</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Struktur Organisasi Yayasan & Pimpinan Unit
            </h2>
            <p className="text-slate-600 text-base">
              Sinergi kepemimpinan antara Dewan Pembina Yayasan, Direktorat Eksekutif Pendidikan, dan Kepala Sekolah di setiap unit jenjang.
            </p>
          </div>

          {/* Bagan Hierarki Visual */}
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Level 1: Yayasan */}
            <Card className="p-6 max-w-lg mx-auto text-center border-2 border-royal bg-blue-50/40">
              <span className="text-xs font-extrabold uppercase tracking-wider text-royal">
                Dewan Pembina & Pengurus Yayasan
              </span>
              <h3 className="text-lg font-extrabold text-primary-950 mt-1">
                Yayasan Pendidikan Dharma Loka Pekanbaru
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Penyelenggara & Penjamin Mutu Institusi
              </p>
            </Card>

            {/* Level 2: Direktur Pendidikan */}
            <Card className="p-6 max-w-lg mx-auto text-center border border-blue-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-royal">
                Direktorat Eksekutif Pendidikan
              </span>
              <h3 className="text-lg font-extrabold text-primary-950 mt-1">
                Dr. Hendra Wijaya, S.Pd., M.M.
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Koordinasi Kurikulum Terpadu, SDM Pendidik & Kemitraan Global
              </p>
            </Card>

            {/* Level 3: 4 Kepala Sekolah Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {UNIT_TENANTS.map((unit) => (
                <Card key={unit.id} className="p-5 text-center space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-royal text-xs font-extrabold">
                    Unit {unit.levelCode}
                  </span>
                  <h4 className="text-base font-extrabold text-primary-950">
                    {unit.principal.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {unit.principal.title}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/teachers"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-royal hover:bg-royal-dark text-white font-extrabold text-sm shadow-md transition"
            >
              <Users className="w-4 h-4" />
              <span>Lihat Direktori Lengkap Guru & Staf (GTK)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
