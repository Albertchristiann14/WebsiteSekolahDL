"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, TenantCode } from "@/lib/adminData";
import {
  Sliders,
  CheckCircle2,
  Calendar,
  Layers,
  Save,
  PlusCircle,
  Trash2,
} from "lucide-react";

export default function AdminSPMBSettingsPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [waveName, setWaveName] = useState("Gelombang 1 (Early Bird Prestasi)");
  const [waveStartDate, setWaveStartDate] = useState("2026-01-01");
  const [waveEndDate, setWaveEndDate] = useState("2026-06-30");
  const [formFee, setFormFee] = useState<number>(250000);
  const [autoCloseQuota, setAutoCloseQuota] = useState(true);
  const [waitingListEnabled, setWaitingListEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTenant(AdminStore.getActiveTenantFilter());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSettings = () => {
    AdminStore.addAuditLog({
      userName: "Administrator",
      userRole: "Super Admin",
      tenantId: activeTenant,
      action: "UPDATE_SPMB_CONFIGURATION",
      module: "Pengaturan SPMB",
      description: `Memperbarui konfigurasi SPMB ${activeTenant.toUpperCase()}: ${waveName}, biaya formulir Rp ${formFee.toLocaleString(
        "id-ID"
      )}.`,
    });

    showToast("Pengaturan SPMB dan kuota gelombang berhasil disimpan.");
  };

  return (
    <AdminLayout
      title="Pengaturan Gelombang & Kuota SPMB"
      subtitle="Konfigurasi tahun ajaran aktif, periode buka-tutup gelombang, biaya formulir, dan syarat berkas wajib"
      breadcrumbs={[{ label: "SPMB" }, { label: "Pengaturan SPMB" }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-royal-dark transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
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

      <div className="max-w-4xl space-y-6">
        {/* Periode & Gelombang Aktif */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-royal" />
            <h3 className="text-base font-extrabold text-slate-900">
              Tahun Ajaran & Gelombang Pendaftaran
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Tahun Ajaran Aktif:
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Nama Gelombang SPMB:
              </label>
              <input
                type="text"
                value={waveName}
                onChange={(e) => setWaveName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-extrabold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Tanggal Buka Pendaftaran:
              </label>
              <input
                type="date"
                value={waveStartDate}
                onChange={(e) => setWaveStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Tanggal Tutup Pendaftaran:
              </label>
              <input
                type="date"
                value={waveEndDate}
                onChange={(e) => setWaveEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Biaya Formulir Pendaftaran (IDR):
              </label>
              <input
                type="number"
                value={formFee}
                onChange={(e) => setFormFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-extrabold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Otomasi & Waiting List */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-royal" />
            <h3 className="text-base font-extrabold text-slate-900">
              Aturan Otomasi & Cadangan (Waiting List)
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={autoCloseQuota}
                onChange={(e) => setAutoCloseQuota(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-royal focus:ring-royal w-4 h-4"
              />
              <div>
                <span className="font-extrabold text-slate-900 block">
                  Tutup Otomatis Saat Kuota Terpenuhi
                </span>
                <span className="text-xs text-slate-500">
                  Formulir pendaftaran publik akan terkunci otomatis ketika batas kursi tercapai atau tanggal akhir telah lewat.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={waitingListEnabled}
                onChange={(e) => setWaitingListEnabled(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-royal focus:ring-royal w-4 h-4"
              />
              <div>
                <span className="font-extrabold text-slate-900 block">
                  Aktifkan Sistem Antrean Cadangan (Waiting List)
                </span>
                <span className="text-xs text-slate-500">
                  Jika kuota penuh, calon siswa baru tetap dapat mendaftar dengan status Cadangan tanpa tagihan formulir di awal.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Dokumen Persyaratan Wajib per Jalur */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-royal" />
            <h3 className="text-base font-extrabold text-slate-900">
              Dokumen Persyaratan Wajib Diunggah Calon Siswa
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { label: "Kartu Keluarga (KK)", desc: "Wajib untuk semua jenjang", defaultChecked: true },
              { label: "Akta Kelahiran", desc: "Wajib untuk verifikasi tanggal lahir & nama", defaultChecked: true },
              { label: "Pas Foto Berwarna 3x4", desc: "Wajib untuk kartu tes & profil siswa", defaultChecked: true },
              { label: "Rapor Sekolah Asal (Semester 1-5)", desc: "Wajib untuk SD, SMP, SMA, SMK", defaultChecked: true },
              { label: "Sertifikat Prestasi Lomba (Piagam)", desc: "Wajib khusus Jalur Prestasi", defaultChecked: true },
              { label: "Surat Keterangan Bebas Narkoba / Tes Buta Warna", desc: "Khusus jenjang SMK", defaultChecked: false },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{item.label}</span>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={item.defaultChecked}
                  className="rounded border-slate-300 text-royal focus:ring-royal w-4 h-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

