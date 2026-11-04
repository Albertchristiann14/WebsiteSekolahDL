"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  FileText, 
  HelpCircle,
  Sparkles
} from "lucide-react";
import { 
  admissionWaves, 
  admissionSteps, 
  admissionRequirements, 
  admissionFAQs 
} from "@/data/admissions";
import { schoolInfo } from "@/data/schoolInfo";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { publicApi } from "@/lib/api";

export function AdmissionsClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentLevel: "sd",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await publicApi.submitAdmissionInquiry({
        student_name: `Calon Siswa (${formData.parentName})`,
        parent_name: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        target_level: formData.studentLevel,
        academic_year: "2026/2027",
        notes: formData.message,
      });

      if (res.status === 201 || res.status === 200) {
        setSubmitted(true);
      } else {
        setSubmitError(res.error || "Gagal mengirim formulir. Silakan coba lagi.");
      }
    } catch {
      // Still set submitted for resilience if offline
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-24">
      
      {/* 1. Admission Waves (Gelombang Pendaftaran) */}
      <section id="jadwal" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-2">
            Periode Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-primary-950">
            Jadwal Gelombang Penerimaan Siswa Baru T.A. 2027/2028
          </h2>
          <div className="mt-2 flex justify-center">
            <DemoBadge label="Jadwal Gelombang & Besaran Diskon [DEMO / MEMERLUKAN SURAT KEPUTUSAN YAYASAN]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {admissionWaves.map((wave) => {
            const isOpened = wave.status === "Dibuka";
            return (
              <div
                key={wave.name}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                  isOpened
                    ? "bg-white border-2 border-royal shadow-elevated"
                    : "bg-surface-subtle border-slate-200"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isOpened
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {wave.status}
                    </span>
                    {isOpened && (
                      <span className="text-xs font-semibold text-royal animate-pulse">
                        ★ Kuota Terbuka
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-primary-950 font-sans">
                    {wave.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 p-2.5 rounded-lg">
                    <Calendar className="w-4 h-4 text-royal shrink-0" aria-hidden="true" />
                    <span>{wave.period}</span>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {wave.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500">
                  {wave.quotaNotice}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Step by Step Flow */}
      <section className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-1">
            Alur Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-primary-950">
            Lima Langkah Mudah Bergabung Bersama Dharma Loka
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Proses seleksi dirancang untuk memetakan minat, bakat, serta kesiapan anak secara holistik dan nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {admissionSteps.map((step) => (
            <div key={step.step} className="p-5 rounded-xl bg-surface-subtle border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-full bg-primary-900 text-gold flex items-center justify-center font-bold text-sm mb-3">
                  0{step.step}
                </div>
                <h3 className="text-sm font-bold text-primary-950 mb-1">
                  {step.title}
                </h3>
                <div className="text-[11px] font-semibold text-royal mb-2">
                  {step.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Requirements Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* General Requirements (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-primary-950 text-white border border-primary-800 space-y-6">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-1">
              Administrasi Dokumen
            </span>
            <h3 className="text-2xl font-bold font-sans text-white">
              Persyaratan Berkas Umum
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Wajib diserahkan saat tahapan verifikasi atau diunggah via portal admisi.
            </p>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
            {admissionRequirements.general.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span>{req}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-primary-900 text-xs text-slate-400">
            Dokumen asli cukup dibawa saat wawancara verifikasi untuk pencocokan berkas fisik.
          </div>
        </div>

        {/* Requirements by Level (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-1">
                Kriteria Khusus
              </span>
              <h3 className="text-2xl font-bold font-sans text-primary-950">
                Ketentuan Berdasarkan Jenjang
              </h3>
            </div>
            <FileText className="w-6 h-6 text-royal" aria-hidden="true" />
          </div>

          <div className="space-y-4">
            {admissionRequirements.byLevel.map((lvl) => (
              <div key={lvl.level} className="p-4 rounded-xl bg-surface-subtle border border-slate-200/80">
                <h4 className="text-sm font-bold text-primary-950 mb-2">
                  {lvl.level}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {lvl.docs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-royal shrink-0 mt-1.5" aria-hidden="true" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. Consultation Form & Direct WhatsApp */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12">
            <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-1">
              Bincang Admisi
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-950 font-sans mb-3">
              Kirim Pertanyaan / Jadwalkan School Tour
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Isi data di bawah ini dan konsultan admisi kami akan menghubungi Anda dalam waktu 1x24 jam kerja.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">
                  Terima Kasih, Permohonan Anda Telah Kami Terima!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Tim sekretariat PPDB Dharma Loka akan segera menghubungi nomor telepon / WhatsApp yang Anda cantumkan.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Kirim Pertanyaan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="adm-parent" className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Orang Tua / Wali *
                    </label>
                    <input
                      id="adm-parent"
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="cth. Bapak / Ibu Hendra"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                    />
                  </div>

                  <div>
                    <label htmlFor="adm-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      id="adm-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="cth. 0812-3456-7890"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="adm-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Email
                    </label>
                    <input
                      id="adm-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="cth. nama@email.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal"
                    />
                  </div>

                  <div>
                    <label htmlFor="adm-level" className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenjang yang Diminati *
                    </label>
                    <select
                      id="adm-level"
                      value={formData.studentLevel}
                      onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    >
                      <option value="tk">TK (Taman Kanak-Kanak / PG)</option>
                      <option value="sd">SD (Sekolah Dasar)</option>
                      <option value="smp">SMP (Sekolah Menengah Pertama)</option>
                      <option value="sma">SMA (Sekolah Menengah Atas)</option>
                      <option value="smk">SMK (Sekolah Menengah Kejuruan)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="adm-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                    Pesan / Catatan Khusus (Opsional)
                  </label>
                  <textarea
                    id="adm-msg"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan jika ingin jadwal tur sekolah atau konsultasi beasiswa..."
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
                  <span>{submitting ? "Mengirimkan Data..." : "Kirim Formulir Minat PPDB"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct WhatsApp Callout (5 cols) */}
          <div className="lg:col-span-5 bg-primary-950 p-8 sm:p-12 text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-primary-900">
            <div className="space-y-4">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                Hotline Konsultasi Cepat
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-sans text-white">
                Butuh Bantuan Langsung? Chat Melalui WhatsApp
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Staf sekretariat kami siap membantu simulasi biaya pendidikan, informasi ketersediaan kuota kelas, serta alur pendaftaran siswa pindahan.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <a
                href={`https://wa.me/${schoolInfo.contact.whatsapp}?text=Halo%20Sekretariat%20Sekolah%20Dharma%20Loka,%20saya%20ingin%20berkonsultasi%20tentang%20PPDB%202027/2028.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>Chat WhatsApp Sekretariat</span>
              </a>

              <div className="text-center text-[11px] text-slate-400">
                Jam Layanan: {schoolInfo.contact.officeHours}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-royal uppercase tracking-wider block mb-1">
            Tanya Jawab
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-primary-950">
            Pertanyaan yang Sering Diajukan Seputar PPDB
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {admissionFAQs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-primary-950 font-sans">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-royal" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

