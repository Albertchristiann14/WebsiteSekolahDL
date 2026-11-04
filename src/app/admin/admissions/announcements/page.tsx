"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, TenantCode } from "@/lib/adminData";
import {
  Megaphone,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  Eye,
  Award,
  Users,
  Search,
  MessageSquare,
} from "lucide-react";

export default function AdminAnnouncementsSPMBPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [isPublished, setIsPublished] = useState(true);
  const [scheduledDate, setScheduledDate] = useState("2026-11-15T09:00");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    const tenantFilter = AdminStore.getActiveTenantFilter();
    setActiveTenant(tenantFilter);
    const all = AdminStore.getApplicants();
    const filtered =
      tenantFilter === "portal"
        ? all
        : all.filter((a) => a.tenantId === tenantFilter);
    setApplicants(filtered);
  };

  useEffect(() => {
    loadData();
    const handleTenantChange = () => loadData();
    window.addEventListener("admin_tenant_changed", handleTenantChange);
    return () => {
      window.removeEventListener("admin_tenant_changed", handleTenantChange);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const passedApplicants = applicants.filter((a) => a.selectionStatus === "passed");
  const waitingListApplicants = applicants.filter((a) => a.selectionStatus === "waiting_list");
  const rejectedApplicants = applicants.filter((a) => a.selectionStatus === "rejected");

  const handleBroadcastWhatsApp = () => {
    AdminStore.addAuditLog({
      userName: "Panitia SPMB",
      userRole: "Panitia SPMB",
      tenantId: activeTenant,
      action: "BROADCAST_ANNOUNCEMENT_WA",
      module: "Pengumuman SPMB",
      description: `Mengirim siaran notifikasi WhatsApp hasil kelulusan kepada ${passedApplicants.length} pendaftar lulus.`,
    });

    showToast(`Berhasil mengirim notifikasi kelulusan WhatsApp ke ${passedApplicants.length} orang tua siswa.`);
  };

  return (
    <AdminLayout
      title="Pengumuman Kelulusan SPMB"
      subtitle="Publikasikan hasil seleksi, jadwalkan waktu tayang portal kelulusan publik, dan kirim pesan notifikasi massal"
      breadcrumbs={[{ label: "SPMB" }, { label: "Pengumuman" }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBroadcastWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Notifikasi WA Massal</span>
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

      <div className="space-y-6">
        {/* Jadwal Publikasi Panel */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Pengaturan Waktu Tayang Pengumuman
              </h3>
              <p className="text-xs text-slate-500">
                Tentukan apakah hasil seleksi langsung dapat dicek calon siswa melalui portal publik
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => {
                    setIsPublished(e.target.checked);
                    showToast(
                      e.target.checked
                        ? "Portal pengumuman kelulusan sekarang AKTIF tayang publik."
                        : "Portal pengumuman kelulusan DITUTUP sementara."
                    );
                  }}
                  className="rounded border-slate-300 text-royal focus:ring-royal w-4 h-4"
                />
                <span>Publikasikan Langsung ke Publik</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Jadwal Tanggal & Jam Tayang Terjadwal:
              </label>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
              />
            </div>
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-royal">
              <p className="font-bold">Tampilan Portal Siswa:</p>
              <p className="mt-0.5 text-slate-600">
                Calon siswa dapat mengecek kelulusan di <code>/admissions?tab=status</code> dengan memasukkan Nomor Registrasi dan Tanggal Lahir.
              </p>
            </div>
          </div>
        </div>

        {/* Ringkasan Hasil Seleksi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Dinyatakan Lulus</span>
            <p className="text-3xl font-extrabold text-emerald-700">{passedApplicants.length} Calon Siswa</p>
            <p className="text-[11px] text-slate-500">Memenuhi kriteria tes & kuota</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Cadangan (Waiting List)</span>
            <p className="text-3xl font-extrabold text-amber-700">{waitingListApplicants.length} Calon Siswa</p>
            <p className="text-[11px] text-slate-500">Dipanggil jika kuota tidak daftar ulang</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Belum Diterima</span>
            <p className="text-3xl font-extrabold text-rose-700">{rejectedApplicants.length} Calon Siswa</p>
            <p className="text-[11px] text-slate-500">Diberikan surat rekomendasi sekolah</p>
          </div>
        </div>

        {/* Tabel Siswa Diterima */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">
              Daftar Peserta Didik Lulus Seleksi ({passedApplicants.length})
            </h3>
            <Link
              href="/admin/admissions/conversion"
              className="text-xs font-bold text-royal hover:underline"
            >
              Lanjutkan Konversi ke Master Siswa Aktif →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4">No. Registrasi</th>
                  <th className="py-4 px-3">Nama Siswa</th>
                  <th className="py-4 px-3">Jenjang & Jalur</th>
                  <th className="py-4 px-3">Nilai Akhir</th>
                  <th className="py-4 px-3">Status Uang Pangkal</th>
                  <th className="py-4 px-4 text-center">Status Siswa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {passedApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {app.registrationNumber}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">
                      {app.fullName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="uppercase font-bold text-slate-600">
                        {app.tenantId} • {app.trackName}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-extrabold text-royal">
                      {app.testScores?.finalAverage || 90.0}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          app.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {app.paymentStatus === "paid" ? "Lunas" : "Belum Lunas"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        Siap Masuk Master Siswa
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

