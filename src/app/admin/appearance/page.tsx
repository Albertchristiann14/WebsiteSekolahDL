"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/authContext";
import { TENANTS, TenantConfig, TenantId, UNIT_TENANTS } from "@/config/tenants";
import { TenantStore } from "@/lib/tenantStore";
import {
  Palette,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  UserCheck,
  Award,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sliders,
  Check,
  Building2,
} from "lucide-react";

const UNIT_TABS: Array<{ id: TenantId; label: string; icon: string; defaultColor: string }> = [
  { id: "tk", label: "TK Dharma Loka", icon: "🧸", defaultColor: "#D97706" },
  { id: "sd", label: "SD Dharma Loka", icon: "🎒", defaultColor: "#0056B3" },
  { id: "smp", label: "SMP Dharma Loka", icon: "🔬", defaultColor: "#0F766E" },
  { id: "sma", label: "SMA Dharma Loka", icon: "🎓", defaultColor: "#1E40AF" },
  { id: "smk", label: "SMK Dharma Loka", icon: "⚙️", defaultColor: "#0284C7" },
];

export default function UnitAppearancePage() {
  const { user } = useAuth();

  // If user is a unit admin, restrict to their tenant_id. Otherwise default to 'tk' or first unit.
  const userUnitTenant = (user?.tenant_id && user.tenant_id in TENANTS) ? (user.tenant_id as TenantId) : null;
  const isLockedToUnit = !!userUnitTenant;

  const [selectedTenantId, setSelectedTenantId] = useState<TenantId>(userUnitTenant || "tk");
  const [activeTab, setActiveTab] = useState<"hero" | "principal" | "theme" | "programs" | "contact">("hero");

  // Editable state
  const [config, setConfig] = useState<TenantConfig>(() => TenantStore.getMergedConfig(selectedTenantId));
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Update selected unit when user loads or switches unit (if allowed)
  useEffect(() => {
    if (userUnitTenant) {
      setSelectedTenantId(userUnitTenant);
    }
  }, [userUnitTenant]);

  // Reload config when selected tenant changes
  useEffect(() => {
    setConfig(TenantStore.getMergedConfig(selectedTenantId));
    setIsSaved(false);
  }, [selectedTenantId]);

  const handleUnitSwitch = (id: TenantId) => {
    if (isLockedToUnit) return; // Prevent unauthorized switching
    setSelectedTenantId(id);
  };

  const handleSave = () => {
    TenantStore.saveCustomOverrides(selectedTenantId, config);
    setIsSaved(true);
    setSaveMessage(`Tampilan ${config.name} berhasil disimpan dan diperbarui!`);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  const handleReset = () => {
    if (confirm(`Kembalikan pengaturan tampilan ${config.name} ke default bawaan sistem?`)) {
      const reset = TenantStore.resetToDefault(selectedTenantId);
      setConfig(reset);
      setIsSaved(true);
      setSaveMessage(`Tampilan ${config.name} telah direset ke nilai default.`);
      setTimeout(() => {
        setIsSaved(false);
      }, 4000);
    }
  };

  // Helper mutators
  const updateSlide = (index: number, field: string, val: string) => {
    const updated = [...config.heroSlides];
    updated[index] = { ...updated[index], [field]: val };
    setConfig({ ...config, heroSlides: updated });
  };

  const addSlide = () => {
    const newSlide = {
      id: `custom-slide-${Date.now()}`,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80",
      badge: "Kegiatan Siswa",
      title: "Suasana Belajar Inspiratif & Kolaboratif",
      caption: "Mengembangkan potensi terbaik setiap siswa di lingkungan yang asri dan aman.",
    };
    setConfig({ ...config, heroSlides: [...config.heroSlides, newSlide] });
  };

  const removeSlide = (index: number) => {
    if (config.heroSlides.length <= 1) {
      alert("Minimal harus ada 1 banner kegiatan.");
      return;
    }
    const updated = config.heroSlides.filter((_, i) => i !== index);
    setConfig({ ...config, heroSlides: updated });
  };

  const updateProgram = (index: number, field: string, val: string) => {
    const updated = [...config.featuredPrograms];
    updated[index] = { ...updated[index], [field]: val };
    setConfig({ ...config, featuredPrograms: updated });
  };

  const addProgram = () => {
    const newProg = {
      title: "Program Pengayaan Baru",
      description: "Membekali siswa dengan wawasan praktis dan pembentukan karakter kepemimpinan.",
      iconName: "Sparkles",
      badge: "Inovasi Baru",
    };
    setConfig({ ...config, featuredPrograms: [...config.featuredPrograms, newProg] });
  };

  const removeProgram = (index: number) => {
    const updated = config.featuredPrograms.filter((_, i) => i !== index);
    setConfig({ ...config, featuredPrograms: updated });
  };

  return (
    <AdminLayout
      title="Pengaturan Tampilan Web Jenjang"
      subtitle={`Kelola banner hero, sambutan kepala sekolah, tema warna, dan kurikulum publik untuk ${config.name}.`}
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Tampilan Web Jenjang" },
      ]}
      actions={
        <div className="flex items-center gap-2.5">
          <Link
            href={`/?jenjang=${selectedTenantId}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition"
          >
            <Eye className="w-4 h-4 text-royal" />
            <span>Lihat Website Unit Ini ↗</span>
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-bold shadow-md shadow-royal/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Success Alert */}
        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-xs transition-all">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm font-bold">{saveMessage}</p>
            </div>
            <Link
              href={`/?jenjang=${selectedTenantId}`}
              target="_blank"
              className="text-xs font-black underline text-emerald-900 hover:text-emerald-700 flex items-center gap-1"
            >
              Cek Halaman Publik ↗
            </Link>
          </div>
        )}

        {/* 1. Unit Selector Bar (Locked if Unit Admin, Tabs if Super Admin) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Jenjang Pendidikan yang Dikelola
              </p>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
                <span>{config.name}</span>
                <span
                  className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs"
                  style={{ backgroundColor: config.theme.primary }}
                />
              </h2>
            </div>

            {isLockedToUnit ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-royal">
                <span>Anda bertugas sebagai Admin Unit {config.name} (Terkunci)</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                {UNIT_TABS.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => handleUnitSwitch(unit.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                      selectedTenantId === unit.id
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{unit.icon}</span>
                    <span>{unit.label.replace(" Dharma Loka", "")}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 gap-2 pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "hero"
                ? "border-royal text-royal bg-white rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>1. Hero & Slider Banner</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("principal")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "principal"
                ? "border-royal text-royal bg-white rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Sambutan Kepala Sekolah</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "theme"
                ? "border-royal text-royal bg-white rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>3. Tema Warna & Identitas</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("programs")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "programs"
                ? "border-royal text-royal bg-white rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. Program Unggulan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "contact"
                ? "border-royal text-royal bg-white rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>5. Kontak & WhatsApp PPDB</span>
          </button>
        </div>

        {/* ===================================================================
            TAB 1: HERO & SLIDER BANNER
        =================================================================== */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-royal" />
                <span>Headline & Teks Bagian Atas (Hero Section)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Slogan / Tagline Jenjang
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
                  />
                  <p className="text-[11px] text-slate-400">
                    Ditampilkan di bawah nama sekolah pada header & hero.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Badge Status SPMB / Akreditasi
                  </label>
                  <input
                    type="text"
                    value={config.accreditation}
                    onChange={(e) => setConfig({ ...config, accreditation: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
                  />
                  <p className="text-[11px] text-slate-400">
                    Contoh: Terakreditasi A (Unggul) — BAN-PDM
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Judul Utama Hero (Heading 1)
                  </label>
                  <input
                    type="text"
                    value={config.heroTitle}
                    onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subjudul / Narasi Singkat Hero
                  </label>
                  <textarea
                    rows={3}
                    value={config.heroSubtitle}
                    onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
                  />
                </div>
              </div>
            </div>

            {/* Slider Banners */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-royal" />
                    <span>Daftar Slider Banner Foto Kegiatan Siswa</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Banner berputar otomatis di beranda untuk memperlihatkan fasilitas & kegiatan riil.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSlide}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-royal hover:bg-blue-100 font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Slide Foto</span>
                </button>
              </div>

              <div className="space-y-4">
                {config.heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col md:flex-row gap-5 items-start"
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <Image
                        src={slide.image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                        Slide {idx + 1}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 w-full space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                            URL Gambar Banner
                          </label>
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => updateSlide(idx, "image", e.target.value)}
                            className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-800 focus:ring-1 focus:ring-royal"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                            Badge Label Slide
                          </label>
                          <input
                            type="text"
                            value={slide.badge}
                            onChange={(e) => updateSlide(idx, "badge", e.target.value)}
                            className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-royal"
                            placeholder="Kurikulum Unggulan"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Judul Slide
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => updateSlide(idx, "title", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-royal"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Keterangan / Caption
                        </label>
                        <input
                          type="text"
                          value={slide.caption}
                          onChange={(e) => updateSlide(idx, "caption", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:ring-1 focus:ring-royal"
                        />
                      </div>
                    </div>

                    {/* Delete action */}
                    <button
                      type="button"
                      onClick={() => removeSlide(idx)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition cursor-pointer self-end md:self-center"
                      title="Hapus Slide Ini"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: SAMBUTAN KEPALA SEKOLAH
        =================================================================== */}
        {activeTab === "principal" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-royal" />
                <span>Profil & Sambutan Kepala Sekolah {config.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kutipan dan foto ini ditampilkan di kartu sambutan beranda jenjang.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Photo & Identity preview */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-4">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-slate-200 shadow-md border-2 border-white">
                  <Image
                    src={config.principal.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"}
                    alt={config.principal.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{config.principal.name}</h4>
                  <p className="text-xs text-royal font-bold">{config.principal.title}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{config.principal.education}</p>
                </div>
              </div>

              {/* Form Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nama Kepala Sekolah & Gelar
                    </label>
                    <input
                      type="text"
                      value={config.principal.name}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          principal: { ...config.principal, name: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-royal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Jabatan Resmi
                    </label>
                    <input
                      type="text"
                      value={config.principal.title}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          principal: { ...config.principal, title: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Pendidikan / Kualifikasi
                    </label>
                    <input
                      type="text"
                      value={config.principal.education}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          principal: { ...config.principal, education: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      URL Foto Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      value={config.principal.photo}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          principal: { ...config.principal, photo: e.target.value },
                        })
                      }
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:bg-white focus:ring-2 focus:ring-royal"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kutipan Utama (Quote Beranda)
                  </label>
                  <textarea
                    rows={3}
                    value={config.principal.quote}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        principal: { ...config.principal, quote: e.target.value },
                      })
                    }
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                  <p className="text-[11px] text-slate-400">
                    Teks ringkas yang langsung dibaca oleh wali murid pada kartu sambutan.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Isi Sambutan Lengkap (Paragraf 1)
                  </label>
                  <textarea
                    rows={4}
                    value={config.principal.fullGreeting[0] || ""}
                    onChange={(e) => {
                      const updated = [...config.principal.fullGreeting];
                      updated[0] = e.target.value;
                      setConfig({
                        ...config,
                        principal: { ...config.principal, fullGreeting: updated },
                      });
                    }}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: TEMA WARNA & IDENTITAS JENJANG
        =================================================================== */}
        {activeTab === "theme" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-royal" />
                <span>Skema Warna & Variabel Desain ({config.name})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Setiap jenjang memiliki karakter warna unik yang diterapkan otomatis pada tombol, badge, dan kartu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color Controls */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Warna Utama Jenjang (--primary)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.primary}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, primary: e.target.value },
                        })
                      }
                      className="w-12 h-12 rounded-xl cursor-pointer border border-slate-300 p-1"
                    />
                    <input
                      type="text"
                      value={config.theme.primary}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, primary: e.target.value },
                        })
                      }
                      className="w-36 h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Warna Aksen (--accent)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.accent}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, accent: e.target.value },
                        })
                      }
                      className="w-12 h-12 rounded-xl cursor-pointer border border-slate-300 p-1"
                    />
                    <input
                      type="text"
                      value={config.theme.accent}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, accent: e.target.value },
                        })
                      }
                      className="w-36 h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold uppercase"
                    />
                  </div>
                </div>

                {/* Preset Suggestions for this unit */}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Rekomendasi Warna Identitas Jenjang:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Amber Ceria (TK)", primary: "#D97706", accent: "#F43F5E" },
                      { name: "Biru Edukasi (SD)", primary: "#0056B3", accent: "#E02424" },
                      { name: "Teal Modern (SMP)", primary: "#0F766E", accent: "#F59E0B" },
                      { name: "Royal Indigo (SMA)", primary: "#1E40AF", accent: "#F59E0B" },
                      { name: "Cyan Industri (SMK)", primary: "#0284C7", accent: "#EA580C" },
                    ].map((pal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setConfig({
                            ...config,
                            theme: {
                              ...config.theme,
                              primary: pal.primary,
                              accent: pal.accent,
                            },
                          })
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer shadow-2xs"
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: pal.primary }}
                        />
                        <span>{pal.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Theme Simulator Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Pratinjau Langsung Elemen Desain
                </p>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-extrabold text-white"
                      style={{ backgroundColor: config.theme.primary }}
                    >
                      Badge Unit: {config.name}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: config.theme.accent }}
                    >
                      Aksen Khusus
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900">
                    {config.heroTitle}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {config.heroSubtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-md transition"
                      style={{ backgroundColor: config.theme.primary }}
                    >
                      Tombol Utama
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-extrabold border bg-white transition"
                      style={{ borderColor: config.theme.primary, color: config.theme.primary }}
                    >
                      Tombol Sekunder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: PROGRAM UNGGULAN
        =================================================================== */}
        {activeTab === "programs" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-royal" />
                  <span>Program Kurikulum Unggulan ({config.name})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ditampilkan di seksi &apos;Program Unggulan&apos; beranda unit untuk menarik minat orang tua.
                </p>
              </div>
              <button
                type="button"
                onClick={addProgram}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-royal hover:bg-blue-100 font-bold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Program</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.featuredPrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-royal/10 text-royal text-xs font-extrabold uppercase">
                      Program {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProgram(idx)}
                      className="text-slate-400 hover:text-rose-600 transition"
                      title="Hapus Program"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Judul Program
                    </label>
                    <input
                      type="text"
                      value={prog.title}
                      onChange={(e) => updateProgram(idx, "title", e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-royal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Badge Khusus
                    </label>
                    <input
                      type="text"
                      value={prog.badge}
                      onChange={(e) => updateProgram(idx, "badge", e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-royal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Deskripsi Program
                    </label>
                    <textarea
                      rows={2}
                      value={prog.description}
                      onChange={(e) => updateProgram(idx, "description", e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:ring-1 focus:ring-royal"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: KONTAK & WHATSAPP PPDB
        =================================================================== */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-royal" />
                <span>Saluran Komunikasi Khusus {config.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tombol WhatsApp melayang di beranda unit akan langsung mengarahkan pesan orang tua ke nomor ini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nomor WhatsApp CS SPMB Unit (Format 62...)
                </label>
                <input
                  type="text"
                  value={config.contact.whatsapp}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contact: { ...config.contact, whatsapp: e.target.value },
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold focus:bg-white focus:ring-2 focus:ring-royal"
                  placeholder="628117588881"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Alamat Email Resmi Unit
                </label>
                <input
                  type="email"
                  value={config.contact.email}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contact: { ...config.contact, email: e.target.value },
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pesan Pembuka Otomatis WhatsApp
                </label>
                <textarea
                  rows={2}
                  value={config.contact.whatsappDefaultText}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        whatsappDefaultText: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Jam Layanan Konsultasi Ortu
                </label>
                <input
                  type="text"
                  value={config.contact.officeHours}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contact: { ...config.contact, officeHours: e.target.value },
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-royal"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save & Reset Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset ke Pengaturan Default</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              href={`/?jenjang=${selectedTenantId}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition"
            >
              <Eye className="w-4 h-4 text-royal" />
              <span>Pratinjau Live ↗</span>
            </Link>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-bold shadow-md shadow-royal/20 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Tampilan</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

