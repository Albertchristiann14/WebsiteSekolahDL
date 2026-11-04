/**
 * Data Simulasi & Contoh Pendaftar SPMB / PPDB Online
 * Digunakan untuk Cek Status Kelulusan, Dashboard Pendaftar, dan Kalkulator Biaya
 */

export interface SpmbApplicantRecord {
  registrationNumber: string;
  studentName: string;
  nik: string;
  nisn: string;
  birthPlace: string;
  birthDate: string; // YYYY-MM-DD
  gender: "L" | "P";
  level: "tk" | "sd" | "smp" | "sma";
  levelLabel: string;
  wave: string;
  track: string;
  parentName: string;
  whatsapp: string;
  email: string;
  previousSchool: string;
  registeredAt: string;
  currentStepIndex: number; // 0..5 timeline
  selectionResult: "LULUS" | "WAITING_LIST" | "PROSES_VERIFIKASI" | "TIDAK_LULUS";
  scholarshipNote?: string;
  adminRevisionNote?: string;
  testSchedule: {
    date: string;
    time: string;
    room: string;
    interviewer: string;
  };
  invoice: {
    invoiceNumber: string;
    amount: number;
    status: "LUNAS" | "MENUNGGU_PEMBAYARAN";
    vaNumberBca: string;
    vaNumberMandiri: string;
  };
  documents: Array<{
    name: string;
    status: "Terverifikasi" | "Menunggu Verifikasi" | "Perlu Perbaikan";
    note?: string;
  }>;
}

export const SAMPLE_APPLICANTS: SpmbApplicantRecord[] = [
  {
    registrationNumber: "SPMB-2026-DL-8821",
    studentName: "Kevin Alexander Tanoto",
    nik: "1471081405140001",
    nisn: "0148829104",
    birthPlace: "Pekanbaru",
    birthDate: "2014-05-14",
    gender: "L",
    level: "smp",
    levelLabel: "SMP Dharma Loka",
    wave: "Gelombang 1 (Early Bird)",
    track: "Jalur Prestasi Akademik",
    parentName: "Bpk. Hendri Tanoto",
    whatsapp: "081275008899",
    email: "hendri.tanoto@gmail.com",
    previousSchool: "SD Dharma Loka Pekanbaru",
    registeredAt: "12 Februari 2026",
    currentStepIndex: 4, // Pengumuman Kelulusan
    selectionResult: "LULUS",
    scholarshipNote:
      "Selamat! Berdasarkan hasil evaluasi rapor dan medali OSN Tingkat Kota, calon siswa berhak menerima Beasiswa Potongan Uang Pangkal sebesar 50%.",
    adminRevisionNote:
      "Seluruh dokumen persyaratan (KK, Akta, Rapor, dan Sertifikat Prestasi) telah diverifikasi dan dinyatakan lengkap oleh Panitia SPMB.",
    testSchedule: {
      date: "Sabtu, 6 Juni 2026",
      time: "08.30 – 11.00 WIB",
      room: "Gedung SMP Lt. 2 — Ruang Observasi B-204",
      interviewer: "Irwan Setiawan, S.Si., M.Pd. & Tim BK",
    },
    invoice: {
      invoiceNumber: "INV/SPMB/2026/8821",
      amount: 250000,
      status: "LUNAS",
      vaNumberBca: "3901081275008821",
      vaNumberMandiri: "8902202600008821",
    },
    documents: [
      { name: "Kartu Keluarga (KK)", status: "Terverifikasi" },
      { name: "Akta Kelahiran", status: "Terverifikasi" },
      { name: "Rapor SD Kelas 4–6", status: "Terverifikasi" },
      { name: "Pas Foto 3x4 Warna", status: "Terverifikasi" },
      { name: "Sertifikat Prestasi OSN", status: "Terverifikasi" },
    ],
  },
  {
    registrationNumber: "SPMB-2026-DL-7410",
    studentName: "Alya Putri Maharani",
    nik: "1471092008200002",
    nisn: "",
    birthPlace: "Pekanbaru",
    birthDate: "2020-08-20",
    gender: "P",
    level: "sd",
    levelLabel: "SD Dharma Loka",
    wave: "Gelombang 1 (Early Bird)",
    track: "Jalur Reguler",
    parentName: "Ibu Rina Maharani",
    whatsapp: "081365449900",
    email: "rina.maharani@yahoo.com",
    previousSchool: "TK Dharma Loka Pekanbaru",
    registeredAt: "28 Februari 2026",
    currentStepIndex: 3, // Jadwal Tes/Observasi
    selectionResult: "PROSES_VERIFIKASI",
    adminRevisionNote:
      "Berkas Kartu Keluarga dan Akta Kelahiran telah disetujui. Silakan hadir pada jadwal observasi kesiapan belajar sesuai kartu tes.",
    testSchedule: {
      date: "Sabtu, 6 Juni 2026",
      time: "09.00 – 10.30 WIB",
      room: "Gedung SD Lt. 1 — Ruang Kelas 1A",
      interviewer: "Budi Santoso, S.Pd., M.Pd.",
    },
    invoice: {
      invoiceNumber: "INV/SPMB/2026/7410",
      amount: 250000,
      status: "LUNAS",
      vaNumberBca: "3901081365447410",
      vaNumberMandiri: "8902202600007410",
    },
    documents: [
      { name: "Kartu Keluarga (KK)", status: "Terverifikasi" },
      { name: "Akta Kelahiran", status: "Terverifikasi" },
      { name: "Pas Foto 3x4 Warna", status: "Terverifikasi" },
    ],
  },
  {
    registrationNumber: "SPMB-2026-DL-5209",
    studentName: "Brandon Wijaya",
    nik: "1471041011110003",
    nisn: "0119928371",
    birthPlace: "Dumai",
    birthDate: "2011-11-10",
    gender: "L",
    level: "sma",
    levelLabel: "SMA Dharma Loka",
    wave: "Gelombang 1 (Early Bird)",
    track: "Jalur Reguler",
    parentName: "Bpk. Anton Wijaya",
    whatsapp: "08117509988",
    email: "anton.wijaya@gmail.com",
    previousSchool: "SMP Negeri 4 Pekanbaru",
    registeredAt: "02 Maret 2026",
    currentStepIndex: 4,
    selectionResult: "WAITING_LIST",
    adminRevisionNote:
      "Calon siswa berada pada daftar tunggu (Waiting List Prioritas #4) kuota Gelombang 1 SMA MIPA. Panitia akan menghubungi paling lambat 14 Juni 2026.",
    testSchedule: {
      date: "Sabtu, 6 Juni 2026",
      time: "08.00 – 11.30 WIB",
      room: "Gedung SMA Lt. 2 — Lab Komputer 1",
      interviewer: "Dr. Vincentius Halim, M.Sc.",
    },
    invoice: {
      invoiceNumber: "INV/SPMB/2026/5209",
      amount: 300000,
      status: "LUNAS",
      vaNumberBca: "3901081175095209",
      vaNumberMandiri: "8902202600005209",
    },
    documents: [
      { name: "Kartu Keluarga (KK)", status: "Terverifikasi" },
      { name: "Akta Kelahiran", status: "Terverifikasi" },
      { name: "Rapor SMP Semester 1–5", status: "Terverifikasi" },
      { name: "Pas Foto 3x4 Warna", status: "Terverifikasi" },
    ],
  },
];

