"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, INITIAL_WHATSAPP_TEMPLATES, WhatsAppTemplate, TenantCode } from "@/lib/adminData";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Copy,
  Smartphone,
  RotateCcw,
  Sparkles,
  Save,
} from "lucide-react";

export default function AdminWhatsAppTemplatesPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(INITIAL_WHATSAPP_TEMPLATES);
  const [selectedKey, setSelectedKey] = useState("REGISTRATION_SUCCESS");
  const [templateBody, setTemplateBody] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTenant(AdminStore.getActiveTenantFilter());
    const curr = templates.find((t) => t.key === selectedKey);
    if (curr) {
      setTemplateBody(curr.body);
    }
  }, [selectedKey, templates]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveTemplate = () => {
    const updated = templates.map((t) =>
      t.key === selectedKey ? { ...t, body: templateBody } : t
    );
    setTemplates(updated);
    showToast("Template pesan WhatsApp berhasil disimpan.");
  };

  const handleSendTestWA = () => {
    showToast("Pesan uji coba WhatsApp berhasil dikirim ke nomor administrator.");
  };

  // Replace placeholders for live preview
  const livePreview = templateBody
    .replace("{nama_ortu}", "Bpk. Wijaya Kusuma")
    .replace("{nama_siswa}", "Nathaniel Vincent Wijaya")
    .replace("{nama_sekolah}", "SMA Dharma Loka")
    .replace("{no_reg}", "SMA-2026-G1-0001")
    .replace("{total_tagihan}", "Rp 250.000")
    .replace("{batas_bayar}", "05 November 2026, 23:59 WIB")
    .replace("{link_portal}", "https://dharmaloka.sch.id/admissions?tab=status")
    .replace("{catatan_revisi}", "Foto Akta Kelahiran buram di bagian nomor NIK. Mohon foto ulang dengan pencahayaan terang.")
    .replace("{batas_waktu}", "08 November 2026")
    .replace("{jadwal_tes}", "Sabtu, 07 November 2026 • 08:30 WIB")
    .replace("{ruang_tes}", "Lab Komputer CBT 1 / Wawancara");

  return (
    <AdminLayout
      title="Notifikasi Gateway WhatsApp"
      subtitle="Kustomisasi template pesan instan, broadcast status pendaftaran, dan pemantauan pengiriman WhatsApp Cloud API / Fonnte"
      breadcrumbs={[{ label: "SPMB" }, { label: "Notifikasi WA" }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSendTestWA}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition cursor-pointer shadow-2xs"
          >
            Kirim Uji Coba (Test Send)
          </button>
          <button
            type="button"
            onClick={handleSaveTemplate}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Template</span>
          </button>
        </div>
      }
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Editor Template (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">
              Pilih Skenario Pesan Otomatis:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {templates.map((tpl) => (
                <button
                  key={tpl.key}
                  type="button"
                  onClick={() => setSelectedKey(tpl.key)}
                  className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                    selectedKey === tpl.key
                      ? "bg-blue-50/80 border-royal text-royal font-extrabold shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold"
                  }`}
                >
                  <span className="block text-xs">{tpl.name}</span>
                  <span className="block text-[10px] text-slate-400 capitalize mt-0.5">
                    Kategori: {tpl.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Isi Pesan WhatsApp:
              </label>
              <span className="text-[11px] text-slate-400">
                Dukungan Markdown WhatsApp: *tebal*, _miring_
              </span>
            </div>
            <textarea
              rows={11}
              value={templateBody}
              onChange={(e) => setTemplateBody(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal"
            />
          </div>

          {/* Variabel Tag Dinamis yang Tersedia */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <p className="font-extrabold text-slate-800">
              Daftar Tag Variabel Dinamis (Klik untuk Salin):
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "{nama_ortu}",
                "{nama_siswa}",
                "{nama_sekolah}",
                "{no_reg}",
                "{total_tagihan}",
                "{batas_bayar}",
                "{link_portal}",
                "{catatan_revisi}",
                "{jadwal_tes}",
                "{ruang_tes}",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setTemplateBody((prev) => prev + " " + tag);
                    showToast(`Tag ${tag} ditambahkan ke pesan.`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono text-[11px] hover:border-royal hover:text-royal transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau Tampilan HP WhatsApp (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Pratinjau Layar Penerima</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Preview
            </span>
          </div>

          {/* WhatsApp Chat Bubble Mockup */}
          <div className="rounded-2xl bg-[#EFEAE2] p-4 border border-slate-300 min-h-[380px] flex flex-col justify-end shadow-inner">
            <div className="bg-white p-4 rounded-2xl rounded-tl-xs shadow-md max-w-sm space-y-2 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              <p>{livePreview}</p>
              <div className="flex justify-end items-center gap-1 text-[10px] text-slate-400 pt-1">
                <span>09:15</span>
                <span className="text-sky-500 font-black">✓✓</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Pesan dikirim secara otomatis via server WhatsApp API resmi saat status pendaftar diperbarui.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

