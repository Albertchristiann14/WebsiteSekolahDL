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
  Phone, 
  Clock, 
  Send
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
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

    // If unread, mark read in background
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
            <h2 className="text-xl font-bold text-white tracking-tight">Pesan & Pertanyaan Masuk</h2>
            <p className="text-xs text-slate-400">
              Pertanyaan umum dan formulir kontak yang dikirim oleh masyarakat atau orang tua murid.
            </p>
          </div>
          <button
            onClick={loadMessages}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition self-start sm:self-auto flex items-center gap-2 text-xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>
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

        {/* Filter and Search */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form 
            onSubmit={(e) => { e.preventDefault(); loadMessages(); }} 
            className="flex-1 w-full flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Cari pengirim, email, atau subjek..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-slate-700"
            >
              Cari
            </button>
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="all">Semua Status</option>
            <option value="unread">Belum Dibaca</option>
            <option value="read">Sudah Dibaca</option>
            <option value="replied">Sudah Dibalas</option>
          </select>
        </div>

        {/* Messages List Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800/80">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold" />
                Memuat pesan masuk...
              </div>
            ) : messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Tidak ada pesan yang ditemukan.
              </div>
            ) : (
              messages.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenMessage(item)}
                  className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition ${
                    item.status === "unread" 
                      ? "bg-slate-800/40 hover:bg-slate-800/70" 
                      : "hover:bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-1">
                      {item.status === "unread" ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-gold block" />
                      ) : (
                        <Mail className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm ${item.status === "unread" ? "font-bold text-white" : "font-medium text-slate-200"}`}>
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{item.email}</span>
                        {item.phone && (
                          <span className="text-xs text-slate-400">({item.phone})</span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${item.status === "unread" ? "font-semibold text-slate-100" : "text-slate-300"}`}>
                        {item.subject}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-xl mt-0.5">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      item.status === "unread"
                        ? "bg-gold/10 text-gold border-gold/30"
                        : item.status === "replied"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}>
                      {item.status === "unread" ? "Belum Dibaca" : item.status === "replied" ? "Sudah Dibalas" : "Dibaca"}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
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
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  <h3 className="text-base font-bold text-white">Detail Pesan Kontak</h3>
                </div>
                <button onClick={() => setActiveMessage(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pengirim:</span>
                  <span className="font-semibold text-white">{activeMessage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${activeMessage.email}`} className="text-gold hover:underline">
                    {activeMessage.email}
                  </a>
                </div>
                {activeMessage.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Telepon / WhatsApp:</span>
                    <a 
                      href={`https://wa.me/${activeMessage.phone.replace(/^0/, "62").replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      {activeMessage.phone}
                    </a>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Subjek:</span>
                  <span className="text-slate-200 font-medium">{activeMessage.subject}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Isi Pesan
                </label>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Catatan Tindak Lanjut / Respon Staff
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Contoh: Sudah dijawab via email tgl 4 Nov terkait rincian beasiswa prestasi."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setDeleteModal(activeMessage)}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Pesan</span>
                </button>

                <div className="flex items-center gap-2">
                  <select
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5"
                  >
                    <option value="read">Tandai Dibaca</option>
                    <option value="replied">Tandai Sudah Dibalas</option>
                  </select>
                  <button
                    onClick={handleSaveStatus}
                    disabled={saving}
                    className="px-4 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-primary-950 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Hapus Pesan</h3>
              </div>
              <p className="text-xs text-slate-300">
                Yakin ingin menghapus pesan dari <strong>{deleteModal.name}</strong>?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setDeleteModal(null)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300">
                  Batal
                </button>
                <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-semibold text-white">
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

