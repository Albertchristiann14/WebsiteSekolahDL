import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Lightbulb, Shield, Globe2 } from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { SectionHeader } from "@/components/ui/SectionHeader";

const valueIcons = [
  <Lightbulb key="0" className="w-6 h-6 text-royal" />,
  <HeartHandshake key="1" className="w-6 h-6 text-royal" />,
  <Shield key="2" className="w-6 h-6 text-royal" />,
  <Globe2 key="3" className="w-6 h-6 text-royal" />,
];

export function SchoolPhilosophy() {
  return (
    <section className="py-24 lg:py-36 bg-white" aria-labelledby="philosophy-heading">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Top Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-7">
            <SectionHeader
              tag="Identitas & Filosofi Pendidikan"
              title="Keseimbangan Antara Kecerdasan Intelektual dan Kemuliaan Hati"
            />

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Di Sekolah Dharma Loka Pekanbaru, kami meyakini bahwa keberhasilan pendidikan tidak hanya diukur dari tingginya nilai akademik semata, melainkan dari ketangguhan karakter, kejujuran, rasa hormat kepada orang tua, dan kepedulian tulus terhadap sesama.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Berlandaskan semboyan <em className="font-serif font-semibold text-royal">{schoolInfo.motto}</em>, seluruh kegiatan belajar mengajar dirancang agar setiap anak merasa dihargai, aman untuk bereksplorasi, dan tumbuh menjadi pribadi yang percaya diri.
            </p>

            {/* Bright Soft-Blue Pullquote Box */}
            <blockquote className="p-7 sm:p-8 rounded-2xl bg-blue-50/70 border-l-4 border-royal">
              <p className="font-serif italic text-lg sm:text-xl text-primary-950 leading-relaxed mb-3">
                &ldquo;Kecerdasan tanpa budi pekerti ibarat kapal tanpa kompas. Di Dharma Loka, kami menempa keduanya agar putra-putri Anda siap memimpin masa depan dengan bijaksana.&rdquo;
              </p>
              <footer className="text-xs sm:text-sm font-bold text-royal uppercase tracking-wider">
                — Dewan Pembina Yayasan Pendidikan Dharma Loka
              </footer>
            </blockquote>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-base font-bold text-royal hover:text-royal-dark group"
              >
                <span>Pelajari Sejarah, Visi & Misi Sekolah</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual + 4 Core Values Grid (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Wide Image Banner */}
            <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-blue-100">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
                alt="Pendampingan guru dan siswa di dalam kelas Sekolah Dharma Loka"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-100 bg-royal/90 px-3 py-1 rounded-full">
                  Pendekatan Personal & Humanis
                </span>
                <p className="text-base sm:text-lg font-bold mt-2">
                  Pendidik berdedikasi yang membimbing perkembangan akademik dan karakter setiap anak.
                </p>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {schoolInfo.coreValues.map((val, idx) => (
                <div
                  key={val.title}
                  className="p-7 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-blue-100/80 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center mb-4">
                    {valueIcons[idx]}
                  </div>
                  <h3 className="font-bold text-primary-950 text-lg mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
