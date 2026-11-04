"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Phone,
  Award,
} from "lucide-react";
import { useTenant } from "@/lib/tenantContext";
import { TENANT_LIST, TenantId } from "@/config/tenants";

const profileLinks = [
  { name: "Sambutan Kepala Sekolah", href: "/about#sambutan", desc: "Pesan & komitmen pimpinan sekolah" },
  { name: "Visi, Misi & Nilai Karakter", href: "/about#visi-misi", desc: "Nilai luhur Prajña, Sīla, Vīriya" },
  { name: "Sejarah Dharma Loka", href: "/about#sejarah", desc: "Perjalanan pengabdian pendidikan" },
  { name: "Legalitas & Akreditasi A", href: "/about#legalitas", desc: "NPSN, SK Izin & Sertifikat BAN-PDM" },
  { name: "Fasilitas Sekolah", href: "/facilities", desc: "Laboratorium sains, komputer & olahraga" },
  { name: "Struktur Organisasi", href: "/about#struktur", desc: "Dewan pembina yayasan & pimpinan unit" },
];

const academicLinks = [
  { name: "Kurikulum Terpadu", href: "/academics#kurikulum", desc: "Kurikulum Nasional + Trilingual + STEAM" },
  { name: "Program Unggulan", href: "/academics#unggulan", desc: "Immersion 3 bahasa, riset & olimpiade" },
  { name: "Ekstrakurikuler", href: "/academics#ekstrakurikuler", desc: "Robotika, debat, wushu, musik & basket" },
  { name: "Kalender Akademik", href: "/academics#kalender", desc: "Agenda kegiatan & jadwal ujian sekolah" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"profil" | "akademik" | null>(null);
  const pathname = usePathname();
  const { tenant, tenantId, setTenantId } = useTenant();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Jangan tampilkan Navbar publik di halaman Admin CMS atau di halaman Portal Utama (Gateway)
  if (pathname?.startsWith("/admin") || (pathname === "/" && tenantId === "portal")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${tenant.contact.whatsapp}?text=${encodeURIComponent(
    tenant.contact.whatsappDefaultText
  )}`;

  const handleSelectTenant = (id: TenantId) => {
    setTenantId(id);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 no-print ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-white border-b border-slate-200/70"
      }`}
    >
      {/* Top Bar: Pilih Jenjang & Informasi Singkat */}
      <div className="bg-slate-50 border-b border-slate-200/60 text-xs text-slate-600">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          {/* Kiri: Pilihan Unit Jenjang Sekolah */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="hidden sm:inline font-semibold text-slate-500 mr-1 whitespace-nowrap">
              Unit Pendidikan:
            </span>
            {TENANT_LIST.map((item) => {
              const active = item.id === tenantId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTenant(item.id)}
                  className={`px-3 py-1 rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-royal text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-200/70 hover:text-primary-950"
                  }`}
                >
                  {item.id === "portal" ? "← Portal Utama" : item.levelCode}
                </button>
              );
            })}
          </div>

          {/* Kanan: Info Akreditasi, Telepon & Akses Admin */}
          <div className="flex items-center gap-4 shrink-0 whitespace-nowrap">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Terakreditasi A (Unggul)</span>
            </span>
            <a
              href={`tel:${tenant.contact.phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-slate-600 hover:text-royal font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-royal" />
              <span>{tenant.contact.phone}</span>
            </a>
            <div className="hidden md:block w-px h-3.5 bg-slate-300" />
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-royal font-semibold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-royal" />
              <span>Portal Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Navigasi Utama & Tombol Pendaftaran */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* 1. Brand Logo (Kiri) */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none shrink-0"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0"
              style={{ backgroundColor: tenant.theme.primary }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-extrabold text-lg tracking-tight text-primary-950 leading-tight">
                {tenant.id === "portal" ? "Sekolah Dharma Loka" : tenant.shortName}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {tenant.id === "portal"
                  ? "TK • SD • SMP • SMA — Pekanbaru"
                  : `${tenant.name} • Pekanbaru`}
              </span>
            </div>
          </Link>

          {/* 2. Navigasi Desktop (Tengah - Semua 1 Baris & Lega) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Navigasi Utama"
          >
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname === "/"
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Beranda
            </Link>

            {/* Dropdown Profil */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("profil")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "profil" ? null : "profil")
                }
                aria-expanded={openDropdown === "profil"}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  pathname.startsWith("/about") || pathname.startsWith("/facilities")
                    ? "text-royal bg-blue-50/80 font-bold"
                    : "text-slate-700 hover:text-royal hover:bg-slate-50"
                }`}
              >
                <span>Profil</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openDropdown === "profil" ? "rotate-180 text-royal" : ""
                  }`}
                />
              </button>

              {openDropdown === "profil" && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white rounded-2xl shadow-elevated border border-slate-200/80 p-2 grid gap-0.5">
                    {profileLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-blue-50/60 transition"
                      >
                        <p className="text-sm font-bold text-primary-950">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Akademik */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("akademik")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "akademik" ? null : "akademik"
                  )
                }
                aria-expanded={openDropdown === "akademik"}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  pathname.startsWith("/academics")
                    ? "text-royal bg-blue-50/80 font-bold"
                    : "text-slate-700 hover:text-royal hover:bg-slate-50"
                }`}
              >
                <span>Akademik</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openDropdown === "akademik" ? "rotate-180 text-royal" : ""
                  }`}
                />
              </button>

              {openDropdown === "akademik" && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white rounded-2xl shadow-elevated border border-slate-200/80 p-2 grid gap-0.5">
                    {academicLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-blue-50/60 transition"
                      >
                        <p className="text-sm font-bold text-primary-950">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/teachers"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname.startsWith("/teachers")
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Guru & Staf
            </Link>

            <Link
              href="/achievements"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname.startsWith("/achievements")
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Prestasi
            </Link>

            <Link
              href="/news"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname.startsWith("/news")
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Berita
            </Link>

            <Link
              href="/gallery"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname.startsWith("/gallery")
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Galeri
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
                pathname.startsWith("/contact")
                  ? "text-royal bg-blue-50/80 font-bold"
                  : "text-slate-700 hover:text-royal hover:bg-slate-50"
              }`}
            >
              Kontak
            </Link>
          </nav>

          {/* 3. Tombol Aksi Kanan (Rapi, Satu Baris, Tidak Sempit) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Tombol Konsultasi WA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat WhatsApp Sekolah"
              title="Tanya via WhatsApp"
              className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200/80 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Tombol Utama: Daftar SPMB */}
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 text-sm font-bold text-white bg-royal hover:bg-royal-dark rounded-xl transition-all shadow-sm whitespace-nowrap"
            >
              <span>Daftar SPMB</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </Link>

            {/* Tombol Menu Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-primary-950 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Layar Penuh untuk Mobile & Tablet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[120px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 px-5 py-6 space-y-6">
          {/* Pemilih Jenjang di Mobile */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Pilih Unit Jenjang Pendidikan
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TENANT_LIST.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTenant(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left border transition ${
                    item.id === tenantId
                      ? "bg-royal text-white border-royal"
                      : "bg-white text-primary-950 border-slate-200"
                  }`}
                >
                  <span className="block font-extrabold">
                    {item.id === "portal" ? "← Portal Utama" : item.levelCode}
                  </span>
                  <span
                    className={`block text-[11px] truncate ${
                      item.id === tenantId ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {item.shortName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Daftar Menu Mobile */}
          <nav className="space-y-1" aria-label="Menu Mobile">
            {[
              { name: "Beranda", href: "/" },
              { name: "Profil Sekolah & Legalitas", href: "/about" },
              { name: "Program Akademik & Kurikulum", href: "/academics" },
              { name: "Direktori Guru & Staf", href: "/teachers" },
              { name: "Fasilitas Kampus", href: "/facilities" },
              { name: "Prestasi Siswa", href: "/achievements" },
              { name: "Berita, Pengumuman & Agenda", href: "/news" },
              { name: "Galeri Foto & Video", href: "/gallery" },
              { name: "Pendaftaran SPMB Online", href: "/admissions" },
              { name: "Hubungi Kami", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold ${
                  pathname === link.href
                    ? "bg-royal text-white"
                    : "text-primary-950 hover:bg-slate-100"
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Link>
            ))}
          </nav>

          {/* Tombol Bawah Mobile */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10">
            <Link
              href="/admissions"
              className="flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-royal text-white font-bold text-sm shadow-sm"
            >
              <span>Daftar SPMB Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
