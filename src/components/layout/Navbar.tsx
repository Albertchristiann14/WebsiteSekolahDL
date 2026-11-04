"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  GraduationCap, 
  Phone, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { schoolInfo } from "@/data/schoolInfo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Hide public navbar on admin CMS dashboard routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAcademicDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAcademicDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setAcademicDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Akademik", href: "/academics", hasDropdown: true },
    { label: "Fasilitas", href: "/facilities" },
    { label: "Prestasi", href: "/achievements" },
    { label: "Berita", href: "/news" },
    { label: "Galeri", href: "/gallery" },
    { label: "Kontak", href: "/contact" },
  ];

  return (
    <>
      {/* Top Banner - Hotline & Announcements */}
      <div className="bg-primary-950 text-slate-300 text-xs py-2 px-4 border-b border-primary-800/50 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-light font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
              <span>Penerimaan Peserta Didik Baru (PPDB) T.A. 2027/2028 Telah Dibuka</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Pekanbaru, Riau, Indonesia</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${schoolInfo.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
              <span>Hotline PPDB: {schoolInfo.contact.whatsappFormatted.split(" ")[0]} {schoolInfo.contact.whatsappFormatted.split(" ")[1]}</span>
            </a>
            <Link
              href="/admissions#jadwal"
              className="text-gold-light hover:text-gold hover:underline transition-colors flex items-center gap-1"
            >
              <span>Jadwal Gelombang</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & School Name */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-royal rounded-md"
              aria-label="Beranda Sekolah Dharma Loka"
            >
              {/* Visual Seal / Emblem */}
              <div className="w-11 h-11 rounded-lg bg-primary-900 flex items-center justify-center text-white shadow-sm border border-gold/40 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-gold" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-primary-950 leading-tight group-hover:text-royal transition-colors">
                  Dharma Loka
                </span>
                <span className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">
                  Pekanbaru • TK • SD • SMP • SMA • SMK
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navigasi Utama">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      ref={dropdownRef}
                      className="relative"
                    >
                      <button
                        type="button"
                        onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            setAcademicDropdownOpen(true);
                          }
                        }}
                        aria-expanded={academicDropdownOpen}
                        aria-haspopup="true"
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                          pathname.startsWith("/academics")
                            ? "text-royal font-semibold"
                            : "text-slate-700 hover:text-primary-900 hover:bg-slate-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            academicDropdownOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {academicDropdownOpen && (
                        <div
                          className="absolute left-0 mt-2 w-72 rounded-lg bg-white shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                          role="menu"
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Jenjang Pendidikan
                            </span>
                          </div>
                          {academicLevels.map((lvl) => (
                            <Link
                              key={lvl.slug}
                              href={`/academics/${lvl.slug}`}
                              role="menuitem"
                              className="flex items-start gap-3 p-2.5 rounded-md hover:bg-surface-subtle transition-colors group"
                            >
                              <div className="w-8 h-8 rounded bg-primary-50 text-primary-900 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-primary-900 group-hover:text-gold transition-colors">
                                {lvl.slug.toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-primary-950 group-hover:text-royal">
                                  {lvl.name}
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1">
                                  {lvl.levelBadge}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <Link
                              href="/academics"
                              role="menuitem"
                              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-royal hover:text-royal-dark transition-colors"
                            >
                              <span>Lihat Semua Program</span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-royal font-semibold"
                        : "text-slate-700 hover:text-primary-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Admissions Primary CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white bg-primary-900 hover:bg-primary-800 active:bg-primary-950 border border-gold/40 shadow-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-royal"
              >
                <span>Pendaftaran PPDB</span>
                <ArrowRight className="w-4 h-4 text-gold-light" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/admissions"
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-900 rounded-md sm:hidden"
              >
                PPDB
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                className="p-2 text-slate-700 hover:text-primary-900 hover:bg-slate-100 rounded-md focus-visible:ring-2 focus-visible:ring-royal"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 p-6 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
          >
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.label} className="py-2 border-b border-slate-100">
                        <Link
                          href="/academics"
                          className="text-base font-bold text-primary-950 flex items-center justify-between mb-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>Akademik & Jenjang</span>
                          <span className="text-xs font-medium text-royal">Semua →</span>
                        </Link>
                        <div className="grid grid-cols-2 gap-2 pl-2">
                          {academicLevels.map((lvl) => (
                            <Link
                              key={lvl.slug}
                              href={`/academics/${lvl.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="p-2.5 rounded bg-surface-subtle text-xs font-semibold text-slate-800 hover:bg-primary-50 hover:text-primary-900 border border-slate-200/60"
                            >
                              <div className="font-bold text-primary-950">{lvl.slug.toUpperCase()}</div>
                              <div className="text-[11px] text-slate-500 font-normal">{lvl.name}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3 text-base font-medium border-b border-slate-100 flex items-center justify-between ${
                        isActive
                          ? "text-royal font-bold"
                          : "text-slate-800 hover:text-primary-900"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA Box */}
              <div className="p-4 rounded-lg bg-primary-950 text-white mt-6">
                <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-gold" aria-hidden="true" />
                  <span>Penerimaan Siswa Baru</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Mulai Perjalanan Pendidikan Putra-Putri Anda
                </h4>
                <p className="text-xs text-slate-300 mb-4">
                  Konsultasikan minat dan daftarkan putra-putri Anda melalui portal PPDB resmi.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/admissions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded bg-gold hover:bg-gold-light text-primary-950 font-bold text-sm shadow transition-colors"
                  >
                    Buka Pendaftaran PPDB
                  </Link>
                  <a
                    href={`https://wa.me/${schoolInfo.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 px-4 rounded bg-primary-800 hover:bg-primary-700 text-white text-xs font-medium flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                    <span>WhatsApp Panitia Admisi</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Footer Meta */}
            <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 text-center">
              © {new Date().getFullYear()} Sekolah Dharma Loka Pekanbaru
            </div>
          </div>
        )}
      </header>
    </>
  );
}

