"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  Settings, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck,
  Building
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Settings State
  const [settings, setSettings] = useState<Record<string, string>>({
    school_name: "Sekolah Dharma Loka",
    school_motto: "Mengembangkan Potensi, Membina Budi Pekerti",
    accreditation: "Terakreditasi A (Unggul)",
    foundation: "Yayasan Prajnamitra Maitreya",
    email: "info@dharmaloka.sch.id",
    phone: "(0761) 23456",
    whatsapp: "+62 812-3456-7890",
    address: "Jl. Tuanku Tambusai No. 12, Jadirejo, Sukajadi, Pekanbaru, Riau 28121",
    office_hours: "Senin – Jumat: 07.00 – 16.00 WIB | Sabtu: 07.00 – 13.00 WIB",
    instagram_url: "https://instagram.com/dharmaloka_pku",
    facebook_url: "https://facebook.com/dharmalokapku",
    youtube_url: "https://youtube.com/@DharmaLokaOfficial",
    admissions_open: "1",
    active_academic_year: "2026/2027",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getSettings();
        if (res.status === 200 && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err: any) {
        // Keep defaults if error
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminApi.updateSettings(settings);
      if (res.status === 200) {
        showToast("success", "Pengaturan profil sekolah berhasil disimpan.");
      } else {
        showToast("error", res.error || "Gagal menyimpan pengaturan.");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Pengaturan Profil Sekolah" requiredRole={["super_admin", "school_admin"]}>
      <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Identitas & Kontak Institusi</h2>
            <p className="text-xs text-slate-400">
              Perubahan di sini langsung memengaruhi footer, halaman kontak, dan metadata situs publik.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-primary-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Pengaturan</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`p-4 rounded-xl border text-sm flex items-center justify-between ${
            toast.type === "success" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300" : "bg-red-950/80 border-red-500/50 text-red-300"
          }`}>
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}><span className="text-slate-400">×</span></button>
          </div>
        )}

        {/* Card 1: School Identity */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Building className="w-5 h-5 text-gold" />
            <h3 className="text-base font-bold text-white">Identitas Sekolah</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Nama Resmi Sekolah
              </label>
              <input
                type="text"
                value={settings.school_name || ""}
                onChange={(e) => handleChange("school_name", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Akreditasi BAN-S/M
              </label>
              <input
                type="text"
                value={settings.accreditation || ""}
                onChange={(e) => handleChange("accreditation", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Yayasan Penyelenggara
              </label>
              <input
                type="text"
                value={settings.foundation || ""}
                onChange={(e) => handleChange("foundation", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Tahun Ajaran PPDB Aktif
              </label>
              <input
                type="text"
                value={settings.active_academic_year || ""}
                onChange={(e) => handleChange("active_academic_year", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Motto / Slogan Pendidikan
              </label>
              <input
                type="text"
                value={settings.school_motto || ""}
                onChange={(e) => handleChange("school_motto", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Contact Details */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Phone className="w-5 h-5 text-gold" />
            <h3 className="text-base font-bold text-white">Kontak & Operasional</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Email Resmi
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Nomor Telepon Kantor
              </label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Hotline WhatsApp PPDB
              </label>
              <input
                type="text"
                value={settings.whatsapp || ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Jam Layanan Tata Usaha
              </label>
              <input
                type="text"
                value={settings.office_hours || ""}
                onChange={(e) => handleChange("office_hours", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Alamat Kampus Lengkap
              </label>
              <textarea
                rows={2}
                value={settings.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Social Media Channels */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Globe className="w-5 h-5 text-gold" />
            <h3 className="text-base font-bold text-white">Media Sosial Resmi</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram_url || ""}
                onChange={(e) => handleChange("instagram_url", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook_url || ""}
                onChange={(e) => handleChange("facebook_url", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtube_url || ""}
                onChange={(e) => handleChange("youtube_url", e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </div>

      </form>
    </AdminLayout>
  );
}

