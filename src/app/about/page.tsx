import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Compass,
  Users,
  CheckCircle2,
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Tentang Kami & Sejarah",
  description:
    "Mengenal lebih dekat Sekolah Dharma Loka Pekanbaru: sejarah pendirian sejak 1988, yayasan pengelola, visi, misi, nilai-nilai budi pekerti, dan kepemimpinan sekolah.",
};

export default function AboutPage() {
  const breadcrumbItems = [{ label: "Tentang Sekolah" }];

  return (
    <div className="bg-white min-h-screen">
      {/* Bright White & Soft Blue Page Header */}
      <section className="bg-gradient-to-b from-blue-50/80 via-blue-50/30 to-white py-16 sm:py-24 border-b border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-royal text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-blue-200/80">
              Profil & Sejarah Institusi
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary-950 leading-tight">
              Dedikasi Luhur untuk Generasi Emas Bangsa
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed">
              Mengenal perjalanan panjang Sekolah Dharma Loka dalam mendidik anak bangsa di Kota Pekanbaru melalui perpaduan akademik bermutu tinggi dan akhlak budi pekerti mulia.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Foundation */}
      <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-royal uppercase tracking-wider">
              <span>Sejarah & Legalitas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950 leading-tight">
              Lebih dari Tiga Dekade Mengabdi Membangun Karakter di Bumi Lancang Kuning
            </h2>
            <div className="text-slate-600 text-base sm:text-lg leading-relaxed space-y-5">
              <p>
                Sekolah Dharma Loka Pekanbaru didirikan pada tahun 1988 di bawah naungan <strong>{schoolInfo.foundation}</strong>. Lahir dari ketulusan para perintis pendidikan yang mendambakan hadirnya institusi pendidikan bermutu yang tidak hanya menekankan kecakapan intelektual, namun juga menanamkan nilai-nilai moral universal dan welas asih.
              </p>
              <p>
                Berawal dari jenjang usia dini, dedikasi tersebut terus bertumbuh secara terpadu hingga kini mengelola lima jenjang pendidikan lengkap: <strong>TK, SD, SMP, SMA, dan SMK</strong> dalam satu kawasan kampus yang terintegrasi di Kota Pekanbaru.
              </p>
              <p>
                Dengan semangat perbaikan berkelanjutan, Dharma Loka secara konsisten mengadopsi kemajuan pedagogi abad ke-21, pembelajaran berbasis riset dan STEAM, serta literasi trilingual (Indonesia, Inggris, Mandarin), tanpa pernah melepaskan akar budi pekerti luhur.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-blue-100 aspect-[4/3] bg-blue-50">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                alt="Gedung dan suasana kampus Sekolah Dharma Loka Pekanbaru"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-100 shadow-md">
                <div className="font-bold text-primary-950 text-base">Kampus Terpadu Dharma Loka Pekanbaru</div>
                <div className="text-slate-600 text-sm mt-0.5">Lingkungan asri, aman, dan kondusif bagi pertumbuhan intelektual dan karakter siswa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 sm:py-28 bg-blue-50/40 border-y border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              tag="Visi & Misi"
              title="Arah Langkah Menuju Institusi Pendidikan Unggulan"
              subtitle="Komitmen luhur kami dalam membimbing setiap peserta didik mencapai potensi terbaiknya."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Vision Box (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-royal to-blue-800 text-white flex flex-col justify-between shadow-xl shadow-royal/15">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-white/15 text-white flex items-center justify-center font-bold border border-white/25">
                  <Compass className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Visi Sekolah</h3>
                <p className="text-lg sm:text-xl text-blue-50 leading-relaxed font-serif italic">
                  &ldquo;{schoolInfo.vision}&rdquo;
                </p>
              </div>

              <div className="pt-8 border-t border-white/20 mt-8">
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">
                  Semboyan Institusi
                </div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {schoolInfo.motto}
                </div>
                <div className="text-sm text-blue-100 mt-0.5">
                  {schoolInfo.mottoTranslation}
                </div>
              </div>
            </div>

            {/* Mission Box (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-blue-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-royal flex items-center justify-center font-bold border border-blue-100">
                    <CheckCircle2 className="w-7 h-7 text-royal" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950">Misi Sekolah</h3>
                    <p className="text-sm text-slate-500">Lima pilar penyelenggaraan pendidikan</p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {schoolInfo.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/40 border border-blue-100/80">
                      <span className="w-8 h-8 rounded-xl bg-royal text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-base text-slate-700 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="py-20 sm:py-28 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <SectionHeader
          tag="Nilai-Nilai Luhur"
          title="Empat Pilar Karakter Insan Dharma Loka"
          subtitle="Landasan moral dan intelektual yang kami tanamkan kepada seluruh pendidik, tenaga kependidikan, dan peserta didik."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schoolInfo.coreValues.map((val, idx) => (
            <div
              key={val.title}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-11 h-11 rounded-xl bg-blue-50 text-royal border border-blue-100 flex items-center justify-center font-extrabold text-base">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-extrabold text-primary-950">
                  {val.title}
                </h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Educators */}
      <section className="py-20 sm:py-28 bg-blue-50/40 border-t border-blue-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl mb-14">
            <SectionHeader
              tag="Kepemimpinan & Pendidik"
              title="Didampingi Tenaga Pendidik Berdedikasi dan Berkualifikasi"
              subtitle="Guru-guru kami tidak hanya menguasai bidang keilmuan, tetapi memiliki panggilan hati dalam menuntun setiap murid dengan penuh kesabaran dan keteladanan."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                role: "Ketua Pengurus Yayasan",
                title: "Drs. Hendra Sutanto, M.M.",
                desc: "Memimpin arah strategis yayasan dalam penyediaan sarana dan tata kelola pendidikan modern.",
              },
              {
                role: "Kepala Sekolah SMA & Koordinator Akademik",
                title: "Dr. Ir. Albertus Lim, M.Ed.",
                desc: "Berpengalaman lebih dari 20 tahun dalam kurikulum nasional-plus dan persiapan perguruan tinggi.",
              },
              {
                role: "Kepala Sekolah SMP",
                title: "Siti Rahmawati, S.Pd., M.Si.",
                desc: "Fokus pada pendampingan karakter remaja, riset sains terapan, dan kepemimpinan siswa.",
              },
              {
                role: "Kepala Sekolah SD & TK",
                title: "Meilani Tan, S.Psi., M.Pd.",
                desc: "Spesialis pendidikan anak usia dini, stimulasi bilingual, dan pendidikan karakter berbasis empati.",
              },
            ].map((leader, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-blue-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center font-bold mb-5">
                    <Users className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-bold text-royal uppercase tracking-wider mb-1.5">
                    {leader.role}
                  </div>
                  <h4 className="text-lg font-extrabold text-primary-950 mb-2.5">
                    {leader.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
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
