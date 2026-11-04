export interface GalleryItem {
  id: string;
  title: string;
  category: "Kegiatan Belajar" | "Fasilitas Kampus" | "Prestasi & Lomba" | "Seni & Olahraga" | "Kehidupan Siswa";
  image: string;
  caption: string;
  date: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Eksperimen Spektrofotometri Laboratorium Kimia SMA",
    category: "Kegiatan Belajar",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    caption: "Siswa kelas 12 melakukan uji kuantitatif larutan asam-basa menggunakan buret digital berpresisi tinggi.",
    date: "Oktober 2026",
    aspectRatio: "landscape",
  },
  {
    id: "gal-2",
    title: "Momen Kegembiraan Siswa TK di Sentra Sensori",
    category: "Kegiatan Belajar",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    caption: "Stimulasi motorik halus anak melalui permainan taktil dan pencocokan warna bernuansa ceria.",
    date: "September 2026",
    aspectRatio: "portrait",
  },
  {
    id: "gal-3",
    title: "Perpustakaan Utama dan Diskusi Siswa",
    category: "Fasilitas Kampus",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    caption: "Suasana hening dan inspiratif di lantai 2 perpustakaan pusat Dharma Loka.",
    date: "Oktober 2026",
    aspectRatio: "landscape",
  },
  {
    id: "gal-4",
    title: "Final Kejuaraan Basket Antar Pelajar Se-Riau",
    category: "Seni & Olahraga",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    caption: "Kekompakan tim basket putra Dharma Loka dalam laga perebutan piala bergilir di Sport Hall.",
    date: "Agustus 2026",
    aspectRatio: "landscape",
  },
  {
    id: "gal-5",
    title: "Pengujian Lengan Robot AI Pemilah Sampah",
    category: "Prestasi & Lomba",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    caption: "Uji kalibrasi sensor mikrokontroler oleh tim robotika sebelum keberangkatan kompetisi internasional.",
    date: "Oktober 2026",
    aspectRatio: "square",
  },
  {
    id: "gal-6",
    title: "Pentas Tari Tradisional dan Musik Nusantara",
    category: "Seni & Olahraga",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1200&q=80",
    caption: "Kolaborasi paduan suara dan ansambel musik akustik pada perayaan Hari Kebudayaan Sekolah.",
    date: "September 2026",
    aspectRatio: "landscape",
  },
  {
    id: "gal-7",
    title: "Praktik Jaringan Server dan Komputasi Cloud SMK",
    category: "Kegiatan Belajar",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    caption: "Siswa jurusan Teknik Jaringan melakukan simulasi switch routing fiber optic di laboratorium komputer.",
    date: "Oktober 2026",
    aspectRatio: "portrait",
  },
  {
    id: "gal-8",
    title: "Upacara Peringatan Hari Pendidikan Nasional",
    category: "Kehidupan Siswa",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    caption: "Kedisiplinan barisan perwakilan siswa lima jenjang dalam balutan seragam almamater resmi.",
    date: "Mei 2026",
    aspectRatio: "landscape",
  },
  {
    id: "gal-9",
    title: "Pemberian Medali dan Sertifikat Kehormatan Siswa Berprestasi",
    category: "Prestasi & Lomba",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    caption: "Apresiasi pimpinan yayasan kepada para duta olimpiade sains dan debat tingkat nasional.",
    date: "Juli 2026",
    aspectRatio: "square",
  },
];

