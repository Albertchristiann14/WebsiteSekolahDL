export interface Achievement {
  id: string;
  title: string;
  competition: string;
  organizer: string;
  level: "Internasional" | "Nasional" | "Provinsi" | "Kota Pekanbaru";
  year: string;
  category: "Sains & Teknologi" | "Robotika & Coding" | "Matematika" | "Bahasa & Debat" | "Olahraga & Seni";
  studentName: string;
  gradeAndLevel: string;
  medalOrRank: "Medali Emas" | "Medali Perak" | "Medali Perunggu" | "Juara 1" | "Juara 2" | "Juara 3" | "Special Award";
  description: string;
  image?: string;
  isDemo: boolean;
}

export const achievementsData: Achievement[] = [
  {
    id: "ach-1",
    title: "Gold Medal Creative Project – Smart Eco Waste Management",
    competition: "International Youth Robotic Competition (IYRC) [DEMO / OFFICIAL REQUIRED]",
    organizer: "International Youth Robot Association",
    level: "Internasional",
    year: "2026",
    category: "Robotika & Coding",
    studentName: "Nicholas Tan & Tim Robotika [DEMO NAME]",
    gradeAndLevel: "Kelas 11 SMA Dharma Loka",
    medalOrRank: "Medali Emas",
    description: "Merancang robot otonom pemilah sampah cerdas berbasis AI dan mikrokontroler sensor optik yang diakui dewan juri internasional.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
  {
    id: "ach-2",
    title: "Medali Perak Olimpiade Sains Nasional (OSN) Bidang Kimia",
    competition: "Olimpiade Sains Nasional (OSN) Jenjang SMA [DEMO / OFFICIAL REQUIRED]",
    organizer: "Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek",
    level: "Nasional",
    year: "2026",
    category: "Sains & Teknologi",
    studentName: "Clarissa Angelica [DEMO NAME]",
    gradeAndLevel: "Kelas 12 SMA Dharma Loka",
    medalOrRank: "Medali Perak",
    description: "Berhasil meraih peringkat 2 nasional dalam uji teori dan praktikum laboratorium kimia analitik dan organik tingkat SMA.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
  {
    id: "ach-3",
    title: "Juara 1 Lomba Cepat Tepat Matematika & Logika Se-Sumatera",
    competition: "Sumatera Mathematics Olympiad & Logic Competition [DEMO / OFFICIAL REQUIRED]",
    organizer: "Fakultas MIPA Universitas Negeri Riau",
    level: "Provinsi",
    year: "2026",
    category: "Matematika",
    studentName: "Kevin Sanjaya & Matthew Lee [DEMO NAME]",
    gradeAndLevel: "Kelas 9 SMP Dharma Loka",
    medalOrRank: "Juara 1",
    description: "Mempertahankan gelar juara bertahan selama 3 tahun berturut-turut dalam adu kecakapan nalar logika dan aljabar tingkat SMP.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
  {
    id: "ach-4",
    title: "Best Speaker & 1st Runner-Up National High School Debate Championship",
    competition: "National English Debating Championship (NSDC Riau Region) [DEMO / OFFICIAL REQUIRED]",
    organizer: "Pusat Prestasi Nasional",
    level: "Nasional",
    year: "2025",
    category: "Bahasa & Debat",
    studentName: "Fiona Michelle [DEMO NAME]",
    gradeAndLevel: "Kelas 11 SMA Dharma Loka",
    medalOrRank: "Juara 2",
    description: "Mengemukakan argumentasi kritis mengenai kebijakan transisi energi global dan meraih penghargaan Pembicara Terbaik se-provinsi.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
  {
    id: "ach-5",
    title: "Medali Emas Wushu Taolu Tradisional Junior Putra",
    competition: "Kejuaraan Nasional Wushu Junior Piala Presiden [DEMO / OFFICIAL REQUIRED]",
    organizer: "Pengurus Besar Wushu Indonesia (PB WI)",
    level: "Nasional",
    year: "2025",
    category: "Olahraga & Seni",
    studentName: "Brandon Wijaya [DEMO NAME]",
    gradeAndLevel: "Kelas 8 SMP Dharma Loka",
    medalOrRank: "Medali Emas",
    description: "Menampilkan jurus pedang dan tinju utara dengan presisi gerak sempurna, ketangkasan fisik, dan kedisiplinan seni bela diri.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
  {
    id: "ach-6",
    title: "Juara 1 Lomba Kompetensi Siswa (LKS) SMK Bidang IT Network Systems",
    competition: "LKS SMK Tingkat Provinsi Riau [DEMO / OFFICIAL REQUIRED]",
    organizer: "Dinas Pendidikan Provinsi Riau",
    level: "Provinsi",
    year: "2026",
    category: "Robotika & Coding",
    studentName: "Derry Pratama [DEMO NAME]",
    gradeAndLevel: "Kelas 12 SMK Dharma Loka",
    medalOrRank: "Juara 1",
    description: "Konfigurasi server enterprise, routing IPv6, dan security hardening jaringan tercepat dan tanpa kesalahan arsitektur.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    isDemo: true,
  },
];

