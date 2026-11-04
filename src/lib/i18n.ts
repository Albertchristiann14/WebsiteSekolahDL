/**
 * Struktur Internasionalisasi (i18n) — Bahasa Indonesia (Utama) & Bahasa Inggris (EN)
 * Sekolah Dharma Loka Pekanbaru
 */

export type Locale = "id" | "en";

export const dictionaries = {
  id: {
    nav: {
      home: "Beranda",
      profile: "Profil",
      academic: "Akademik",
      teachers: "Guru & Staf",
      achievements: "Prestasi",
      news: "Berita",
      gallery: "Galeri",
      spmb: "SPMB",
      contact: "Kontak",
      ourLevels: "Jenjang Kami",
      registerSpmb: "Daftar SPMB",
      adminPortal: "Portal Admin",
    },
    common: {
      readMore: "Baca Selengkapnya",
      viewAll: "Lihat Semua",
      download: "Unduh Dokumen",
      searchPlaceholder: "Cari informasi...",
      backToTop: "Kembali ke Atas",
      whatsappConsult: "Konsultasi via WhatsApp",
    },
  },
  en: {
    nav: {
      home: "Home",
      profile: "About Us",
      academic: "Academics",
      teachers: "Faculty & Staff",
      achievements: "Achievements",
      news: "News & Events",
      gallery: "Gallery",
      spmb: "Admissions",
      contact: "Contact",
      ourLevels: "Our Campuses",
      registerSpmb: "Apply Now",
      adminPortal: "Admin Portal",
    },
    common: {
      readMore: "Read More",
      viewAll: "View All",
      download: "Download Document",
      searchPlaceholder: "Search information...",
      backToTop: "Back to Top",
      whatsappConsult: "Consult via WhatsApp",
    },
  },
};

export function getDictionary(locale: Locale = "id") {
  return dictionaries[locale] || dictionaries.id;
}

