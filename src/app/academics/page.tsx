import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  Cpu,
  HeartHandshake,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge, Card } from "@/components/ui/DesignSystem";
import { UNIT_TENANTS, TENANTS } from "@/config/tenants";
import { schoolEvents, buildGoogleCalendarUrl } from "@/data/events";

export const metadata: Metadata = {
  title: "Kurikulum, Program Unggulan, Ekstrakurikuler & Kalender Akademik",
  description:
    "Informasi lengkap Kurikulum Nasional Terpadu, Trilingual Immersion (Indonesia, Inggris, Mandarin), STEAM & Robotika, Ekstrakurikuler, serta Kalender Akademik Sekolah Dharma Loka Pekanbaru.",
};

export default function AcademicsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 to-white pt-10 pb-14 border-b border-blue-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumb items={[{ label: "Akademik & Kurikulum" }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <Badge variant="blue">Ekosistem Akademik Terpadu</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-950 leading-tight">
              Kurikulum Holistik Berstandar Nasional & Global
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Memadukan Kurikulum Nasional (Merdeka), kemahiran tiga bahasa (Indonesia, Inggris, Mandarin), riset STEAM-Robotika, dan pembinaan karakter harian.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-blue-100">
            {[
              { label: "Struktur Kurikulum", href: "#kurikulum" },
              { label: "Program Jenjang (TK-SMA)", href: "#unggulan" },
              { label: "Ekstrakurikuler", href: "#ekstrakurikuler" },
              { label: "Kalender Akademik", href: "#kalender" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl bg-white hover:bg-royal hover:text-white text-primary-950 border border-blue-200 text-xs sm:text-sm font-bold transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 1. KURIKULUM TERPADU (#kurikulum) */}
      <section id="kurikulum" className="py-20 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <Badge variant="blue">4 Pilar Pembelajaran</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Arsitektur Kurikulum Sekolah Dharma Loka
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Kurikulum Nasional (Merdeka)",
                desc: "Pembelajaran terdiferensiasi sesuai tahap capaian siswa disertai Projek Penguatan Profil Pelajar Pancasila (P5).",
              },
              {
                icon: Globe,
                title: "Trilingual Active Immersion",
                desc: "Penguasaan aktif Bahasa Indonesia, Inggris (Cambridge/IELTS Prep), dan Mandarin (HSK Level 1–5).",
              },
              {
                icon: Cpu,
                title: "STEAM, Coding & Robotika",
                desc: "Integrasi sains, matematika, pemrograman komputer, dan rekayasa robotika di laboratorium modern.",
              },
              {
                icon: HeartHandshake,
                title: "Pendidikan Budi Pekerti",
                desc: "Pembiasaan mindfulness pagi, empati sosial, integritas, dan penghormatan terhadap orang tua serta guru.",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-primary-950">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. PROGRAM UNGGULAN PER JENJANG (#unggulan) */}
      <section
        id="unggulan"
        className="py-20 bg-blue-50/40 border-y border-blue-100 scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <Badge variant="blue">Kesinambungan Jenjang</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Program Pendidikan TK, SD, SMP & SMA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {UNIT_TENANTS.map((unit) => (
              <Card
                key={unit.id}
                className="overflow-hidden flex flex-col justify-between"
              >
                <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="blue">{unit.subdomain}</Badge>
                    <Badge variant="emerald">{unit.accreditation}</Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-primary-950">
                      {unit.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {unit.heroSubtitle}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-royal">
                      Program Unggulan {unit.levelCode}:
                    </p>
                    {unit.featuredPrograms.map((fp) => (
                      <div
                        key={fp.title}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-1" />
                        <span>
                          <strong className="text-primary-950">
                            {fp.title}:
                          </strong>{" "}
                          {fp.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-7 py-4 bg-blue-50/50 border-t border-blue-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/academics/${unit.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-royal hover:text-royal-dark"
                  >
                    <span>Lihat Kurikulum Lengkap {unit.levelCode}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admissions?level=${unit.id}#daftar`}
                    className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-extrabold"
                  >
                    Daftar SPMB {unit.levelCode}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EKSTRAKURIKULER (#ekstrakurikuler) */}
      <section id="ekstrakurikuler" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <Badge variant="gold">Minat & Bakat Siswa</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Klub & Kegiatan Ekstrakurikuler
            </h2>
            <p className="text-slate-600 text-base">
              Setiap siswa didorong memilih minimal satu klub pengembangan bakat yang dibimbing langsung oleh pelatih profesional dan guru pembina olimpiade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TENANTS.portal.extracurriculars.map((club) => (
              <Card key={club.name} className="p-6 space-y-3">
                <Badge variant="blue">{club.category}</Badge>
                <h3 className="text-lg font-extrabold text-primary-950">
                  {club.name}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-royal" />
                  Jadwal Latihan: {club.schedule}
                </p>
                {club.achievementHighlight && (
                  <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <Award className="w-4 h-4 text-amber-600" />
                    Capaian: {club.achievementHighlight}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KALENDER AKADEMIK (#kalender) */}
      <section
        id="kalender"
        className="py-20 bg-blue-50/40 border-t border-blue-100 scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="blue">Tahun Ajaran 2026/2027</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
                Kalender Akademik & Agenda Sekolah
              </h2>
            </div>
            <Link
              href="/news?tab=agenda"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-royal"
            >
              <span>Buka Tampilan Kalender Bulanan Interaktif</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolEvents.map((evt) => (
              <Card
                key={evt.id}
                className="p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue">{evt.category}</Badge>
                    <span className="text-xs font-mono font-bold text-royal">
                      {evt.date}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-primary-950">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{evt.time}</span>
                  <a
                    href={buildGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-royal hover:underline"
                  >
                    + Simpan ke Google Calendar
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
