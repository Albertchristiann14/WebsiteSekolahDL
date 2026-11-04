import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Medal, Award } from "lucide-react";
import { achievementsData } from "@/data/achievements";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AchievementsHighlight() {
  const topAchievements = achievementsData.slice(0, 3);

  return (
    <section
      className="py-24 lg:py-36 bg-white"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Top Row: Section Header + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-20 gap-6">
          <SectionHeader
            tag="Rekam Jejak Prestasi"
            title="Bukti Pembinaan Akademik, Sains, Seni, dan Karakter"
            subtitle="Setiap capaian siswa merupakan buah dari ketekunan belajar, bimbingan guru, dan dukungan penuh keluarga."
          />
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-base font-bold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Lihat Direktori Prestasi Lengkap</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* 3 Featured Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {topAchievements.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-white border border-blue-100 p-8 lg:p-10 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-1.5 bg-royal rounded-b-full" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-6 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-royal border border-blue-100">
                    {index === 0 ? (
                      <Trophy className="w-3.5 h-3.5 text-royal" />
                    ) : index === 1 ? (
                      <Medal className="w-3.5 h-3.5 text-royal" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-royal" />
                    )}
                    <span>Tingkat {item.level}</span>
                  </span>
                  <span className="text-sm font-bold text-slate-400">
                    {item.year}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-sm font-extrabold text-royal uppercase tracking-wide">
                    {item.medalOrRank} • {item.gradeAndLevel}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-primary-950 mb-4 leading-snug group-hover:text-royal transition-colors">
                  {item.title}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                <span className="font-semibold text-primary-900">
                  {item.studentName}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50/70 font-semibold text-royal">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
