/**
 * Data Direktori Guru & Tenaga Kependidikan (GTK)
 * Sekolah Dharma Loka Pekanbaru (TK, SD, SMP, SMA & Manajemen)
 */

export interface TeacherStaffProfile {
  id: string;
  name: string;
  role: string;
  subject: string;
  category: "pimpinan" | "guru" | "staf";
  level: "semua" | "tk" | "sd" | "smp" | "sma";
  education: string;
  university: string;
  experienceYears: number;
  certifications: string[];
  photo: string;
  bio: string;
  quote: string;
  email: string;
}

export const teachersData: TeacherStaffProfile[] = [
  {
    id: "gtk-1",
    name: "Dr. Hendra Wijaya, S.Pd., M.M.",
    role: "Direktur Eksekutif Pendidikan",
    subject: "Manajemen Pendidikan & Kebijakan Kurikulum",
    category: "pimpinan",
    level: "semua",
    education: "S3 Manajemen Pendidikan",
    university: "Universitas Negeri Jakarta",
    experienceYears: 24,
    certifications: [
      "Asesor Akreditasi Sekolah Nasional",
      "Certified Educational Leader — NIE Singapore",
    ],
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    bio: "Memimpin transformasi kurikulum terpadu Sekolah Dharma Loka Pekanbaru sejak 2014 dengan fokus pada integrasi karakter budi pekerti, trilingualisme, dan inovasi STEAM.",
    quote: "Setiap anak adalah bintang yang berhak mendapatkan langit terbaik untuk bersinar.",
    email: "hendra.wijaya@dharmaloka.sch.id",
  },
  {
    id: "gtk-2",
    name: "Dr. Vincentius Halim, M.Sc.",
    role: "Kepala Sekolah SMA Dharma Loka",
    subject: "Kimia Terapan & Riset Ilmiah (KIR)",
    category: "pimpinan",
    level: "sma",
    education: "S3 Ilmu Kimia Terapan",
    university: "National Taiwan University (NTU)",
    experienceYears: 16,
    certifications: [
      "Pembina Olimpiade Sains Nasional (OSN) Kimia",
      "Cambridge International A-Level Chemistry Trainer",
    ],
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Berpengalaman membimbing lebih dari 60 siswa meraih medali olimpiade sains nasional dan diterima di universitas terkemuka di Asia serta Eropa.",
    quote: "Sains mengajarkan kita untuk jujur pada fakta dan rendah hati di hadapan semesta.",
    email: "vincentius.halim@dharmaloka.sch.id",
  },
  {
    id: "gtk-3",
    name: "Irwan Setiawan, S.Si., M.Pd.",
    role: "Kepala Sekolah SMP Dharma Loka",
    subject: "Fisika & Robotika Terapan",
    category: "pimpinan",
    level: "smp",
    education: "S2 Pendidikan Sains",
    university: "Universitas Negeri Padang",
    experienceYears: 15,
    certifications: [
      "Guru Penggerak Angkatan 5 Kemendikbudristek",
      "STEM Robotics Coach — IYRC",
    ],
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Mengembangkan laboratorium fisika terapan dan kurikulum koding-robotika di tingkat SMP Dharma Loka.",
    quote: "Remaja yang diberi kepercayaan dan tantangan bermakna akan tumbuh menjadi pemimpin tangguh.",
    email: "irwan.setiawan@dharmaloka.sch.id",
  },
  {
    id: "gtk-4",
    name: "Budi Santoso, S.Pd., M.Pd.",
    role: "Kepala Sekolah SD Dharma Loka",
    subject: "Literasi & Numerasi Dasar",
    category: "pimpinan",
    level: "sd",
    education: "S2 Pendidikan Dasar",
    university: "Universitas Pendidikan Indonesia (UPI)",
    experienceYears: 18,
    certifications: [
      "Pendidik Tersertifikasi Nasional",
      "Fasilitator Sekolah Ramah Anak Provinsi Riau",
    ],
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Aktif merancang metode belajar Matematika Gembira (GASING) dan gerakan literasi anak di jenjang Sekolah Dasar.",
    quote: "Pondasi Sekolah Dasar yang menyenangkan membuat anak mencintai belajar sepanjang hayat.",
    email: "budi.santoso@dharmaloka.sch.id",
  },
  {
    id: "gtk-5",
    name: "Dra. Lusiana Lim, S.Pd.AUD",
    role: "Kepala Sekolah TK Dharma Loka",
    subject: "Montessori & Tumbuh Kembang Anak Usia Dini",
    category: "pimpinan",
    level: "tk",
    education: "S1 PAUD & Diploma Montessori",
    university: "Universitas Terbuka & Sunshine Teachers Training",
    experienceYears: 21,
    certifications: [
      "Montessori Early Childhood Diploma",
      "Asesor BAN-PAUD Provinsi Riau",
    ],
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Lebih dari dua dekade mendampingi tumbuh kembang anak usia dini dengan pendekatan holistik dan penuh kasih.",
    quote: "Keteladanan dan pelukan hangat adalah bahasa pertama yang paling dipahami anak usia dini.",
    email: "lusiana.lim@dharmaloka.sch.id",
  },
  {
    id: "gtk-6",
    name: "Laoshi Mei Ling, B.A., MTCSOL",
    role: "Koordinator Departemen Bahasa Mandarin",
    subject: "Bahasa Mandarin & Persiapan HSK (Level 1–5)",
    category: "guru",
    level: "semua",
    education: "S2 Pengajaran Bahasa Mandarin (MTCSOL)",
    university: "Xiamen University, Tiongkok",
    experienceYears: 12,
    certifications: [
      "HSK Level 6 (Advanced Native Proficiency)",
      "CTCSOL Certified International Chinese Teacher",
    ],
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Mengampu kurikulum Bahasa Mandarin berjenjang dari TK hingga SMA serta persiapan beasiswa studi ke Tiongkok dan Taiwan.",
    quote: "Menguasai satu bahasa baru berarti membuka satu jendela peradaban dunia.",
    email: "meiling@dharmaloka.sch.id",
  },
  {
    id: "gtk-7",
    name: "Rizky Pratama Putra, S.Kom., M.T.",
    role: "Guru Informatika & Pembina Klub Robotika",
    subject: "Pemrograman Python, AI Dasar & Robotika IoT",
    category: "guru",
    level: "sma",
    education: "S2 Teknik Informatika",
    university: "Institut Teknologi Bandung (ITB)",
    experienceYears: 8,
    certifications: [
      "Google Certified Educator Level 2",
      "Pembina Medali Emas OSN Bidang Informatika",
    ],
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Membina tim robotika dan pemrograman kompetitif SMP-SMA Dharma Loka dalam berbagai ajang nasional maupun Asia Tenggara.",
    quote: "Koding bukan sekadar menulis baris program, melainkan seni memecahkan masalah secara terstruktur.",
    email: "rizky.pratama@dharmaloka.sch.id",
  },
  {
    id: "gtk-8",
    name: "Sarah Caroline, S.Pd., M.Hum.",
    role: "Guru Bahasa Inggris & Pembina Debat",
    subject: "Academic English, IELTS Prep & World Schools Debate",
    category: "guru",
    level: "smp",
    education: "S2 Linguistik Terapan",
    university: "Universitas Gadjah Mada (UGM)",
    experienceYears: 10,
    certifications: [
      "Cambridge CELTA Certified Teacher",
      "IELTS Band 8.5 Academic",
    ],
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    bio: "Melatih kemampuan berbicara publik, penulisan esai akademik, dan tim debat Bahasa Inggris (NSDC/WSDC).",
    quote: "Bahasa yang santun dan argumen yang jernih adalah kekuatan diplomasi masa depan.",
    email: "sarah.caroline@dharmaloka.sch.id",
  },
  {
    id: "gtk-9",
    name: "Agus Salim, S.Si., Gr.",
    role: "Guru Matematika & Koordinator Klub OSN SD-SMP",
    subject: "Matematika & Olimpiade Numerasi",
    category: "guru",
    level: "sd",
    education: "S1 Matematika & PPG Prajabatan",
    university: "Universitas Riau (UNRI)",
    experienceYears: 11,
    certifications: [
      "Sertifikat Pendidik Profesional (Gr.)",
      "Pelatih Olimpiade Matematika Tingkat Provinsi",
    ],
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: "Berfokus menghilangkan kecemasan matematika pada anak melalui alat peraga visual dan pemecahan teka-teki logika.",
    quote: "Setiap anak bisa menyukai matematika jika ia diajak menemukan polanya sendiri.",
    email: "agus.salim@dharmaloka.sch.id",
  },
  {
    id: "gtk-10",
    name: "Citra Dewi Lestari, M.Psi., Psikolog",
    role: "Koordinator Bimbingan Konseling & Psikolog Sekolah",
    subject: "Psikologi Perkembangan Anak, Remaja & Karir PTN",
    category: "staf",
    level: "semua",
    education: "S2 Profesi Psikologi Pendidikan",
    university: "Universitas Indonesia (UI)",
    experienceYears: 9,
    certifications: [
      "Surat Izin Praktik Psikologi (SIPP) HIMPSI",
      "Certified Youth Career & University Counselor",
    ],
    photo:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    bio: "Mendampingi kesehatan mental siswa, konsultasi pola asuh orang tua (parenting), serta pemetaan minat bakat jurusan kuliah.",
    quote: "Mendengarkan anak tanpa menghakimi adalah langkah pertama membangun ketangguhan mental.",
    email: "konseling@dharmaloka.sch.id",
  },
  {
    id: "gtk-11",
    name: "Hendra Gunawan, S.E.",
    role: "Kepala Tata Usaha & Layanan Administrasi SPMB",
    subject: "Administrasi Akademik, Keuangan & Layanan Wali Murid",
    category: "staf",
    level: "semua",
    education: "S1 Manajemen Keuangan",
    university: "Universitas Islam Riau",
    experienceYears: 14,
    certifications: [
      "Manajemen Mutu Layanan Pendidikan ISO 9001",
    ],
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Memastikan layanan administrasi pendaftaran siswa baru (SPMB), legalisir dokumen, dan informasi keuangan berjalan cepat serta transparan.",
    quote: "Pelayanan administrasi yang ramah dan jelas adalah wujud penghormatan kami kepada wali murid.",
    email: "tu@dharmaloka.sch.id",
  },
  {
    id: "gtk-12",
    name: "Nadia Permata, S.Pd.",
    role: "Guru Kelas & Seni Musik TK Dharma Loka",
    subject: "Sensory Play, Vokal Anak & Musik Klasik Dasar",
    category: "guru",
    level: "tk",
    education: "S1 PG-PAUD",
    university: "Universitas Negeri Medan",
    experienceYears: 7,
    certifications: [
      "ABRSM Piano Grade 6",
      "Pelatihan Guru Kreatif PAUD Nasional",
    ],
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Mengintegrasikan musik, ritme, dan seni rupa untuk menstimulasi kecerdasan majemuk siswa Playgroup dan TK.",
    quote: "Musik dan senyuman membuat ruang kelas menjadi rumah kedua bagi anak.",
    email: "nadia.permata@dharmaloka.sch.id",
  },
];

