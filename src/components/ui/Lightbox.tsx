"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Peninjau Galeri Gambar"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup peninjau gambar"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-gold"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Gambar sebelumnya"
        className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-gold hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-black/50">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption Bar */}
        <div className="w-full mt-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <div className="text-gold font-bold uppercase tracking-wider text-[11px]">
              {currentItem.category} • {currentItem.date}
            </div>
            <div className="text-base font-semibold mt-0.5">
              {currentItem.title}
            </div>
            <div className="text-slate-300 text-xs mt-1">
              {currentItem.caption}
            </div>
          </div>
          <div className="text-slate-400 font-medium shrink-0">
            {currentIndex + 1} dari {items.length}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Gambar berikutnya"
        className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-gold hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}

