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
  Building2,
  MessageCircle,
  Check,
  Globe,
} from "lucide-react";
import { useTenant } from "@/lib/tenantContext";
import { TENANT_LIST, TenantId } from "@/config/tenants";

const profileLinks = [
  { name: "Sambutan Kepala Sekolah", href: "/about#sambutan", desc: "Pesan & komitmen pimpinan sekolah" },
  { name: "Visi, Misi & Karakter", href: "/about#visi-misi", desc: "Nilai luhur Prajña, Sīla, Vīriya" },
  { name: "Sejarah Dharma Loka", href: "/about#sejarah", desc: "Perjalanan pengabdian sejak 1988" },
  { name: "Legalitas & Akreditasi", href: "/about#legalitas", desc: "NPSN, SK Izin & Sertifikat Akreditasi A" },
  { name: "Fasilitas Kampus", href: "/facilities", desc: "Laboratorium, perpustakaan & olahraga" },
  { name: "Struktur Organisasi", href: "/about#struktur", desc: "Dewan yayasan & pimpinan unit" },
];

const academicLinks = [
  { name: "Kurikulum Terpadu", href: "/academics#kurikulum", desc: "Kurikulum Nasional + Trilingual + STEAM" },
  { name: "Program Unggulan", href: "/academics#unggulan", desc: "Immersion 3 bahasa, riset & olimpiade" },
  { name: "Ekstrakurikuler", href: "/academics#ekstrakurikuler", desc: "Klub robotika, debat, wushu, musik & basket" },
  { name: "Kalender Akademik", href: "/academics#kalender", desc: "Agenda kegiatan & jadwal ujian sekolah" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"profil" | "akademik" | "jenjang" | null>(null);
  const pathname = usePathname();
  const { tenant, tenantId, setTenantId } = useTenant();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Jangan tampilkan Navbar publik di halaman Admin CMS
  if (pathname?.startsWith("/admin")) {
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-blue-100"
          : "bg-white border-b border-blue-100/80"
      }`}
    >
      {/* Top Bar Multi-Tenant Subdomain Switcher & Portal Admin */}
      <div className="bg-blue-50/80 border-b border-blue-100/80 text-xs text-slate-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="hidden md:inline-flex items-center gap-1.5 font-bold text-primary-950 shrink-0">
              <Globe className="w-3.5 h-3.5 text-royal" />
              Ekosistem Multi-Jenjang:
            </span>
            <div className="flex items-center gap-1">
              {TENANT_LIST.map((item) => {
                const active = item.id === tenantId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTenant(item.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer shrink-0 ${
                      active
                        ? "bg-royal text-white shadow-xs"
                        : "text-slate-600 hover:bg-blue-100/70 hover:text-royal"
                    }`}
                    title={`Buka ${item.name} (${item.subdomain})`}
                  >
                    {item.id === "portal" ? "Portal Induk" : item.levelCode}
                  </button>
                );
              })}
            </div>
            <span className="hidden xl:inline-block text-[11px] font-mono text-royal bg-white px-2.5 py-0.5 rounded-md border border-blue-200 ml-2">
              {tenant.subdomain}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline text-slate-500 font-medium">
              {tenant.accreditation}
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-royal border border-blue-200 font-bold text-[11px] transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo + Active Jenjang Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
              style={{ backgroundColor: tenant.theme.primary }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-primary-950 leading-none">
                  {tenant.id === "portal"
                    ? "SEKOLAH DHARMA LOKA"
                    : tenant.shortName.toUpperCase()}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-blue-50 text-royal border border-blue-200 text-[10px] font-extrabold uppercase">
                  {tenant.levelCode}
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-slate-500 mt-1">
                {tenant.subdomain} • Pekanbaru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-0.5"
            aria-label="Navigasi Utama"
          >
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname === "/"
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
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
                className={`flex items-center gap-1 px-3 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                  pathname.startsWith("/about") || pathname.startsWith("/facilities")
                    ? "text-royal bg-blue-50"
                    : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
                }`}
              >
                <span>Profil</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === "profil" ? "rotate-180 text-royal" : ""
                  }`}
                />
              </button>

              {openDropdown === "profil" && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white rounded-2xl shadow-elevated border border-blue-100 p-2.5 grid gap-1">
                    {profileLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 transition"
                      >
                        <p className="text-sm font-bold text-primary-950">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
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
                className={`flex items-center gap-1 px-3 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                  pathname.startsWith("/academics")
                    ? "text-royal bg-blue-50"
                    : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
                }`}
              >
                <span>Akademik</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === "akademik" ? "rotate-180 text-royal" : ""
                  }`}
                />
              </button>

              {openDropdown === "akademik" && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white rounded-2xl shadow-elevated border border-blue-100 p-2.5 grid gap-1">
                    {academicLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 transition"
                      >
                        <p className="text-sm font-bold text-primary-950">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/teachers"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/teachers")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              Guru & Staf
            </Link>

            <Link
              href="/achievements"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/achievements")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              Prestasi
            </Link>

            <Link
              href="/news"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/news")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              Berita
            </Link>

            <Link
              href="/gallery"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/gallery")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              Galeri
            </Link>

            <Link
              href="/admissions"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/admissions")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              SPMB
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-bold rounded-xl transition-colors ${
                pathname.startsWith("/contact")
                  ? "text-royal bg-blue-50"
                  : "text-slate-700 hover:text-royal hover:bg-blue-50/50"
              }`}
            >
              Kontak
            </Link>
          </nav>

          {/* Right Action Area: Dropdown "Jenjang Kami", WhatsApp Icon, & CTA "Daftar SPMB" */}
          <div className="flex items-center gap-2.5">
            {/* Pemilih Jenjang Dropdown ("Jenjang Kami") */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "jenjang" ? null : "jenjang")
                }
                aria-expanded={openDropdown === "jenjang"}
                className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-2xl bg-blue-50/90 hover:bg-blue-100 text-royal border border-blue-200 font-bold text-xs transition cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Jenjang Kami</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === "jenjang" && (
                <div className="absolute right-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white rounded-2xl shadow-elevated border border-blue-100 p-3 space-y-1.5">
                    <p className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Pilih Portal / Subdomain Jenjang
                    </p>
                    {TENANT_LIST.map((item) => {
                      const isSelected = item.id === tenantId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectTenant(item.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? "bg-royal text-white font-bold"
                              : "hover:bg-blue-50 text-primary-950"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-extrabold">
                              {item.shortName}
                            </p>
                            <p
                              className={`text-[11px] font-mono ${
                                isSelected ? "text-blue-100" : "text-slate-500"
                              }`}
                            >
                              {item.subdomain}
                            </p>
                          </div>
                          {isSelected && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Ikon WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              title="Konsultasi Cepat via WhatsApp"
              className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Tombol CTA Menonjol: Daftar SPMB (Tetap terlihat di Mobile & Desktop) */}
            <Link
              href="/admissions#daftar"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-royal hover:bg-royal-dark rounded-2xl transition-all shadow-md shadow-royal/20"
            >
              <span>Daftar SPMB</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </Link>

            {/* Hamburger Menu Button (Mobile & Tablet) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 min-h-[44px] rounded-2xl text-primary-950 hover:bg-blue-50 border border-blue-100 cursor-pointer"
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

      {/* Mobile Fullscreen Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[120px] bottom-0 bg-white z-50 overflow-y-auto border-t border-blue-100 px-5 py-6 space-y-6">
          {/* Pemilih Jenjang di Mobile */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <p className="text-xs font-extrabold uppercase tracking-wider text-royal mb-2.5">
              Pilih Jenjang Kami (Subdomain)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TENANT_LIST.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTenant(item.id)}
                  className={`px-3 py-2.5 min-h-[44px] rounded-xl text-xs font-bold text-left border transition ${
                    item.id === tenantId
                      ? "bg-royal text-white border-royal"
                      : "bg-white text-primary-950 border-blue-100"
                  }`}
                >
                  <span className="block font-extrabold">{item.levelCode}</span>
                  <span
                    className={`block text-[10px] truncate ${
                      item.id === tenantId ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {item.subdomain}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Utama Mobile */}
          <nav className="space-y-1.5" aria-label="Menu Mobile">
            {[
              { name: "Beranda", href: "/" },
              { name: "Profil Sekolah & Legalitas", href: "/about" },
              { name: "Kurikulum & Akademik", href: "/academics" },
              { name: "Direktori Guru & Staf (GTK)", href: "/teachers" },
              { name: "Fasilitas Kampus", href: "/facilities" },
              { name: "Prestasi Siswa", href: "/achievements" },
              { name: "Berita, Pengumuman & Agenda", href: "/news" },
              { name: "Galeri Foto & Video", href: "/gallery" },
              { name: "SPMB / PPDB Online", href: "/admissions" },
              { name: "Kontak & Lokasi", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3.5 min-h-[48px] rounded-2xl text-base font-bold ${
                  pathname === link.href
                    ? "bg-royal text-white"
                    : "text-primary-950 hover:bg-blue-50"
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Link>
            ))}
          </nav>

          {/* Bottom Mobile Actions */}
          <div className="pt-4 border-t border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-10">
            <Link
              href="/admissions#daftar"
              className="flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-2xl bg-royal text-white font-extrabold text-sm shadow-md"
            >
              <span>Daftar SPMB Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 min-h-[48px] px-5 py-3.5 rounded-2xl bg-blue-50 text-royal border border-blue-200 font-bold text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Admin CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
