"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import { useAuth } from "@/lib/authContext";
import { 
  UserCheck, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2, 
  Shield, 
  ShieldAlert,
  Key
} from "lucide-react";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("school_admin");

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers();
      if (res.status === 200 && res.data) {
        setUsers(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast("error", "Semua kolom wajib diisi.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await adminApi.createUser({
        name,
        email,
        password,
        role,
        is_active: true,
      });

      if (res.status === 201 || res.status === 200) {
        showToast("success", "Pengguna baru berhasil didaftarkan");
        setModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        loadUsers();
      } else {
        showToast("error", res.error || "Gagal membuat pengguna");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    if (deleteModal.id === currentUser?.id) {
      showToast("error", "Anda tidak dapat menghapus akun Anda sendiri.");
      setDeleteModal(null);
      return;
    }

    setSubmitting(true);
    try {
      const res = await adminApi.deleteUser(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Pengguna berhasil dihapus");
        setDeleteModal(null);
        loadUsers();
      } else {
        showToast("error", res.error || "Gagal menghapus pengguna");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Pengguna & Staf" requiredRole={["super_admin"]}>
      <div className="space-y-6">
        
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-primary-950 tracking-tight">Daftar Akun Pengelola (Staff CMS)</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Pengaturan hak akses role-based: Super Admin, School Admin, dan Editor.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-xs sm:text-sm shadow-sm shadow-blue-900/10 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Staff Baru</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between ${
            toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <div className="flex items-center gap-2.5">
              {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)}><X className="w-4 h-4 text-slate-400 hover:text-slate-600" /></button>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-blue-50/60 text-[11px] uppercase tracking-wider text-slate-600 border-b border-blue-100 font-bold">
                <tr>
                  <th className="py-3.5 px-5">Nama Staff</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5">Role Akses</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5">Dibuat Pada</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
                      Memuat daftar staf pengelola...
                    </td>
                  </tr>
                ) : (
                  users.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition">
                      <td className="py-4 px-5 font-bold text-primary-950">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-extrabold text-royal">
                            {(item.name || "ST").substring(0, 2).toUpperCase()}
                          </div>
                          <span>{item.name}</span>
                          {item.id === currentUser?.id && (
                            <span className="text-[10px] bg-blue-50 text-royal px-2 py-0.5 rounded-md border border-blue-200 font-bold">
                              Anda
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-5 text-xs font-mono text-slate-600">
                        {item.email}
                      </td>

                      <td className="py-4 px-5 text-xs">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.role?.name === "super_admin" || item.role === "super_admin"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : item.role?.name === "school_admin" || item.role === "school_admin"
                            ? "bg-blue-50 text-royal border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          <Shield className="w-3 h-3" />
                          <span>{item.role?.name || item.role}</span>
                        </span>
                      </td>

                      <td className="py-4 px-5 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Aktif
                        </span>
                      </td>

                      <td className="py-4 px-5 text-xs font-mono text-slate-500">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>

                      <td className="py-4 px-5 text-right">
                        {item.id !== currentUser?.id && (
                          <button
                            onClick={() => setDeleteModal(item)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Hapus Staff"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-royal" />
                  <h3 className="text-base font-extrabold text-primary-950">Tambah Staff Pengelola Baru</h3>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Staf / Admin"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@dharmaloka.sch.id"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Password Awal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Hak Akses (Role)
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                  >
                    <option value="school_admin">School Admin (Kelola Berita, Pengumuman, PPDB, Konten)</option>
                    <option value="editor">Editor (Hanya Tulis & Edit Berita/Pengumuman)</option>
                    <option value="super_admin">Super Admin (Akses Penuh termasuk Pengguna & Pengaturan)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold transition flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>Daftarkan Staff</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-primary-950">Hapus Akun Staff</h3>
              </div>
              <p className="text-xs text-slate-600">
                Hapus akun staf <strong>{deleteModal.name}</strong> ({deleteModal.email})? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setDeleteModal(null)} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700">
                  Batal
                </button>
                <button onClick={handleDelete} className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

