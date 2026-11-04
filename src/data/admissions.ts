export interface AdmissionStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  actionText?: string;
  notes?: string;
}

export interface AdmissionWave {
  name: string;
  period: string;
  benefits: string[];
  status: "Dibuka" | "Akan Datang" | "Ditutup";
  quotaNotice: string;
}

export interface AdmissionFAQ {
  question: string;
  answer: string;
  category: "Pendaftaran" | "Biaya & Beasiswa" | "Akademik & Kurikulum" | "Fasilitas & Layanan";
}

export const admissionWaves: AdmissionWave[] = [
  {
    name: "Gelombang 1 (Early Bird)",
    period: "1 November 2026 – 31 Desember 2026",
    benefits: [
      "Potongan Biaya Pembangunan (Uang Gedung) hingga 25% [DEMO]",
      "Prioritas Pemilihan Kelas Peminatan Unggulan",
      "Bebas Biaya Formulir Pendaftaran Online",
      "Jaminan Ketersediaan Kursi Kelas Khusus",
    ],
    status: "Dibuka",
    quotaNotice: "Kuota terbatas untuk 120 pendaftar pertama di seluruh jenjang",
  },
  {
    name: "Gelombang 2 (Reguler)",
    period: "2 Januari 2027 – 31 Maret 2027",
    benefits: [
      "Potongan Biaya Pembangunan hingga 10% [DEMO]",
      "Jadwal Tes Penempatan dan Observasi Terjadwal",
      "Akses Program Pengenalan Kampus & Bridging Course",
    ],
    status: "Akan Datang",
    quotaNotice: "Tergantung sisa kuota setelah Gelombang 1 terpenuhi",
  },
  {
    name: "Gelombang 3 (Penyisihan Akhir)",
    period: "1 April 2027 – 15 Juni 2027",
    benefits: [
      "Proses Pendaftaran Cepat One-Day Service",
      "Penempatan Sesuai Ketersediaan Kuota Final",
    ],
    status: "Akan Datang",
    quotaNotice: "Hanya dibuka jika kuota kelas belum mencapai kapasitas maksimal",
  },
];

export const admissionSteps: AdmissionStep[] = [
  {
    step: 1,
    title: "Pengisian Formulir Online",
    subtitle: "Registrasi Awal & Akun Calon Siswa",
    description: "Orang tua atau calon siswa mengisi formulir biodata lengkap dan mengunggah dokumen pendukung awal melalui portal pendaftaran atau via loket admisi sekolah.",
  },
  {
    step: 2,
    title: "Verifikasi Berkas & Konsultasi Edukasi",
    subtitle: "Pemeriksaan Dokumen & School Tour",
    description: "Tim sekretariat memeriksa kelengkapan administrasi. Orang tua diundang menghadiri sesi bincang ramah tamah serta tur mengelilingi fasilitas kampus terpadu.",
  },
  {
    step: 3,
    title: "Observasi Perkembangan & Asesmen Minat",
    subtitle: "Bukan Ujian Penentu, Melainkan Pemetaan Potensi",
    description: "Untuk jenjang TK/SD: observasi kesiapan motorik, sosialisasi, dan emosi. Untuk SMP/SMA/SMK: asesmen diagnostik logika dasar, bahasa, serta wawancara peminatan bakat.",
  },
  {
    step: 4,
    title: "Pengumuman Hasil & Wawancara Keluarga",
    subtitle: "Kemitraan Sinergis Rumah dan Sekolah",
    description: "Pemberitahuan hasil penempatan dan keselarasan visi bersama orang tua guna membangun komitmen kolaborasi pendampingan pendidikan anak secara terpadu.",
  },
  {
    step: 5,
    title: "Daftar Ulang & Orientasi Siswa Baru",
    subtitle: "Resmi Menjadi Keluarga Besar Dharma Loka",
    description: "Penyelesaian administrasi biaya pendidikan, pengukuran seragam resmi, pembagian buku modul, dan penyambutan Masa Pengenalan Lingkungan Sekolah (MPLS).",
  },
];

export const admissionRequirements = {
  general: [
    "Fotokopi Akta Kelahiran calon siswa (2 lembar)",
    "Fotokopi Kartu Keluarga (KK) dan KTP kedua Orang Tua / Wali (2 lembar)",
    "Pasfoto berwarna terbaru ukuran 3x4 (4 lembar, latar merah/biru)",
    "Surat Keterangan Sehat dari dokter / fasilitas kesehatan",
  ],
  byLevel: [
    {
      level: "TK (Taman Kanak-Kanak)",
      docs: [
        "Usia minimal 3 tahun per Juli tahun berjalan untuk Playgroup",
        "Usia minimal 4 tahun untuk TK A dan 5 tahun untuk TK B",
        "Buku riwayat tumbuh kembang / imunisasi anak",
      ],
    },
    {
      level: "SD (Sekolah Dasar)",
      docs: [
        "Usia minimal 6 tahun pada bulan Juli tahun berjalan",
        "Surat Tanda Tamat Belajar (STTB) / Ijazah TK (jika ada)",
        "Laporan perkembangan anak dari jenjang TK",
      ],
    },
    {
      level: "SMP & SMA / SMK",
      docs: [
        "Fotokopi Rapor 3 semester terakhir yang telah dilegalisasi sekolah asal",
        "Fotokopi Ijazah & Surat Keterangan Lulus (SKL) yang dilegalisasi (dapat menyusul)",
        "Sertifikat kejuaraan / piagam penghargaan (khusus jalur prestasi akademik/non-akademik)",
        "Nomor Induk Siswa Nasional (NISN) terdaftar aktif di Dapodik Kemendikbud",
      ],
    },
  ],
};

export const admissionFAQs: AdmissionFAQ[] = [
  {
    category: "Pendaftaran",
    question: "Apakah siswa dari luar kota Pekanbaru atau luar provinsi Riau dapat mendaftar?",
    answer: "Tentu saja. Sekolah Dharma Loka menyambut calon siswa dari berbagai wilayah nusantara maupun siswa pindahan luar negeri. Proses seleksi awal dan wawancara dapat difasilitasi secara daring via Zoom bagi keluarga yang berdomisili di luar kota.",
  },
  {
    category: "Biaya & Beasiswa",
    question: "Apakah tersedia program beasiswa di Sekolah Dharma Loka?",
    answer: "Ya, Yayasan Dharma Loka menyediakan program Beasiswa Prestasi Akademik (Juara Olimpiade/OSN), Beasiswa Talenta Seni & Olahraga tingkat provinsi/nasional, serta beasiswa keringanan biaya bagi siswa berprestasi yang membutuhkan dukungan finansial.",
  },
  {
    category: "Akademik & Kurikulum",
    question: "Bagaimana penerapan bahasa pengantar sehari-hari di sekolah?",
    answer: "Kami menerapkan pendekatan Trilingual yang seimbang. Bahasa Indonesia digunakan sebagai bahasa persatuan dan pengantar kurikulum nasional. Bahasa Inggris dipergunakan secara intensif dalam sains, matematika, dan pergaulan harian. Bahasa Mandarin diajarkan secara terstruktur dengan kurikulum terukur (persiapan HSK).",
  },
  {
    category: "Fasilitas & Layanan",
    question: "Apakah disediakan layanan antar-jemput dan katering makan siang?",
    answer: "Sekolah bekerjasama dengan armada rekanan resmi yang menyediakan rute antar-jemput siswa berpendingin udara dan berstandar keselamatan ketat. Untuk makan siang, kantin higienis menyediakan sistem langganan paket menu sehat yang diawasi ahli gizi.",
  },
  {
    category: "Pendaftaran",
    question: "Bagaimana jika calon siswa terlambat mendaftar pada Gelombang 1?",
    answer: "Pendaftaran tetap dapat dilakukan pada Gelombang berikutnya selama daya tampung kelas pada jenjang yang dituju belum penuh. Namun kami sangat menyarankan mendaftar lebih awal karena beberapa kelas favorit biasanya mencapai kapasitas maksimum pada kuartal pertama.",
  },
];

