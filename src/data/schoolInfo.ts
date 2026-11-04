/**
 * Official Institutional Information for Sekolah Dharma Loka Pekanbaru
 */

export interface SchoolMeta {
  name: string;
  shortName: string;
  motto: string;
  mottoTranslation: string;
  foundation: string;
  establishedYear: string;
  accreditation: string;
  address: {
    street: string;
    subDistrict: string;
    city: string;
    province: string;
    postalCode: string;
    mapCoordinates: { lat: number; lng: number };
    googleMapsEmbedUrl: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    officeHours: string;
    weekendHours: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  stats: Array<{
    id: string;
    value: string;
    label: string;
    subtext: string;
    isDemo: boolean;
  }>;
  coreValues: Array<{
    title: string;
    paliOrOrigin?: string;
    description: string;
  }>;
  vision: string;
  mission: string[];
}

export const schoolInfo: SchoolMeta = {
  name: "Sekolah Dharma Loka Pekanbaru",
  shortName: "Dharma Loka",
  motto: "Prajña Pāramitā Hṛdaya",
  mottoTranslation: "Mengembangkan Kebijaksanaan, Membina Budi Pekerti, Menggapai Prestasi Mulia",
  foundation: "Yayasan Pendidikan Dharma Loka",
  establishedYear: "1988",
  accreditation: "Terakreditasi A (Unggul)",
  address: {
    street: "Jl. Tuanku Tambusai, Komp. Taman Anggrek / Pemancar TVRI",
    subDistrict: "Labuh Baru Barat, Kec. Payung Sekaki",
    city: "Kota Pekanbaru",
    province: "Riau",
    postalCode: "28292",
    mapCoordinates: { lat: 0.507065, lng: 101.447779 },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6582496229987!2d101.428!3d0.512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ac0000000001%3A0x123456789!2sPekanbaru!5e0!3m2!1sen!2sid!4v1700000000000",
  },
  contact: {
    phone: "(0761) 859214",
    whatsapp: "6281275008899",
    whatsappFormatted: "+62 812-7500-8899",
    email: "sekretariat@dharmaloka.sch.id",
    officeHours: "Senin – Jumat: 07.15 – 15.30 WIB",
    weekendHours: "Sabtu: 07.15 – 12.30 WIB",
  },
  socialMedia: {
    instagram: "https://instagram.com/dharmaloka_official",
    facebook: "https://facebook.com/sekolahdharmaloka",
    youtube: "https://youtube.com/@sekolahdharmalokapekanbaru",
    tiktok: "https://tiktok.com/@dharmalokaschool",
  },
  stats: [
    {
      id: "years",
      value: "35+",
      label: "Tahun Dedikasi",
      subtext: "Mendidik generasi berbudi pekerti luhur sejak 1988",
      isDemo: false,
    },
    {
      id: "levels",
      value: "5 Jenjang",
      label: "Pendidikan Terpadu",
      subtext: "TK, SD, SMP, SMA, dan SMK dalam satu ekosistem",
      isDemo: false,
    },
    {
      id: "alumni",
      value: "10.000+",
      label: "Jejaring Alumni",
      subtext: "Tersebar di perguruan tinggi terkemuka & dunia profesional",
      isDemo: false,
    },
    {
      id: "olympiad",
      value: "120+",
      label: "Penghargaan Kompetisi",
      subtext: "Prestasi akademik, robotika, sains, seni & olahraga",
      isDemo: false,
    },
  ],
  coreValues: [
    {
      title: "Kebijaksanaan (Prajña)",
      description: "Menumbuhkan daya nalar kritis, rasa ingin tahu ilmiah, dan kearifan intelektual dalam memecahkan persoalan peradaban.",
    },
    {
      title: "Karakter & Budi Pekerti (Sīla)",
      description: "Menanamkan nilai-nilai moral luhur, welas asih, integritas tinggi, dan sikap hormat kepada orang tua, guru, dan sesama.",
    },
    {
      title: "Ketekunan & Disiplin (Vīriya)",
      description: "Membiasakan konsistensi, daya juang tinggi, dan komitmen pantang menyerah dalam menuntut ilmu dan berkarya.",
    },
    {
      title: "Wawasan Global Berakar Lokal",
      description: "Membekali kefasihan multibahasa (Indonesia, Inggris, Mandarin) serta literasi digital mutakhir tanpa tercerabut dari akar budaya bangsa.",
    },
  ],
  vision: "Menjadi institusi pendidikan terpadu unggulan di Indonesia yang melahirkan generasi berintegritas tinggi, berwawasan global, cerdas berkarakter, dan berbudi pekerti luhur berlandaskan nilai-nilai universal.",
  mission: [
    "Menyelenggarakan proses pembelajaran holistik yang memadukan keunggulan akademik, sains-teknologi, dan keterampilan abad 21.",
    "Membudayakan pembinaan karakter moral, etika, dan spiritual yang kokoh dalam kehidupan bermasyarakat yang harmonis.",
    "Mengembangkan kemampuan komunikasi multibahasa dan literasi teknologi digital secara bertanggung jawab dan produktif.",
    "Menyediakan lingkungan belajar yang aman, inspiratif, inklusif, dan didukung fasilitas sarana-prasarana berstandar modern.",
    "Membangun kolaborasi sinergis antara pendidik, orang tua murid, masyarakat, dan institusi pendidikan internasional.",
  ],
};
