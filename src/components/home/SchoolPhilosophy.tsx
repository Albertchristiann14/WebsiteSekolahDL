import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Heart, Shield, Globe } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SchoolPhilosophy() {
  const valueIcons = [Compass, Heart, Shield, Globe];

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="philosophy-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Layered Photography and Motto Emblem (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Primary Image */}
              <div className="relative rounded-xl overflow-hidden shadow-elevated border border-slate-200 aspect-[4/5] bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Aktivitas pembelajaran penuh kehangatan dan interaksi guru-murid di Sekolah Dharma Loka"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Offset Decorative Editorial Pullquote Box */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-8 p-6 rounded-xl bg-primary-950 text-white shadow-2xl border-2 border-gold/30 max-w-sm">
                <div className="font-serif italic text-gold text-lg sm:text-xl leading-snug">
                  "{schoolInfo.motto}"
                </div>
                <div className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {schoolInfo.mottoTranslation}
                </div>
                <div className="mt-4 pt-3 border-t border-primary-900 text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
                  Filosofi Pembinaan Insan
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeader
              tag="Tentang & Filosofi"
              title="Menumbuhkan Generasi Berkarakter Luhur dan Berwawasan Global"
              subtitle="Pendidikan sejati bukan sekadar mengumpulkan capaian angka dan hafalan rumus, melainkan membentuk manusia utuh yang berintegritas, mandiri, dan berjiwa welas asih."
            />

            <div className="prose prose-slate max-w-none text-slate-text leading-relaxed text-base space-y-4">
              <p>
                Didirikan sejak tahun 1988 di bawah naungan <strong>{schoolInfo.foundation}</strong>, Sekolah Dharma Loka telah dipercaya oleh ribuan orang tua di Pekanbaru dan Riau sebagai rumah kedua bagi tumbuh kembang putra-putri mereka.
              </p>
              <p>
                Kami memadukan disiplin kurikulum nasional Kurikulum Merdeka dengan penguatan kompetensi trilingual (Bahasa Indonesia, Inggris, dan Mandarin) serta pembelajaran sains-teknologi abad ke-21. Seluruh proses belajar dijiwai oleh nilai-nilai luhur moralitas (Sīla), kebijaksanaan analitis (Prajña), dan ketekunan pantang menyerah (Vīriya).
              </p>
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {schoolInfo.coreValues.map((val, idx) => {
                const IconComponent = valueIcons[idx % valueIcons.length];
                return (
                  <div
                    key={val.title}
                    className="p-4 rounded-lg bg-surface-subtle border border-slate-200/80 hover:border-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded bg-primary-100 text-primary-900 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-primary-900" aria-hidden="true" />
                      </div>
                      <h4 className="text-sm font-bold text-primary-950 font-sans">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Read More Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-900 hover:text-royal transition-colors group"
              >
                <span>Baca Selengkapnya Visi, Misi & Sejarah Sekolah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

