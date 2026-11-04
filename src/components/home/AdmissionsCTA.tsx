import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";

export function AdmissionsCTA() {
  return (
    <section className="py-20 lg:py-24 bg-primary-950 text-white relative overflow-hidden" aria-label="Ajakan Pendaftaran PPDB">
      {/* Decorative radial accents */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-royal/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-2xl bg-gradient-to-r from-primary-900 to-primary-950 border border-gold/30 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold-light text-xs font-semibold tracking-wide border border-gold/30">
                <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                <span>Penerimaan Siswa Baru T.A. 2027 / 2028</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
                Mulai Perjalanan Emas Putra-Putri Anda Bersama{" "}
                <span className="font-serif italic font-normal text-gold-light">
                  Dharma Loka
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Temukan kehangatan komunitas pembelajar kami. Pendaftaran Gelombang Early Bird kini telah dibuka dengan kuota terbatas dan keringanan biaya pembangunan.
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  <span>Jalur Prestasi Akademik & Beasiswa Bakat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  <span>Jadwal School Tour & Konsultasi Tatap Muka</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  <span>Pendidikan Terpadu TK hingga SMA/SMK</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  <span>Kurikulum Trilingual & Riset Abad 21</span>
                </div>
              </div>

            </div>

            {/* Right Action Box (Col 4) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Pendaftaran & Konsultasi
              </div>
              <div className="text-xl font-bold text-primary-950 font-sans leading-snug">
                Siap Melangkah Bersama Kami?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tim sekretariat admisi kami siap menjawab pertanyaan seputar program, biaya, dan alur pendaftaran.
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href="/admissions"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <span>Buka Halaman Admisi</span>
                  <ArrowRight className="w-4 h-4 text-gold" aria-hidden="true" />
                </Link>

                <a
                  href={`https://wa.me/${schoolInfo.contact.whatsapp}?text=Halo%20Sekretariat%20Sekolah%20Dharma%20Loka,%20saya%20ingin%20berkonsultasi%20mengenai%20pendaftaran%20siswa%20baru.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Konsultasi WhatsApp (Chat Langsung)</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1">
                Layanan hotline aktif pada jam kerja kantor sekolah
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

