export interface AcademicLevel {
  slug: string;
  name: string;
  shortName: string;
  levelBadge: string;
  ageRange: string;
  headline: string;
  overview: string;
  heroImage: string;
  features: string[];
  curriculumHighlights: {
    title: string;
    description: string;
  }[];
  facilities: string[];
  graduateOutcomes: string[];
  extracurriculars: string[];
  schedule: string;
}

export const academicLevels: AcademicLevel[] = [
  {
    slug: "tk",
    name: "Taman Kanak-Kanak (TK)",
    shortName: "TK Dharma Loka",
    levelBadge: "Usia Dini (3 - 6 Tahun)",
    ageRange: "Playgroup & TK A - B",
    headline: "Fondasi Emas Karakter, Kreativitas, dan Kegembiraan Belajar",
    overview: "Pendidikan anak usia dini di TK Dharma Loka dirancang dengan pendekatan experiential learning dan active play. Kami menumbuhkan kecintaan alami anak terhadap belajar, kemandirian motorik, sosialisasi positif, serta stimulasi bilingual awal dalam suasana yang hangat, aman, dan penuh kasih sayang.",
    heroImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Bilingual Learning Environment (Bahasa Indonesia & Pengantar Bahasa Inggris)",
      "Pengenalan Dasar Karakter Moral & Nilai Kebajikan Anak",
      "Sentra Bermain & Belajar Terintegrasi (Sensori-Motorik, Balok, Sains Mini, Seni)",
      "Rasio Guru dan Siswa Terjaga untuk Perhatian Individual Maksimal",
      "Kegiatan Outing Edukatif Ramah Anak",
    ],
    curriculumHighlights: [
      {
        title: "Montessori & Play-Based Exploration",
        description: "Menstimulasi koordinasi motorik halus dan kasar, konsentrasi, serta pemecahan masalah sederhana secara mandiri.",
      },
      {
        title: "Phonics & Early Literacy Immersion",
        description: "Pengenalan fonik, kosakata multibahasa, dan apresiasi dongeng bernilai budi pekerti.",
      },
      {
        title: "Sains & Lingkungan Ramah Hijau",
        description: "Mengamati alam secara langsung melalui mini garden sekolah dan aktivitas eksplorasi panca indra.",
      },
    ],
    facilities: [
      "Ruang Kelas Ber-AC tematik ramah anak",
      "Taman Bermain Outdoor dengan rumput sintetis aman",
      "Indoor Soft-Play Activity Center",
      "Pojok Baca & Audio-Visual Edukasi",
    ],
    graduateOutcomes: [
      "Percaya diri, mandiri dalam kebutuhan personal dasar, dan terbiasa bergotong-royong",
      "Memiliki rasa ingin tahu tinggi dan siap beradaptasi memasuki jenjang Sekolah Dasar",
      "Mampu berkomunikasi verbal dengan sopan dan mengekspresikan emosi secara positif",
    ],
    extracurriculars: ["Tari Kreasi Cilik", "Menggambar & Mewarnai", "Mini Music Ensemble", "English Storytelling"],
    schedule: "Senin – Jumat | 07.45 – 11.30 WIB",
  },
  {
    slug: "sd",
    name: "Sekolah Dasar (SD)",
    shortName: "SD Dharma Loka",
    levelBadge: "Dasar (6 - 12 Tahun)",
    ageRange: "Kelas 1 - 6",
    headline: "Membangun Fondasi Akademik Kuat dan Kemuliaan Budi Pekerti",
    overview: "SD Dharma Loka memadukan keunggulan Kurikulum Nasional (Kurikulum Merdeka) dengan penguatan literasi trilingual (Indonesia, Inggris, Mandarin) dan sains berbasis inkuiri. Kami membimbing murid menjadi pembelajar yang gigih, berbudi luhur, dan tangkas berpikir analitis.",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Penguatan Trilingual: Bahasa Indonesia, Bahasa Inggris, dan Dasar Mandarin",
      "Kurikulum Merdeka dengan Proyek Penguatan Profil Pelajar Pancasila (P5)",
      "Program Pembiasaan Budi Pekerti Harian & Meditasi Singkat Pagi",
      "Pembelajaran Matematika Bernalar Logis (Singapore Math Inspired)",
      "Klinik Remedial & Bimbingan Pengayaan Olimpiade Sains Sejak Dini",
    ],
    curriculumHighlights: [
      {
        title: "STEM Foundation & Computer Basics",
        description: "Pembelajaran sains kontekstual melalui eksperimen laboratorium mini dan dasar logika algoritma anak.",
      },
      {
        title: "Trilingual Literacy Program",
        description: "Membaca komprehensif, percakapan situasional, dan penulisan kreatif terstruktur.",
      },
      {
        title: "Character Mentorship Circle",
        description: "Pendidikan moral praktis mengenai rasa hormat, kejujuran, disiplin, dan empati sosial.",
      },
    ],
    facilities: [
      "Laboratorium Komputer & Coding Anak",
      "Laboratorium Sains Terpadu SD",
      "Perpustakaan Literasi Terbuka dengan koleksi berjenjang",
      "Lapangan Olahraga dan Hall Senam Siswa",
    ],
    graduateOutcomes: [
      "Penguasaan materi akademik esensial dengan nilai standar kompetensi unggul",
      "Kefasihan berkomunikasi bilingual aktif dan kemampuan dasar menulis Mandarin",
      "Terbentuknya kebiasaan disiplin belajar, kejujuran, dan sopan santun konsisten",
    ],
    extracurriculars: ["Klub Sains & Robotika Cilik", "Bulu Tangkis & Basket", "Paduan Suara", "Klub Sempoa & Catur", "Wushu"],
    schedule: "Senin – Jumat | 07.15 – 13.45 WIB",
  },
  {
    slug: "smp",
    name: "Sekolah Menengah Pertama (SMP)",
    shortName: "SMP Dharma Loka",
    levelBadge: "Menengah Pertama (12 - 15 Tahun)",
    ageRange: "Kelas 7 - 9",
    headline: "Mengasah Nalar Kritis, Kepemimpinan, dan Potensi Saintifik",
    overview: "Masa remaja adalah fase pembentukan identitas penting. SMP Dharma Loka mendampingi siswa mengembangkan potensi intelektual melalui pembelajaran berbasis inkuiri, proyek kepemimpinan, kompetisi akademik, serta kegiatan minat-bakat yang mematangkan ketahanan mental dan kecerdasan sosial.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Pendekatan Project-Based Learning dengan integrasi teknologi digital",
      "Bina Prestasi Olimpiade Sains Nasional (OSN) Matematika, IPA, dan IPS",
      "Cambridge English Preparation & HSK Mandarin Proficiency Guidance",
      "Pendidikan Kepemimpinan Siswa (OSIS) dan Keterlibatan Aksi Sosial Komunitas",
      "Layanan Konseling & Career Pathway Awareness sejak Kelas 8",
    ],
    curriculumHighlights: [
      {
        title: "Applied STEM & Robotics Academy",
        description: "Penerapan mikrokontroler, rancang bangun robot, dan eksplorasi data komputasi.",
      },
      {
        title: "Critical Thinking & Debate Forum",
        description: "Latihan berargumentasi rasional berbasis bukti ilmiah dalam forum diskusi dan debat bahasa Inggris.",
      },
      {
        title: "Integrasi Budi Pekerti & Mindful Learning",
        description: "Sesi relaksasi kesadaran harian guna memelihara kestabilan emosi dan ketajaman fokus akademis.",
      },
    ],
    facilities: [
      "Laboratorium Fisika-Biologi Modern",
      "Laboratorium Multimedia & Bahasa",
      "Lapangan Basket & Futsal Standar Nasional",
      "Ruang Musik Akustik dan Studio Rekaman Mini",
    ],
    graduateOutcomes: [
      "Kemampuan berpikir kritis dan kemandirian riset literatur ilmiah sederhana",
      "Pencapaian skor akademik tinggi yang membuka akses leluasa ke jenjang SMA/SMK favorit",
      "Kematangan emosional, etika pergaulan yang santun, dan kepemimpinan yang bertanggung jawab",
    ],
    extracurriculars: ["Robotika Kompetisi", "English Debate Society", "Basket & Voli", "Modern & Traditional Dance", "Fotografi & Jurnalistik"],
    schedule: "Senin – Jumat | 07.15 – 14.30 WIB",
  },
  {
    slug: "sma",
    name: "Sekolah Menengah Atas (SMA)",
    shortName: "SMA Dharma Loka",
    levelBadge: "Menengah Atas (15 - 18 Tahun)",
    ageRange: "Kelas 10 - 12",
    headline: "Integritas Unggul, Wawasan Global, dan Gerbang Perguruan Tinggi Terkemuka",
    overview: "SMA Dharma Loka berfokus pada keunggulan akademik berdaya saing global, persiapan seleksi perguruan tinggi negeri (SNBP/SNBT) maupun universitas terkemuka luar negeri, serta kematangan visi masa depan. Siswa didorong menjadi inovator berkarakter yang siap memberi kontribusi bermakna bagi bangsa.",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Intensif Bimbingan Sukses PTN (SNBT / Mandiri) & Konsultasi Studi Luar Negeri",
      "Kelas Riset Ilmiah Remaja & Bimbingan Olimpiade Sains Tingkat Nasional/Internasional",
      "Program Akselerasi Sertifikasi Bahasa Asing (IELTS / TOEFL & HSK Level 4-5)",
      "Kemitraan Edukasi & Rekomendasi Beasiswa dengan Universitas Rekanan",
      "Seminar Karir & Magang Riset Singkat",
    ],
    curriculumHighlights: [
      {
        title: "Peminatan Sains Terapan & Humaniora Global",
        description: "Pendalaman komprehensif Kalkulus, Fisika Modern, Kimia Organik, Riset Sosial, dan Ekonomi Terapan.",
      },
      {
        title: "University Pathway Mentorship",
        description: "Pendampingan penyusunan portofolio akademik, essay motivasi, dan strategi pemilihan jurusan PTN/PTS/LN.",
      },
      {
        title: "Social Impact Capstone Project",
        description: "Riset aksi lapangan siswa dalam menjawab persoalan lingkungan dan sosial di wilayah Riau dan sekitarnya.",
      },
    ],
    facilities: [
      "Laboratorium Kimia, Fisika & Biologi Terpisah dengan Alat Uji Lengkap",
      "Pusat Studi Digital & E-Library Internasional",
      "Auditorium Konferensi 500 Kapasitas",
      "Fitness Center & Lapangan Olahraga Multifungsi",
    ],
    graduateOutcomes: [
      "Persentase tinggi penerimaan di Perguruan Tinggi Negeri terakreditasi unggul (UI, ITB, UGM, Unand, dsb.) dan kampus internasional",
      "Kecakapan berpikir kritis, kemampuan kepemimpinan etis, serta jaringan jejaring alumni yang kuat",
      "Ketahanan mental dan integritas moral yang teruji menghadapi dinamika era modern",
    ],
    extracurriculars: ["KIR (Karya Ilmiah Remaja)", "Model United Nations (MUN)", "Band & Orkestra Siswa", "Basket Putra/Putri", "Palang Merah Remaja (PMR)"],
    schedule: "Senin – Jumat | 07.15 – 15.15 WIB",
  },
  {
    slug: "smk",
    name: "Sekolah Menengah Kejuruan (SMK)",
    shortName: "SMK Dharma Loka",
    levelBadge: "Vokasi Kejuruan (15 - 18 Tahun)",
    ageRange: "Kelas 10 - 12",
    headline: "Keahlian Spesifik, Sertifikasi Profesi, dan Kesiapan Karier Industri",
    overview: "SMK Dharma Loka mencetak talenta vokasional profesional yang siap terjun langsung ke dunia kerja, berwirausaha mandiri, maupun melanjutkan ke pendidikan tinggi vokasi. Kurikulum kami diselaraskan secara langsung dengan kebutuhan industri modern melalui program teaching factory dan magang intensif.",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Kurikulum Berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) & Link and Match Industri",
      "Sertifikasi Kompetensi Resmi Badan Nasional Sertifikasi Profesi (BNSP)",
      "Program Praktik Kerja Lapangan (PKL) Intensif di Perusahaan Mitra Terkemuka",
      "Teaching Factory (Unit Produksi Nyata) yang Melatih Budaya Kerja Profesional",
      "Dukungan Bursa Kerja Khusus (BKK) untuk Penempatan Kerja Lulusan",
    ],
    curriculumHighlights: [
      {
        title: "Konsentrasi Teknologi Informasi & Jaringan / Desain Komunikasi Visual",
        description: "Penguasaan cloud infrastructure, cybersecurity essentials, computer networking, serta UI/UX dan digital media production.",
      },
      {
        title: "Konsentrasi Akuntansi, Keuangan & Bisnis Digital",
        description: "Praktik software akuntansi enterprise (MYOB, Accurate), perpajakan, e-commerce, dan administrasi perkantoran modern.",
      },
      {
        title: "Workplace Ethics & Entrepreneurship Incubation",
        description: "Penanaman kedisiplinan kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin) dan inkubasi usaha rintisan siswa.",
      },
    ],
    facilities: [
      "Laboratorium Perakitan Komputer & Server Jaringan",
      "Studio Desain Grafis & Render Komputer Spesifikasi Tinggi",
      "Mini Bank & Ruang Simulasi Kantor Modern",
      "Pusat Inkubasi Bisnis & BKK Center",
    ],
    graduateOutcomes: [
      "Mengantongi ijazah resmi SMK plus sertifikat keahlian berstandar nasional BNSP",
      "Tingkat keterserapan tinggi di dunia usaha dan dunia industri (DUDI) dalam kurun 6 bulan setelah kelulusan",
      "Keterampilan praktis berdaya saing serta etos kerja tangguh dan berintegritas tinggi",
    ],
    extracurriculars: ["Klub IT & Web Development", "Klub Desain Digital & Animasi", "Kewirausahaan Kreatif", "Futsal", "Paskibra"],
    schedule: "Senin – Jumat | 07.15 – 15.30 WIB",
  },
];

