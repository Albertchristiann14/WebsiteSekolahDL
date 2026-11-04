"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ZoomIn,
  Play,
  Images,
  Video,
  FolderOpen,
} from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { Lightbox } from "@/components/ui/Lightbox";
import { Badge, Card, Modal } from "@/components/ui/DesignSystem";

const CATEGORIES = [
  "Semua",
  "Kegiatan Belajar",
  "Fasilitas Kampus",
  "Prestasi & Lomba",
  "Seni & Olahraga",
  "Kehidupan Siswa",
] as const;

const YOUTUBE_VIDEOS = [
  {
    id: "vid-1",
    youtubeId: "ScMzIvxBSi4",
    title: "Video Profil Resmi Sekolah Dharma Loka Pekanbaru (Campus Tour)",
    duration: "04:18",
    category: "Profil Kampus",
    date: "Januari 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vid-2",
    youtubeId: "ScMzIvxBSi4",
    title: "Pameran Inovasi Sains, Robotika & Projek P5 (STEAM Expo)",
    duration: "03:45",
    category: "Akademik & STEAM",
    date: "Februari 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vid-3",
    youtubeId: "ScMzIvxBSi4",
    title: "Pentas Seni Budaya Imlek & Harmoni Keberagaman Dharma Loka",
    duration: "05:12",
    category: "Seni & Budaya",
    date: "Februari 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
  },
];

export function GalleryClient() {
  const [activeTab, setActiveTab] = useState<"foto" | "album" | "video">("foto");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [activeVideo, setActiveVideo] = useState<typeof YOUTUBE_VIDEOS[0] | null>(
    null
  );

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Ringkasan Album berdasarkan kategori
  const albums = useMemo(() => {
    return CATEGORIES.filter((c) => c !== "Semua").map((cat) => {
      const photos = galleryItems.filter((g) => g.category === cat);
      return {
        name: cat,
        count: photos.length,
        cover:
          photos[0]?.image ||
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      };
    });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  return (
    <div className="space-y-10">
      {/* Main Switcher: Semua Foto / Album Foto / Arsip Video YouTube */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("foto")}
            className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer ${
              activeTab === "foto"
                ? "bg-royal text-white shadow-sm"
                : "bg-blue-50/70 text-primary-950 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            <Images className="w-4 h-4" />
            <span>Semua Foto ({galleryItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("album")}
            className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer ${
              activeTab === "album"
                ? "bg-royal text-white shadow-sm"
                : "bg-blue-50/70 text-primary-950 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Album Foto ({albums.length} Album)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer ${
              activeTab === "video"
                ? "bg-royal text-white shadow-sm"
                : "bg-blue-50/70 text-primary-950 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Arsip Video YouTube ({YOUTUBE_VIDEOS.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SEMUA FOTO DENGAN FILTER KATEGORI & LIGHTBOX */}
      {activeTab === "foto" && (
        <div className="space-y-8">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Kategori Galeri"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary-950 text-white"
                      : "bg-white text-slate-700 hover:bg-blue-50 border border-blue-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-blue-50 border border-blue-100 shadow-card hover:shadow-elevated transition-all duration-300 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block mb-1">
                    {item.category} • {item.date}
                  </span>
                  <h3 className="text-base font-extrabold line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-blue-100 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/90 text-royal flex items-center justify-center shadow-sm">
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ALBUM FOTO (COVER + JUMLAH FOTO) */}
      {activeTab === "album" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {albums.map((album) => (
            <Card
              key={album.name}
              className="overflow-hidden group cursor-pointer hover:border-royal transition-all"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(album.name);
                  setActiveTab("foto");
                }}
                className="w-full text-left cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-blue-50 overflow-hidden">
                  <Image
                    src={album.cover}
                    alt={album.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-royal text-white text-xs font-extrabold shadow-sm">
                    {album.count} Foto
                  </span>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-primary-950 group-hover:text-royal">
                      Album {album.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Klik untuk membuka seluruh foto dalam album ini
                    </p>
                  </div>
                  <FolderOpen className="w-6 h-6 text-royal" />
                </div>
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 3: ARSIP VIDEO YOUTUBE DENGAN THUMBNAIL */}
      {activeTab === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {YOUTUBE_VIDEOS.map((vid) => (
            <Card key={vid.id} className="overflow-hidden group">
              <button
                type="button"
                onClick={() => setActiveVideo(vid)}
                className="w-full text-left cursor-pointer"
              >
                <div className="relative aspect-video bg-primary-950 overflow-hidden">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-royal text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-primary-950/90 text-white text-xs font-mono font-bold">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <Badge variant="blue">{vid.category}</Badge>
                  <h3 className="text-base font-extrabold text-primary-950 leading-snug group-hover:text-royal">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-500">{vid.date}</p>
                </div>
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Lightbox Foto */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Modal Pemutar Video YouTube */}
      <Modal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title || "Video Dokumentasi"}
        maxWidth="max-w-4xl"
      >
        {activeVideo && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
