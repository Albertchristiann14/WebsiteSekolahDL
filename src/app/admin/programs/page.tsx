"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import {
  GraduationCap,
  Edit,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEdit, setActiveEdit] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [overview, setOverview] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [headmaster, setHeadmaster] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPrograms();
      if (res.status === 200 && res.data) {
        setPrograms(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat program");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const openEdit = (prog: any) => {
    setActiveEdit(prog);
    setOverview(prog.overview || prog.description || "");
    setCurriculum(prog.curriculum || "");
    setAgeGroup(prog.age_group || prog.age_range || "");
    setHeadmaster(prog.headmaster || prog.principal_name || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEdit) return;
    setSaving(true);
    try {
      const res = await adminApi.updateProgram(activeEdit.id, {
        overview,
        curriculum,
        age_group: ageGroup,
        headmaster,
      });
      if (res.status === 200) {
        showToast("success", `Program ${activeEdit.name} berhasil diperbarui`);
        setActiveEdit(null);
        loadPrograms();
      } else {
        showToast("error", res.error || "Gagal memperbarui");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Jenjang Akademik">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight">
            Program Pendidikan Terpadu (TK – SMK)
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Perbarui deskripsi kurikulum, kepala sekolah, dan rentang usia untuk setiap jenjang pendidikan.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between ${toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
              }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}>
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-sm text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
              Memuat data jenjang pendidikan...
            </div>
          ) : (
            programs.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-blue-100 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-royal text-xs font-extrabold uppercase">
                      {item.level || item.slug}
                    </span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-royal hover:underline inline-flex items-center gap-1"
                    >
                      <span>Lihat Halaman</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h3 className="text-xl font-extrabold text-primary-950">
                    {item.name}
                  </h3>

                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <p>
                      <span className="text-slate-400 font-semibold">Usia:</span>{" "}
                      {item.age_group || item.age_range || "-"}
                    </p>
                    <p>
                      <span className="text-slate-400 font-semibold">
                        Kepala Sekolah:
                      </span>{" "}
                      {item.headmaster || item.principal_name || "-"}
                    </p>
                    <p>
                      <span className="text-slate-400 font-semibold">
                        Kurikulum:
                      </span>{" "}
                      {item.curriculum || "-"}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 pt-3 border-t border-slate-100">
                    {item.overview || item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-royal hover:text-white text-xs font-bold text-royal border border-blue-200 transition cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Informasi</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {activeEdit && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-lg w-full p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-royal" />
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Edit Program {activeEdit.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveEdit(null)}
                  className="text-slate-400 hover:text-primary-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                      Rentang Usia
                    </label>
                    <input
                      type="text"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      placeholder="Contoh: 7 - 12 Tahun"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                      Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      value={headmaster}
                      onChange={(e) => setHeadmaster(e.target.value)}
                      placeholder="Nama & Gelar"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                    Fokus Kurikulum
                  </label>
                  <input
                    type="text"
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    placeholder="Contoh: Kurikulum Merdeka + Trilingual"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                    Ringkasan Gambaran Program (Overview)
                  </label>
                  <textarea
                    rows={5}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveEdit(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
