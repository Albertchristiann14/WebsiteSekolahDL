import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Medal, Award, Globe, Sparkles } from "lucide-react";
import { achievementsData } from "@/data/achievements";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function AchievementsHighlight() {
  const topAchievements = achievementsData.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-surface-canvas border-t border-slate-200/80" aria-labelledby="achievements-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <SectionHeader
              tag="Jejak Prestasi"
              title="Kompetisi Saintifik, Olimpiade Sains, dan Talenta Seni Berdaya Saing"
              subtitle="Dedikasi dan ketekunan para siswa dalam mengibarkan prestasi kehormatan di panggung kompetisi kota, provinsi, nasional hingga internasional."
            />
            <div className="mt-3">
              <DemoBadge label="Data Prestasi Peraga [DEMO / KONFIRMASI RESMI DIPERLUKAN]" />
            </div>
          </div>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-royal-dark shrink-0 group"
          >
            <span>Lihat Semua Prestasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* 3 Featured Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topAchievements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-card border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-shadow duration-200 group"
            >
              <div>
                {/* Image & Medal Overlay */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                  
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-primary-950 font-bold text-xs shadow-md">
                      <Trophy className="w-3.5 h-3.5 text-primary-950" aria-hidden="true" />
                      <span>{item.medalOrRank}</span>
                    </span>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-0.5 rounded bg-primary-900/90 text-slate-200 text-[11px] font-semibold border border-primary-700">
                      Tingkat {item.level} • {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-royal">
                    {item.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-950 font-sans leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Student Meta Footer */}
              <div className="px-6 py-4 bg-surface-subtle border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-primary-950">
                    {item.studentName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.gradeAndLevel}
                  </div>
                </div>
                <Medal className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

