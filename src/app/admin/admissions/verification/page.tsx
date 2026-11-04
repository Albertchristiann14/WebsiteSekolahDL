"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, ApplicantDocument, TenantCode } from "@/lib/adminData";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  FileText,
  User,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
} from "lucide-react";

export default function AdminVerificationPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>("");
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [rejectionReason, setRejectionReason] = useState("");
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
    if (filtered.length > 0 && !selectedApplicantId) {
      setSelectedApplicantId(filtered[0].id);
    }
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

  const selectedApp =
    applicants.find((a) => a.id === selectedApplicantId) || applicants[0];
  const activeDoc = selectedApp?.documents[activeDocIndex];

  // Actions for current document
  const handleApproveDoc = (docId: string) => {
    if (!selectedApp) return;
    const updatedDocs = selectedApp.documents.map((d) =>
      d.id === docId ? { ...d, status: "approved" as const, notes: undefined } : d
    );
    // Check if all approved
    const allApproved = updatedDocs.every((d) => d.status === "approved");
    const newDocStatus = allApproved ? ("approved" as const) : ("pending" as const);

    AdminStore.updateApplicantStatus(
      selectedApp.id,
      {
        documents: updatedDocs,
        documentStatus: newDocStatus,
      },
      "Panitia SPMB"
    );

    showToast(`Dokumen ${activeDoc?.label} disetujui.`);
    loadData();
  };

  const handleRejectDoc = (docId: string) => {
    if (!selectedApp || !rejectionReason.trim()) {
      alert("Mohon masukkan alasan penolakan / catatan revisi untuk pendaftar.");
      return;
    }

    const updatedDocs = selectedApp.documents.map((d) =>
      d.id === docId
        ? {
            ...d,
            status: "rejected" as const,
            notes: rejectionReason,
          }
        : d
    );

    AdminStore.updateApplicantStatus(
      selectedApp.id,
      {
        documents: updatedDocs,
        documentStatus: "revision_needed",
      },
      "Panitia SPMB"
    );

    // Record WA notification attempt
    AdminStore.addAuditLog({
      userName: "Panitia SPMB",
      userRole: "Verifikator",
      tenantId: selectedApp.tenantId,
      action: "DOC_REVISION_REQUESTED",
      module: "Verifikasi Berkas",
      description: `Meminta revisi berkas '${activeDoc?.label}' untuk pendaftar ${selectedApp.registrationNumber} (${selectedApp.fullName}). Alasan: ${rejectionReason}`,
    });

    showToast(`Permintaan revisi berhasil dikirim ke pendaftar.`);
    setRejectionReason("");
    loadData();
  };

  const handleApproveAllDocs = () => {
    if (!selectedApp) return;
    const updatedDocs = selectedApp.documents.map((d) => ({
      ...d,
      status: "approved" as const,
      notes: undefined,
    }));

    AdminStore.updateApplicantStatus(
      selectedApp.id,
      {
        documents: updatedDocs,
        documentStatus: "approved",
      },
      "Panitia SPMB"
    );

    showToast(`Seluruh berkas ${selectedApp.fullName} telah disetujui lengkap!`);
    loadData();
  };

  return (
    <AdminLayout
      title="Verifikasi Berkas (Split-Screen)"
      subtitle="Periksa keabsahan dokumen kartu keluarga, akta lahir, rapor, dan sertifikat pendaftar secara berdampingan"
      breadcrumbs={[{ label: "SPMB" }, { label: "Verifikasi Berkas" }]}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/admissions"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition"
          >
            ← Kembali ke Tabel Pendaftar
          </Link>
          <button
            type="button"
            onClick={handleApproveAllDocs}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
          >
            Setujui Semua Berkas Siswa Ini
          </button>
        </div>
      }
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Selector Calon Siswa (Horizontal Pill List) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 overflow-x-auto">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
          Pilih Pendaftar:
        </span>
        {applicants.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => {
              setSelectedApplicantId(app.id);
              setActiveDocIndex(0);
              setRejectionReason("");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-2 cursor-pointer ${
              selectedApplicantId === app.id
                ? "bg-royal text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
            }`}
          >
            <span>{app.fullName}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                selectedApplicantId === app.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {app.tenantId.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {selectedApp && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* =================================================================
              KOLOM KIRI (7 COLS): PRATINJAU DOKUMEN BERDAMPINGAN
          ================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            {/* Tabs Dokumen */}
            <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2 overflow-x-auto">
              {selectedApp.documents.map((doc, idx) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => {
                    setActiveDocIndex(idx);
                    setRejectionReason("");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeDocIndex === idx
                      ? "bg-white text-royal shadow-xs border border-slate-200"
                      : "text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{doc.label}</span>
                  {doc.status === "approved" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {doc.status === "rejected" && (
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Document Preview Canvas */}
            <div className="p-6 bg-slate-900/5 min-h-[500px] flex flex-col items-center justify-center relative">
              {activeDoc ? (
                activeDoc.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeDoc.fileUrl}
                    alt={activeDoc.label}
                    className="max-h-[520px] max-w-full rounded-xl object-contain shadow-lg border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="w-full h-[520px] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner flex flex-col">
                    <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-bold truncate max-w-xs">{activeDoc.fileName} ({activeDoc.fileSize})</span>
                      <a
                        href={activeDoc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-royal font-bold hover:bg-slate-50 transition inline-flex items-center gap-1"
                      >
                        <span>Buka Tab Penuh</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <iframe
                      src={activeDoc.fileUrl}
                      title={activeDoc.label}
                      className="w-full flex-1 border-0"
                    />
                  </div>
                )
              ) : (
                <p className="text-slate-400 text-sm">Tidak ada dokumen dipilih.</p>
              )}
            </div>
          </div>

          {/* =================================================================
              KOLOM KANAN (5 COLS): DATA ISIAN FORMULIR & TINDAKAN VERIFIKASI
          ================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Calon Siswa & Orang Tua */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-royal uppercase">
                    {selectedApp.registrationNumber}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {selectedApp.fullName}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-royal border border-blue-200">
                  {selectedApp.trackName}
                </span>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">NIK Calon Siswa:</span>
                  <span className="font-bold text-slate-800">{selectedApp.nik}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Tempat, Tanggal Lahir:</span>
                  <span className="font-bold text-slate-800">{selectedApp.birthPlace}, {selectedApp.birthDate}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Nama Ayah / Ibu:</span>
                  <span className="font-bold text-slate-800">{selectedApp.fatherName} / {selectedApp.motherName}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">No. WhatsApp Wali:</span>
                  <a
                    href={`https://wa.me/${selectedApp.parentWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    {selectedApp.parentWhatsapp} ↗
                  </a>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Asal Sekolah:</span>
                  <span className="font-bold text-slate-800">{selectedApp.previousSchool}</span>
                </div>
              </div>
            </div>

            {/* Tindakan untuk Dokumen Aktif */}
            {activeDoc && (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Verifikasi: {activeDoc.label}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      activeDoc.status === "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : activeDoc.status === "rejected"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {activeDoc.status === "approved"
                      ? "Disetujui"
                      : activeDoc.status === "rejected"
                      ? "Ditolak / Revisi"
                      : "Menunggu Cek"}
                  </span>
                </div>

                {activeDoc.notes && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    <p className="font-bold">Catatan Revisi Terkirim:</p>
                    <p className="mt-0.5">{activeDoc.notes}</p>
                  </div>
                )}

                {/* Form Alasan Penolakan */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Alasan Revisi / Penolakan (bila berkas tidak sesuai / buram):
                  </label>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Contoh: Foto buram di bagian nomor NIK. Mohon foto ulang dengan pencahayaan terang."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-200 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleRejectDoc(activeDoc.id)}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Minta Revisi Dokumen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproveDoc(activeDoc.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui Dokumen Ini</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

