import React from "react";
import {
  Languages,
  Award,
  Heart,
  Cpu,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const differentiators = [
  {
    icon: <Heart className="w-6 h-6 text-royal" />,
    title: "Pendidikan Karakter & Budi Pekerti",
    description:
      "Pembiasaan sopan santun, empati, disiplin, dan rasa hormat kepada orang tua serta guru dalam keseharian siswa di sekolah.",
  },
  {
    icon: <Languages className="w-6 h-6 text-royal" />,
    title: "Ekosistem Trilingual (3 Bahasa)",
    description:
      "Penguasaan aktif Bahasa Indonesia, Bahasa Inggris, dan Bahasa Mandarin sebagai bekal studi lanjut dan komunikasi global.",
  },
  {
    icon: <Award className="w-6 h-6 text-royal" />,
    title: "Bina Prestasi & Olimpiade",
    description:
      "Pendampingan terarah bagi siswa berbakat di bidang Matematika, Sains, Coding, Debat, Seni Budaya, dan Olahraga.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-royal" />,
    title: "Inovasi STEAM & Robotika",
    description:
      "Fasilitas laboratorium komputer dan sains modern yang melatih logika pemrograman, riset, dan pemecahan masalah nyata.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-royal" />,
    title: "Lingkungan Aman & Bebas Perundungan",
    description:
      "Kawasan kampus terpantau CCTV dengan pengawasan penuh dan budaya sekolah yang hangat, ramah anak, serta inklusif.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-royal" />,
    title: "Pendidikan Terpadu Satu Atap",
    description:
      "Keberlanjutan kurikulum dari jenjang TK, SD, SMP, hingga SMA dan SMK yang memberikan ketenangan jangka panjang bagi orang tua.",
  },
];

export function WhyDharmaLoka() {
  return (
    <section
      className="py-24 lg:py-36 bg-white"
      aria-labelledby="why-dharmaloka-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="mb-16 lg:mb-20">
          <SectionHeader
            align="center"
            tag="Mengapa Memilih Dharma Loka"
            title="6 Keunggulan Utama bagi Masa Depan Putra-Putri Anda"
            subtitle="Kami memahami bahwa memilih sekolah adalah keputusan besar bagi setiap keluarga. Berikut adalah komitmen nyata yang kami hadirkan setiap hari."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {differentiators.map((item, idx) => (
            <div
              key={idx}
              className="p-8 lg:p-10 rounded-3xl bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-primary-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-blue-100/80 flex items-center justify-between text-xs font-bold text-royal uppercase tracking-wider">
                <span>Pilar Keunggulan 0{idx + 1}</span>
                <span>Dharma Loka</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
