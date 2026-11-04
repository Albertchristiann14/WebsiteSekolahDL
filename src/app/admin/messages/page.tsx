"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/api";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeMessage, setActiveMessage] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [replyStatus, setReplyStatus] = useState("replied");
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState<any | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getMessages({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search || undefined,
      });
      if (res.status === 200 && res.data) {
        setMessages(res.data);
      }
    } catch (err: any) {
      showToast("error", err.message || "Gagal memuat pesan masuk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [statusFilter]);

  const handleOpenMessage = async (msg: any) => {
    setActiveMessage(msg);
    setAdminNotes(msg.admin_notes || "");
    setReplyStatus(msg.status === "unread" ? "read" : msg.status);

    if (msg.status === "unread") {
      try {
        await adminApi.updateMessageStatus(msg.id, { status: "read" });
        msg.status = "read";
      } catch {}
    }
  };

  const handleSaveStatus = async () => {
    if (!activeMessage) return;
    setSaving(true);
    try {
      const res = await adminApi.updateMessageStatus(activeMessage.id, {
        status: replyStatus,
        admin_notes: adminNotes,
      });
      if (res.status === 200) {
        showToast("success", "Status pesan berhasil diperbarui");
        setActiveMessage(null);
        loadMessages();
      } else {
        showToast("error", res.error || "Gagal menyimpan");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setSaving(true);
    try {
      const res = await adminApi.deleteMessage(deleteModal.id);
      if (res.status === 200) {
        showToast("success", "Pesan berhasil dihapus");
        setDeleteModal(null);
        if (activeMessage?.id === deleteModal.id) setActiveMessage(null);
        loadMessages();
      } else {
        showToast("error", res.error || "Gagal menghapus");
      }
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Kotak Pesan Masuk (Kontak)">
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-primary-950 tracking-tight">
              Pesan & Pertanyaan Masuk
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Pertanyaan umum dan formulir kontak yang dikirim oleh orang tua murid atau masyarakat.
            </p>
          </div>
          <button
            onClick={loadMessages}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-royal font-bold border border-blue-200 transition self-start sm:self-auto flex items-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between ${
              toast.type === "success"
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

        {/* Filter and Search */}
        <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadMessages();
            }}
            className="flex-1 w-full flex items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pengirim, email, atau subjek..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-royal hover:bg-royal-dark text-white rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              Cari
            </button>
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-royal"
          >
            <option value="all">Semua Status</option>
            <option value="unread">Belum Dibaca</option>
            <option value="read">Sudah Dibaca</option>
            <option value="replied">Sudah Dibalas</option>
          </select>
        </div>

        {/* Messages List */}
        <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="py-14 text-center text-sm text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-royal" />
                Memuat pesan masuk...
              </div>
            ) : messages.length === 0 ? (
              <div className="py-14 text-center text-sm text-slate-500">
                Tidak ada pesan yang ditemukan.
              </div>
            ) : (
              messages.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenMessage(item)}
                  className={`p-5 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition ${
                    item.status === "unread"
                      ? "bg-blue-50/40 hover:bg-blue-50/80"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="mt-1">
                      {item.status === "unread" ? (
                        <span className="w-3 h-3 rounded-full bg-royal block" />
                      ) : (
                        <Mail className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-base ${
                            item.status === "unread"
                              ? "font-extrabold text-primary-950"
                              : "font-bold text-slate-700"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-medium text-royal">
                          {item.email}
                        </span>
                        {item.phone && (
                          <span className="text-xs text-slate-500">
                            ({item.phone})
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          item.status === "unread"
                            ? "font-bold text-primary-950"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {item.subject}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate max-w-xl mt-0.5">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                        item.status === "unread"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : item.status === "replied"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {item.status === "unread"
                        ? "Belum Dibaca"
                        : item.status === "replied"
                        ? "Sudah Dibalas"
                        : "Dibaca"}
                    </span>
                    <span className="text-slate-400 font-medium text-xs">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail Modal */}
        {activeMessage && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-xl w-full p-7 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-royal" />
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Detail Pesan Kontak
                  </h3>
                </div>
                <button
                  onClick={() => setActiveMessage(null)}
                  className="text-slate-400 hover:text-primary-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pengirim:</span>
                  <span className="font-bold text-primary-950">
                    {activeMessage.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-royal font-bold hover:underline"
                  >
                    {activeMessage.email}
                  </a>
                </div>
                {activeMessage.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Telepon / WhatsApp:</span>
                    <a
                      href={`https://wa.me/${activeMessage.phone
                        .replace(/^0/, "62")
                        .replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {activeMessage.phone}
                    </a>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Subjek:</span>
                  <span className="text-primary-950 font-bold">
                    {activeMessage.subject}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Isi Pesan
                </label>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-primary-950 leading-relaxed whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-primary-950 mb-1.5">
                  Catatan Tindak Lanjut / Respon Staf
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Contoh: Sudah dijawab via WhatsApp/Email terkait jadwal kunjungan kampus."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDeleteModal(activeMessage)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Pesan</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <select
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold text-primary-950 rounded-xl px-3 py-2"
                  >
                    <option value="read">Tandai Dibaca</option>
                    <option value="replied">Tandai Sudah Dibalas</option>
                  </select>
                  <button
                    onClick={handleSaveStatus}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-100 rounded-3xl max-w-sm w-full p-7 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-extrabold text-primary-950">
                  Hapus Pesan
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                Yakin ingin menghapus pesan dari{" "}
                <strong className="text-primary-950">{deleteModal.name}</strong>
                ?
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white cursor-pointer"
                >
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
