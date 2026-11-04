"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, AdminApplicant, TenantCode } from "@/lib/adminData";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Search,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Save,
  Check,
  UserCheck,
} from "lucide-react";

export default function AdminSelectionPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [academicScore, setAcademicScore] = useState<number>(0);
  const [interviewScore, setInterviewScore] = useState<number>(0);
  const [statusVal, setStatusVal] = useState<"passed" | "waiting_list" | "rejected" | "scheduled">("scheduled");
  const [scheduleDatetime, setScheduleDatetime] = useState("2026-11-10 08:30");
  const [scheduleRoom, setScheduleRoom] = useState("Ruang CBT Lab 1");
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

  const filteredApplicants = applicants.filter(
    (a) =>
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.registrationNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Quota calculation
  const quotaLimit = activeTenant === "portal" ? 380 : 80;
  const currentPassedCount = applicants.filter((a) => a.selectionStatus === "passed").length;
  const isQuotaFull = currentPassedCount >= quotaLimit;

  const startEdit = (app: AdminApplicant) => {
    setEditingId(app.id);
    setAcademicScore(app.testScores?.academic || 80);
    setInterviewScore(app.testScores?.interview || 80);
    setStatusVal(
      app.selectionStatus === "passed" ||
        app.selectionStatus === "waiting_list" ||
        app.selectionStatus === "rejected"
        ? app.selectionStatus
        : "scheduled"
    );
    setScheduleDatetime(app.testSchedule?.datetime || "2026-11-10 08:30 WIB");
    setScheduleRoom(app.testSchedule?.room || "Ruang CBT Lab 1");
  };

  const saveEvaluation = (id: string) => {
    const finalAvg = Number(((academicScore + interviewScore) / 2).toFixed(1));

    AdminStore.updateApplicantStatus(
      id,
      {
        testScores: {
          academic: academicScore,
          interview: interviewScore,
          finalAverage: finalAvg,
        },
        testSchedule: {
          datetime: scheduleDatetime,
          room: scheduleRoom,
          interviewerName: "Tim Penguji SPMB",
        },
        selectionStatus: statusVal,
      },
      "Panitia SPMB"
    );

    showToast("Hasil penilaian & jadwal tes berhasil disimpan.");
    setEditingId(null);
    loadData();
  };

  return (
    <AdminLayout
      title="Seleksi & Penjadwalan Tes"
      subtitle="Kelola slot jadwal wawancara, input skor akademik, perankingan otomatis, dan penetapan status kelulusan"
      breadcrumbs={[{ label: "SPMB" }, { label: "Seleksi & Jadwal" }]}
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Real-Time Quota Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status Kuota Penerimaan Real-Time
            </span>
            <div className="flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentPassedCount} / {quotaLimit} Siswa Diterima
              </p>
              {isQuotaFull ? (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                  KUOTA PENUH
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Sisa {quotaLimit - currentPassedCount} Kursi
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/admissions/announcements"
              className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-bold shadow-xs hover:bg-royal-dark transition"
            >
              Publikasikan Pengumuman Kelulusan →
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama calon siswa atau no. registrasi..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredApplicants.length} Calon Siswa
          </span>
        </div>

        {/* Tabel Seleksi & Nilai */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4">Calon Siswa</th>
                  <th className="py-4 px-3">Jalur & Unit</th>
                  <th className="py-4 px-3">Jadwal Ujian / Ruang</th>
                  <th className="py-4 px-3 text-center">Skor Akademik</th>
                  <th className="py-4 px-3 text-center">Skor Wawancara</th>
                  <th className="py-4 px-3 text-center">Rata-rata</th>
                  <th className="py-4 px-3 text-center">Keputusan Seleksi</th>
                  <th className="py-4 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.map((app) => {
                  const isEditing = editingId === app.id;

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-slate-900 block">
                          {app.fullName}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {app.registrationNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {app.tenantId.toUpperCase()}
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {app.trackName}
                        </p>
                      </td>
                      <td className="py-3.5 px-3">
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={scheduleDatetime}
                              onChange={(e) => setScheduleDatetime(e.target.value)}
                              className="w-full px-2 py-1 rounded border text-xs"
                              placeholder="Contoh: 2026-11-10 08:30"
                            />
                            <input
                              type="text"
                              value={scheduleRoom}
                              onChange={(e) => setScheduleRoom(e.target.value)}
                              className="w-full px-2 py-1 rounded border text-xs"
                              placeholder="Ruang Tes"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold text-slate-800">
                              {app.testSchedule?.datetime || "Belum Dijadwalkan"}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {app.testSchedule?.room || "-"}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={academicScore}
                            onChange={(e) => setAcademicScore(Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded border text-center font-bold text-xs"
                          />
                        ) : (
                          <span className="font-bold text-slate-800">
                            {app.testScores?.academic ?? "-"}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={interviewScore}
                            onChange={(e) => setInterviewScore(Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded border text-center font-bold text-xs"
                          />
                        ) : (
                          <span className="font-bold text-slate-800">
                            {app.testScores?.interview ?? "-"}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-extrabold text-royal text-sm">
                          {isEditing
                            ? ((academicScore + interviewScore) / 2).toFixed(1)
                            : app.testScores?.finalAverage ?? "-"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {isEditing ? (
                          <select
                            value={statusVal}
                            onChange={(e) => setStatusVal(e.target.value as any)}
                            className="px-2.5 py-1 rounded-lg border text-xs font-bold"
                          >
                            <option value="scheduled">Jadwal Ditetapkan</option>
                            <option value="passed">Diterima (Lulus)</option>
                            <option value="waiting_list">Cadangan (Waiting List)</option>
                            <option value="rejected">Tidak Diterima</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                              app.selectionStatus === "passed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : app.selectionStatus === "waiting_list"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : app.selectionStatus === "rejected"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-blue-50 text-royal border-blue-200"
                            }`}
                          >
                            {app.selectionStatus === "passed"
                              ? "Diterima (Lulus)"
                              : app.selectionStatus === "waiting_list"
                              ? "Cadangan"
                              : app.selectionStatus === "rejected"
                              ? "Tidak Diterima"
                              : "Jadwal Ditetapkan"}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => saveEvaluation(app.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs"
                            >
                              Simpan
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEdit(app)}
                            className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-royal text-xs font-bold border border-blue-200 transition cursor-pointer"
                          >
                            Input Skor / Status
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

