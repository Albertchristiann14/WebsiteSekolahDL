export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: "Akademik" | "Prestasi" | "Kegiatan" | "Pengumuman" | "Opini Edukasi";
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  featuredImage: string;
  isFeatured?: boolean;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "prestasi-tim-robotika-dharma-loka-kejuaraan-internasional",
    title: "Tim Robotika Dharma Loka Raih Medali Emas di Ajang International Youth Robotic Competition",
    excerpt: "Inovasi robot pemilah sampah otomatis karya siswa SMP & SMA Dharma Loka berhasil menyisihkan ratusan peserta dari 14 negara dalam ajang bergengsi IYRC.",
    content: [
      "Prestasi membanggakan kembali ditorehkan oleh generasi muda Riau di kancah internasional. Tim Robotika Sekolah Dharma Loka Pekanbaru sukses meraih penghargaan Medali Emas (Gold Award) dalam kategori Creative Innovative Project pada perhelatan International Youth Robotic Competition (IYRC).",
      "Karya yang diusung oleh tim adalah sebuah purwarupa 'EcoSmart Waste Sorter', yakni sistem pemilah sampah berbasis kecerdasan buatan dan sensor spektrofotometri optik mini yang mampu membedakan sampah organik, plastik daur ulang, dan logam dalam hitungan detik.",
      "Kepala Sekolah SMA Dharma Loka menyampaikan apresiasi mendalam atas dedikasi para siswa dan guru pembimbing yang telah mempersiapkan prototipe ini selama lebih dari empat bulan. 'Pencapaian ini membuktikan bahwa siswa kita memiliki daya saing saintifik global dan kepedulian nyata terhadap solusi keberlanjutan lingkungan,' ujarnya dalam sambutan upacara bendera.",
      "Prestasi ini sekaligus menjadi bukti komitmen Yayasan Dharma Loka dalam memfasilitasi laboratorium terintegrasi STEM dan menyediakan ruang eksperimen bebas bagi siswa-siswi yang ingin mendalami teknologi masa depan.",
    ],
    category: "Prestasi",
    date: "28 Oktober 2026",
    readTime: "4 menit baca",
    author: "Tim Humas Dharma Loka",
    authorRole: "Divisi Komunikasi Publik",
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    tags: ["Robotika", "Prestasi Internasional", "STEM", "Inovasi"],
  },
  {
    slug: "penerimaan-peserta-didik-baru-tahun-ajaran-2027-2028-dibuka",
    title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2027/2028 Resmi Dibuka",
    excerpt: "Sekolah Dharma Loka membuka pendaftaran Gelombang Early Bird untuk seluruh jenjang pendidikan dengan kemudahan beasiswa prestasi akademik dan non-akademik.",
    content: [
      "Sekolah Dharma Loka Pekanbaru secara resmi mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2027/2028. Pendaftaran mencakup seluruh jenjang pendidikan terpadu, mulai dari Taman Kanak-Kanak (TK), Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP), Sekolah Menengah Atas (SMA), hingga Sekolah Menengah Kejuruan (SMK).",
      "Pada periode Gelombang Early Bird yang berlangsung mulai November hingga akhir Desember, pihak yayasan menyediakan skema apresiasi khusus berupa potongan biaya pembangunan bagi calon siswa berprestasi serta program sibling discount untuk keluarga yang mendaftarkan lebih dari satu anak.",
      "Para orang tua dipersilakan untuk menjadwalkan 'School Tour' dan konsultasi edukasi tatap muka bersama tim akademik kami guna mengenal lebih dekat kultur belajar, sarana pembelajaran, serta kurikulum holistik yang diterapkan di Dharma Loka.",
      "Informasi lengkap persyaratan berkas, alur observasi minat bakat, dan simulasi biaya pendidikan dapat diakses melalui portal admisi online resmi kami atau langsung menghubungi layanan hotline WhatsApp Center.",
    ],
    category: "Pengumuman",
    date: "1 November 2026",
    readTime: "3 menit baca",
    author: "Panitia PPDB",
    authorRole: "Sekretariat Penerimaan Siswa Baru",
    featuredImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    tags: ["PPDB", "Admisi", "Pendaftaran", "Beasiswa"],
  },
  {
    slug: "semarak-bulan-bahasa-dan-literasi-kebudayaan-2026",
    title: "Semarak Bulan Bahasa: Menenun Harmoni Budaya Lewat Karya Sastra & Debat Trilingual",
    excerpt: "Ratusan siswa dari lima jenjang unjuk kebolehan dalam kompetisi pidato Mandarin, drama teater bahasa Indonesia, dan debat parlemen bahasa Inggris.",
    content: [
      "Halaman dan auditorium Sekolah Dharma Loka dipenuhi antusiasme saat peringatan tahunan Bulan Bahasa dan Apresiasi Budaya Nusantara digelar meriah selama tiga hari berturut-turut.",
      "Acara ini memadukan unjuk kemahiran sastra Indonesia, pidato kefasihan bahasa Mandarin, hingga kompetisi British Parliamentary Debate yang diikuti para siswa jenjang SMP dan SMA. Siswa jenjang TK dan SD pun turut memukau dengan penampilan panggung dongeng rakyat nusantara.",
      "'Kemampuan multibahasa adalah jendela dunia, namun rasa cinta terhadap nilai luhur budi pekerti adalah jangkar moral kita,' tutur Koordinator Bidang Kurikulum Bahasa dalam pidato pembukaan.",
      "Pameran buku karya siswa serta instalasi puisi visual turut menghiasi lorong kampus, menciptakan suasana belajar yang kaya akan dialog literasi dan apresiasi karya.",
    ],
    category: "Kegiatan",
    date: "20 Oktober 2026",
    readTime: "5 menit baca",
    author: "Dra. Linda Wijaya",
    authorRole: "Koordinator Literasi Sekolah",
    featuredImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Bulan Bahasa", "Literasi", "Trilingual", "Budaya"],
  },
  {
    slug: "penerapan-kurikulum-merdeka-dan-pembelajaran-berbasis-proyek",
    title: "Mengapa Pembelajaran Berbasis Inkuiri Menjadi Kunci Kecakapan Abad 21 di Dharma Loka",
    excerpt: "Tinjauan mendalam mengenai cara guru dan murid mengintegrasikan konsep saintek, nalar kritis, dan kearifan lokal melalui proyek nyata bermakna.",
    content: [
      "Pendidikan modern tidak lagi bertumpu pada hafalan mekanis semata, melainkan pada kebiasaan bernalar kritis dan kemampuan memecahkan masalah riil di dunia nyata. Di Dharma Loka, implementasi Kurikulum Merdeka diwujudkan melalui modul-modul tematik yang kontekstual.",
      "Siswa tidak hanya mempelajari teori fotosintesis atau siklus air dari buku teks, namun diajak merancang sistem irigasi tetes hidroponik sederhana di taman atap sekolah, menghitung neraca debit air, dan menyajikan hasil riset dalam presentasi ilmiah.",
      "Pendekatan ini melatih rasa kepemilikan siswa terhadap ilmu pengetahuan mereka sendiri. Hasilnya, kecemasan belajar berganti dengan gairah eksplorasi yang menyenangkan.",
    ],
    category: "Opini Edukasi",
    date: "12 Oktober 2026",
    readTime: "6 menit baca",
    author: "Tim Kurikulum Akademik",
    authorRole: "Litbang Pendidikan Dharma Loka",
    featuredImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    tags: ["Kurikulum", "Inovasi Belajar", "STEM", "Karakter"],
  },
  {
    slug: "kunjungan-edukatif-dan-kolaborasi-dengan-perguruan-tinggi",
    title: "Dharma Loka Jalin Kolaborasi Akademik dengan Universitas Mitra Terkemuka",
    excerpt: "MoU kerja sama strategis mencakup bimbingan riset laboratorium universitas bagi siswa SMA serta program persiapan karir kejuruan untuk siswa SMK.",
    content: [
      "Guna memperluas cakrawala masa depan para peserta didik, Sekolah Dharma Loka Pekanbaru menandatangani nota kesepahaman (MoU) kemitraan pendidikan dengan konsorsium universitas terkemuka dan asosiasi industri regional.",
      "Melalui sinergi ini, para siswa SMA peminatan riset sains berkesempatan mengakses fasilitas laboratorium lanjut di universitas mitra untuk menyelesaikan karya tulis ilmiah mereka di bawah bimbingan dosen tamu.",
      "Sementara itu bagi jenjang SMK, kemitraan ini memastikan kurikulum kejuruan selalu relevan dengan kebutuhan dunia kerja terkini serta mempermudah penyaluran program magang industri bersertifikat.",
    ],
    category: "Akademik",
    date: "5 Oktober 2026",
    readTime: "3 menit baca",
    author: "Biro Kerjasama Institusi",
    authorRole: "Humas & Hubungan Antar Lembaga",
    featuredImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    tags: ["Kerjasama", "Universitas", "Pendidikan Tinggi", "Vokasi"],
  },
  {
    slug: "kegiatan-donor-darah-dan-bakti-sosial-komunitas",
    title: "Wujud Welas Asih: Aksi Bakti Sosial dan Donor Darah Komunitas Peduli Sesama",
    excerpt: "Organisasi Siswa Intra Sekolah (OSIS) bersama Ikatan Alumni Dharma Loka berhasil mengumpulkan ratusan kantong darah untuk PMI Kota Pekanbaru.",
    content: [
      "Penanaman budi pekerti dan welas asih di Sekolah Dharma Loka senantiasa diwujudkan dalam tindakan nyata kepedulian terhadap sesama. Melalui inisiatif gabungan OSIS SMP-SMA-SMK dan Ikatan Alumni, kegiatan tahunan Bakti Sosial dan Donor Darah berlangsung sukses di gedung serbaguna sekolah.",
      "Antusiasme para guru, orang tua murid, alumni, dan masyarakat sekitar menghasilkan lebih dari 180 kantong darah yang disalurkan langsung kepada Palang Merah Indonesia (PMI) Kota Pekanbaru.",
      "'Melihat para siswa secara mandiri mengorganisasi kegiatan kemanusiaan ini dengan penuh ketulusan dan ketertiban adalah kebanggaan terbesar bagi kami sebagai pendidik,' ungkap Pembina OSIS.",
    ],
    category: "Kegiatan",
    date: "25 September 2026",
    readTime: "4 menit baca",
    author: "OSIS Dharma Loka",
    authorRole: "Divisi Pengabdian Masyarakat",
    featuredImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Bakti Sosial", "Budi Pekerti", "PMI", "Alumni"],
  },
];

