"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Trophy, Medal, Award, Globe, Filter, Sparkles } from "lucide-react";
import { Achievement } from "@/data/achievements";
import { DemoBadge } from "@/components/ui/DemoBadge";

interface Props {
  initialAchievements: Achievement[];
}

const CATEGORIES = [
  "Semua Kategori",
  "Sains & Teknologi",
  "Robotika & Coding",
  "Matematika",
  "Bahasa & Debat",
  "Olahraga & Seni",
] as const;

const LEVELS = ["Semua Tingkat", "Internasional", "Nasional", "Provinsi"] as const;

export function AchievementsClient({ initialAchievements }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Kategori");
  const [selectedLevel, setSelectedLevel] = useState<string>("Semua Tingkat");

  const filtered = useMemo(() => {
    return initialAchievements.filter((item) => {
      const matchCat =
        selectedCategory === "Semua Kategori" || item.category === selectedCategory;
      const matchLvl =
        selectedLevel === "Semua Tingkat" || item.level === selectedLevel;
      return matchCat && matchLvl;
    });
  }, [initialAchievements, selectedCategory, selectedLevel]);

  return (
    <div className="space-y-10">
      
      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary-900 text-white shadow-sm"
                    : "bg-surface-subtle text-slate-700 hover:bg-slate-100 hover:text-primary-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Level Dropdown Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label htmlFor="level-filter" className="text-xs font-medium text-slate-500 whitespace-nowrap">
            Tingkat:
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Demo disclaimer banner */}
      <div className="flex justify-between items-center">
        <DemoBadge label="Daftar Prestasi Simulasi [DEMO / MEMERLUKAN ARSIP RESMI SEKOLAH]" />
        <span className="text-xs text-slate-500">
          Menampilkan <strong>{filtered.length}</strong> pencapaian
        </span>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-shadow duration-200 group"
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

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-royal">
                  {item.category}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary-950 font-sans leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-slate-500">
                  {item.competition}
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Student & Grade Footer */}
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
  );
}

