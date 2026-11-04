"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, TenantCode } from "@/lib/adminData";
import {
  Users,
  Search,
  Download,
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  Phone,
  Filter,
} from "lucide-react";

interface MockStudent {
  id: string;
  tenantId: TenantCode;
  nis: string;
  nisn: string;
  nik: string;
  fullName: string;
  gender: "L" | "P";
  className: string;
  gradeLevel: number;
  academicYear: string;
  parentWhatsapp: string;
  status: "active" | "graduated" | "moved";
}

const INITIAL_MASTER_STUDENTS: MockStudent[] = [
  {
    id: "stu-1",
    tenantId: "sma",
    nis: "26SMA0001",
    nisn: "0098765432",
    nik: "1471011405090001",
    fullName: "Nathaniel Vincent Wijaya",
    gender: "L",
    className: "X-MIPA 1",
    gradeLevel: 10,
    academicYear: "2026/2027",
    parentWhatsapp: "081268892101",
    status: "active",
  },
  {
    id: "stu-2",
    tenantId: "sma",
    nis: "25SMA0142",
    nisn: "0087766554",
    nik: "1471021203080002",
    fullName: "Angelica Victoria Lim",
    gender: "P",
    className: "XI-MIPA 1",
    gradeLevel: 11,
    academicYear: "2025/2026",
    parentWhatsapp: "081377889900",
    status: "active",
  },
  {
    id: "stu-3",
    tenantId: "smp",
    nis: "25SMP0088",
    nisn: "0102938475",
    nik: "1471032506110003",
    fullName: "Matthew Brandon Tan",
    gender: "L",
    className: "VIII-A",
    gradeLevel: 8,
    academicYear: "2025/2026",
    parentWhatsapp: "082188991122",
    status: "active",
  },
  {
    id: "stu-4",
    tenantId: "sd",
    nis: "24SD0055",
    nisn: "0145678901",
    nik: "1471051210170004",
    fullName: "Bryan Nicholas Gunawan",
    gender: "L",
    className: "3-A Mandiri",
    gradeLevel: 3,
    academicYear: "2024/2025",
    parentWhatsapp: "081266554433",
    status: "active",
  },
  {
    id: "stu-5",
    tenantId: "tk",
    nis: "26TK0012",
    nisn: "-",
    nik: "1471046604220005",
    fullName: "Chloe Jennifer Salim",
    gender: "P",
    className: "TK-A Bintang",
    gradeLevel: 0,
    academicYear: "2026/2027",
    parentWhatsapp: "081275990033",
    status: "active",
  },
];

export default function AdminStudentsPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [students, setStudents] = useState<MockStudent[]>(INITIAL_MASTER_STUDENTS);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  useEffect(() => {
    setActiveTenant(AdminStore.getActiveTenantFilter());
  }, []);

  const filtered = students.filter((s) => {
    const matchTenant = activeTenant === "portal" || s.tenantId === activeTenant;
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.nis.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "all" || s.className === classFilter;
    return matchTenant && matchSearch && matchClass;
  });

  return (
    <AdminLayout
      title="Master Data Siswa Aktif"
      subtitle="Basis data induk seluruh peserta didik aktif Sekolah Dharma Loka per jenjang dan rombel"
      breadcrumbs={[{ label: "Master Data" }, { label: "Siswa Aktif" }]}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/admissions/conversion"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition"
          >
            <span>+ Konversi dari SPMB</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("Mengunduh template master data siswa...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-royal-dark transition"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Master Excel</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama siswa, NIS, kelas..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Total {filtered.length} Siswa Aktif
            </span>
          </div>
        </div>

        {/* Tabel Siswa Aktif */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4">NIS & NISN</th>
                  <th className="py-4 px-3">Nama Siswa</th>
                  <th className="py-4 px-3">Jenjang & Kelas</th>
                  <th className="py-4 px-3">Tahun Masuk</th>
                  <th className="py-4 px-3">WhatsApp Orang Tua</th>
                  <th className="py-4 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-extrabold text-slate-900 block">
                        {stu.nis}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        NISN: {stu.nisn}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-extrabold text-slate-900">
                        {stu.fullName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        NIK: {stu.nik} • {stu.gender === "L" ? "Laki-laki" : "Perempuan"}
                      </p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-royal block">
                        {stu.className}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {stu.tenantId.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">
                      {stu.academicYear}
                    </td>
                    <td className="py-3.5 px-3">
                      <a
                        href={`https://wa.me/${stu.parentWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        {stu.parentWhatsapp} ↗
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Aktif Belajar
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

