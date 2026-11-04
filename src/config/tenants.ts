/**
 * Konfigurasi Multi-Tenant & Tema per Jenjang Pendidikan
 * Sekolah Dharma Loka Pekanbaru (Portal Induk, TK, SD, SMP, SMA)
 *
 * Setiap jenjang memiliki subdomain tersendiri (mis. sd.dharmaloka.sch.id)
 * dengan skema variabel CSS (--primary, --primary-foreground, --accent, --surface, --muted),
 * data kepala sekolah, statistik, kurikulum, dan kuota SPMB masing-masing.
 */

export type TenantId = "portal" | "tk" | "sd" | "smp" | "sma" | "smk";

export interface TenantThemeColors {
  primary: string;
  primaryForeground: string;
  accent: string;
  surface: string;
  muted: string;
  primaryLight: string;
  borderSubtle: string;
  heroGradient: string;
  badgeBg: string;
  diamondClass: string;
  diamondShadow: string;
  paletteBadgeList?: Array<{ label: string; bg: string; text: string }>;
}

export interface PrincipalProfile {
  name: string;
  title: string;
  photo: string;
  quote: string;
  fullGreeting: string[];
  education: string;
}

export interface TenantSpmbInfo {
  isOpen: boolean;
  activeWave: string;
  wavePeriod: string;
  deadlineIso: string;
  quotaTotal: number;
  quotaFilled: number;
  fees: {
    registrationForm: number;
    developmentFee: number; // Uang Pangkal / Pengembangan
    monthlyTuition: number; // SPP Bulanan
    annualActivity: number; // Kegiatan & Buku Tahunan
    uniformPackage: number; // Seragam Lengkap
  };
  ageRequirement: string;
  documentRequirements: string[];
}

export interface TenantConfig {
  id: TenantId;
  levelCode: string;
  name: string;
  shortName: string;
  subdomain: string;
  hostnameExample: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  accreditation: string;
  npsn: string;
  skIzinOperasional: string;
  establishedYear: number;
  theme: TenantThemeColors;
  contact: {
    phone: string;
    whatsapp: string;
    whatsappFormatted: string;
    whatsappDefaultText: string;
    email: string;
    address: string;
    officeHours: string;
  };
  stats: {
    students: number;
    teachers: number;
    achievements: number;
    establishedYear: number;
  };
  principal: PrincipalProfile;
  spmb: TenantSpmbInfo;
  heroSlides: Array<{
    id: string;
    image: string;
    badge: string;
    title: string;
    caption: string;
  }>;
  featuredPrograms: Array<{
    title: string;
    description: string;
    iconName: string;
    badge: string;
  }>;
  extracurriculars: Array<{
    name: string;
    category: "Sains & Teknologi" | "Olahraga" | "Seni & Budaya" | "Bahasa & Kepemimpinan";
    schedule: string;
    achievementHighlight?: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    childClassOrGradYear: string;
    avatar: string;
    quote: string;
  }>;
}

export const TENANTS: Record<TenantId, TenantConfig> = {
  portal: {
    id: "portal",
    levelCode: "YAYASAN",
    name: "Sekolah Dharma Loka Pekanbaru",
    shortName: "Portal Induk Dharma Loka",
    subdomain: "dharmaloka.sch.id",
    hostnameExample: "dharmaloka.sch.id",
    tagline: "Prajña Pāramitā Hṛdaya • Mengembangkan Kebijaksanaan & Budi Pekerti",
    heroTitle: "Ekosistem Pendidikan Terpadu Berkarakter Mulia & Berwawasan Global",
    heroSubtitle:
      "Yayasan Pendidikan Dharma Loka Pekanbaru menaungi jenjang TK, SD, SMP, dan SMA dalam satu lingkungan kampus modern yang ramah anak, mengintegrasikan Kurikulum Nasional, penguasaan 3 bahasa (Indonesia, Inggris, Mandarin), serta inovasi STEAM.",
    description:
      "Portal resmi terpadu Sekolah Dharma Loka Pekanbaru (TK, SD, SMP, SMA). Terakreditasi A (Unggul) dengan rekam jejak lebih dari 35 tahun mendidik generasi masa depan di Provinsi Riau.",
    accreditation: "Terakreditasi A (Unggul) — BAN-PDM",
    npsn: "10403981 (Unit Terpadu)",
    skIzinOperasional: "SK Kemendikbudristek & Disdik Provinsi Riau No. 420/Disdik-Riau/2021",
    establishedYear: 1988,
    theme: {
      primary: "#1D4ED8",
      primaryForeground: "#FFFFFF",
      accent: "#D97706",
      surface: "#F8FAFC",
      muted: "#64748B",
      primaryLight: "#EFF6FF",
      borderSubtle: "#DBEAFE",
      heroGradient: "from-blue-50/70 via-white to-white",
      badgeBg: "bg-royal text-white",
      diamondClass: "bg-[#0B65FF] hover:bg-[#0051DF]",
      diamondShadow: "shadow-blue-500/25",
    },
    contact: {
      phone: "(0761) 859214",
      whatsapp: "6281275008899",
      whatsappFormatted: "+62 812-7500-8899",
      whatsappDefaultText:
        "Halo Panitia SPMB Sekolah Dharma Loka Pekanbaru, saya ingin berkonsultasi mengenai pendaftaran siswa baru.",
      email: "sekretariat@dharmaloka.sch.id",
      address:
        "Jl. Tuanku Tambusai, Komp. Taman Anggrek / Pemancar TVRI, Kel. Labuh Baru Barat, Kec. Payung Sekaki, Kota Pekanbaru, Riau 28292",
      officeHours: "Senin – Jumat: 07.15 – 15.30 WIB | Sabtu: 07.15 – 12.30 WIB",
    },
    stats: {
      students: 1850,
      teachers: 142,
      achievements: 320,
      establishedYear: 1988,
    },
    principal: {
      name: "Dr. Hendra Wijaya, S.Pd., M.M.",
      title: "Direktur Eksekutif Pendidikan Yayasan Dharma Loka",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      quote:
        "Pendidikan sejati tidak berhenti pada tingginya nilai ujian, melainkan pada kejernihan budi pekerti, ketangguhan daya juang, dan kepedulian anak terhadap sesama.",
      fullGreeting: [
        "Selamat datang di portal resmi Sekolah Dharma Loka Pekanbaru. Sejak didirikan pada tahun 1988, kami meyakini bahwa setiap anak memiliki potensi unik yang membutuhkan ekosistem belajar yang hangat, aman, dan menantang secara intelektual.",
        "Melalui kesinambungan kurikulum dari jenjang Taman Kanak-Kanak (TK), Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP), hingga Sekolah Menengah Atas (SMA), siswa Dharma Loka dibimbing untuk fasih berkomunikasi dalam tiga bahasa, tangkas dalam riset sains-teknologi, serta santun dalam perilaku sehari-hari.",
        "Kami mengundang Bapak/Ibu orang tua untuk berkolaborasi bersama kami dalam menyiapkan masa depan putra-putri tercinta.",
      ],
      education: "S3 Manajemen Pendidikan — Universitas Negeri Jakarta",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 (Early Bird) T.A. 2026/2027",
      wavePeriod: "1 Januari – 30 Juni 2026",
      deadlineIso: "2026-12-31T23:59:59+07:00",
      quotaTotal: 460,
      quotaFilled: 318,
      fees: {
        registrationForm: 250000,
        developmentFee: 8500000,
        monthlyTuition: 950000,
        annualActivity: 1800000,
        uniformPackage: 1450000,
      },
      ageRequirement: "Sesuai jenjang yang dituju (TK 4–6 thn, SD min. 6 thn, SMP & SMA lulus jenjang sebelumnya)",
      documentRequirements: [
        "Kartu Keluarga (KK) asli/scan warna",
        "Akta Kelahiran calon siswa",
        "Pas foto berwarna terbaru ukuran 3x4",
        "Rapor / Surat Keterangan Lulus (untuk SD, SMP, SMA)",
        "Sertifikat prestasi akademik/non-akademik (khusus Jalur Prestasi)",
      ],
    },
    heroSlides: [
      {
        id: "portal-1",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
        badge: "Pendidikan Terpadu TK • SD • SMP • SMA",
        title: "Lingkungan Belajar Modern, Ramah Keluarga & Berprestasi Nasional",
        caption: "Kampus terpadu Sekolah Dharma Loka di jantung Kota Pekanbaru.",
      },
      {
        id: "portal-2",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
        badge: "Inovasi STEAM & Robotika",
        title: "Laboratorium Sains, Komputer & Robotika Berstandar Kompetisi",
        caption: "Siswa bereksperimen langsung di bawah bimbingan mentor berpengalaman.",
      },
    ],
    featuredPrograms: [
      {
        title: "Trilingual Active Immersion",
        description:
          "Pembelajaran aktif tiga bahasa (Indonesia, Inggris, Mandarin) secara bertahap dengan persiapan sertifikasi Cambridge & HSK.",
        iconName: "Globe",
        badge: "Bahasa Global",
      },
      {
        title: "Mindfulness & Pendidikan Budi Pekerti",
        description:
          "Pembiasaan refleksi pagi, empati sosial, etika sopan santun, dan budaya anti-perundungan di seluruh jenjang.",
        iconName: "HeartHandshake",
        badge: "Karakter Utama",
      },
      {
        title: "STEAM, Coding & Olimpiade",
        description:
          "Pembinaan terstruktur untuk Olimpiade Sains Nasional (OSN), klub koding, dan rekayasa robotika sejak dini.",
        iconName: "Cpu",
        badge: "Sains & Riset",
      },
      {
        title: "Bimbingan Karir & Universitas Dunia",
        description:
          "Pendampingan portofolio SNBP/SNBT serta jalur beasiswa ke universitas unggulan di dalam dan luar negeri.",
        iconName: "GraduationCap",
        badge: "Masa Depan",
      },
    ],
    extracurriculars: [
      {
        name: "Klub Robotika & IoT Dharma Loka",
        category: "Sains & Teknologi",
        schedule: "Rabu & Jumat, 14.30 – 16.30 WIB",
        achievementHighlight: "Juara 1 Nasional IYRC 2025",
      },
      {
        name: "Olimpiade Matematika & IPA (OSN Club)",
        category: "Sains & Teknologi",
        schedule: "Selasa & Kamis, 14.30 – 16.00 WIB",
        achievementHighlight: "Medali Perak OSN Tingkat Nasional",
      },
      {
        name: "Mandarin Calligraphy & Wushu",
        category: "Seni & Budaya",
        schedule: "Jumat, 14.00 – 16.00 WIB",
        achievementHighlight: "Juara Umum Festival Budaya Riau",
      },
      {
        name: "Tim Basket & Bulutangkis",
        category: "Olahraga",
        schedule: "Rabu & Sabtu, 15.00 – 17.00 WIB",
        achievementHighlight: "Semifinalis DBL Riau Series",
      },
      {
        name: "English Debate & Model United Nations",
        category: "Bahasa & Kepemimpinan",
        schedule: "Kamis, 14.30 – 16.30 WIB",
        achievementHighlight: "Best Speaker NSDC Provinsi Riau",
      },
      {
        name: "Ansambel Musik, Paduan Suara & Tari Tradisional",
        category: "Seni & Budaya",
        schedule: "Sabtu, 08.30 – 11.00 WIB",
        achievementHighlight: "Gold Medal Pesparawi & FLS2N",
      },
    ],
    testimonials: [
      {
        id: "t-portal-1",
        name: "Ibu Melissa Tanoto, S.E.",
        role: "Wali Murid SD & SMP Dharma Loka",
        childClassOrGradYear: "Orang Tua dari Kevin (Kelas 8) & Clara (Kelas 4)",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        quote:
          "Yang paling membuat kami tenang sebagai orang tua adalah keseimbangan antara prestasi akademik dan sopan santun anak. Guru-gurunya sangat komunikatif dan peduli pada perkembangan tiap anak.",
      },
      {
        id: "t-portal-2",
        name: "dr. Alvin Pratama, Sp.A",
        role: "Alumni SMA Dharma Loka & Wali Murid TK",
        childClassOrGradYear: "Alumni Angkatan 2012",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        quote:
          "Pondasi disiplin dan kemampuan bahasa Inggris serta Mandarin yang saya peroleh di Dharma Loka sangat membantu saat menempuh studi kedokteran. Kini anak saya pun saya percayakan di TK Dharma Loka.",
      },
      {
        id: "t-portal-3",
        name: "Bapak Ir. Surya Darmawan",
        role: "Wali Murid SMA Dharma Loka",
        childClassOrGradYear: "Orang Tua dari Nadine (Diterima di NUS Singapura)",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        quote:
          "Tim konselor SMA Dharma Loka mendampingi putri kami sejak kelas 10 dalam menyiapkan riset dan sertifikasi bahasa hingga akhirnya berhasil meraih beasiswa penuh di Singapura.",
      },
    ],
  },

  tk: {
    id: "tk",
    levelCode: "TK",
    name: "TK Dharma Loka Pekanbaru",
    shortName: "TK Dharma Loka",
    subdomain: "tk.dharmaloka.sch.id",
    hostnameExample: "tk.dharmaloka.sch.id",
    tagline: "Bermain Bermakna, Tumbuh Ceria, Berbudi Pekerti Mulia",
    heroTitle: "Awal Perjalanan Belajar yang Hangat, Aman, dan Penuh Kegembiraan",
    heroSubtitle:
      "Pendidikan anak usia dini (Playgroup, TK A, TK B) dengan pendekatan Montessori & Active Sensory Play, mengenalkan kemandirian, sopan santun, serta keaksaraan awal dalam Bahasa Indonesia, Inggris, dan Mandarin.",
    description:
      "TK Dharma Loka Pekanbaru menyediakan lingkungan belajar ramah anak dengan rasio guru pendamping ideal, taman bermain sensorik dalam & luar ruang, serta pembiasaan karakter sejak usia 3–6 tahun.",
    accreditation: "Terakreditasi A (Unggul) — BAN-PAUD",
    npsn: "10496511",
    skIzinOperasional: "SK Dinas Pendidikan Kota Pekanbaru No. 421.1/Disdik-PAUD/089",
    establishedYear: 1990,
    theme: {
      primary: "#FF3366", // Joyful Strawberry Rose & Colorful
      primaryForeground: "#FFFFFF",
      accent: "#F59E0B", // Sunny Warm Yellow
      surface: "#FFF7ED", // Warm Peach & Soft Pastel
      muted: "#64748B",
      primaryLight: "#FFE4E8",
      borderSubtle: "#FECDD6",
      heroGradient: "from-rose-50/90 via-amber-50/50 to-white",
      badgeBg: "bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-white",
      diamondClass: "bg-gradient-to-br from-[#FF3366] via-[#FB7185] to-[#F59E0B] hover:brightness-110",
      diamondShadow: "shadow-rose-500/30",
      paletteBadgeList: [
        { label: "🧸 Playgroup & TK Ceria", bg: "bg-rose-100", text: "text-rose-700" },
        { label: "☀️ Tumbuh Bahagia", bg: "bg-amber-100", text: "text-amber-800" },
        { label: "🎨 Sensori Aktif", bg: "bg-emerald-100", text: "text-emerald-800" },
        { label: "🎵 Trilingual Fun", bg: "bg-sky-100", text: "text-sky-800" },
        { label: "🌈 Karakter Santun", bg: "bg-purple-100", text: "text-purple-800" },
      ],
    },
    contact: {
      phone: "(0761) 859215",
      whatsapp: "6281275008891",
      whatsappFormatted: "+62 812-7500-8891",
      whatsappDefaultText:
        "Halo Admin TK Dharma Loka Pekanbaru, saya ingin menanyakan info pendaftaran & jadwal observasi TK.",
      email: "tk@dharmaloka.sch.id",
      address: "Gedung PAUD & TK Dharma Loka, Jl. Tuanku Tambusai Komp. Taman Anggrek, Pekanbaru",
      officeHours: "Senin – Jumat: 07.15 – 13.30 WIB | Sabtu: 07.30 – 12.00 WIB",
    },
    stats: {
      students: 240,
      teachers: 24,
      achievements: 45,
      establishedYear: 1990,
    },
    principal: {
      name: "Dra. Lusiana Lim, S.Pd.AUD",
      title: "Kepala Sekolah TK Dharma Loka Pekanbaru",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      quote:
        "Di usia emas anak, rasa aman dan bahagia adalah kunci utama. Ketika anak merasa dicintai dan dihargai, rasa ingin tahunya akan tumbuh secara alami.",
      fullGreeting: [
        "Selamat datang di TK Dharma Loka Pekanbaru. Masa kanak-kanak adalah periode emas pembentukan karakter, kelekatan emosional, dan kecintaan terhadap belajar.",
        "Kami merancang setiap sudut ruang kelas dan area bermain sensorik agar anak bebas bereksplorasi dengan aman, belajar berbagi dengan teman, mengenal kosakata Bahasa Inggris dan Mandarin lewat lagu dan cerita, serta terbiasa mandiri dalam kegiatan sehari-hari.",
      ],
      education: "S1 Pendidikan Anak Usia Dini — Universitas Terbuka & Sertifikasi Montessori",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 TK & Playgroup T.A. 2026/2027",
      wavePeriod: "1 Januari – 30 Juni 2026",
      deadlineIso: "2026-12-31T23:59:59+07:00",
      quotaTotal: 90,
      quotaFilled: 68,
      fees: {
        registrationForm: 200000,
        developmentFee: 5500000,
        monthlyTuition: 650000,
        annualActivity: 1250000,
        uniformPackage: 1100000,
      },
      ageRequirement: "Playgroup: min. 3 tahun | TK A: min. 4 tahun | TK B: min. 5 tahun per Juli 2026",
      documentRequirements: [
        "Scan / Fotokopi Akta Kelahiran Anak",
        "Scan / Fotokopi Kartu Keluarga (KK)",
        "Pas foto anak berwarna ukuran 3x4 (2 lembar)",
        "Catatan imunisasi dasar / kartu tumbuh kembang anak",
      ],
    },
    heroSlides: [
      {
        id: "tk-1",
        image:
          "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1400&q=80",
        badge: "TK Dharma Loka • Playgroup, TK A & TK B",
        title: "Eksplorasi Sensorik & Kemandirian di Usia Emas Anak",
        caption: "Pembelajaran tematik berbasis proyek dan permainan edukatif.",
      },
      {
        id: "tk-2",
        image:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80",
        badge: "Trilingual Early Exposure",
        title: "Mengenal Bahasa Indonesia, Inggris & Mandarin Lewat Lagu & Cerita",
        caption: "Suasana kelas yang interaktif, penuh warna, dan didampingi 2 guru per kelas.",
      },
    ],
    featuredPrograms: [
      {
        title: "Montessori Practical Life",
        description:
          "Melatih koordinasi motorik halus, kerapian, dan kemandirian anak dalam aktivitas harian.",
        iconName: "Sparkles",
        badge: "Kemandirian",
      },
      {
        title: "Fun Trilingual Storytelling",
        description:
          "Pengenalan kosakata harian Bahasa Inggris & Mandarin secara menyenangkan melalui mendongeng dan gerak lagu.",
        iconName: "BookOpen",
        badge: "3 Bahasa",
      },
      {
        title: "Sensory & Outdoor Nature Play",
        description:
          "Eksplorasi tekstur, warna, berkebun mini, dan permainan fisik di playground berstandar keamanan tinggi.",
        iconName: "Sun",
        badge: "Motorik & Alam",
      },
    ],
    extracurriculars: [
      { name: "Mewarnai & Lukis Kreatif", category: "Seni & Budaya", schedule: "Selasa, 10.30 WIB" },
      { name: "Tari Anak & Gerak Irama", category: "Seni & Budaya", schedule: "Kamis, 10.30 WIB" },
      { name: "Mandarin Rhymes & Songs", category: "Bahasa & Kepemimpinan", schedule: "Jumat, 10.00 WIB" },
      { name: "Senam Ceria & Renang Dasar", category: "Olahraga", schedule: "Sabtu, 08.30 WIB" },
    ],
    testimonials: [
      {
        id: "t-tk-1",
        name: "Ibu Jessica Wijaya",
        role: "Wali Murid TK B",
        childClassOrGradYear: "Orang Tua dari Ethan (TK B Ceria)",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        quote:
          "Awalnya Ethan pemalu sekali, tapi setelah 3 bulan di TK Dharma Loka ia jadi berani tampil bercerita di depan kelas dan selalu semangat berangkat sekolah setiap pagi.",
      },
    ],
  },

  sd: {
    id: "sd",
    levelCode: "SD",
    name: "SD Dharma Loka Pekanbaru",
    shortName: "SD Dharma Loka",
    subdomain: "sd.dharmaloka.sch.id",
    hostnameExample: "sd.dharmaloka.sch.id",
    tagline: "Pondasi Literasi, Numerasi, Sains & Budi Pekerti yang Kokoh",
    heroTitle: "Membangun Fondasi Akademik Kuat dan Karakter Santun Sejak Sekolah Dasar",
    heroSubtitle:
      "SD Dharma Loka memadukan Kurikulum Nasional dengan penguatan Matematika-Sains, program Trilingual aktif (Indonesia, Inggris, Mandarin), serta pembiasaan karakter disiplin dan cinta literasi.",
    description:
      "SD Dharma Loka Pekanbaru (Terakreditasi A) membekali siswa kelas 1–6 dengan kecakapan literasi, numerasi, eksperimen sains dasar, komputer, dan pembinaan karakter harian.",
    accreditation: "Terakreditasi A (Unggul) — Nilai 96",
    npsn: "10403982",
    skIzinOperasional: "SK Dinas Pendidikan Kota Pekanbaru No. 421.2/Disdik-SD/114",
    establishedYear: 1992,
    theme: {
      primary: "#0284C7", // Vibrant Ocean Blue
      primaryForeground: "#FFFFFF",
      accent: "#EA580C", // Joyful Tangerine / Red-Orange
      surface: "#F0F9FF",
      muted: "#475569",
      primaryLight: "#E0F2FE",
      borderSubtle: "#BAE6FD",
      heroGradient: "from-sky-50 via-blue-50/30 to-white",
      badgeBg: "bg-sky-600 text-white",
      diamondClass: "bg-[#0284C7] hover:bg-[#0369A1]",
      diamondShadow: "shadow-sky-500/30",
    },
    contact: {
      phone: "(0761) 859216",
      whatsapp: "6281275008892",
      whatsappFormatted: "+62 812-7500-8892",
      whatsappDefaultText:
        "Halo Admin SD Dharma Loka Pekanbaru, saya ingin berkonsultasi mengenai pendaftaran siswa baru SD.",
      email: "sd@dharmaloka.sch.id",
      address: "Kampus SD Dharma Loka, Jl. Tuanku Tambusai Komp. Taman Anggrek, Pekanbaru",
      officeHours: "Senin – Jumat: 07.00 – 15.00 WIB | Sabtu: 07.15 – 12.00 WIB",
    },
    stats: {
      students: 680,
      teachers: 48,
      achievements: 115,
      establishedYear: 1992,
    },
    principal: {
      name: "Budi Santoso, S.Pd., M.Pd.",
      title: "Kepala Sekolah SD Dharma Loka Pekanbaru",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      quote:
        "Enam tahun di Sekolah Dasar menentukan cara anak memandang ilmu pengetahuan. Kami memastikan setiap anak menguasai konsep dasar dengan gembira, bukan sekadar menghafal.",
      fullGreeting: [
        "Selamat datang di SD Dharma Loka Pekanbaru. Pada jenjang Sekolah Dasar, kami menitikberatkan pada keseimbangan antara ketuntasan literasi-numerasi dan pembentukan kebiasaan baik (good habits).",
        "Melalui pembelajaran berbasis proyek, praktikum IPA sejak kelas bawah, serta pembinaan klub olimpiade dan kesenian, setiap siswa difasilitasi untuk menemukan minat terbaiknya.",
      ],
      education: "S2 Pendidikan Dasar — Universitas Pendidikan Indonesia",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 SD T.A. 2026/2027",
      wavePeriod: "1 Januari – 30 Juni 2026",
      deadlineIso: "2026-12-31T23:59:59+07:00",
      quotaTotal: 150,
      quotaFilled: 112,
      fees: {
        registrationForm: 250000,
        developmentFee: 7800000,
        monthlyTuition: 850000,
        annualActivity: 1600000,
        uniformPackage: 1350000,
      },
      ageRequirement: "Minimal berusia 6 tahun pada tanggal 1 Juli 2026 (tidak ada tes calistung memberatkan)",
      documentRequirements: [
        "Scan Akta Kelahiran & Kartu Keluarga (KK)",
        "Surat Keterangan Tamat TK (jika berasal dari TK)",
        "Pas foto berwarna ukuran 3x4",
        "KTP kedua orang tua/wali",
      ],
    },
    heroSlides: [
      {
        id: "sd-1",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80",
        badge: "SD Dharma Loka • Kelas 1 s/d 6",
        title: "Pembelajaran Aktif, Eksperimen Sains & Penguatan Karakter Harian",
        caption: "Siswa belajar di ruang kelas ber-AC dengan smart-board interaktif.",
      },
      {
        id: "sd-2",
        image:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80",
        badge: "Gerakan Literasi & Trilingual",
        title: "Perpustakaan Ramah Anak dengan ribuan Koleksi Buku 3 Bahasa",
        caption: "Program membaca 15 menit setiap pagi dan presentasi buku bulanan.",
      },
    ],
    featuredPrograms: [
      {
        title: "Cambridge & HSK Young Learners",
        description:
          "Kurikulum Bahasa Inggris & Mandarin terstruktur dengan native/certified speaker sejak Kelas 1.",
        iconName: "Languages",
        badge: "Sertifikasi Bahasa",
      },
      {
        title: "Junior Scientist & Math Olympiad",
        description:
          "Eksperimen laboratorium IPA mingguan dan kelas pembinaan OSN Matematika & IPA.",
        iconName: "Microscope",
        badge: "Sains & Numerasi",
      },
      {
        title: "Coding & Robotics for Kids",
        description:
          "Pengenalan logika pemrograman visual (Scratch) dan perakitan robotik dasar mulai Kelas 3.",
        iconName: "Bot",
        badge: "Teknologi",
      },
    ],
    extracurriculars: [
      { name: "Klub Olimpiade Matematika & Sains SD", category: "Sains & Teknologi", schedule: "Selasa & Kamis, 13.30 WIB" },
      { name: "Robotik & Scratch Coding", category: "Sains & Teknologi", schedule: "Rabu, 13.30 WIB" },
      { name: "Pramuka & Kepanduan Karakter", category: "Bahasa & Kepemimpinan", schedule: "Jumat, 13.30 WIB" },
      { name: "Wushu, Futsal & Bulutangkis", category: "Olahraga", schedule: "Sabtu, 08.00 WIB" },
    ],
    testimonials: [
      {
        id: "t-sd-1",
        name: "Bapak Hendra Kusuma",
        role: "Wali Murid Kelas 5 SD",
        childClassOrGradYear: "Orang Tua dari Richie (Peraih Emas OSN Matematika Kota)",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        quote:
          "Guru-guru di SD Dharma Loka sangat sabar melihat bakat anak. Richie dibimbing di klub olimpiade sekolah tanpa dipungut biaya tambahan hingga juara tingkat kota.",
      },
    ],
  },

  smp: {
    id: "smp",
    levelCode: "SMP",
    name: "SMP Dharma Loka Pekanbaru",
    shortName: "SMP Dharma Loka",
    subdomain: "smp.dharmaloka.sch.id",
    hostnameExample: "smp.dharmaloka.sch.id",
    tagline: "Eksplorasi Bakat, Berpikir Kritis & Kepemimpinan Remaja",
    heroTitle: "Mengasah Nalar Kritis, Inovasi Teknologi & Karakter Kepemimpinan Remaja",
    heroSubtitle:
      "SMP Dharma Loka memfasilitasi masa transisi remaja dengan proyek riset STEAM, debat bahasa asing, kepemimpinan organisasi siswa, serta pendampingan konseling yang suportif.",
    description:
      "SMP Dharma Loka Pekanbaru (Terakreditasi A) mempersiapkan siswa kelas 7–9 menjadi pembelajar mandiri yang unggul di bidang sains, bahasa internasional, teknologi digital, dan budi pekerti.",
    accreditation: "Terakreditasi A (Unggul) — Nilai 97",
    npsn: "10403983",
    skIzinOperasional: "SK Dinas Pendidikan Kota Pekanbaru No. 421.3/Disdik-SMP/205",
    establishedYear: 1996,
    theme: {
      primary: "#0D9488", // Modern Deep Teal / Cyan Hijau Laut
      primaryForeground: "#FFFFFF",
      accent: "#0284C7", // Sky Blue
      surface: "#F0FDFA",
      muted: "#334155",
      primaryLight: "#CCFBF1",
      borderSubtle: "#99F6E4",
      heroGradient: "from-teal-50 via-emerald-50/30 to-white",
      badgeBg: "bg-teal-700 text-white",
      diamondClass: "bg-[#0D9488] hover:bg-[#0F766E]",
      diamondShadow: "shadow-teal-500/30",
    },
    contact: {
      phone: "(0761) 859217",
      whatsapp: "6281275008893",
      whatsappFormatted: "+62 812-7500-8893",
      whatsappDefaultText:
        "Halo Admin SMP Dharma Loka Pekanbaru, saya ingin menanyakan informasi SPMB jenjang SMP.",
      email: "smp@dharmaloka.sch.id",
      address: "Kampus SMP Dharma Loka, Jl. Tuanku Tambusai Komp. Taman Anggrek, Pekanbaru",
      officeHours: "Senin – Jumat: 07.00 – 15.30 WIB | Sabtu: 07.15 – 12.30 WIB",
    },
    stats: {
      students: 490,
      teachers: 36,
      achievements: 88,
      establishedYear: 1996,
    },
    principal: {
      name: "Irwan Setiawan, S.Si., M.Pd.",
      title: "Kepala Sekolah SMP Dharma Loka Pekanbaru",
      photo:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      quote:
        "Usia SMP adalah fase pencarian jati diri. Tugas kami adalah menyalurkan energi besar mereka ke dalam riset ilmiah, karya kreatif, olahraga, dan kepemimpinan yang positif.",
      fullGreeting: [
        "Selamat datang di SMP Dharma Loka Pekanbaru. Kami memahami bahwa siswa usia remaja membutuhkan pendekatan pendidikan yang menghargai pendapat mereka sekaligus memberikan batasan moral yang jelas.",
        "Di SMP Dharma Loka, pembelajaran tidak hanya berlangsung di ruang kelas, tetapi juga di laboratorium fisika-biologi, studio multimedia, serta melalui proyek kolaboratif lintas mata pelajaran.",
      ],
      education: "S2 Pendidikan Sains — Universitas Negeri Padang",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 SMP (Reguler & Prestasi) T.A. 2026/2027",
      wavePeriod: "1 Januari – 30 Juni 2026",
      deadlineIso: "2026-12-31T23:59:59+07:00",
      quotaTotal: 120,
      quotaFilled: 84,
      fees: {
        registrationForm: 250000,
        developmentFee: 8800000,
        monthlyTuition: 980000,
        annualActivity: 1850000,
        uniformPackage: 1500000,
      },
      ageRequirement: "Lulusan SD/MI sederajat, usia maksimal 15 tahun pada 1 Juli 2026",
      documentRequirements: [
        "Scan Rapor SD Kelas 4, 5, dan Semester 1 Kelas 6",
        "Scan Akta Kelahiran & Kartu Keluarga (KK)",
        "Pas foto berwarna terbaru ukuran 3x4",
        "Sertifikat kejuaraan (bagi pendaftar JalurBeasiswa Prestasi)",
      ],
    },
    heroSlides: [
      {
        id: "smp-1",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
        badge: "SMP Dharma Loka • Kelas 7 s/d 9",
        title: "Eksperimen Sains Terapan, Coding Python & Kepemimpinan OSIS",
        caption: "Praktikum langsung di laboratorium sains terpadu.",
      },
    ],
    featuredPrograms: [
      {
        title: "Applied STEAM & Python Coding",
        description:
          "Kurikulum informatika praktis mencakup pemrograman Python dasar, desain grafis, dan robotika mikrokontroler.",
        iconName: "Code2",
        badge: "Digital Skills",
      },
      {
        title: "Youth Leadership & Public Speaking",
        description:
          "Pelatihan kepemimpinan OSIS, debat Bahasa Inggris/Indonesia, dan proyek bakti sosial kemasyarakatan.",
        iconName: "Award",
        badge: "Kepemimpinan",
      },
      {
        title: "Bina Prestasi OSN & FLS2N",
        description:
          "Kelas inkubasi intensif bagi siswa berbakat di bidang Matematika, IPA, IPS, serta Seni Budaya.",
        iconName: "Trophy",
        badge: "Kompetisi",
      },
    ],
    extracurriculars: [
      { name: "Tim Robotika & Pemrograman", category: "Sains & Teknologi", schedule: "Rabu & Jumat, 14.30 WIB" },
      { name: "English & Mandarin Speech Club", category: "Bahasa & Kepemimpinan", schedule: "Kamis, 14.30 WIB" },
      { name: "Tim Basket Putra/Putri", category: "Olahraga", schedule: "Rabu & Sabtu, 15.00 WIB" },
      { name: "Fotografi & Jurnalistik Siswa", category: "Seni & Budaya", schedule: "Jumat, 14.30 WIB" },
    ],
    testimonials: [
      {
        id: "t-smp-1",
        name: "Ibu Drg. Ratna Sari",
        role: "Wali Murid Kelas 9 SMP",
        childClassOrGradYear: "Orang Tua dari Jonathan (Ketua OSIS SMP 2025)",
        avatar:
          "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80",
        quote:
          "Lingkungan pergaulan di SMP Dharma Loka sangat positif dan bebas bullying. Anak saya berkembang pesat baik secara akademik maupun kepercayaan dirinya saat berbicara di depan umum.",
      },
    ],
  },

  sma: {
    id: "sma",
    levelCode: "SMA",
    name: "SMA Dharma Loka Pekanbaru",
    shortName: "SMA Dharma Loka",
    subdomain: "sma.dharmaloka.sch.id",
    hostnameExample: "sma.dharmaloka.sch.id",
    tagline: "Riset Akademik, Wawasan Global & Persiapan Universitas Terkemuka",
    heroTitle: "Menyiapkan Pemimpin Masa Depan Menuju Perguruan Tinggi Terbaik Dunia",
    heroSubtitle:
      "SMA Dharma Loka menghadirkan peminatan MIPA-Teknologi dan Sosial-Bisnis Digital, bimbingan intensif UTBK-SNBT, persiapan IELTS & HSK Level 4–5, serta konseling beasiswa universitas dalam dan luar negeri.",
    description:
      "SMA Dharma Loka Pekanbaru (Terakreditasi A) membekali siswa kelas 10–12 dengan ketajaman riset ilmiah, portofolio kompetisi internasional, serta kesiapan karir dan perguruan tinggi.",
    accreditation: "Terakreditasi A (Unggul) — Nilai 98",
    npsn: "10403984",
    skIzinOperasional: "SK Dinas Pendidikan Provinsi Riau No. 421.4/Disdik-Riau/SMA/312",
    establishedYear: 2001,
    theme: {
      primary: "#4F46E5", // Prestigious Deep Indigo / Sapphire
      primaryForeground: "#FFFFFF",
      accent: "#D97706", // Regal Academic Gold
      surface: "#F5F3FF",
      muted: "#334155",
      primaryLight: "#EDE9FE",
      borderSubtle: "#DDD6FE",
      heroGradient: "from-indigo-50/80 via-slate-50/40 to-white",
      badgeBg: "bg-indigo-600 text-white",
      diamondClass: "bg-[#4F46E5] hover:bg-[#4338CA]",
      diamondShadow: "shadow-indigo-500/30",
    },
    contact: {
      phone: "(0761) 859218",
      whatsapp: "6281275008894",
      whatsappFormatted: "+62 812-7500-8894",
      whatsappDefaultText:
        "Halo Panitia SPMB SMA Dharma Loka Pekanbaru, saya ingin berkonsultasi mengenai pendaftaran & jalur beasiswa SMA.",
      email: "sma@dharmaloka.sch.id",
      address: "Kampus SMA Dharma Loka, Jl. Tuanku Tambusai Komp. Taman Anggrek, Pekanbaru",
      officeHours: "Senin – Jumat: 07.00 – 16.00 WIB | Sabtu: 07.15 – 12.30 WIB",
    },
    stats: {
      students: 440,
      teachers: 34,
      achievements: 72,
      establishedYear: 2001,
    },
    principal: {
      name: "Dr. Vincentius Halim, M.Sc.",
      title: "Kepala Sekolah SMA Dharma Loka Pekanbaru",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      quote:
        "Di SMA Dharma Loka, setiap siswa didampingi merancang peta jalan masa depannya sejak kelas 10—apakah menuju fakultas kedokteran, teknik, bisnis di PTN favorit, maupun universitas riset internasional.",
      fullGreeting: [
        "Selamat datang di SMA Dharma Loka Pekanbaru. Sebagai jenjang puncak pendidikan menengah, kami memfokuskan pembelajaran pada kedalaman analisis ilmiah, kemahiran komunikasi internasional, dan kematangan karakter.",
        "Sebanyak 94% lulusan kami diterima di Perguruan Tinggi Negeri terkemuka (UI, ITB, UGM, Unri, Unpad) serta universitas ternama di Singapura, Malaysia, Tiongkok, Taiwan, dan Australia.",
      ],
      education: "S3 Ilmu Kimia Terapan — National Taiwan University",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 SMA (Reguler & Beasiswa Prestasi) T.A. 2026/2027",
      wavePeriod: "1 Januari – 30 Juni 2026",
      deadlineIso: "2026-12-31T23:59:59+07:00",
      quotaTotal: 100,
      quotaFilled: 54,
      fees: {
        registrationForm: 300000,
        developmentFee: 9500000,
        monthlyTuition: 1100000,
        annualActivity: 2100000,
        uniformPackage: 1650000,
      },
      ageRequirement: "Lulusan SMP/MTs sederajat, usia maksimal 18 tahun pada 1 Juli 2026",
      documentRequirements: [
        "Scan Rapor SMP Semester 1 s/d 5",
        "Scan Akta Kelahiran, Kartu Keluarga (KK), dan NISN",
        "Pas foto berwarna terbaru ukuran 3x4",
        "Piagam penghargaan akademik/non-akademik (untuk Jalur Beasiswa Prestasi hingga 100%)",
      ],
    },
    heroSlides: [
      {
        id: "sma-1",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
        badge: "SMA Dharma Loka • MIPA-Tech & Sosial-Bisnis",
        title: "94% Lulusan Diterima di PTN Terbaik & Universitas Luar Negeri",
        caption: "Pendampingan intensif riset karya ilmiah remaja, persiapan UTBK, IELTS & HSK.",
      },
    ],
    featuredPrograms: [
      {
        title: "University Placement & Scholarship Center",
        description:
          "Konseling satu-satu pemilihan jurusan SNBP/SNBT serta aplikasi beasiswa ke Singapura, Tiongkok, Taiwan & Australia.",
        iconName: "Compass",
        badge: "Karir & Kampus",
      },
      {
        title: "Advanced STEM Research & AI Lab",
        description:
          "Riset laboratorium kimia, biologi molekuler dasar, fisika terapan, serta kecerdasan buatan (AI & Data Science).",
        iconName: "Atom",
        badge: "Riset Ilmiah",
      },
      {
        title: "Entrepreneurship & Financial Literacy",
        description:
          "Inkubator bisnis siswa, simulasi pasar modal, dan proyek kewirausahaan sosial yang nyata.",
        iconName: "Briefcase",
        badge: "Bisnis Digital",
      },
    ],
    extracurriculars: [
      { name: "Karya Ilmiah Remaja (KIR) & OSN SMA", category: "Sains & Teknologi", schedule: "Selasa & Kamis, 15.00 WIB" },
      { name: "Model United Nations (MUN) & Debate", category: "Bahasa & Kepemimpinan", schedule: "Rabu, 15.00 WIB" },
      { name: "Tim Basket DBL & E-Sports Akademik", category: "Olahraga", schedule: "Jumat & Sabtu, 15.30 WIB" },
      { name: "Young Entrepreneurs Club", category: "Bahasa & Kepemimpinan", schedule: "Kamis, 15.00 WIB" },
    ],
    testimonials: [
      {
        id: "t-sma-1",
        name: "Clarissa Wijaya",
        role: "Alumni SMA Dharma Loka 2024",
        childClassOrGradYear: "Mahasiswi Teknik Industri ITB (Jalur SNBP)",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        quote:
          "Bimbingan riset dan pemetaan nilai rapor dari guru BK SMA Dharma Loka sangat terstruktur. Saya sangat terbantu hingga lulus SNBP di ITB.",
      },
    ],
  },

  smk: {
    id: "smk",
    levelCode: "SMK",
    name: "SMK Dharma Loka Pekanbaru",
    shortName: "SMK Dharma Loka",
    subdomain: "smk.dharmaloka.sch.id",
    hostnameExample: "smk.dharmaloka.sch.id",
    tagline: "Kompetensi Vokasi Teknologi, Bisnis Digital & Siap Kerja Global",
    heroTitle: "Pendidikan Vokasi Unggul Berstandar Industri & Wirausaha Teknologi",
    heroSubtitle:
      "SMK Dharma Loka membekali siswa dengan keahlian praktis Rekayasa Perangkat Lunak, Jaringan Komputer, dan Bisnis Digital yang terhubung langsung dengan mitra industri.",
    description:
      "SMK Dharma Loka Pekanbaru (Terakreditasi A) mengintegrasikan sertifikasi kompetensi industri, praktik kerja lapangan terarah, dan penguasaan bahasa asing untuk mencetak lulusan siap kerja maupun kuliah.",
    accreditation: "Terakreditasi A (Unggul) — Nilai 95",
    npsn: "10403985",
    skIzinOperasional: "SK Dinas Pendidikan Provinsi Riau No. 421.5/Disdik-SMK/112",
    establishedYear: 2005,
    theme: {
      primary: "#EA580C", // Industrial Flame Orange & Vocational Tech
      primaryForeground: "#FFFFFF",
      accent: "#2563EB", // Cobalt Tech Blue
      surface: "#FFFBEB",
      muted: "#334155",
      primaryLight: "#FEF3C7",
      borderSubtle: "#FED7AA",
      heroGradient: "from-amber-50 via-orange-50/30 to-white",
      badgeBg: "bg-orange-600 text-white",
      diamondClass: "bg-[#EA580C] hover:bg-[#C2410C]",
      diamondShadow: "shadow-orange-500/30",
    },
    contact: {
      phone: "(0761) 859219",
      whatsapp: "6281275008895",
      whatsappFormatted: "+62 812-7500-8895",
      whatsappDefaultText:
        "Halo Admin SMK Dharma Loka Pekanbaru, saya ingin menanyakan informasi jurusan dan SPMB jenjang SMK.",
      email: "smk@dharmaloka.sch.id",
      address: "Kampus SMK Dharma Loka, Jl. Tuanku Tambusai Komp. Taman Anggrek, Pekanbaru",
      officeHours: "Senin – Jumat: 07.00 – 16.00 WIB | Sabtu: 07.15 – 12.30 WIB",
    },
    stats: {
      students: 380,
      teachers: 32,
      achievements: 65,
      establishedYear: 2005,
    },
    principal: {
      name: "Ir. Budi Santoso, M.Kom.",
      title: "Kepala SMK Dharma Loka Pekanbaru",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      quote:
        "Lulusan SMK Dharma Loka tidak hanya mahir secara teknis, tetapi juga memiliki etos kerja profesional, kecakapan komunikasi 3 bahasa, dan jiwa wirausaha mandiri.",
      fullGreeting: [
        "Selamat datang di portal resmi SMK Dharma Loka Pekanbaru. Kami menyelenggarakan pendidikan kejuruan berbasis Teaching Factory yang selaras dengan kebutuhan industri teknologi dan bisnis modern.",
        "Melalui laboratorium jaringan berstandar enterprise, studio pengembangan perangkat lunak, dan inkubator bisnis digital, siswa dibimbing untuk menghasilkan karya nyata dan mengantongi sertifikasi kompetensi nasional maupun internasional.",
      ],
      education: "S2 Ilmu Komputer — Pengalaman Industri & Pendidikan Vokasi 16 Tahun",
    },
    spmb: {
      isOpen: true,
      activeWave: "Gelombang 1 (Jalur Prestasi & Vokasi)",
      wavePeriod: "1 Januari – 31 Maret 2026",
      deadlineIso: "2026-03-31T23:59:59+07:00",
      quotaTotal: 120,
      quotaFilled: 88,
      fees: {
        registrationForm: 300000,
        developmentFee: 9500000,
        monthlyTuition: 950000,
        annualActivity: 2100000,
        uniformPackage: 1750000,
      },
      ageRequirement: "Lulusan SMP/MTs sederajat, maksimal berusia 20 tahun pada 1 Juli 2026",
      documentRequirements: [
        "Scan Rapor SMP/MTs Semester 1 s/d 5",
        "Scan Akta Kelahiran & Kartu Keluarga (KK)",
        "Pas foto berwarna ukuran 3x4",
        "Surat Keterangan Sehat (tidak buta warna untuk jurusan TI)",
      ],
    },
    heroSlides: [
      {
        id: "smk-1",
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80",
        badge: "SMK Dharma Loka • Vokasi Teknologi & Bisnis",
        title: "Laboratorium Praktik Berstandar Industri & Sertifikasi Kompetensi",
        caption: "Praktik jaringan server, cloud computing, dan rekayasa perangkat lunak.",
      },
      {
        id: "smk-2",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
        badge: "Mitra Industri & Kewirausahaan",
        title: "Program Magang Terarah & Inkubator Wirausaha Muda Digital",
        caption: "Lulusan siap berkarir di perusahaan teknologi maupun melanjutkan kuliah.",
      },
    ],
    featuredPrograms: [
      {
        title: "IT Network Systems & Cloud Administration",
        description:
          "Pembelajaran administrasi jaringan enterprise, keamanan siber, dan persiapan sertifikasi MikroTik/Cisco.",
        iconName: "Award",
        badge: "Teknik Jaringan",
      },
      {
        title: "Software Engineering & Web Development",
        description:
          "Pembuatan aplikasi web & mobile full-stack dengan proyek nyata bersama mitra industri.",
        iconName: "Bot",
        badge: "Rekayasa Perangkat Lunak",
      },
      {
        title: "Digital Business & E-Commerce Mandarin-English",
        description:
          "Pemasaran digital, manajemen bisnis modern, dan korespondensi perdagangan internasional.",
        iconName: "Globe",
        badge: "Bisnis Digital",
      },
    ],
    extracurriculars: [
      { name: "IT Club, Cyber Security & LKS Network", category: "Sains & Teknologi", schedule: "Selasa & Kamis, 15.00 WIB", achievementHighlight: "Juara 1 LKS SMK Tingkat Provinsi Riau 2026" },
      { name: "Startup & Digital Marketing Club", category: "Bahasa & Kepemimpinan", schedule: "Rabu, 15.00 WIB" },
      { name: "English & Mandarin Conversation Club", category: "Bahasa & Kepemimpinan", schedule: "Jumat, 14.30 WIB" },
      { name: "Basket, Futsal & E-Sports Akademik", category: "Olahraga", schedule: "Sabtu, 08.00 WIB" },
    ],
    testimonials: [
      {
        id: "t-smk-1",
        name: "Derry Pratama",
        role: "Siswa Kelas 12 SMK Dharma Loka",
        childClassOrGradYear: "Juara 1 LKS SMK Provinsi Riau Bidang IT Network Systems",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        quote:
          "Fasilitas laboratorium jaringan di SMK Dharma Loka sangat lengkap. Kami terbiasa praktik langsung dengan perangkat server dan router standar industri.",
      },
    ],
  },
};

export const TENANT_LIST: TenantConfig[] = [
  TENANTS.portal,
  TENANTS.tk,
  TENANTS.sd,
  TENANTS.smp,
  TENANTS.sma,
  TENANTS.smk,
];

export const UNIT_TENANTS: TenantConfig[] = [
  TENANTS.tk,
  TENANTS.sd,
  TENANTS.smp,
  TENANTS.sma,
  TENANTS.smk,
];

/**
 * Deteksi jenjang dari hostname/subdomain (mis. sd.dharmaloka.sch.id atau sd.localhost:3000)
 * dengan dukungan override parameter/cookie untuk kemudahan demonstrasi di satu host.
 */
export function resolveTenantId(
  hostname?: string | null,
  overrideJenjang?: string | null
): TenantId {
  if (overrideJenjang) {
    const clean = overrideJenjang.toLowerCase().trim() as TenantId;
    if (clean in TENANTS) {
      return clean;
    }
  }

  if (hostname) {
    const host = hostname.toLowerCase().split(":")[0];
    if (host.startsWith("tk.")) return "tk";
    if (host.startsWith("sd.")) return "sd";
    if (host.startsWith("smp.")) return "smp";
    if (host.startsWith("sma.")) return "sma";
    if (host.startsWith("smk.")) return "smk";
  }

  return "portal";
}

export function getTenantConfig(tenantId?: string | null): TenantConfig {
  if (tenantId && tenantId in TENANTS) {
    return TENANTS[tenantId as TenantId];
  }
  return TENANTS.portal;
}

/**
 * Membangun URL absolut atau relatif untuk berpindah antar-jenjang dan kembali ke Halaman Pusat.
 * Mendukung localhost dan subdomain riil (tk/sd/smp/sma/smk.dharmaloka.sch.id).
 */
export function getTenantUrl(targetId: TenantId): string {
  if (typeof window === "undefined") {
    return targetId === "portal" ? "/?jenjang=portal" : `/?jenjang=${targetId}`;
  }

  const { hostname, port, protocol } = window.location;
  const isLocalhost =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1";

  const rootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || "dharmaloka.sch.id";

  if (targetId === "portal") {
    if (isLocalhost) {
      const portStr = port ? `:${port}` : "";
      return `${protocol}//localhost${portStr}/?jenjang=portal`;
    }
    return `${protocol}//${rootDomain}/?jenjang=portal`;
  }

  if (isLocalhost) {
    const portStr = port ? `:${port}` : "";
    return `${protocol}//localhost${portStr}/?jenjang=${targetId}`;
  }

  const targetConfig = TENANTS[targetId];
  return `${protocol}//${targetConfig?.subdomain || `${targetId}.${rootDomain}`}/`;
}


