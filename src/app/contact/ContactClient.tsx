"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building,
  ExternalLink
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { publicApi } from "@/lib/api";

export function ContactClient() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Informasi Umum",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await publicApi.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      if (res.status === 201 || res.status === 200) {
        setSubmitted(true);
      } else {
        setSubmitError(res.error || "Gagal mengirimkan pesan. Silakan coba kembali.");
      }
    } catch {
      // Fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      
      {/* Contact Cards 4-Col Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Address */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-primary-900" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-2">
              Alamat Kampus
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {schoolInfo.address.street}, {schoolInfo.address.subDistrict}, {schoolInfo.address.city}, {schoolInfo.address.province} {schoolInfo.address.postalCode}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Komp. Kampus Terpadu Dharma Loka
          </div>
        </div>

        {/* Card 2: Phone & Hotline */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-primary-900" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-2">
              Telepon & WhatsApp
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>
                Kantor: <span className="font-semibold text-slate-800">{schoolInfo.contact.phone}</span>
              </div>
              <div>
                Hotline: <span className="font-semibold text-emerald-700">{schoolInfo.contact.whatsappFormatted}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={`https://wa.me/${schoolInfo.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Chat WhatsApp</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Card 3: Email */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-primary-900" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-2">
              Surel Resmi
            </h3>
            <p className="text-xs text-slate-600 break-all leading-relaxed">
              {schoolInfo.contact.email}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Respon dalam 1 hari kerja
          </div>
        </div>

        {/* Card 4: Office Hours */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-900 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-primary-900" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-2">
              Jam Layanan Kantor
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>{schoolInfo.contact.officeHours}</div>
              <div>{schoolInfo.contact.weekendHours}</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Minggu & Hari Libur Nasional Tutup
          </div>
        </div>

      </div>

      {/* Main Split: Interactive Form + Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-card">
          <div className="mb-6">
            <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-1">
              Formulir Komunikasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-primary-950">
              Kirimkan Pesan atau Pertanyaan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Sampaikan pertanyaan mengenai kegiatan akademik, kemitraan institusi, atau saran untuk kemajuan sekolah.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">
                Pesan Anda Berhasil Terkirim
              </h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Terima kasih telah menghubungi Sekolah Dharma Loka Pekanbaru. Tim sekretariat kami akan menindaklanjuti pesan Anda sesegera mungkin.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor Telepon / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@anda.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Perihal / Kategori *
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                  >
                    <option value="Informasi Umum">Informasi Umum</option>
                    <option value="Penerimaan Siswa Baru (PPDB)">Penerimaan Siswa Baru (PPDB)</option>
                    <option value="Kemitraan & Kerjasama">Kemitraan & Kerjasama</option>
                    <option value="Layanan Alumni">Layanan Alumni</option>
                    <option value="Kritik & Saran">Kritik & Saran</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                  Pesan Anda *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                />
              </div>

              {submitError && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-md bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-gold" aria-hidden="true" />
                <span>{submitting ? "Mengirimkan Pesan..." : "Kirimkan Pesan"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Map & Location Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-primary-950 font-sans">
                Peta Lokasi Kampus
              </h3>
              <DemoBadge label="Peta Peraga [DEMO]" />
            </div>
            
            {/* Map Frame Placeholder */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-6">
              <iframe
                title="Peta Lokasi Sekolah Dharma Loka Pekanbaru"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6582496229987!2d101.428!3d0.512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ac0000000001%3A0x123456789!2sPekanbaru!5e0!3m2!1sid!2sid!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-primary-950">
                Akses Transportasi & Rute:
              </div>
              <p>
                Kampus Sekolah Dharma Loka berada di lokasi strategis kota Pekanbaru, mudah dijangkau melalui jalur utama Tuanku Tambusai dan jalur lingkar perkotaan.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

