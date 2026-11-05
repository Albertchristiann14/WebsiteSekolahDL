"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, TenantCode } from "@/lib/adminData";
import {
  Users,
  Search,
  Filter,
  Download,
  FileCheck2,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  X,
  Send,
  Printer,
  FileText,
  EyeOff,
} from "lucide-react";
import { SecurityUtils } from "@/lib/security";

export default function AdminAdmissionsPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [docFilter, setDocFilter] = useState("all");
  const [payFilter, setPayFilter] = useState("all");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [detailModalApp, setDetailModalApp] = useState<AdminApplicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unmaskedNiks, setUnmaskedNiks] = useState<Record<string, boolean>>({});

  const toggleUnmaskNik = (id: string, nik: string) => {
    const isCurrentlyUnmasked = !!unmaskedNiks[id];
    setUnmaskedNiks((prev) => ({ ...prev, [id]: !isCurrentlyUnmasked }));
    if (!isCurrentlyUnmasked) {
      SecurityUtils.recordUnmaskAudit(id, "nik", "Pemeriksaan Verifikasi Calon Siswa");
    }
  };

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

  // Filtered applicants
  const filteredList = applicants.filter((a) => {
    const matchSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.nik.includes(search) ||
      a.previousSchool.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || a.selectionStatus === statusFilter;
    const matchDoc = docFilter === "all" || a.documentStatus === docFilter;
    const matchPay = payFilter === "all" || a.paymentStatus === payFilter;

    return matchSearch && matchStatus && matchDoc && matchPay;
  });

  // Batch actions
  const toggleSelectAll = () => {
    if (selectedApplicants.length === filteredList.length) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(filteredList.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedApplicants.includes(id)) {
      setSelectedApplicants(selectedApplicants.filter((item) => item !== id));
    } else {
      setSelectedApplicants([...selectedApplicants, id]);
    }
  };

  const handleBatchVerify = () => {
    selectedApplicants.forEach((id) => {
      AdminStore.updateApplicantStatus(
        id,
        { documentStatus: "approved" },
        "Panitia SPMB"
      );
    });
    showToast(`Berhasil memverifikasi berkas ${selectedApplicants.length} pendaftar.`);
    setSelectedApplicants([]);
    loadData();
  };

  const handleExportCSV = () => {
    const headers = [
      "No. Registrasi",
      "Jenjang",
      "Nama Lengkap",
      "NIK",
      "NISN",
      "Jalur",
      "Asal Sekolah",
      "No. WhatsApp Ortu",
      "Status Berkas",
      "Status Bayar",
      "Status Seleksi",
      "Tanggal Daftar",
    ];

    const rows = filteredList.map((a) => [
      a.registrationNumber,
      a.tenantId.toUpperCase(),
      `"${a.fullName}"`,
      `'${a.nik}`,
      `'${a.nisn || ""}`,
      `"${a.trackName}"`,
      `"${a.previousSchool}"`,
      `'${a.parentWhatsapp}`,
      a.documentStatus,
      a.paymentStatus,
      a.selectionStatus,
      a.appliedAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Data_Pendaftar_SPMB_${activeTenant}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("File CSV data pendaftar berhasil diunduh.");
  };

  return (
    <AdminLayout
      title="Data Pendaftar SPMB / PPDB"
      subtitle="Kelola seluruh pendaftaran calon siswa, penelusuran status berkas, dan histori seleksi"
      breadcrumbs={[{ label: "SPMB" }, { label: "Data Pendaftar" }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor Excel / CSV</span>
          </button>
          <Link
            href="/admin/admissions/verification"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-sm shadow-royal/20 hover:bg-royal-dark transition"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Verifikasi Berkas</span>
          </Link>
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

      <div className="space-y-6">
        {/* ===================================================================
            1. FILTER & PENCARIAN MULTI-KRITERIA
        =================================================================== */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
            {/* Search Input (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama siswa, no. registrasi, NIK, atau asal sekolah..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
              />
            </div>

            {/* Filter Status Seleksi (3 Cols) */}
            <div className="lg:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
              >
                <option value="all">Semua Status Seleksi</option>
                <option value="registered">Terdaftar (Menunggu)</option>
                <option value="scheduled">Jadwal Tes Ditetapkan</option>
                <option value="tested">Sudah Tes / Dinilai</option>
                <option value="passed">Lulus Diterima</option>
                <option value="waiting_list">Cadangan (Waiting List)</option>
                <option value="rejected">Tidak Diterima</option>
              </select>
            </div>

            {/* Filter Status Berkas (2 Cols) */}
            <div className="lg:col-span-2">
              <select
                value={docFilter}
                onChange={(e) => setDocFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
              >
                <option value="all">Status Berkas</option>
                <option value="pending">Menunggu Cek</option>
                <option value="approved">Lengkap (Disetujui)</option>
                <option value="revision_needed">Perlu Revisi</option>
              </select>
            </div>

            {/* Filter Status Bayar (2 Cols) */}
            <div className="lg:col-span-2">
              <select
                value={payFilter}
                onChange={(e) => setPayFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
              >
                <option value="all">Status Pembayaran</option>
                <option value="paid">Lunas</option>
                <option value="pending_approval">Konfirmasi Transfer</option>
                <option value="unpaid">Belum Bayar</option>
              </select>
            </div>
          </div>

          {/* Batch Action Bar if selected */}
          {selectedApplicants.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-royal">
                {selectedApplicants.length} pendaftar dipilih
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBatchVerify}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
                >
                  Setujui Berkas Massal
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApplicants([])}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            2. TABEL DATA PENDAFTAR LENGKAP DENGAN HORIZONTAL SCROLL
        =================================================================== */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-xs">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedApplicants.length === filteredList.length &&
                        filteredList.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                  </th>
                  <th className="py-3 px-3">No. registrasi</th>
                  <th className="py-3 px-3">Nama calon siswa</th>
                  <th className="py-3 px-3">Jenjang & jalur</th>
                  <th className="py-3 px-3">Asal sekolah</th>
                  <th className="py-3 px-3">Status berkas</th>
                  <th className="py-3 px-3">Status bayar</th>
                  <th className="py-3 px-3">Status seleksi</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-12 text-center text-slate-400">
                      <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p className="font-bold text-sm">Tidak ada calon siswa yang cocok</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Coba sesuaikan kata kunci pencarian atau filter status Anda.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedApplicants.includes(app.id)}
                          onChange={() => toggleSelectOne(app.id)}
                          className="rounded border-slate-300 text-royal focus:ring-royal"
                        />
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-mono font-extrabold text-slate-900 block">
                          {app.registrationNumber}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {app.appliedAt.split(" ")[0]}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-extrabold text-slate-900">
                          {app.fullName}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span>
                            NIK:{" "}
                            <strong className="font-mono text-slate-700">
                              {unmaskedNiks[app.id]
                                ? app.nik
                                : SecurityUtils.maskIdentifier(app.nik)}
                            </strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleUnmaskNik(app.id, app.nik)}
                            className="text-slate-400 hover:text-royal transition p-0.5 rounded cursor-pointer"
                            title={
                              unmaskedNiks[app.id]
                                ? "Samarkan NIK kembali"
                                : "Buka NIK Lengkap (Tercatat di Audit Log)"
                            }
                          >
                            {unmaskedNiks[app.id] ? (
                              <EyeOff className="w-3.5 h-3.5 text-royal" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {app.nisn && (
                            <span className="font-mono text-slate-400">
                              • NISN: {SecurityUtils.maskIdentifier(app.nisn, 3, 2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                          {app.tenantId.toUpperCase()}
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5 font-medium">
                          {app.trackName}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        {app.previousSchool}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            app.documentStatus === "approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : app.documentStatus === "revision_needed"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {app.documentStatus === "approved" && <CheckCircle2 className="w-3 h-3" />}
                          {app.documentStatus === "revision_needed" && <AlertCircle className="w-3 h-3" />}
                          {app.documentStatus === "pending" && <Clock className="w-3 h-3" />}
                          <span>
                            {app.documentStatus === "approved"
                              ? "Lengkap"
                              : app.documentStatus === "revision_needed"
                              ? "Perlu Revisi"
                              : "Menunggu"}
                          </span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            app.paymentStatus === "paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : app.paymentStatus === "pending_approval"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {app.paymentStatus === "paid" ? "Lunas" : app.paymentStatus === "pending_approval" ? "Cek Bukti" : "Belum Bayar"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                            app.selectionStatus === "passed"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : app.selectionStatus === "scheduled"
                              ? "bg-blue-50 text-royal border-blue-200"
                              : app.selectionStatus === "waiting_list"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {app.selectionStatus === "passed"
                            ? "Lulus"
                            : app.selectionStatus === "scheduled"
                            ? "Jadwal Tes"
                            : app.selectionStatus === "tested"
                            ? "Sudah Tes"
                            : app.selectionStatus === "waiting_list"
                            ? "Cadangan"
                            : "Terdaftar"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDetailModalApp(app)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-royal hover:bg-blue-50 transition cursor-pointer"
                            title="Lihat Detail Lengkap"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://wa.me/${app.parentWhatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                            title="Kirim Pesan WhatsApp ke Orang Tua"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Menampilkan <strong>{filteredList.length}</strong> dari <strong>{applicants.length}</strong> pendaftar
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="font-bold text-slate-800">1</span>
              <button
                disabled
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          3. DETAIL MODAL DRAWER
      =================================================================== */}
      {detailModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div>
                <span className="text-xs font-mono font-bold text-royal uppercase">
                  {detailModalApp.registrationNumber} • {detailModalApp.tenantId.toUpperCase()}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {detailModalApp.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalApp(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {/* Biodata Calon Siswa */}
              <div className="space-y-2.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Data Calon Siswa
                </p>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-xs block">Tempat, Tanggal Lahir</span>
                    <span className="font-bold text-slate-800">{detailModalApp.birthPlace}, {detailModalApp.birthDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Jenis Kelamin / Agama</span>
                    <span className="font-bold text-slate-800">{detailModalApp.gender === "L" ? "Laki-laki" : "Perempuan"} • {detailModalApp.religion}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Asal Sekolah</span>
                    <span className="font-bold text-slate-800">{detailModalApp.previousSchool} ({detailModalApp.schoolOriginCity})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Jalur Pendaftaran</span>
                    <span className="font-bold text-royal">{detailModalApp.trackName}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-xs block">Alamat Rumah</span>
                    <span className="font-bold text-slate-800">{detailModalApp.address}</span>
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="space-y-2.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Kontak & Data Orang Tua
                </p>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-xs block">Ayah / Pekerjaan</span>
                    <span className="font-bold text-slate-800">{detailModalApp.fatherName} ({detailModalApp.fatherJob})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Ibu / Pekerjaan</span>
                    <span className="font-bold text-slate-800">{detailModalApp.motherName} ({detailModalApp.motherJob})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">No. WhatsApp Wali</span>
                    <span className="font-bold text-emerald-700">{detailModalApp.parentWhatsapp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Email Wali</span>
                    <span className="font-bold text-slate-800">{detailModalApp.parentEmail}</span>
                  </div>
                </div>
              </div>

              {/* Dokumen Unggahan */}
              <div className="space-y-2.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Dokumen Berkas Terunggah ({detailModalApp.documents.length})
                </p>
                <div className="space-y-2">
                  {detailModalApp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-royal shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{doc.label}</p>
                          <p className="text-[11px] text-slate-500">{doc.fileName} • {doc.fileSize}</p>
                        </div>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-blue-50 text-royal hover:bg-blue-100 text-xs font-bold transition inline-flex items-center gap-1"
                      >
                        <span>Lihat Dokumen</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-end gap-2.5">
              <Link
                href="/admin/admissions/verification"
                className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-bold hover:bg-royal-dark transition"
              >
                Buka di Split-Screen Verifikasi
              </Link>
              <button
                type="button"
                onClick={() => setDetailModalApp(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
