"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, ApplicantInvoice, TenantCode } from "@/lib/adminData";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  Search,
  ExternalLink,
  Eye,
  XCircle,
  FileCheck2,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function AdminPaymentsPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [receiptModalInvoice, setReceiptModalInvoice] = useState<{
    invoice: ApplicantInvoice;
    applicant: AdminApplicant;
  } | null>(null);
  const [proofModalUrl, setProofModalUrl] = useState<string | null>(null);
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

  // Flatten invoices list with applicant context
  const invoiceRows = applicants.flatMap((app) =>
    app.invoices.map((inv) => ({
      ...inv,
      applicant: app,
    }))
  );

  const filteredInvoices = invoiceRows.filter((row) => {
    const matchSearch =
      row.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      row.applicant.fullName.toLowerCase().includes(search.toLowerCase()) ||
      row.applicant.registrationNumber.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || row.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Revenue metrics
  const totalRevenue = invoiceRows
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingConfirmationCount = invoiceRows.filter(
    (inv) => inv.status === "pending_approval"
  ).length;

  const handleApprovePayment = (applicantId: string, invoiceId: string) => {
    const app = applicants.find((a) => a.id === applicantId);
    if (!app) return;

    const updatedInvoices = app.invoices.map((inv) =>
      inv.id === invoiceId
        ? {
            ...inv,
            status: "paid" as const,
            paidAt: new Date().toISOString().replace("T", " ").substring(0, 16),
            confirmedBy: "Staf Keuangan",
          }
        : inv
    );

    AdminStore.updateApplicantStatus(
      applicantId,
      {
        invoices: updatedInvoices,
        paymentStatus: "paid",
      },
      "Staf Keuangan"
    );

    showToast("Pembayaran berhasil diverifikasi dan disetujui lunas.");
    loadData();
    setProofModalUrl(null);
  };

  const handleSimulateMidtransWebhook = (applicantId: string, invoiceId: string) => {
    handleApprovePayment(applicantId, invoiceId);
    showToast("Webhook Midtrans [settlement: 200] berhasil direkonsiliasi otomatis.");
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <AdminLayout
      title="Tagihan & Rekonsiliasi Pembayaran"
      subtitle="Kelola tagihan biaya formulir, uang pangkal daftar ulang, approval bukti transfer manual, dan rekonsiliasi payment gateway"
      breadcrumbs={[{ label: "SPMB" }, { label: "Tagihan & Pembayaran" }]}
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Penerimaan Masuk
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {formatRupiah(totalRevenue)}
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Terverifikasi di rekening yayasan</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Butuh Konfirmasi Transfer
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {pendingConfirmationCount} Transaksi
              </p>
              <p className="text-[11px] font-semibold text-amber-700">
                Bukti transfer telah diunggah orang tua
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Integrasi Gateway
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-bold text-slate-800">
                  Midtrans & Manual VA Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Otomatisasi settlement webhook siap
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-royal flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor tagihan, nama pendaftar..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <option value="all">Semua Status Tagihan</option>
              <option value="paid">Lunas</option>
              <option value="pending_approval">Menunggu Konfirmasi Transfer</option>
              <option value="unpaid">Belum Bayar</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4">No. Tagihan</th>
                  <th className="py-4 px-3">Calon Siswa & No. Reg</th>
                  <th className="py-4 px-3">Jenis Tagihan</th>
                  <th className="py-4 px-3">Jumlah (IDR)</th>
                  <th className="py-4 px-3">Metode & Bukti</th>
                  <th className="py-4 px-3">Status</th>
                  <th className="py-4 px-4 text-center">Aksi / Kuitansi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-extrabold text-slate-900 block">
                        {inv.invoiceNumber}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Jatuh Tempo: {inv.dueDate.split(" ")[0]}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-extrabold text-slate-900">
                        {inv.applicant.fullName}
                      </p>
                      <p className="text-[11px] font-mono text-royal">
                        {inv.applicant.registrationNumber} • {inv.applicant.tenantId.toUpperCase()}
                      </p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-800">
                        {inv.typeLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatRupiah(inv.amount)}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-xs uppercase font-bold text-slate-600 block">
                        {inv.paymentMethod?.replace("_", " ") || "Bank Transfer"}
                      </span>
                      {inv.proofUrl && (
                        <button
                          type="button"
                          onClick={() => setProofModalUrl(inv.proofUrl!)}
                          className="text-[11px] font-bold text-royal hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat Bukti Transfer</span>
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                          inv.status === "paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : inv.status === "pending_approval"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {inv.status === "paid"
                          ? "Lunas"
                          : inv.status === "pending_approval"
                          ? "Perlu Konfirmasi"
                          : "Belum Bayar"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {inv.status === "pending_approval" && (
                          <button
                            type="button"
                            onClick={() => handleApprovePayment(inv.applicant.id, inv.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition"
                          >
                            Setujui Pembayaran
                          </button>
                        )}

                        {inv.status === "unpaid" && (
                          <button
                            type="button"
                            onClick={() => handleSimulateMidtransWebhook(inv.applicant.id, inv.id)}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-royal hover:bg-blue-100 border border-blue-200 text-xs font-bold transition"
                            title="Simulasikan notifikasi Webhook sukses dari Payment Gateway"
                          >
                            Simulasi Gateway Lunas
                          </button>
                        )}

                        {inv.status === "paid" && (
                          <button
                            type="button"
                            onClick={() =>
                              setReceiptModalInvoice({
                                invoice: inv,
                                applicant: inv.applicant,
                              })
                            }
                            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition inline-flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Cetak Kuitansi</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Pratinjau Bukti Transfer */}
      {proofModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Bukti Transfer Manual Calon Siswa
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proofModalUrl}
              alt="Bukti Transfer"
              className="w-full max-h-96 rounded-xl object-contain border border-slate-200 bg-slate-50"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProofModalUrl(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kuitansi Resmi PDF / Cetak */}
      {receiptModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 border border-slate-200 animate-in fade-in">
            {/* Header Kuitansi */}
            <div className="border-b border-slate-200 pb-4 text-center space-y-1">
              <span className="text-xs font-extrabold text-royal uppercase tracking-widest block">
                KUITANSI PEMBAYARAN RESMI
              </span>
              <h2 className="text-lg font-black text-slate-900">
                YAYASAN PENDIDIKAN DHARMA LOKA
              </h2>
              <p className="text-xs text-slate-500">
                Jl. Tuanku Tambusai, Labuh Baru Barat, Pekanbaru • Telp: (0761) 859214
              </p>
            </div>

            {/* Rincian Kuitansi */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Nomor Kuitansi:</span>
                <span className="font-mono font-bold text-slate-900">{receiptModalInvoice.invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Sudah Diterima Dari:</span>
                <span className="font-bold text-slate-900">{receiptModalInvoice.applicant.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Nomor Registrasi:</span>
                <span className="font-mono font-bold text-royal">{receiptModalInvoice.applicant.registrationNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Untuk Pembayaran:</span>
                <span className="font-bold text-slate-900">{receiptModalInvoice.invoice.typeLabel}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Waktu Transaksi:</span>
                <span className="font-bold text-slate-900">{receiptModalInvoice.invoice.paidAt || "Lunas"}</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex justify-between items-center">
                <span className="font-bold text-slate-700">Jumlah Disetor:</span>
                <span className="text-lg font-extrabold text-royal">
                  {formatRupiah(receiptModalInvoice.invoice.amount)}
                </span>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-royal text-white font-bold text-xs shadow-xs hover:bg-royal-dark transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Cetak PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setReceiptModalInvoice(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
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

