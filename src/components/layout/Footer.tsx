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
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useTenant } from "@/lib/tenantContext";
import { TENANT_LIST } from "@/config/tenants";
import { schoolInfo } from "@/data/schoolInfo";

export function Footer() {
  const pathname = usePathname();
  const { tenant, setTenantId } = useTenant();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin") || (pathname === "/" && tenant.id === "portal")) {
    return null;
  }

  return (
    <footer className="bg-blue-50/60 text-slate-700 border-t border-blue-100 no-print">
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand, Deskripsi & Media Sosial (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: tenant.theme.primary }}
              >
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-primary-950 block leading-none">
                  {tenant.shortName.toUpperCase()}
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-royal block mt-1.5">
                  {tenant.subdomain} • PEKANBARU
                </span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm leading-relaxed">
              {tenant.description}
            </p>

            <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1.5 text-xs">
              <p className="font-extrabold text-primary-950">
                Legalitas & Akreditasi Resmi:
              </p>
              <p className="text-slate-600">
                • Status: <strong>{tenant.accreditation}</strong>
              </p>
              <p className="text-slate-600">
                • NPSN: <strong className="font-mono">{tenant.npsn}</strong>
              </p>
              <p className="text-slate-600">• {tenant.skIzinOperasional}</p>
            </div>

            {/* Social Media */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { label: "Instagram", href: schoolInfo.socialMedia.instagram },
                { label: "Facebook", href: schoolInfo.socialMedia.facebook },
                { label: "YouTube", href: schoolInfo.socialMedia.youtube },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-xs font-bold text-primary-950 hover:bg-royal hover:text-white hover:border-royal transition-colors shadow-2xs"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Tautan Cepat & Informasi (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary-950">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { name: "Profil & Sejarah", href: "/about" },
                { name: "Legalitas & Akreditasi", href: "/about#legalitas" },
                { name: "Kurikulum & Akademik", href: "/academics" },
                { name: "Direktori Guru & Staf", href: "/teachers" },
                { name: "Fasilitas Kampus", href: "/facilities" },
                { name: "Prestasi Siswa", href: "/achievements" },
                { name: "Berita & Agenda", href: "/news" },
                { name: "Galeri Foto & Video", href: "/gallery" },
                { name: "Pendaftaran SPMB", href: "/admissions" },
                { name: "Cek Status Kelulusan", href: "/admissions?tab=status" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-royal transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Jaringan Subdomain Jenjang Lain (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary-950 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-royal" />
              <span>Portal & Subdomain Jenjang</span>
            </h3>
            <ul className="space-y-2.5">
              {TENANT_LIST.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setTenantId(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-blue-100 transition group cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-extrabold text-primary-950 group-hover:text-royal block">
                        {item.shortName}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        https://{item.subdomain}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-royal opacity-60 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak, Jam Layanan & Peta Mini (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary-950">
              Kontak & Lokasi Kampus
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-royal shrink-0 mt-1" />
                <span className="text-slate-600 leading-relaxed">
                  {tenant.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-royal shrink-0" />
                <span className="text-primary-950 font-bold">
                  {tenant.contact.phone} / {tenant.contact.whatsappFormatted}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-royal shrink-0" />
                <a
                  href={`mailto:${tenant.contact.email}`}
                  className="text-slate-600 hover:text-royal transition-colors"
                >
                  {tenant.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                <span className="text-slate-600 text-xs">
                  {tenant.contact.officeHours}
                </span>
              </li>
            </ul>

            {/* Peta Mini Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-blue-200 bg-white shadow-xs h-36 relative">
              <iframe
                title="Peta Mini Lokasi Sekolah Dharma Loka Pekanbaru"
                src={schoolInfo.address.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Admin Access Bar */}
      <div className="border-t border-blue-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} <strong>{schoolInfo.name}</strong> ({schoolInfo.foundation}). Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-royal hover:text-royal-dark font-bold transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Admin CMS</span>
            </Link>
            <Link
              href="/admissions"
              className="hover:text-royal font-semibold transition-colors"
            >
              SPMB Online
            </Link>
            <Link
              href="/contact"
              className="hover:text-royal font-semibold transition-colors"
            >
              Bantuan & Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
