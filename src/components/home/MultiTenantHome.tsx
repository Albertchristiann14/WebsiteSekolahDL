"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Sparkles,
  Phone,
  FileText,
  CreditCard,
  Play,
  ExternalLink,
  Building2,
  ShieldCheck,
  Quote,
  Globe,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Clock,
  MapPin,
} from "lucide-react";
import { useTenant } from "@/lib/tenantContext";
import { UNIT_TENANTS, TENANT_LIST, TenantId } from "@/config/tenants";
import { schoolInfo } from "@/data/schoolInfo";
import { achievements as staticAchievements } from "@/data/achievements";
import { newsArticles as staticNews } from "@/data/news";
import { galleryItems as staticGallery } from "@/data/gallery";
import { schoolEvents, buildGoogleCalendarUrl } from "@/data/events";
import { admissionFAQs } from "@/data/admissions";
import { CountUp } from "@/components/ui/CountUp";
import { Accordion, Badge, Card } from "@/components/ui/DesignSystem";
import { publicApi } from "@/lib/api";
import { PancaDharmaGateway } from "./PancaDharmaGateway";

export function MultiTenantHome() {
  const { tenant, tenantId, setTenantId, navigateToTenant, isPortal } = useTenant();
  const [slideIndex, setSlideIndex] = useState(0);
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [youtubePlaying, setYoutubePlaying] = useState(false);

  // Data dinamis dari API CMS dengan fallback instan
  const [dynamicNews, setDynamicNews] = useState<any[]>(staticNews);
  const [dynamicAchievements, setDynamicAchievements] =
    useState<any[]>(staticAchievements);

  useEffect(() => {
    setSlideIndex(0);
    setAchievementIndex(0);
  }, [tenantId]);

  useEffect(() => {
    let mounted = true;
    publicApi
      .getHomepageData()
      .then((res) => {
        if (!mounted || res.status !== 200 || !res.data) return;
        if (
          Array.isArray(res.data.latest_news) &&
          res.data.latest_news.length > 0
        ) {
          setDynamicNews(res.data.latest_news);
        }
        if (
          Array.isArray(res.data.achievements) &&
          res.data.achievements.length > 0
        ) {
          setDynamicAchievements(res.data.achievements);
        }
      })
      .catch(() => {
        // Gunakan static fallback
      });
    return () => {
      mounted = false;
    };
  }, []);

  const slides = tenant.heroSlides;
  const activeSlide = slides[slideIndex % slides.length] || slides[0];

  // Filter prestasi sesuai jenjang jika bukan portal induk
  const filteredAchievements = isPortal
    ? dynamicAchievements
    : dynamicAchievements.filter((a) => {
        const lvl = (a.level || a.academic_level || "").toLowerCase();
        return !lvl || lvl.includes(tenantId) || lvl === "umum";
      });
  const displayAchievements =
    filteredAchievements.length > 0
      ? filteredAchievements
      : dynamicAchievements;

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  if (isPortal) {
    return <PancaDharmaGateway onSelectUnit={(unit) => navigateToTenant(unit)} />;
  }

  return (
    <div className="bg-white">
      {/* =====================================================================
          BAGIAN 5.1: TAMPILAN PORTAL INDUK (dharmaloka.sch.id)
      ===================================================================== */}
      {isPortal ? (
        <>
          {/* 5.1.A HERO PORTAL INDUK YAYASAN */}
          <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="emerald">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      SPMB Dibuka: {tenant.spmb.wavePeriod}
                    </Badge>
                    <Badge variant="blue">{tenant.accreditation}</Badge>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-primary-950 leading-[1.18] tracking-tight">
                    {tenant.heroTitle}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {tenant.heroSubtitle}
                  </p>

                  {/* 2 CTA Utama: Pilih Jenjang & Daftar SPMB */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#pilih-jenjang"
                      className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-base shadow-md shadow-royal/15 transition-all hover:-translate-y-0.5"
                    >
                      <span>Pilih Jenjang Pendidikan</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <Link
                      href="/admissions#daftar"
                      className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-primary-950 border border-slate-300 font-bold text-base transition-all"
                    >
                      <span>Daftar SPMB Online</span>
                    </Link>
                  </div>

                  {/* Ringkasan Keunggulan Yayasan */}
                  <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
                    {[
                      "Kurikulum Nasional + Trilingual (ID, EN, ZH)",
                      "Ekosistem Terpadu TK, SD, SMP & SMA",
                      "Pendidikan Karakter & Budi Pekerti",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-royal shrink-0 mt-1" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Kampus Portal Induk */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-elevated bg-blue-50 aspect-[4/3]">
                    <Image
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="inline-block px-3 py-1 rounded-full bg-royal text-xs font-bold mb-2.5">
                        {activeSlide.badge}
                      </span>
                      <p className="text-base sm:text-lg font-extrabold leading-snug">
                        {activeSlide.title}
                      </p>
                      <p className="text-xs text-blue-100 mt-1.5 line-clamp-2">
                        {activeSlide.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5.1.B KARTU JENJANG (TK / SD / SMP / SMA) */}
          <section
            id="pilih-jenjang"
            className="py-20 lg:py-24 bg-white scroll-mt-24"
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <Badge variant="blue">Ekosistem Multi-Jenjang</Badge>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
                    Pilih Jenjang Pendidikan Putra-Putri Anda
                  </h2>
                  <p className="text-slate-600 text-base">
                    Setiap jenjang memiliki website subdomain khusus dengan informasi kepala sekolah, kurikulum, rincian biaya, dan kuota SPMB masing-masing.
                  </p>
                </div>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-royal hover:text-royal-dark"
                >
                  <span>Bandingkan Biaya & Kuota SPMB</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {UNIT_TENANTS.map((unit) => (
                  <Card
                    key={unit.id}
                    className="overflow-hidden flex flex-col justify-between group hover:border-royal/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div>
                      <div className="relative h-52 bg-blue-50 overflow-hidden">
                        <Image
                          src={unit.heroSlides[0].image}
                          alt={unit.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span
                            className="px-3 py-1 rounded-xl text-white text-xs font-extrabold shadow-sm"
                            style={{ backgroundColor: unit.theme.primary }}
                          >
                            {unit.levelCode}
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-white/95 text-primary-950 text-[11px] font-bold shadow-xs">
                            {unit.accreditation.split("—")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <p className="text-xs font-mono font-bold text-royal">
                          https://{unit.subdomain}
                        </p>
                        <h3 className="text-xl font-extrabold text-primary-950">
                          {unit.shortName}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {unit.description}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                          <span>Siswa: {unit.stats.students}+</span>
                          <span>
                            Kuota SPMB:{" "}
                            <strong className="text-emerald-700">
                              Sisa {unit.spmb.quotaTotal - unit.spmb.quotaFilled} kursi
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 grid grid-cols-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          navigateToTenant(unit.id);
                        }}
                        className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                      >
                        <span>Kunjungi Beranda {unit.levelCode}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/academics/${unit.id}`}
                        className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-blue-50/70 hover:bg-blue-100 text-royal text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <span>Lihat Detail Kurikulum {unit.levelCode}</span>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* =====================================================================
           BAGIAN 5.2: BERANDA JENJANG (tk / sd / smp / sma.dharmaloka.sch.id)
        ===================================================================== */
        <>
          {/* 5.2.1 HERO BERANDA JENJANG DENGAN SLIDER & BADGE SPMB AKTIF */}
          <section className={`relative overflow-hidden bg-gradient-to-b ${tenant.theme.heroGradient} pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/80`}>
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {tenant.spmb.isOpen && (
                      <Badge variant="emerald">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        SPMB Dibuka: {tenant.spmb.wavePeriod}
                      </Badge>
                    )}
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs text-white"
                      style={{ backgroundColor: tenant.theme.primary }}
                    >
                      {tenant.shortName}
                    </span>
                    <Badge variant="gold">{tenant.accreditation}</Badge>
                  </div>

                  {/* Warna-warni ceria khusus TK */}
                  {tenant.id === "tk" && tenant.theme.paletteBadgeList && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                      {tenant.theme.paletteBadgeList.map((pill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-full text-xs font-black shadow-2xs border border-white/80 ${pill.bg} ${pill.text}`}
                        >
                          {pill.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-950 leading-[1.15]">
                    {tenant.heroTitle}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    {tenant.heroSubtitle}
                  </p>

                  {/* 2 CTA Utama: Daftar SPMB & Lihat Profil */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href={`/admissions?level=${tenant.id}#daftar`}
                      className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-2xl text-white font-extrabold text-base shadow-lg transition-all hover:scale-[1.02] hover:brightness-110"
                      style={{
                        backgroundColor: tenant.theme.primary,
                        boxShadow: `0 8px 24px -4px ${tenant.theme.primary}50`,
                      }}
                    >
                      <span>Daftar SPMB {tenant.levelCode}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-primary-950 border-2 border-slate-200 font-bold text-base transition-all"
                    >
                      <span>Lihat Profil {tenant.levelCode}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => navigateToTenant("portal")}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold hover:underline cursor-pointer"
                      style={{ color: tenant.theme.primary }}
                    >
                      ← Kembali ke Halaman Pusat Yayasan
                    </button>
                  </div>
                </div>

                {/* Slider Foto Kegiatan Asli Jenjang */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-elevated bg-slate-100 aspect-[4/3]">
                    <Image
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 text-white shadow-xs"
                        style={{ backgroundColor: tenant.theme.primary }}
                      >
                        {activeSlide.badge}
                      </span>
                      <p className="text-lg font-extrabold leading-snug">
                        {activeSlide.title}
                      </p>
                      <p className="text-xs text-blue-100 mt-1">
                        {activeSlide.caption}
                      </p>
                    </div>

                    {slides.length > 1 && (
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIndex(
                              (slideIndex - 1 + slides.length) % slides.length
                            )
                          }
                          aria-label="Slide sebelumnya"
                          className="w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-primary-950 flex items-center justify-center shadow-sm cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIndex((slideIndex + 1) % slides.length)
                          }
                          aria-label="Slide berikutnya"
                          className="w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-primary-950 flex items-center justify-center shadow-sm cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5.2.2 INFO CEPAT (4 KARTU): JADWAL SPMB, BIAYA, SYARAT, KONTAK */}
          <section className="py-12 bg-white border-b border-slate-200/80">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="p-6 space-y-3 transition hover:shadow-md">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs"
                    style={{
                      backgroundColor: tenant.theme.primaryLight,
                      color: tenant.theme.primary,
                    }}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-primary-950">
                    Jadwal SPMB Aktif
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    {tenant.spmb.activeWave}
                  </p>
                  <p className="text-xs text-slate-600">
                    Periode pendaftaran: <strong>{tenant.spmb.wavePeriod}</strong>. Sisa kuota:{" "}
                    <strong>
                      {tenant.spmb.quotaTotal - tenant.spmb.quotaFilled} kursi
                    </strong>
                    .
                  </p>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-1 text-xs font-extrabold pt-1 hover:underline"
                    style={{ color: tenant.theme.primary }}
                  >
                    <span>Lihat Linimasa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-6 space-y-3 transition hover:shadow-md">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs"
                    style={{
                      backgroundColor: "#FEF3C7",
                      color: "#B45309",
                    }}
                  >
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-primary-950">
                    Estimasi Biaya {tenant.levelCode}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Formulir:{" "}
                    <strong className="text-primary-950">
                      {formatRupiah(tenant.spmb.fees.registrationForm)}
                    </strong>{" "}
                    • SPP:{" "}
                    <strong className="text-primary-950">
                      {formatRupiah(tenant.spmb.fees.monthlyTuition)}
                    </strong>
                  </p>
                  <p className="text-xs text-slate-500">
                    Tersedia diskon Early Bird & Beasiswa.
                  </p>
                  <Link
                    href="/admissions?tab=info#kalkulator-biaya"
                    className="inline-flex items-center gap-1 text-xs font-extrabold pt-1 hover:underline"
                    style={{ color: tenant.theme.primary }}
                  >
                    <span>Buka Kalkulator Biaya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-6 space-y-3 transition hover:shadow-md">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-primary-950">
                    Syarat Pendaftaran
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {tenant.spmb.ageRequirement}
                  </p>
                  <p className="text-xs text-slate-500">
                    Berkas: KK, Akta Lahir, Pas Foto, Rapor.
                  </p>
                  <Link
                    href="/admissions#syarat"
                    className="inline-flex items-center gap-1 text-xs font-extrabold pt-1 hover:underline"
                    style={{ color: tenant.theme.primary }}
                  >
                    <span>Detail Persyaratan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="p-6 space-y-3 transition hover:shadow-md">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs"
                    style={{
                      backgroundColor: tenant.theme.primaryLight,
                      color: tenant.theme.primary,
                    }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-primary-950">
                    Kontak Unit {tenant.levelCode}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Telp: <strong>{tenant.contact.phone}</strong>
                    <br />
                    WA: <strong>{tenant.contact.whatsappFormatted}</strong>
                  </p>
                  <a
                    href={`https://wa.me/${tenant.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 pt-1 hover:underline"
                  >
                    <span>Hubungi Panitia {tenant.levelCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      {/* =====================================================================
          SAMBUTAN KEPALA SEKOLAH / DIREKTUR PENDIDIKAN (5.2.3)
      ===================================================================== */}
      <section
        className="py-20 border-y border-slate-200/80"
        style={{ backgroundColor: tenant.theme.surface }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4">
              <div className="relative max-w-sm mx-auto">
                <div
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-elevated"
                  style={{ backgroundColor: tenant.theme.primaryLight }}
                >
                  <Image
                    src={tenant.principal.photo}
                    alt={tenant.principal.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-card text-center">
                  <p className="text-base font-extrabold text-primary-950">
                    {tenant.principal.name}
                  </p>
                  <p
                    className="text-xs font-bold mt-0.5"
                    style={{ color: tenant.theme.primary }}
                  >
                    {tenant.principal.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {tenant.principal.education}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <span
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                Sambutan Pimpinan Sekolah
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-primary-950 leading-tight">
                Mendidik dengan Keteladanan, Kasih Sayang, dan Standar Keunggulan Global
              </h2>

              <blockquote
                className="p-6 rounded-2xl bg-white border-l-4 shadow-card text-primary-950 font-serif italic text-lg leading-relaxed"
                style={{ borderLeftColor: tenant.theme.primary }}
              >
                “{tenant.principal.quote}”
              </blockquote>

              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                {tenant.principal.fullGreeting.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/about#sambutan"
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl text-white text-sm font-bold shadow-md transition hover:scale-[1.02] hover:brightness-110"
                  style={{ backgroundColor: tenant.theme.primary }}
                >
                  <span>Baca Profil & Visi Misi Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/teachers"
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-primary-950 text-sm font-bold hover:bg-slate-50 transition"
                >
                  <span>Kenali Dewan Guru & Staf</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          STATISTIK ANGKA COUNT-UP (5.1 & 5.2.4)
      ===================================================================== */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: `Siswa Aktif ${isPortal ? "Terpadu" : tenant.levelCode}`,
                val: tenant.stats.students,
                suffix: "+",
                desc: "Lingkungan belajar inklusif & kondusif",
              },
              {
                label: "Pendidik & Staf Ahli",
                val: tenant.stats.teachers,
                suffix: "+",
                desc: "Tersertifikasi nasional & internasional",
              },
              {
                label: "Rekor & Penghargaan",
                val: tenant.stats.achievements,
                suffix: "+",
                desc: "Tingkat Kota, Provinsi, Nasional & Dunia",
              },
              {
                label: "Tahun Berdiri",
                val: tenant.stats.establishedYear,
                suffix: "",
                desc: `${new Date().getFullYear() - tenant.stats.establishedYear} tahun pengabdian pendidikan`,
              },
            ].map((stat) => (
              <Card
                key={stat.label}
                className="p-6 sm:p-8 text-center space-y-2 bg-gradient-to-b from-slate-50 to-white"
              >
                <p
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight"
                  style={{ color: tenant.theme.primary }}
                >
                  <CountUp end={stat.val} suffix={stat.suffix} />
                </p>
                <p className="text-sm sm:text-base font-extrabold text-primary-950">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500">{stat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PROGRAM UNGGULAN, NILAI KARAKTER & EKSTRAKURIKULER (5.1 & 5.2.5)
      ===================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          {/* Program Unggulan */}
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                Keunggulan Kurikulum
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
                Program Unggulan & Karakter {tenant.shortName}
              </h2>
              <p className="text-slate-600 text-base">
                Dirancang untuk mengasah kecerdasan intelektual, kefasihan komunikasi global, serta kematangan emosional-spiritual siswa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tenant.featuredPrograms.map((prog, idx) => {
                const icons = [Globe, HeartHandshake, Cpu, GraduationCap];
                const IconComp = icons[idx % icons.length];
                return (
                  <Card
                    key={prog.title}
                    className="p-6 space-y-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs"
                        style={{
                          backgroundColor: tenant.theme.primaryLight,
                          color: tenant.theme.primary,
                        }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                        style={{
                          backgroundColor: tenant.theme.primaryLight,
                          color: tenant.theme.primary,
                          borderColor: tenant.theme.borderSubtle,
                        }}
                      >
                        {prog.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-primary-950">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>
                  </Card>
                );
              })}

              {/* Tambahan kartu nilai karakter jika jenjang spesifik hanya punya 3 program */}
              {tenant.featuredPrograms.length === 3 && (
                <Card
                  className="p-6 space-y-4 border"
                  style={{
                    backgroundColor: tenant.theme.surface,
                    borderColor: tenant.theme.borderSubtle,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: tenant.theme.primary }}
                    >
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <Badge variant="gold">Prajña & Sīla</Badge>
                  </div>
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Pendidikan Karakter Budi Pekerti
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Pembiasaan mindfulness pagi, budaya 5S (Senyum, Salam, Sapa, Sopan, Santun), dan kepedulian sosial.
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Ekstrakurikuler Populer */}
          <div
            className="p-8 sm:p-10 rounded-3xl border space-y-8 shadow-xs"
            style={{
              backgroundColor: tenant.theme.surface,
              borderColor: tenant.theme.borderSubtle,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-primary-950">
                  Pengembangan Bakat & Ekstrakurikuler
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Wadah eksplorasi minat siswa di bidang sains, robotika, olahraga, bahasa, dan seni budaya.
                </p>
              </div>
              <Link
                href="/academics#ekstrakurikuler"
                className="inline-flex items-center gap-2 text-sm font-extrabold hover:underline"
                style={{ color: tenant.theme.primary }}
              >
                <span>Lihat Seluruh Klub & Jadwal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tenant.extracurriculars.map((eskul) => (
                <div
                  key={eskul.name}
                  className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: tenant.theme.primary }}
                    >
                      {eskul.category}
                    </span>
                    <h4 className="text-base font-extrabold text-primary-950">
                      {eskul.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                      <Clock
                        className="w-3.5 h-3.5"
                        style={{ color: tenant.theme.primary }}
                      />
                      {eskul.schedule}
                    </p>
                    {eskul.achievementHighlight && (
                      <p className="text-xs font-bold text-amber-700 pt-1">
                        ★ {eskul.achievementHighlight}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRESTASI TERBARU — CAROUSEL INTERAKTIF (5.2.6)
      ===================================================================== */}
      <section
        className="py-20 border-y border-slate-200/80"
        style={{ backgroundColor: tenant.theme.surface }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="gold">Rekam Jejak Juara</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
                Prestasi Siswa {tenant.shortName}
              </h2>
              <p className="text-slate-600 text-base">
                Bukti nyata pembinaan akademik, sains, olahraga, dan seni budaya dari tingkat Kota hingga Internasional.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setAchievementIndex((prev) =>
                    prev === 0 ? Math.max(0, displayAchievements.length - 3) : prev - 1
                  )
                }
                aria-label="Prestasi sebelumnya"
                className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-primary-950 cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setAchievementIndex((prev) =>
                    prev + 1 >= displayAchievements.length ? 0 : prev + 1
                  )
                }
                aria-label="Prestasi berikutnya"
                className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-primary-950 cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-[1.02] hover:brightness-110"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                <span>Semua Prestasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayAchievements
              .slice(achievementIndex, achievementIndex + 3)
              .concat(
                displayAchievements.slice(
                  0,
                  Math.max(0, 3 - (displayAchievements.length - achievementIndex))
                )
              )
              .slice(0, 3)
              .map((ach, i) => (
                <Card key={ach.id || i} className="p-6 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="gold">
                        <Award className="w-3.5 h-3.5" />
                        {ach.medalOrRank || ach.event_rank || "Juara 1"}
                      </Badge>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {ach.year} • {ach.competitionLevel || ach.event_level || "Nasional"}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-primary-950 leading-snug">
                      {ach.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {ach.description ||
                        "Capaian membanggakan siswa Sekolah Dharma Loka Pekanbaru dalam ajang kompetisi bergengsi."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-extrabold text-primary-950">
                        {ach.studentName || ach.student_name}
                      </p>
                      <p
                        className="font-bold uppercase"
                        style={{ color: tenant.theme.primary }}
                      >
                        Jenjang {ach.level || ach.academic_level || tenant.levelCode}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-lg font-bold capitalize border"
                      style={{
                        backgroundColor: tenant.theme.primaryLight,
                        color: tenant.theme.primary,
                        borderColor: tenant.theme.borderSubtle,
                      }}
                    >
                      {ach.category}
                    </span>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BERITA & PENGUMUMAN TERBARU + AGENDA MENDATANG (5.1 & 5.2.7)
      ===================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Kolom Kiri: 3 Berita & Pengumuman Terbaru (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
                    style={{ backgroundColor: tenant.theme.primary }}
                  >
                    Kabar Kampus
                  </span>
                  <h2 className="text-3xl font-extrabold text-primary-950 mt-2">
                    Berita & Pengumuman Terbaru
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold hover:underline"
                  style={{ color: tenant.theme.primary }}
                >
                  <span>Indeks Berita</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dynamicNews.slice(0, 3).map((item) => (
                  <Card
                    key={item.id || item.slug}
                    className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
                  >
                    <div>
                      <div
                        className="relative aspect-[16/10] overflow-hidden"
                        style={{ backgroundColor: tenant.theme.primaryLight }}
                      >
                        <Image
                          src={
                            item.featuredImage ||
                            item.image ||
                            item.featured_image ||
                            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 28vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[11px] font-extrabold shadow-xs"
                          style={{ color: tenant.theme.primary }}
                        >
                          {item.category?.name || item.category || "Pengumuman"}
                        </span>
                      </div>
                      <div className="p-5 space-y-2.5">
                        <p className="text-xs text-slate-500">
                          {item.date ||
                            (item.published_at
                              ? new Date(item.published_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : "Terbaru")}
                        </p>
                        <h3 className="text-base font-extrabold text-primary-950 line-clamp-2 transition-colors">
                          <Link href={`/news/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-2">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold hover:underline"
                        style={{ color: tenant.theme.primary }}
                      >
                        <span>Baca Artikel</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Agenda Sekolah Mendatang (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <Badge variant="gold">Kalender Kegiatan</Badge>
                  <h2 className="text-2xl font-extrabold text-primary-950 mt-2">
                    Agenda Mendatang
                  </h2>
                </div>
                <Link
                  href="/news?tab=agenda"
                  className="text-xs font-extrabold hover:underline"
                  style={{ color: tenant.theme.primary }}
                >
                  Lihat Kalender →
                </Link>
              </div>

              <div className="space-y-3.5">
                {schoolEvents.slice(0, 4).map((evt) => {
                  const d = new Date(evt.date);
                  const dayNum = d.getDate();
                  const monthStr = d.toLocaleDateString("id-ID", {
                    month: "short",
                  });
                  return (
                    <Card key={evt.id} className="p-4 flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl border flex flex-col items-center justify-center shrink-0 text-center"
                        style={{
                          backgroundColor: tenant.theme.primaryLight,
                          borderColor: tenant.theme.borderSubtle,
                        }}
                      >
                        <span
                          className="text-lg font-extrabold leading-none"
                          style={{ color: tenant.theme.primary }}
                        >
                          {dayNum}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-slate-600 mt-1">
                          {monthStr}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider"
                          style={{ color: tenant.theme.primary }}
                        >
                          {evt.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-primary-950 leading-snug">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {evt.time} • {evt.location}
                        </p>
                        <a
                          href={buildGoogleCalendarUrl(evt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold hover:underline pt-0.5"
                          style={{ color: tenant.theme.primary }}
                        >
                          <Calendar className="w-3 h-3" />
                          <span>+ Tambah ke Kalender</span>
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          GALERI PREVIEW (GRID) + VIDEO PROFIL YOUTUBE LAZY EMBED (5.2.8)
      ===================================================================== */}
      <section
        className="py-20 border-t border-slate-200/80"
        style={{ backgroundColor: tenant.theme.surface }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                Dokumentasi Visual
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
                Galeri Kegiatan & Video Profil Kampus
              </h2>
              <p className="text-slate-600 text-base">
                Suasana belajar, fasilitas laboratorium, pentas budaya, dan aktivitas keseharian siswa.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-bold shadow-2xs hover:bg-slate-50 transition"
              style={{ color: tenant.theme.primary }}
            >
              <span>Buka Album Foto & Video</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* YouTube Lazy Embed (6 Cols) */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden border-4 border-white shadow-elevated bg-primary-950">
                {!youtubePlaying ? (
                  <button
                    type="button"
                    onClick={() => setYoutubePlaying(true)}
                    aria-label="Putar Video Profil Sekolah Dharma Loka"
                    className="group relative w-full h-full min-h-[320px] flex items-center justify-center text-left cursor-pointer"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                      alt="Video Profil Sekolah Dharma Loka Pekanbaru"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
                      <span
                        className="w-20 h-20 rounded-full text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: tenant.theme.primary }}
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </span>
                      <div>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
                          Video Tur Kampus (Lazy-Load)
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                          Mengenal Lebih Dekat {tenant.name}
                        </h3>
                      </div>
                    </div>
                  </button>
                ) : (
                  <iframe
                    className="w-full h-full min-h-[320px]"
                    src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                    title="Video Profil Sekolah Dharma Loka Pekanbaru"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Grid Masonry Preview 4 Foto (6 Cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {staticGallery.slice(0, 4).map((photo) => (
                <Link
                  key={photo.id}
                  href="/gallery"
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white shadow-card bg-slate-100"
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-extrabold line-clamp-1">
                      {photo.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TESTIMONI WALI MURID & ALUMNI (5.1 & 5.2.9)
      ===================================================================== */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span
              className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
              style={{ backgroundColor: tenant.theme.primary }}
            >
              Suara Keluarga & Alumni
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">
              Mengapa Orang Tua Mempercayakan Putra-Putrinya di Dharma Loka?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {(tenant.testimonials.length >= 3
              ? tenant.testimonials
              : TENANTS_ALL_TESTIMONIALS(tenant.id)
            ).map((item) => (
              <Card key={item.id} className="p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <Quote
                    className="w-8 h-8"
                    style={{ color: tenant.theme.primary, opacity: 0.35 }}
                  />
                  <p className="text-slate-700 text-base leading-relaxed italic">
                    “{item.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <div
                    className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border"
                    style={{
                      backgroundColor: tenant.theme.primaryLight,
                      borderColor: tenant.theme.borderSubtle,
                    }}
                  >
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-primary-950">
                      {item.name}
                    </p>
                    <p
                      className="text-xs font-bold"
                      style={{ color: tenant.theme.primary }}
                    >
                      {item.role}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.childClassOrGradYear}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ RINGKAS & CTA BESAR SPMB (5.1 & 5.2.10)
      ===================================================================== */}
      <section
        className="py-20 border-t border-slate-200/80"
        style={{
          background: `linear-gradient(to bottom, ${tenant.theme.surface}, #ffffff)`,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          {/* FAQ Ringkas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-2xs"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                Tanya Jawab (FAQ)
              </span>
              <h2 className="text-3xl font-extrabold text-primary-950">
                Pertanyaan yang Sering Diajukan Calon Orang Tua Murid
              </h2>
              <p className="text-slate-600 text-base">
                Temukan jawaban cepat seputar pendaftaran SPMB, persyaratan usia, program bahasa Mandarin/Inggris, dan beasiswa prestasi.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 text-sm font-extrabold hover:underline pt-2"
                style={{ color: tenant.theme.primary }}
              >
                <span>Lihat Informasi Lengkap SPMB</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <Accordion
                items={admissionFAQs.slice(0, 4).map((faq, idx) => ({
                  id: `faq-${idx}`,
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />
            </div>
          </div>

          {/* Banner CTA Besar SPMB — Mengikuti Warna Khas Jenjang */}
          <div
            className="rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-elevated relative overflow-hidden transition-all"
            style={{
              background: `linear-gradient(135deg, ${tenant.theme.primary} 0%, ${tenant.theme.accent} 100%)`,
              boxShadow: `0 20px 40px -15px ${tenant.theme.primary}60`,
            }}
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-extrabold">
                  <Sparkles className="w-4 h-4" />
                  {tenant.spmb.activeWave}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
                  Siap Bergabung Bersama Keluarga Besar {tenant.name}?
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Daftar secara online hanya dalam 6 langkah mudah, pantau status seleksi dari HP Anda, atau jadwalkan kunjungan kampus bersama tim panitia kami.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/admissions#daftar"
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 font-extrabold text-base shadow-lg transition hover:scale-[1.02]"
                  style={{ color: tenant.theme.primary }}
                >
                  <span>Daftar SPMB Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/admissions?tab=status"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-black/20 hover:bg-black/30 text-white border border-white/30 font-bold text-sm transition"
                >
                  <span>Cek Status Kelulusan SPMB</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TENANTS_ALL_TESTIMONIALS(activeId: TenantId) {
  const portalTestimonials = TENANT_LIST[0].testimonials;
  const current = TENANT_LIST.find((t) => t.id === activeId)?.testimonials || [];
  const merged = [...current, ...portalTestimonials];
  return merged.slice(0, 3);
}
