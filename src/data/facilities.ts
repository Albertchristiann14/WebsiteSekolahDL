export interface Facility {
  id: string;
  name: string;
  category: "Akademik & Sains" | "Olahraga & Kesehatan" | "Seni & Budaya" | "Teknologi & Digital" | "Penunjang Kampus";
  headline: string;
  description: string;
  image: string;
  features: string[];
  capacity?: string;
  location: string;
}

export const facilitiesData: Facility[] = [
  {
    id: "fac-1",
    name: "Perpustakaan Digital & Reading Sanctuary",
    category: "Akademik & Sains",
    headline: "Oase Literasi Modern dengan Akses Jurnal Global & Ribuan Koleksi Fisik",
    description: "Ruang baca bertingkat dengan pencahayaan alami melimpah, area diskusi kedap suara, terminal e-library dengan akses ke ribuan database ilmiah, serta pojok literasi santai yang menumbuhkan minat baca siswa.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    features: ["Koleksi 15.000+ buku fisik berstandar katalogisasi Dewey", "Akses e-book dan jurnal sains internasional", "Private study pods & collaborative study rooms", "Sistem peminjaman mandiri berbasis RFID"],
    capacity: "180 Siswa",
    location: "Gedung Utama Lantai 2",
  },
  {
    id: "fac-2",
    name: "Laboratorium Sains & STEM Terpadu",
    category: "Akademik & Sains",
    headline: "Pusat Riset Fisika, Kimia, Biologi dan Eksperimen Inkuiri Siswa",
    description: "Tiga unit laboratorium terpisah dengan meja praktikum berstandar laboratorium perguruan tinggi, sistem ventilasi fume hood mutakhir, mikroskop digital berkamera, dan perlengkapan pengujian saintifik lengkap.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    features: ["Safety shower dan eye washer darurat standar ISO", "Reagen murni teruji dan instrumen ukur digital berakurasi tinggi", "Layar monitor interaktif untuk visualisasi struktur molekuler 3D", "Modul praktikum berbasis inkuiri mandiri"],
    capacity: "40 Siswa per Lab",
    location: "Gedung Sains & Riset Lantai 3",
  },
  {
    id: "fac-3",
    name: "Laboratorium Robotika & Artificial Intelligence",
    category: "Teknologi & Digital",
    headline: "Inkubator Coding, IoT, dan Rancang Bangun Robot Masa Depan",
    description: "Ruang kreasi teknologi tinggi yang dilengkapi dengan workstation render grafis tinggi, 3D printer, soldering station aman, sensor kit Arduino/Raspberry Pi, serta arena uji lintasan robot kompetisi nasional.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    features: ["Unit 3D Printer untuk rapid prototyping mekanik", "Komputer spesifikasi tinggi dengan dual monitor", "Track arena simulasi Line Follower dan Sumo Robot", "Software simulator logika dan compiler modern"],
    capacity: "35 Siswa",
    location: "Gedung Inovasi Teknologi Lantai 2",
  },
  {
    id: "fac-4",
    name: "Sport Hall Indoor & Lapangan Basket FIBA",
    category: "Olahraga & Kesehatan",
    headline: "Gelanggang Olahraga Multifungsi Berlantai Kayu Parket Standar",
    description: "Gedung olahraga tertutup berkapasitas besar dengan sirkulasi udara optimal dan pencahayaan LED sport lighting. Mendukung pertandingan basket, bulu tangkis, voli, senam lantai, hingga pertunjukan seni skala akbar.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    features: ["Lantai parket kayu merbau bersertifikasi peredam benturan", "Tribun penonton kapasitas 800 orang", "Papan skor digital multisport terhubung wireless", "Ruang ganti dan shower terpisah putra/putri"],
    capacity: "800 Penonton",
    location: "Kompleks Olahraga Barat",
  },
  {
    id: "fac-5",
    name: "Auditorium Serbaguna Dharma Hall",
    category: "Seni & Budaya",
    headline: "Panggung Apresiasi Seni, Wisuda, dan Konferensi Berskala Akbar",
    description: "Gedung teater akustik modern berdaya tampung besar dengan sistem pencahayaan panggung cerdas, sistem tata suara line-array fidelitas tinggi, proyektor laser resolusi 4K, dan pendingin udara terpusat.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    features: ["Panggung teater kayu dengan ruang back-stage luas", "Sistem audio digital mixing console 32 channel", "Tata lampu spot dan moving head terintegrasi DMX", "Kursi penonton teater ergonomis bertingkat"],
    capacity: "1.000 Tamu",
    location: "Gedung Rektorat & Konvensi Lantai 1",
  },
  {
    id: "fac-6",
    name: "Studio Seni Musik & Multimedia Audio",
    category: "Seni & Budaya",
    headline: "Ruang Eksplorasi Harmoni Nada, Vokal, dan Produksi Musik Siswa",
    description: "Ruang kedap suara akustik khusus untuk latihan paduan suara, gamelan/ansambel tradisional, band modern, drum set elektrik dan akustik, grand piano, serta ruang audio recording mini.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1200&q=80",
    features: ["Insulasi akustik dinding rockwool peredam gema", "Instrumen orkestra, gamelan, dan instrumen band lengkap", "Digital Audio Workstation (DAW) untuk mixing karya cipta siswa", "Penyimpanan instrumen beriklim terkontrol"],
    capacity: "45 Siswa",
    location: "Gedung Kesenian Lantai 3",
  },
  {
    id: "fac-7",
    name: "Green Garden & Eco-Sanctuary Terbuka",
    category: "Penunjang Kampus",
    headline: "Lansekap Hijau Asri untuk Pembelajaran Ekologi & Ketenangan Jiwa",
    description: "Area ruang terbuka hijau di tengah kampus dengan pepohonan rindang, kolam ikan koi, instalasi pertanian hidroponik siswa, dan gazebo teduh yang menjadi tempat santai inspiratif saat jeda istirahat.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    features: ["Sistem resapan air biopori dan pengelolaan kompos mandiri", "Taman tanaman obat keluarga (TOGA) terawat", "Kawasan bebas polusi asap rokok dan kebisingan lalu lintas", "Area duduk teduh ber-WiFi aman untuk outdoor study"],
    capacity: "Kawasan Terbuka",
    location: "Pusat Kawasan Kampus Terpadu",
  },
  {
    id: "fac-8",
    name: "Kantin Sehat & Cafeteria Higienis",
    category: "Penunjang Kampus",
    headline: "Standar Sanitasi Ketat Menyajikan Menu Bergizi Seimbang",
    description: "Kantin terkelola higienis dengan sistem pembayaran non-tunai (cashless), inspeksi berkala menu gizi oleh petugas kesehatan sekolah, ruang makan bersih berventilasi luas, dan komitmen bebas bahan pengawet berbahaya.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    features: ["Sertifikasi kelayakan higienis sanitasi berkala", "Pilihan makanan bergizi variatif ramah anak", "Area cuci tangan otomatis sabun antibakteri melimpah", "Sistem transaksi kartu cerdas siswa (Student Smart Card)"],
    capacity: "300 Siswa",
    location: "Kompleks Layanan Siswa Lantai 1",
  },
];

