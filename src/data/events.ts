/**
 * Data Agenda Kegiatan & Kalender Akademik
 * Sekolah Dharma Loka Pekanbaru
 */

export interface SchoolEventItem {
  id: string;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  location: string;
  level: "semua" | "tk" | "sd" | "smp" | "sma";
  category: "Akademik" | "SPMB" | "Lomba & Festival" | "Pertemuan Orang Tua";
  description: string;
}

export const schoolEvents: SchoolEventItem[] = [
  {
    id: "evt-1",
    title: "Open House & Trial Class SPMB Gelombang 1 T.A. 2026/2027",
    slug: "open-house-trial-class-spmb-2026",
    date: "2026-05-16",
    time: "08.00 – 12.00 WIB",
    location: "Auditorium Utama & Kampus TK-SD-SMP-SMA Dharma Loka",
    level: "semua",
    category: "SPMB",
    description:
      "Kunjungan kampus (Campus Tour) bagi calon orang tua murid, kelas percobaan gratis untuk anak TK & SD, serta sesi konsultasi beasiswa prestasi SMP & SMA.",
  },
  {
    id: "evt-2",
    title: "Pekan Inovasi Sains, Robotika & Pameran Projek P5 (STEAM Expo)",
    slug: "steam-expo-dharma-loka-2026",
    date: "2026-05-23",
    time: "08.30 – 15.00 WIB",
    location: "Gedung Serbaguna & Laboratorium Sains Terpadu",
    level: "semua",
    category: "Lomba & Festival",
    description:
      "Pameran более dari 80 karya riset sains, robotika IoT, dan proyek kewirausahaan siswa SD, SMP, dan SMA Dharma Loka Pekanbaru.",
  },
  {
    id: "evt-3",
    title: "Tes Observasi & Wawancara Calon Siswa Baru (Gelombang 1)",
    slug: "tes-observasi-wawancara-spmb-gelombang-1",
    date: "2026-06-06",
    time: "08.00 – 13.00 WIB",
    location: "Gedung Unit Jenjang Masing-Masing",
    level: "semua",
    category: "SPMB",
    description:
      "Pelaksanaan observasi kesiapan belajar (TK & SD), tes pemetaan akademik (SMP & SMA), serta wawancara kemitraan bersama orang tua/wali.",
  },
  {
    id: "evt-4",
    title: "Seminar Parenting: Mendampingi Anak di Era Kecerdasan Buatan (AI)",
    slug: "seminar-parenting-era-ai-2026",
    date: "2026-06-13",
    time: "09.00 – 11.30 WIB",
    location: "Aula Utama Sekolah Dharma Loka",
    level: "semua",
    category: "Pertemuan Orang Tua",
    description:
      "Seminar kolaborasi Psikolog Pendidikan dan Pakar Teknologi mengenai cara bijak mendampingi penggunaan gawai pada anak dan remaja.",
  },
  {
    id: "evt-5",
    title: "Penilaian Akhir Tahun (PAT) / Sumatif Akhir Tahun Genap",
    slug: "sumatif-akhir-tahun-genap-2026",
    date: "2026-06-15",
    endDate: "2026-06-20",
    time: "07.15 – 12.00 WIB",
    location: "Seluruh Ruang Kelas SD, SMP & SMA",
    level: "semua",
    category: "Akademik",
    description:
      "Pelaksanaan evaluasi pembelajaran semester genap tahun ajaran berjalan.",
  },
  {
    id: "evt-6",
    title: "Pembagian Rapor & Pameran Portofolio Tumbuh Kembang Siswa",
    slug: "pembagian-rapor-semester-genap-2026",
    date: "2026-06-27",
    time: "08.00 – 12.00 WIB",
    location: "Ruang Kelas Masing-Masing Unit",
    level: "semua",
    category: "Pertemuan Orang Tua",
    description:
      "Konsultasi capaian hasil belajar akademik dan perkembangan karakter siswa bersama wali kelas.",
  },
];

/**
 * Buat URL Google Calendar agar orang tua dapat menyimpan agenda ke HP Android mereka dengan 1 klik
 */
export function buildGoogleCalendarUrl(event: SchoolEventItem): string {
  const dateClean = event.date.replace(/-/g, "");
  const start = `${dateClean}T080000`;
  const end = `${dateClean}T120000`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — Sekolah Dharma Loka`,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

