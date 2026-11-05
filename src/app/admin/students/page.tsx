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
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { SecurityUtils } from "@/lib/security";

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
  const [unmaskedNiks, setUnmaskedNiks] = useState<Record<string, boolean>>({});

  const toggleUnmaskNik = (id: string, nik: string) => {
    const isCurrentlyUnmasked = !!unmaskedNiks[id];
    setUnmaskedNiks((prev) => ({ ...prev, [id]: !isCurrentlyUnmasked }));
    if (!isCurrentlyUnmasked) {
      SecurityUtils.recordUnmaskAudit(id, "nik", "Pemeriksaan Master Data Siswa");
    }
  };

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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            <span>+ Konversi dari SPMB</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("Mengunduh template master data siswa...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Excel</span>
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Search & Filter Bar */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, NIS, kelas..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tabular-nums text-slate-500">
              {filtered.length} siswa aktif
            </span>
          </div>
        </div>

        {/* Tabel Siswa Aktif */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-xs">
                <tr>
                  <th className="py-3 px-4">NIS & NISN</th>
                  <th className="py-3 px-3">Nama siswa</th>
                  <th className="py-3 px-3">Jenjang & kelas</th>
                  <th className="py-3 px-3">Tahun masuk</th>
                  <th className="py-3 px-3">WhatsApp wali</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-semibold text-slate-900 block">
                        {stu.nis}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        NISN: {stu.nisn}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-900">
                        {stu.fullName}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span>
                          NIK:{" "}
                          <strong className="font-mono text-slate-600">
                            {unmaskedNiks[stu.id]
                              ? stu.nik
                              : SecurityUtils.maskIdentifier(stu.nik)}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleUnmaskNik(stu.id, stu.nik)}
                          className="text-slate-400 hover:text-slate-700 transition p-0.5 rounded cursor-pointer"
                          title={
                            unmaskedNiks[stu.id]
                              ? "Samarkan NIK kembali"
                              : "Buka NIK Lengkap (Tercatat di Audit Log Keamanan)"
                          }
                        >
                          {unmaskedNiks[stu.id] ? (
                            <EyeOff className="w-3.5 h-3.5 text-royal" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span>• {stu.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-slate-900 block">
                        {stu.className}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {stu.tenantId.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {stu.academicYear}
                    </td>
                    <td className="py-3 px-3">
                      <a
                        href={`https://wa.me/${stu.parentWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-slate-700 hover:underline"
                      >
                        {SecurityUtils.maskPhone(stu.parentWhatsapp)} ↗
                      </a>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Aktif
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

