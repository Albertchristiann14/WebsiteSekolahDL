import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { schoolInfo } from "@/data/schoolInfo";
import { academicLevels } from "@/data/academics";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-blue-50/70 via-blue-50/40 to-white text-slate-600 border-t border-blue-100">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Column 1: School Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-royal flex items-center justify-center text-white shadow-md shadow-royal/20">
                <GraduationCap className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-bold text-xl text-primary-950 tracking-tight leading-none">
                  SEKOLAH DHARMA LOKA
                </span>
                <span className="block text-xs font-bold tracking-wider text-royal uppercase mt-1.5">
                  Pekanbaru • Riau
                </span>
              </div>
            </Link>

            <p className="text-base text-slate-600 leading-relaxed">
              Institusi pendidikan terpadu jenjang TK, SD, SMP, SMA, dan SMK di Kota Pekanbaru yang berfokus pada keunggulan akademik, pembinaan budi pekerti luhur, kefasihan multibahasa, dan kesiapan masa depan.
            </p>

            <div className="pt-1">
              <p className="text-xs uppercase tracking-wider text-royal font-bold mb-1">
                Semboyan Luhur
              </p>
              <p className="font-serif italic text-primary-950 text-base font-medium">
                &ldquo;{schoolInfo.motto}&rdquo; — {schoolInfo.mottoTranslation}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={schoolInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Resmi Sekolah Dharma Loka"
                className="w-10 h-10 rounded-xl bg-white hover:bg-royal text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-blue-100 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={schoolInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Resmi Sekolah Dharma Loka"
                className="w-10 h-10 rounded-xl bg-white hover:bg-royal text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-blue-100 shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={schoolInfo.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Resmi Sekolah Dharma Loka"
                className="w-10 h-10 rounded-xl bg-white hover:bg-royal text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-blue-100 shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-950">
              Eksplorasi
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Tentang Sekolah
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Program Akademik
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Fasilitas Kampus
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Berita & Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Info Pendaftaran (PPDB)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-royal transition-colors font-medium">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Levels (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-950">
              Jenjang Pendidikan
            </h3>
            <ul className="space-y-3.5 text-base">
              {academicLevels.map((prog) => (
                <li key={prog.slug}>
                  <Link
                    href={`/academics/${prog.slug}`}
                    className="group flex items-center justify-between text-slate-600 hover:text-royal transition-colors"
                  >
                    <span className="font-medium">{prog.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-royal" />
                  </Link>
                  <span className="block text-xs text-slate-500 mt-0.5">{prog.levelBadge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Admin Portal Access (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-950">
              Alamat & Layanan Orang Tua
            </h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-600 leading-relaxed">
                  {schoolInfo.address.street}, {schoolInfo.address.subDistrict},{" "}
                  {schoolInfo.address.city}, {schoolInfo.address.province}{" "}
                  {schoolInfo.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-royal shrink-0" aria-hidden="true" />
                <span className="text-slate-700 font-medium">{schoolInfo.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-royal shrink-0" aria-hidden="true" />
                <span className="text-slate-700 font-medium">{schoolInfo.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-royal shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-slate-600 space-y-0.5">
                  <p>{schoolInfo.contact.officeHours}</p>
                  <p>{schoolInfo.contact.weekendHours}</p>
                </div>
              </li>
            </ul>

            {/* Dedicated Admin CMS Card inside Footer */}
            <div className="pt-3">
              <Link
                href="/admin"
                className="flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-blue-50 border border-blue-200/80 shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-royal flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-950 group-hover:text-royal transition-colors">
                      Portal Admin & CMS
                    </p>
                    <p className="text-xs text-slate-500">
                      Login Pengelola & Staf Sekolah
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-royal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-blue-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {currentYear} {schoolInfo.foundation}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admissions" className="hover:text-royal transition-colors font-medium">
              Pendaftaran Siswa Baru
            </Link>
            <Link href="/contact" className="hover:text-royal transition-colors font-medium">
              Hubungi Sekretariat
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-royal hover:text-royal-dark font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
