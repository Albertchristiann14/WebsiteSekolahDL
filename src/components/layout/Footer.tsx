"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  ExternalLink,
  ShieldCheck,
  Heart
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { academicLevels } from "@/data/academics";

export function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin CMS dashboard routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-primary-950 text-slate-300 border-t border-primary-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer Sekolah Dharma Loka</h2>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: School Identity & Philosophy (Col span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-900 border border-gold/40 flex items-center justify-center text-gold shadow-sm">
                <GraduationCap className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight block">
                  Dharma Loka
                </span>
                <span className="text-xs uppercase tracking-widest text-gold-light font-semibold block">
                  Sekolah Terpadu Pekanbaru
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Institusi pendidikan terpadu di Pekanbaru yang berdedikasi melahirkan generasi unggul berlandaskan kebajikan moral, kecerdasan nalar kritis, dan wawasan global sejak tahun 1988.
            </p>

            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-primary-900/80 border border-primary-800 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-gold" aria-hidden="true" />
              <span>{schoolInfo.accreditation}</span>
            </div>

            {/* Motto Callout */}
            <div className="p-4 rounded-lg bg-primary-900/40 border-l-2 border-gold text-xs space-y-1">
              <div className="font-serif italic text-gold font-semibold text-sm">
                "{schoolInfo.motto}"
              </div>
              <div className="text-slate-400">
                {schoolInfo.mottoTranslation}
              </div>
            </div>
          </div>

          {/* Column 2: Academic Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span>Jenjang Pendidikan</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {academicLevels.map((lvl) => (
                <li key={lvl.slug}>
                  <Link
                    href={`/academics/${lvl.slug}`}
                    className="text-slate-300 hover:text-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{lvl.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-gold transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/academics"
                  className="text-xs text-gold-light hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Ikhtisar Kurikulum</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span>Informasi Kampus</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-gold transition-colors">
                  Tentang & Sejarah
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-slate-300 hover:text-gold transition-colors">
                  Sarana & Prasarana
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-slate-300 hover:text-gold transition-colors">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-300 hover:text-gold transition-colors">
                  Galeri Kehidupan Kampus
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-300 hover:text-gold transition-colors">
                  Berita & Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gold font-semibold hover:text-gold-light transition-colors">
                  Pendaftaran PPDB 2027/2028
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Secretariat */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span>Sekretariat & Lokasi</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {schoolInfo.address.street}, {schoolInfo.address.subDistrict}, {schoolInfo.address.city}, {schoolInfo.address.province} {schoolInfo.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a href={`tel:${schoolInfo.contact.phone.replace(/[^0-9]/g, "")}`} className="hover:text-white transition-colors">
                  {schoolInfo.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a href={`mailto:${schoolInfo.contact.email.split(" ")[0]}`} className="hover:text-white transition-colors">
                  {schoolInfo.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 border-t border-primary-900 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div>{schoolInfo.contact.officeHours}</div>
                  <div>{schoolInfo.contact.weekendHours}</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Demo Disclaimer Box (Mandatory Client Proposal Requirement) */}
        <div className="mt-12 p-4 rounded-lg bg-primary-900/50 border border-primary-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
              Catatan Proposal Klien
            </span>
            <span>
              Seluruh teks bertanda <code className="text-amber-200 bg-primary-950 px-1 py-0.5 rounded">[DEMO / OFFICIAL REQUIRED]</code> merupakan data peraga yang disiapkan oleh tim pengembang Krevia Digital dan siap diperbarui dengan arsip resmi sekolah.
            </span>
          </div>
          <Link
            href="/contact"
            className="text-gold hover:underline whitespace-nowrap text-xs font-medium"
          >
            Hubungi Pengembang →
          </Link>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-8 pt-8 border-t border-primary-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {schoolInfo.name}. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Dirancang dengan standar estetika editorial oleh <span className="text-slate-200 font-semibold">Krevia Digital</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

