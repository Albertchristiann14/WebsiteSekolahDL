"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  GraduationCap,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Cpu,
  Briefcase,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { academicLevels } from "@/data/academics";
import { schoolInfo } from "@/data/schoolInfo";

const levelIcons: Record<string, React.ReactNode> = {
  tk: <Sparkles className="w-5 h-5 text-royal" />,
  sd: <BookOpen className="w-5 h-5 text-royal" />,
  smp: <Award className="w-5 h-5 text-royal" />,
  sma: <Cpu className="w-5 h-5 text-royal" />,
  smk: <Briefcase className="w-5 h-5 text-royal" />,
};

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [mobileAcademicOpen, setMobileAcademicOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setAcademicDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAcademicDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Sekolah", href: "/about" },
    { name: "Akademik", href: "/academics", hasDropdown: true },
    { name: "Prestasi", href: "/achievements" },
    { name: "Fasilitas", href: "/facilities" },
    { name: "Berita", href: "/news" },
    { name: "Galeri", href: "/gallery" },
    { name: "Kontak", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar: Bright Sky Blue Info Bar + Quick Admin Access */}
      <div className="bg-blue-50/90 text-slate-700 text-xs sm:text-sm py-2.5 border-b border-blue-100 hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 font-medium text-primary-900">
              <span className="w-2 h-2 rounded-full bg-royal animate-pulse" />
              <span>Penerimaan Peserta Didik Baru (PPDB) T.A. 2026/2027 Telah Dibuka</span>
            </span>
            <span className="text-blue-200">|</span>
            <span className="text-slate-600">{schoolInfo.contact.officeHours}</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href={`https://wa.me/${schoolInfo.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-royal transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-royal" aria-hidden="true" />
              <span>Layanan Orang Tua: {schoolInfo.contact.whatsappFormatted}</span>
            </a>
            <span className="text-blue-200">|</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-bold text-royal hover:text-royal-dark transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-royal" aria-hidden="true" />
              <span>Portal Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(29,78,216,0.08)] border-b border-blue-100 py-3.5"
            : "bg-white border-b border-slate-100 py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Identity / Logo */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus:outline-none rounded-xl shrink-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-royal flex items-center justify-center text-white shadow-md shadow-royal/20 group-hover:bg-royal-dark transition-colors">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-primary-950 leading-none">
                  SEKOLAH DHARMA LOKA
                </span>
                <span className="text-xs font-semibold tracking-wider text-royal uppercase mt-1">
                  Pekanbaru • Pendidikan Terpadu
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden xl:flex items-center space-x-1.5"
            >
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setAcademicDropdownOpen(true)}
                      onMouseLeave={() => setAcademicDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setAcademicDropdownOpen((prev) => !prev)}
                        aria-expanded={academicDropdownOpen}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-semibold rounded-xl transition-colors ${
                          isActive(link.href)
                            ? "text-royal bg-blue-50"
                            : "text-slate-700 hover:text-royal hover:bg-blue-50/60"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            academicDropdownOpen ? "rotate-180 text-royal" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Academic Mega Dropdown */}
                      {academicDropdownOpen && (
                        <div className="absolute left-0 top-full pt-3 w-[560px] z-50">
                          <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100 p-5 grid grid-cols-1 gap-2">
                            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                5 Jenjang Pendidikan Terpadu
                              </span>
                              <Link
                                href="/academics"
                                className="text-xs font-bold text-royal hover:text-royal-dark flex items-center gap-1"
                              >
                                <span>Lihat Semua Jenjang</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                            {academicLevels.map((prog) => (
                              <Link
                                key={prog.slug}
                                href={`/academics/${prog.slug}`}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50/70 transition-colors group"
                              >
                                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-royal/30 transition-colors">
                                  {levelIcons[prog.slug]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-[15px] font-bold text-primary-950 group-hover:text-royal transition-colors">
                                      {prog.name}
                                    </p>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-royal">
                                      {prog.levelBadge}
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 mt-1">
                                    {prog.headline}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2.5 text-[15px] font-semibold rounded-xl transition-colors ${
                      isActive(link.href)
                        ? "text-royal bg-blue-50"
                        : "text-slate-700 hover:text-royal hover:bg-blue-50/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons: Portal Admin + Pendaftaran PPDB */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-royal bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-xl transition-all duration-200"
                title="Masuk ke Dashboard Admin CMS Sekolah"
              >
                <LayoutDashboard className="w-4 h-4 text-royal" aria-hidden="true" />
                <span>Portal Admin</span>
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-royal hover:bg-royal-dark rounded-xl shadow-md shadow-royal/20 hover:shadow-lg transition-all duration-200"
              >
                <span>Pendaftaran PPDB</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href="/admin"
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-royal bg-blue-50 border border-blue-200 rounded-lg"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                className="p-2.5 rounded-xl text-primary-950 hover:bg-blue-50 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-royal" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-blue-100 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-5 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setMobileAcademicOpen(!mobileAcademicOpen)}
                        aria-expanded={mobileAcademicOpen}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-base font-bold text-primary-950 rounded-xl hover:bg-blue-50/70"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-royal transition-transform ${
                            mobileAcademicOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileAcademicOpen && (
                        <div className="pl-4 pr-2 py-2 space-y-1.5 bg-blue-50/50 rounded-xl border border-blue-100">
                          {academicLevels.map((prog) => (
                            <Link
                              key={prog.slug}
                              href={`/academics/${prog.slug}`}
                              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-white hover:text-royal"
                            >
                              {levelIcons[prog.slug]}
                              <div>
                                <div className="font-bold text-primary-950">{prog.name}</div>
                                <div className="text-xs text-slate-500">{prog.levelBadge}</div>
                              </div>
                            </Link>
                          ))}
                          <Link
                            href="/academics"
                            className="block px-3.5 py-2 text-xs font-bold text-royal hover:underline"
                          >
                            Lihat Ringkasan Semua Jenjang →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3.5 text-base font-bold rounded-xl ${
                      isActive(link.href)
                        ? "bg-blue-50 text-royal"
                        : "text-primary-950 hover:bg-blue-50/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-5 mt-4 border-t border-slate-200 space-y-3">
                <Link
                  href="/admissions"
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 text-base font-bold text-white bg-royal hover:bg-royal-dark rounded-xl shadow-md"
                >
                  <span>Pendaftaran Siswa Baru (PPDB)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/admin"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-royal bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Masuk ke Portal Admin CMS</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
