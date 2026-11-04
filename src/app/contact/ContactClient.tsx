"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { useTenant } from "@/lib/tenantContext";
import { contactFormSchema } from "@/lib/validations";
import { Card, Badge } from "@/components/ui/DesignSystem";
import { publicApi } from "@/lib/api";

export function ContactClient() {
  const { tenant } = useTenant();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mathAnswer, setMathAnswer] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    targetUnit: tenant.id === "portal" ? "umum" : tenant.id,
    subject: "Informasi SPMB / Pendaftaran Siswa Baru",
    message: "",
    honeypot: "", // Anti-spam honeypot field (harus tetap kosong)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Validasi Zod Schema (Client-side + Honeypot)
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message || "Periksa kembali isian formulir Anda.");
      return;
    }

    // 2. Validasi Anti-Spam Sederhana
    if (mathAnswer.trim() !== "7") {
      setSubmitError("Jawaban verifikasi keamanan belum tepat (4 + 3 = 7).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await publicApi.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[Unit ${formData.targetUnit.toUpperCase()}] ${formData.subject}`,
        message: formData.message,
      });

      if (res.status === 201 || res.status === 200) {
        setSubmitted(true);
      } else {
        setSubmitError(res.error || "Gagal mengirimkan pesan. Silakan coba kembali.");
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-14">
      {/* 4 Kartu Informasi Kontak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-royal flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-primary-950">
              Alamat Kampus
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {tenant.contact.address}
            </p>
          </div>
          <span className="text-[11px] font-bold text-royal pt-2 border-t border-slate-100">
            Kampus Terpadu Pekanbaru, Riau
          </span>
        </Card>

        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-primary-950">
              Telepon & WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Kantor: <strong className="text-primary-950">{tenant.contact.phone}</strong>
              <br />
              WhatsApp:{" "}
              <strong className="text-emerald-700">
                {tenant.contact.whatsappFormatted}
              </strong>
            </p>
          </div>
          <a
            href={`https://wa.me/${tenant.contact.whatsapp}?text=${encodeURIComponent(
              tenant.contact.whatsappDefaultText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:underline pt-2 border-t border-slate-100"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Langsung via WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </Card>

        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-royal flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-primary-950">
              Surel Resmi
            </h3>
            <p className="text-xs sm:text-sm font-mono font-bold text-royal break-all">
              {tenant.contact.email}
            </p>
          </div>
          <span className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Balasan pada jam operasional kerja
          </span>
        </Card>

        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-primary-950">
              Jam Layanan TU & SPMB
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {tenant.contact.officeHours}
            </p>
          </div>
          <span className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Minggu & Hari Libur Nasional Tutup
          </span>
        </Card>
      </div>

      {/* Formulir & Peta Google Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <Card className="lg:col-span-7 p-8 sm:p-10 space-y-6">
          <div>
            <Badge variant="blue">Layanan Pesan Terpadu</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950 mt-2">
              Kirimkan Pertanyaan atau Jadwalkan Kunjungan
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Pesan Anda akan langsung masuk ke kotak masuk Portal Admin CMS Sekolah Dharma Loka dan ditindaklanjuti oleh tim sekretariat.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950">
                Pesan Anda Berhasil Diterima!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                Terima kasih telah menghubungi {tenant.name}. Staf sekretariat kami akan menghubungi Anda melalui WhatsApp atau email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ ...formData, message: "" });
                  setMathAnswer("");
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold cursor-pointer"
              >
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Anti-spam Honeypot (Tersembunyi dari pengguna manusia) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp-website">Jangan diisi</label>
                <input
                  id="hp-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) =>
                    setFormData({ ...formData, honeypot: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    Nama Lengkap Orang Tua / Pengirim *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Hendra Kusuma"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-slate-50/60 focus:bg-white text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="081275008899"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-slate-50/60 focus:bg-white text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="nama@email.com"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-slate-50/60 focus:bg-white text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-unit"
                    className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
                  >
                    Unit Jenjang Tujuan *
                  </label>
                  <select
                    id="contact-unit"
                    value={formData.targetUnit}
                    onChange={(e) =>
                      setFormData({ ...formData, targetUnit: e.target.value })
                    }
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                  >
                    <option value="umum">Sekretariat Yayasan (Umum)</option>
                    <option value="tk">Unit TK Dharma Loka</option>
                    <option value="sd">Unit SD Dharma Loka</option>
                    <option value="smp">Unit SMP Dharma Loka</option>
                    <option value="sma">Unit SMA Dharma Loka</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-msg"
                  className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5"
                >
                  Isi Pesan / Pertanyaan *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tuliskan pertanyaan Anda mengenai pendaftaran, jadwal kunjungan kampus, atau informasi lainnya..."
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-slate-50/60 focus:bg-white text-sm text-primary-950 focus:outline-none focus:ring-2 focus:ring-royal"
                />
              </div>

              {/* Verifikasi Keamanan Anti-Bot */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label
                  htmlFor="contact-captcha"
                  className="text-xs font-bold text-primary-950 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-royal" />
                  <span>Verifikasi Anti-Spam: Berapakah hasil dari 4 + 3 ? *</span>
                </label>
                <input
                  id="contact-captcha"
                  type="number"
                  required
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  placeholder="Ketik angka"
                  className="w-32 min-h-[40px] px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-sm font-extrabold text-primary-950 text-center focus:outline-none focus:ring-2 focus:ring-royal"
                />
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl bg-royal hover:bg-royal-dark text-white font-extrabold text-sm shadow-md shadow-royal/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitting ? "Mengirimkan Pesan..." : "Kirim Pesan Sekarang"}
                </span>
              </button>
            </form>
          )}
        </Card>

        {/* Peta Google Maps & Petunjuk Rute */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-primary-950">
              Peta Interaktif Lokasi Kampus
            </h3>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-blue-50 border border-blue-200">
              <iframe
                title="Peta Lokasi Sekolah Dharma Loka Pekanbaru"
                src={schoolInfo.address.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 space-y-1.5">
              <p className="font-extrabold text-primary-950">
                Petunjuk Arah Menuju Kampus:
              </p>
              <p>
                Terletak di kawasan strategis Jl. Tuanku Tambusai (Komp. Taman Anggrek / Pemancar TVRI), Kec. Payung Sekaki, Kota Pekanbaru. Tersedia area parkir luas untuk penjemputan orang tua murid.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
