"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStore, TenantCode } from "@/lib/adminData";
import {
  GraduationCap,
  PlusCircle,
  Search,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
  Award,
} from "lucide-react";
import Image from "next/image";

interface StaffMember {
  id: string;
  tenantId: TenantCode;
  name: string;
  role: string;
  subject?: string;
  education: string;
  category: "pimpinan" | "guru" | "staf";
  photo: string;
  order: number;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "stf-1",
    tenantId: "sma",
    name: "Drs. Suherman, M.M",
    role: "Kepala Sekolah SMA Dharma Loka",
    education: "S2 Manajemen Pendidikan (UNRI)",
    category: "pimpinan",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 1,
  },
  {
    id: "stf-2",
    tenantId: "sma",
    name: "Hendri Tanuwidjaja, S.Si",
    role: "Guru Pembina Olimpiade Robotika & Fisika",
    subject: "Fisika & Robotika",
    education: "S1 Fisika MIPA (ITB)",
    category: "guru",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 2,
  },
  {
    id: "stf-3",
    tenantId: "smp",
    name: "Dra. Agustina Sitompul",
    role: "Kepala Sekolah SMP Dharma Loka",
    education: "S1 Pendidikan Bahasa Inggris (Unimed)",
    category: "pimpinan",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    order: 1,
  },
  {
    id: "stf-4",
    tenantId: "sd",
    name: "Suryani, S.Pd., M.Pd",
    role: "Kepala Sekolah SD Dharma Loka",
    education: "S2 Pendidikan Dasar (UPI)",
    category: "pimpinan",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    order: 1,
  },
  {
    id: "stf-5",
    tenantId: "tk",
    name: "Ibu Linda, S.Psi",
    role: "Kepala Sekolah TK / PAUD Dharma Loka",
    education: "S1 Psikologi Perkembangan Anak (UGM)",
    category: "pimpinan",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    order: 1,
  },
];

export default function AdminTeachersPage() {
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newCategory, setNewCategory] = useState<StaffMember["category"]>("guru");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTenant(AdminStore.getActiveTenantFilter());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredStaff = staffList.filter((stf) => {
    const matchTenant = activeTenant === "portal" || stf.tenantId === activeTenant;
    const matchSearch =
      stf.name.toLowerCase().includes(search.toLowerCase()) ||
      stf.role.toLowerCase().includes(search.toLowerCase());
    return matchTenant && matchSearch;
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) return;

    const newMember: StaffMember = {
      id: `stf-${Date.now()}`,
      tenantId: activeTenant === "portal" ? "sma" : activeTenant,
      name: newName,
      role: newRole,
      education: newEducation || "S1 Sarjana Pendidikan",
      category: newCategory,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      order: staffList.length + 1,
    };

    setStaffList([...staffList, newMember]);
    setIsModalOpen(false);
    setNewName("");
    setNewRole("");
    setNewEducation("");
    showToast("Data GTK pendidik baru berhasil ditambahkan.");
  };

  const handleDeleteStaff = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pendidik ini?")) return;
    setStaffList(staffList.filter((s) => s.id !== id));
    showToast("Data pendidik berhasil dihapus.");
  };

  return (
    <AdminLayout
      title="Direktori GTK (Guru & Tenaga Kependidikan)"
      subtitle="Kelola profil kepala sekolah, dewan guru pengajar, staf akademik, serta urutan tampil di website publik"
      breadcrumbs={[{ label: "CMS" }, { label: "Direktori GTK" }]}
      actions={
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-royal-dark transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Guru / Staf Baru</span>
        </button>
      }
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Search */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama guru, mata pelajaran, jabatan..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredStaff.length} Dewan Guru & Staf
          </span>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map((stf) => (
            <div
              key={stf.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4 hover:border-royal/40 transition group"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <Image
                  src={stf.photo}
                  alt={stf.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                    {stf.tenantId.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteStaff(stf.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm truncate">
                  {stf.name}
                </h4>
                <p className="text-xs font-bold text-royal truncate">
                  {stf.role}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {stf.education}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Tambah Guru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                Tambah Guru & Tenaga Kependidikan
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Lengkap & Gelar:
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Pd"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Jabatan / Mata Pelajaran:
                </label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Contoh: Guru Matematika & Pembina Robotika"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pendidikan Terakhir:
                </label>
                <input
                  type="text"
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                  placeholder="Contoh: S1 Pendidikan Matematika (UNRI)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Kategori GTK:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  <option value="guru">Dewan Guru</option>
                  <option value="pimpinan">Pimpinan Sekolah</option>
                  <option value="staf">Tenaga Kependidikan / Staf Ahli</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-royal text-white font-bold hover:bg-royal-dark shadow-xs"
                >
                  Simpan Pendidik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

