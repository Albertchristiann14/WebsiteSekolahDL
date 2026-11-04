"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, TenantCode } from "@/lib/adminData";
import {
  UserPlus,
  CheckCircle2,
  Users,
  ShieldCheck,
  Building2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function AdminConversionPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [selectedClass, setSelectedClass] = useState<Record<string, string>>({});
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

  // Eligible for conversion: Selection passed & Payment paid
  const eligibleApplicants = applicants.filter(
    (a) => a.selectionStatus === "passed" && a.paymentStatus === "paid"
  );

  const handleConvertToStudent = (app: AdminApplicant) => {
    // Generate unique NIS [TAHUN][JENJANG][URUT]
    const yearPrefix = "26";
    const tenantPrefix = app.tenantId.toUpperCase();
    const randomSeq = String(Math.floor(Math.random() * 900) + 100).padStart(4, "0");
    const generatedNis = `${yearPrefix}${tenantPrefix}${randomSeq}`;
    const assignedRombel =
      selectedClass[app.id] ||
      (app.tenantId === "sma"
        ? "X-MIPA 1"
        : app.tenantId === "smp"
        ? "VII-A"
        : app.tenantId === "sd"
        ? "1-A"
        : "TK-A Bintang");

    AdminStore.updateApplicantStatus(
      app.id,
      {
        finalStatus: "enrolled",
        assignedNis: generatedNis,
        assignedClass: assignedRombel,
      },
      "Panitia SPMB"
    );

    AdminStore.addAuditLog({
      userName: "Panitia SPMB",
      userRole: "Petugas Admisi",
      tenantId: app.tenantId,
      action: "CONVERT_TO_ACTIVE_STUDENT",
      module: "Konversi Siswa",
      description: `Mengonversi pendaftar ${app.registrationNumber} (${app.fullName}) menjadi Siswa Aktif dengan NIS ${generatedNis} di rombel ${assignedRombel}.`,
    });

    showToast(`Berhasil menjadikan ${app.fullName} Siswa Aktif (NIS: ${generatedNis}, Kelas: ${assignedRombel}).`);
    loadData();
  };

  return (
    <AdminLayout
      title="Konversi ke Master Siswa Aktif"
      subtitle="Otomatisasi pembuatan Nomor Induk Siswa (NIS), penempatan rombel/kelas, dan pemindahan data pendaftar lulus ke basis data sekolah"
      breadcrumbs={[{ label: "SPMB" }, { label: "Konversi Siswa" }]}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/students"
            className="px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-royal-dark transition flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Buka Master Siswa Aktif →</span>
          </Link>
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
        {/* Info Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Integritas Data Master Siswa Terjamin
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pendaftar yang telah dinyatakan <strong>LULUS</strong> dan melunasi <strong>Uang Pangkal / Daftar Ulang</strong> siap dimasukkan ke buku induk sekolah tanpa input ulang.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
            {eligibleApplicants.length} Calon Siswa Siap Dikonversi
          </span>
        </div>

        {/* Tabel Konversi */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4">Calon Siswa & No. Reg</th>
                  <th className="py-4 px-3">Jenjang & NIK</th>
                  <th className="py-4 px-3">Status Seleksi & Biaya</th>
                  <th className="py-4 px-3">Pilih Rombel / Kelas</th>
                  <th className="py-4 px-3">NIS Terbit</th>
                  <th className="py-4 px-4 text-center">Aksi Konversi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {eligibleApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400">
                      Tidak ada calon siswa yang memenuhi syarat konversi saat ini.
                    </td>
                  </tr>
                ) : (
                  eligibleApplicants.map((app) => {
                    const isEnrolled = app.finalStatus === "enrolled";

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <span className="font-extrabold text-slate-900 block">
                            {app.fullName}
                          </span>
                          <span className="text-xs font-mono text-royal">
                            {app.registrationNumber}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                            {app.tenantId.toUpperCase()}
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5">
                            NIK: {app.nik}
                          </p>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Lulus & Lunas
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          {isEnrolled ? (
                            <span className="font-extrabold text-slate-900">
                              {app.assignedClass}
                            </span>
                          ) : (
                            <select
                              value={
                                selectedClass[app.id] ||
                                (app.tenantId === "sma"
                                  ? "X-MIPA 1"
                                  : app.tenantId === "smp"
                                  ? "VII-A"
                                  : app.tenantId === "sd"
                                  ? "1-A"
                                  : "TK-A Bintang")
                              }
                              onChange={(e) =>
                                setSelectedClass({
                                  ...selectedClass,
                                  [app.id]: e.target.value,
                                })
                              }
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                            >
                              {app.tenantId === "sma" && (
                                <>
                                  <option value="X-MIPA 1">X-MIPA 1 (Sains & Riset)</option>
                                  <option value="X-MIPA 2">X-MIPA 2</option>
                                  <option value="X-IPS 1">X-IPS 1 (Sosial & Bisnis)</option>
                                </>
                              )}
                              {app.tenantId === "smp" && (
                                <>
                                  <option value="VII-A">VII-A</option>
                                  <option value="VII-B">VII-B</option>
                                </>
                              )}
                              {app.tenantId === "sd" && (
                                <>
                                  <option value="1-A">1-A Mandiri</option>
                                  <option value="1-B">1-B Cerdas</option>
                                </>
                              )}
                              {app.tenantId === "tk" && (
                                <>
                                  <option value="TK-A Bintang">TK-A Bintang</option>
                                  <option value="TK-B Pelangi">TK-B Pelangi</option>
                                </>
                              )}
                              {app.tenantId === "smk" && (
                                <>
                                  <option value="X-RPL 1">X-RPL 1 (Rekayasa Perangkat Lunak)</option>
                                  <option value="X-TKJ 1">X-TKJ 1 (Teknik Jaringan Komputer)</option>
                                </>
                              )}
                            </select>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {isEnrolled ? (
                            <span className="font-mono font-extrabold text-emerald-700">
                              {app.assignedNis}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Dibuat saat konversi
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isEnrolled ? (
                            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Siswa Aktif</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleConvertToStudent(app)}
                              className="px-3.5 py-1.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 mx-auto cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>Jadikan Siswa Aktif</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

