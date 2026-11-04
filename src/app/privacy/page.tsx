"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Calendar,
  Send,
  Eye,
  Trash2,
  Edit,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [requestType, setRequestType] = useState<"access" | "rectification" | "erasure">("access");
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [nik, setNik] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission of Data Subject Request (DSR) under UU PDP
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-royal transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Sekolah</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Patuh UU PDP No. 27/2022
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 py-12 px-4 sm:px-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-royal text-white shadow-lg shadow-royal/20 mb-2">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kebijakan Privasi & Pelindungan Data Pribadi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Yayasan Pendidikan Dharma Loka berkomitmen penuh melindungi hak privasi anak dan orang tua/wali murid sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
          </p>
          <p className="text-xs font-bold text-slate-400">
            Terakhir Diperbarui: 4 November 2026 • Versi Dokumen: 2.1-PDP (Dharma Loka Legal)
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Ringkasan Hak Anda */}
        <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200/80 space-y-3">
          <h2 className="text-base font-extrabold text-royal flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-royal" />
            <span>Pernyataan Komitmen Utama Sekolah</span>
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Data anak Anda (NIK, scan Akta Kelahiran, Kartu Keluarga, dan rapor) diklasifikasikan sebagai <strong>Data Pribadi Spesifik</strong>. Kami menyimpannya di server terenkripsi (AES-256), tidak pernah menjualnya kepada pihak ketiga mana pun, dan hanya menggunakannya untuk proses administratif pendaftaran siswa resmi.
          </p>
        </div>

        {/* 1. Data yang Dikumpulkan */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-royal/10 text-royal font-black flex items-center justify-center text-xs">1</span>
            <span>Data Apa Saja yang Kami Kumpulkan?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black uppercase text-royal">A. Data Pribadi Umum</span>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Nama lengkap siswa dan nama orang tua/wali</li>
                <li>Tempat dan tanggal lahir siswa</li>
                <li>Alamat domisili dan kota asal sekolah</li>
                <li>Nomor WhatsApp orang tua dan alamat surel (email)</li>
                <li>Pekerjaan ayah dan ibu</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <span className="text-xs font-black uppercase text-rose-700">B. Data Pribadi Spesifik (Ketat)</span>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Nomor Induk Kependudukan (NIK) siswa & orang tua</li>
                <li>Nomor Kartu Keluarga (KK) dan NISN</li>
                <li>Scan berkas fisik Akta Lahir & Kartu Keluarga</li>
                <li>Catatan kesehatan khusus / alergi siswa</li>
                <li>Rentang penghasilan bulanan orang tua</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Tujuan Penggunaan */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-royal/10 text-royal font-black flex items-center justify-center text-xs">2</span>
            <span>Untuk Apa Data Tersebut Digunakan?</span>
          </h2>
          <ul className="text-sm text-slate-600 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Verifikasi Administrasi SPMB:</strong> Memastikan identitas calon siswa valid dan memenuhi syarat usia jenjang pendidikan terkait.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pendaftaran DAPODIK Kemendikbud:</strong> Sinkronisasi nomor induk siswa nasional saat siswa resmi diterima.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Komunikasi & Keamanan Siswa:</strong> Menghubungi orang tua terkait jadwal tes, pengumuman hasil seleksi, dan penanganan darurat di sekolah.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Rekonsiliasi Keuangan:</strong> Validasi pembayaran uang formulir dan uang pangkal melalui gerbang pembayaran terdaftar (Midtrans).</span>
            </li>
          </ul>
        </div>

        {/* 3. Hak Pemilik Data */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-royal/10 text-royal font-black flex items-center justify-center text-xs">3</span>
            <span>Hak-Hak Anda sebagai Orang Tua / Wali Murid (Pasal 5-13 UU PDP)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <Eye className="w-5 h-5 text-royal" />
              <h3 className="text-xs font-bold text-slate-900">Hak Akses & Salinan Data</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anda berhak meminta salinan data rekam pendaftaran anak Anda kapan saja.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <Edit className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900">Hak Pembaruan / Koreksi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Berhak memperbarui data jika terdapat kesalahan ejaan nama, NIK, atau alamat.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <Trash2 className="w-5 h-5 text-rose-600" />
              <h3 className="text-xs font-bold text-slate-900">Hak Penghapusan Data</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Berhak meminta penghapusan berkas jika membatalkan pendaftaran (*Right to Erasure*).
              </p>
            </div>
          </div>
        </div>

        {/* 4. Formulir Pengajuan Hak Subjek Data */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-royal" />
              <span>Formulir Permintaan Hak Pemilik Data Pribadi</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gunakan formulir ini jika Anda ingin mengajukan permintaan salinan data, koreksi informasi, atau penghapusan berkas anak Anda.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-extrabold text-emerald-950">
                Permintaan Berhasil Diterima oleh Petugas DPO Sekolah
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                Permohonan Anda tercatat dengan nomor tiket <strong>#DSR-{Date.now().toString().slice(-6)}</strong>. Tim Pelindungan Data Pribadi Sekolah Dharma Loka akan memverifikasi identitas Anda via WhatsApp dalam 1x24 jam kerja sesuai ketentuan UU PDP.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-900 underline mt-2"
              >
                Kirim Permohonan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRequestType("access")}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    requestType === "access"
                      ? "bg-royal text-white border-royal shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Minta Salinan Data</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType("rectification")}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    requestType === "rectification"
                      ? "bg-royal text-white border-royal shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Koreksi / Revisi Data</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType("erasure")}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    requestType === "erasure"
                      ? "bg-rose-600 text-white border-rose-600 shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Penghapusan Berkas</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Nama Lengkap Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Sesuai KTP"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Nama Calon Siswa *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Sesuai Akta Lahir"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    NIK Siswa (16 Digit) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="3201..."
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Nomor WhatsApp Terdaftar *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="081234567890"
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-royal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Rincian Permohonan / Alasan
                </label>
                <textarea
                  rows={3}
                  required
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Jelaskan bagian data yang ingin dikoreksi atau alasan penghapusan berkas..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-royal"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Demi keamanan data anak, kami akan melakukan verifikasi identitas (mencocokkan KTP orang tua dan Kartu Keluarga) sebelum memproses permohonan ini.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-sm shadow-md shadow-royal/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Permohonan Resmi ke DPO Sekolah</span>
              </button>
            </form>
          )}
        </div>

        {/* 5. Kontak Pengelola Data (DPO) */}
        <div className="bg-slate-100 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-royal" />
            <span>Kontak Petugas Pelindungan Data (Data Protection Officer / DPO)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-900">Surel Resmi DPO</p>
              <p className="text-royal font-mono mt-0.5">dpo@dharmaloka.sch.id</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Saluran Konsultasi Privasi</p>
              <p className="font-mono mt-0.5">+62 811-7588-881</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Kantor Sekretariat</p>
              <p className="mt-0.5 text-xs text-slate-600">Jl. Tuanku Tambusai, Pekanbaru, Riau</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Yayasan Pendidikan Dharma Loka Pekanbaru. Seluruh hak cipta dilindungi undang-undang.</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Kepatuhan Regulasi: UU PDP No. 27/2022 • Permendikbudristek No. 1/2021 • Standar Kriptografi ISO/IEC 27001
        </p>
      </footer>
    </div>
  );
}
