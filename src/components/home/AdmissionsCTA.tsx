import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, CalendarCheck, FileCheck2 } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";

export function AdmissionsCTA() {
  return (
    <section
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="admissions-cta-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-royal via-royal to-blue-800 text-white p-8 sm:p-14 lg:p-20 shadow-2xl shadow-royal/15 overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Penerimaan Peserta Didik Baru (PPDB) T.A. 2026/2027</span>
              </div>

              <h2
                id="admissions-cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18]"
              >
                Mari Rencanakan Masa Depan Pendidikan Putra-Putri Anda Bersama Kami.
              </h2>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
                Kami mengundang Bapak/Ibu Orang Tua untuk mengunjungi kampus Sekolah Dharma Loka Pekanbaru, melihat langsung suasana kelas, dan berkonsultasi dengan tim akademik kami mengenai jenjang TK, SD, SMP, SMA, maupun SMK.
              </p>

              {/* Step Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
                  <CalendarCheck className="w-6 h-6 text-white mb-2.5" />
                  <div className="text-base font-bold text-white">1. Kunjungan Kampus</div>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">
                    Jadwalkan tur fasilitas bersama keluarga
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
                  <FileCheck2 className="w-6 h-6 text-white mb-2.5" />
                  <div className="text-base font-bold text-white">2. Pendaftaran Mudah</div>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">
                    Isi formulir secara daring atau di sekolah
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
                  <PhoneCall className="w-6 h-6 text-white mb-2.5" />
                  <div className="text-base font-bold text-white">3. Konsultasi Ramah</div>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">
                    Didampingi langsung oleh panitia PPDB
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-primary-950 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-royal">
                    Layanan Informasi Orang Tua
                  </span>
                  <h3 className="text-2xl font-extrabold text-primary-950 mt-1">
                    Pendaftaran & Konsultasi PPDB
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    Dapatkan rincian kurikulum, jadwal gelombang pendaftaran, dan persyaratan berkas untuk setiap jenjang.
                  </p>
                </div>

                <div className="space-y-3.5 pt-1">
                  <Link
                    href="/admissions"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold text-base shadow-md shadow-royal/20 transition-all"
                  >
                    <span>Buka Formulir & Panduan PPDB</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <a
                    href={`https://wa.me/${schoolInfo.contact.whatsapp}?text=${encodeURIComponent(
                      "Halo Panitia PPDB Sekolah Dharma Loka Pekanbaru, saya ingin berkonsultasi mengenai pendaftaran siswa baru."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-royal font-bold text-base border border-blue-200 transition-colors"
                  >
                    <PhoneCall className="w-5 h-5 text-royal" />
                    <span>Hubungi WhatsApp Panitia PPDB</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 flex items-center justify-between">
                  <span>Jam Layanan Sekretariat:</span>
                  <span className="font-bold text-primary-900">
                    Senin – Sabtu (07.15 – 15.30 WIB)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
