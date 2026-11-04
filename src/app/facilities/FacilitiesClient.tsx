"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MapPin, Users, CheckCircle2, Sparkles } from "lucide-react";
import { facilitiesData, Facility } from "@/data/facilities";

const CATEGORIES = [
  "Semua Fasilitas",
  "Akademik & Sains",
  "Olahraga & Kesehatan",
  "Seni & Budaya",
  "Teknologi & Digital",
  "Penunjang Kampus",
] as const;

export function FacilitiesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Fasilitas");

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua Fasilitas") return facilitiesData;
    return facilitiesData.filter((f) => f.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-10">
      
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary-900 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-shadow duration-200 group"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-primary-900/90 text-gold-light text-xs font-bold uppercase tracking-wider shadow">
                    {item.category}
                  </span>
                </div>

                {/* Capacity & Location */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                    <span>{item.location}</span>
                  </span>
                  {item.capacity && (
                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                      <Users className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                      <span>{item.capacity}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-950 font-sans leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-royal">
                  "{item.headline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Key features */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Spesifikasi & Keunggulan Fasilitas:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-surface-subtle border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Sekolah Dharma Loka Pekanbaru</span>
              <span className="text-royal font-semibold">Tersedia untuk Siswa</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

