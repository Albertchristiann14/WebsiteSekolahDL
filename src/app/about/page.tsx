import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/image";
import { 
  GraduationCap, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Globe, 
  Award, 
  Users, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  Building
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata: Metadata = {
  title: "Tentang Kami & Sejarah",
  description:
    "Mengenal lebih dekat Sekolah Dharma Loka Pekanbaru: sejarah pendirian sejak 1988, yayasan pengelola, visi, misi, nilai-nilai budi pekerti, dan kepemimpinan sekolah.",
};

export default function AboutPage() {
  const breadcrumbItems = [{ label: "Tentang Kami" }];

  return (
    <div className="bg-surface-subtle min-h-screen">
      
      {/* Page Header */}
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
              Profil & Sejarah Institusi
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
              Dedikasi Luhur untuk Generasi Emas Bangsa
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Mengenal perjalanan panjang Sekolah Dharma Loka dalam mendidik anak bangsa di Kota Pekanbaru melalui perpaduan akademik bermutu tinggi dan akhlak budi pekerti mulia.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Foundation */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-royal uppercase tracking-wider">
              <span>Sejarah & Legalitas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 font-sans leading-tight">
              Tiga Dekade Mengabdi Membangun Karakter di Bumi Lancang Kuning
            </h2>
            <div className="prose prose-slate text-slate-text leading-relaxed space-y-4">
              <p>
                Sekolah Dharma Loka Pekanbaru didirikan pada tahun 1988 di bawah naungan <strong>{schoolInfo.foundation}</strong>. Lahir dari ketulusan para perintis pendidikan yang mendambakan hadirnya institusi pendidikan bermutu yang tidak hanya menekankan kecakapan intelektual, namun juga menanamkan nilai-nilai moral universal dan welas asih.
              </p>
              <p>
                Berawal dari jenjang usia dini, dedikasi tersebut terus bertumbuh secara terpadu hingga kini mengelola lima jenjang pendidikan lengkap: <strong>TK, SD, SMP, SMA, dan SMK</strong> dalam satu kawasan kampus yang terintegrasi di jantung Kota Pekanbaru.
              </p>
              <p>
                Dengan komitmen continuous improvement, Dharma Loka secara konsisten mengadopsi kemajuan pedagogi abad ke-21, pembelajaran berbasis inkuiri STEM, dan literasi trilingual (Indonesia, Inggris, Mandarin), tanpa pernah melepaskan akar budi pekerti luhur.
              </p>
            </div>

            <div className="pt-2">
              <DemoBadge label="Sejarah & Tanggal Resmi [DEMO / MEMERLUKAN ARSIP RESMI YAYASAN]" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-slate-200 aspect-[4/3] bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                alt="Gedung dan suasana kampus Sekolah Dharma Loka Pekanbaru"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-primary-950/80 backdrop-blur-sm border border-slate-700 text-xs text-slate-200">
                <div className="font-bold text-white text-sm">Kampus Terpadu Dharma Loka Pekanbaru</div>
                <div className="text-slate-400 mt-0.5">Lingkungan asri, aman, dan kondusif bagi pertumbuhan intelektual dan spiritual siswa</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision and Mission (Split Layout) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              tag="Visi & Misi"
              title="Arah Langkah Menuju Institusi Pendidikan Unggulan Global"
              subtitle="Komitmen luhur kami dalam membimbing setiap peserta didik mencapai potensi terbaiknya."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Vision Box (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-primary-950 text-white flex flex-col justify-between shadow-elevated border border-gold/30">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gold text-primary-950 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-sans text-white">Visi Sekolah</h3>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-serif italic">
                  "{schoolInfo.vision}"
                </p>
              </div>

              <div className="pt-8 border-t border-primary-900 mt-8">
                <div className="text-xs text-gold-light font-semibold uppercase tracking-wider">
                  Motto Institusi
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {schoolInfo.motto}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {schoolInfo.mottoTranslation}
                </div>
              </div>
            </div>

            {/* Mission Box (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-surface-subtle border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6 text-primary-900" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-950 font-sans">Misi Sekolah</h3>
                    <p className="text-xs text-slate-500">Lima pilar aksi nyata penyelenggaraan pendidikan</p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {schoolInfo.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-slate-200/60 shadow-subtle">
                      <span className="w-7 h-7 rounded-full bg-primary-900 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500">
                Pembaruan Visi Misi berkala diselaraskan dengan standar nasional pendidikan dan kemajuan era digital.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Nilai-Nilai Luhur"
          title="Empat Pilar Karakter Insan Dharma Loka"
          subtitle="Landasan moral dan spiritual yang kami tanamkan kepada seluruh pendidik, tenaga kependidikan, dan peserta didik."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schoolInfo.coreValues.map((val, idx) => (
            <div
              key={val.title}
              className="p-8 rounded-xl bg-white border border-slate-200 shadow-card hover:border-gold/60 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-lg bg-primary-900 text-gold flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-primary-950 font-sans">
                  {val.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Educators */}
      <section className="py-16 sm:py-24 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionHeader
              tag="Kepemimpinan & Pendidik"
              title="Didampingi Tenaga Pendidik Berdedikasi dan Berkualifikasi"
              subtitle="Guru-guru kami tidak hanya menguasai bidang keilmuan, tetapi memiliki panggilan jiwa dalam menuntun setiap murid dengan penuh kesabaran dan keteladanan."
              theme="dark"
            />
            <div className="mt-3">
              <DemoBadge label="Daftar Profil Pimpinan Sekolah [DEMO / MEMERLUKAN DATA RESMI YAYASAN]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Ketua Pengurus Yayasan",
                title: "Drs. Hendra Sutanto, M.M. [DEMO]",
                desc: "Memimpin arah strategis yayasan dalam penyediaan sarana dan tata kelola pendidikan modern.",
              },
              {
                role: "Kepala Sekolah SMA & Koordinator Akademik",
                title: "Dr. Ir. Albertus Lim, M.Ed. [DEMO]",
                desc: "Berpengalaman lebih dari 20 tahun dalam kurikulum internasional dan persiapan perguruan tinggi.",
              },
              {
                role: "Kepala Sekolah SMP",
                title: "Siti Rahmawati, S.Pd., M.Si. [DEMO]",
                desc: "Fokus pada pendampingan psikologis remaja, riset inkuiri, dan kepemimpinan siswa.",
              },
              {
                role: "Kepala Sekolah SD & TK",
                title: "Meilani Tan, S.Psi., M.Pd. [DEMO]",
                desc: "Spesialis pendidikan anak usia dini, stimulasi bilingual, dan pendidikan karakter berbasis empati.",
              },
            ].map((leader, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-primary-900/60 border border-primary-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary-800 text-gold flex items-center justify-center font-bold mb-4">
                    <Users className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                    {leader.role}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {leader.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-primary-800/60 text-[11px] text-slate-400">
                  Sekolah Dharma Loka Pekanbaru
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

