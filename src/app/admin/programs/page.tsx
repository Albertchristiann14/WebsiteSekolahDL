"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { 
  GraduationCap, 
  Edit, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2, 
  BookOpen, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEdit, setActiveEdit] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
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
    setOverview(prog.overview || "");
    setCurriculum(prog.curriculum || "");
    setAgeGroup(prog.age_group || "");
    setHeadmaster(prog.headmaster || "");
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
          <h2 className="text-xl font-bold text-white tracking-tight">Program Pendidikan Terpadu</h2>
          <p className="text-xs text-slate-400">
            Perbarui deskripsi kurikulum, kepala sekolah, dan rentang usia per jenjang (TK, SD, SMP, SMA, SMK).
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`p-4 rounded-xl border text-sm flex items-center justify-between ${
            toast.type === "success" ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300" : "bg-red-950/80 border-red-500/50 text-red-300"
          }`}>
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold" />
              Memuat data jenjang pendidikan...
            </div>
          ) : (
            programs.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-primary-900/80 border border-gold/40 text-gold-light text-xs font-bold font-mono uppercase">
                      {item.level}
                    </span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <span>Lihat Halaman</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.name}</h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p><span className="text-slate-500 font-medium">Usia:</span> {item.age_group || "-"}</p>
                    <p><span className="text-slate-500 font-medium">Kepsek:</span> {item.headmaster || "-"}</p>
                    <p><span className="text-slate-500 font-medium">Kurikulum:</span> {item.curriculum || "-"}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 pt-2 border-t border-slate-800">
                    {item.overview}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-gold" />
                    <span>Edit Informasi</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {activeEdit && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gold" />
                  <h3 className="text-base font-bold text-white">Edit Program {activeEdit.name}</h3>
                </div>
                <button onClick={() => setActiveEdit(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Rentang Usia
                    </label>
                    <input
                      type="text"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      placeholder="Contoh: 7 - 12 Tahun"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      value={headmaster}
                      onChange={(e) => setHeadmaster(e.target.value)}
                      placeholder="Nama & Gelar"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Fokus Kurikulum
                  </label>
                  <input
                    type="text"
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    placeholder="Contoh: Kurikulum Merdeka + Cambridge Prep + Mandarin"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Ringkasan Gambaran Program (Overview)
                  </label>
                  <textarea
                    rows={5}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveEdit(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-gold hover:bg-gold-light text-primary-950 text-xs font-bold transition flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
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

