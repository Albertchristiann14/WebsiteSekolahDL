"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ZoomIn, Sparkles, Filter } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery";
import { Lightbox } from "@/components/ui/Lightbox";

const CATEGORIES = [
  "Semua",
  "Kegiatan Belajar",
  "Fasilitas Kampus",
  "Prestasi & Lomba",
  "Seni & Olahraga",
  "Kehidupan Siswa",
] as const;

export function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="space-y-10">
      
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Kategori Galeri">
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

      {/* Gallery Mosaic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-elevated transition-all duration-300 aspect-[4/3] cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                {item.category} • {item.date}
              </span>
              <h3 className="text-sm font-bold font-sans line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {item.caption}
              </p>
            </div>

            {/* Zoom Icon Pin */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-gold" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

    </div>
  );
}

