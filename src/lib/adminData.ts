/**
 * Dharma Loka School - Admin & SPMB Multi-Tenant Data Store
 * Complete TypeScript interfaces, mock seed data, and persistent state management
 */

export type TenantCode = "portal" | "tk" | "sd" | "smp" | "sma" | "smk";

export type AdminRole =
  | "super_admin"     // Super Admin Yayasan (akses semua jenjang & pengaturan)
  | "school_admin"    // Admin Jenjang (akses penuh unit jenjangnya)
  | "spmb_officer"    // Panitia SPMB (verifikasi berkas, tes seleksi, kelulusan)
  | "content_editor"  // Editor Konten (berita, galeri, pengumuman, agenda)
  | "finance";        // Keuangan (tagihan formulir, uang pangkal, rekonsiliasi)

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  tenantId?: TenantCode; // Optional jika super_admin
  roleLabel: string;
  avatar: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export type DocumentStatus = "pending" | "approved" | "revision_needed" | "rejected";
export type PaymentStatus = "unpaid" | "pending_approval" | "paid" | "expired";
export type SelectionStatus = "registered" | "scheduled" | "tested" | "passed" | "waiting_list" | "rejected";
export type FinalEnrollmentStatus = "candidate" | "enrolled" | "withdrawn";

export interface ApplicantDocument {
  id: string;
  type: "kk" | "akta_lahir" | "rapor" | "pas_foto" | "sertifikat";
  label: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  mimeType: string;
  uploadedAt: string;
  status: DocumentStatus;
  notes?: string;
}

export interface ApplicantInvoice {
  id: string;
  invoiceNumber: string;
  type: "registration_form" | "enrollment_fee" | "tuition_monthly";
  typeLabel: string;
  amount: number;
  status: PaymentStatus;
  dueDate: string;
  paymentMethod?: "midtrans_va" | "midtrans_qris" | "bank_transfer_manual";
  proofUrl?: string;
  paidAt?: string;
  confirmedBy?: string;
}

export interface AdminApplicant {
  id: string;
  registrationNumber: string; // Format: [JENJANG-TAHUN-GELOMBANG-URUT]
  tenantId: TenantCode;
  tenantLabel: string;
  waveName: string;
  waveNumber: number;
  trackName: string; // Reguler, Prestasi, Kemitraan
  appliedAt: string;

  // Data Calon Siswa
  fullName: string;
  nik: string;
  nisn?: string;
  gender: "L" | "P";
  birthPlace: string;
  birthDate: string;
  religion: string;
  address: string;
  previousSchool: string;
  schoolOriginCity: string;

  // Data Orang Tua / Wali
  fatherName: string;
  fatherJob: string;
  motherName: string;
  motherJob: string;
  parentWhatsapp: string;
  parentEmail: string;
  monthlyIncome: string;

  // Status Tahapan
  documentStatus: DocumentStatus;
  paymentStatus: PaymentStatus;
  selectionStatus: SelectionStatus;
  finalStatus: FinalEnrollmentStatus;

  // Berkas Dokumen
  documents: ApplicantDocument[];

  // Tagihan
  invoices: ApplicantInvoice[];

  // Seleksi & Ujian
  testSchedule?: {
    datetime: string;
    room: string;
    interviewerName: string;
  };
  testScores?: {
    academic: number;
    interview: number;
    psychology?: number;
    finalAverage: number;
  };
  selectionRank?: number;
  selectionNotes?: string;

  // Master Siswa (jika sudah dikonversi)
  assignedNis?: string;
  assignedClass?: string;

  // Catatan internal panitia
  internalNotes?: string;
}

export interface SelectionScheduleSlot {
  id: string;
  tenantId: TenantCode;
  date: string;
  timeSlot: string;
  room: string;
  capacity: number;
  filled: number;
  examiner: string;
}

export interface MasterStudent {
  id: string;
  tenantId: TenantCode;
  nis: string;
  nisn: string;
  nik: string;
  fullName: string;
  gender: "L" | "P";
  className: string;
  gradeLevel: number;
  academicYear: string;
  parentWhatsapp: string;
  enrollmentDate: string;
  status: "active" | "graduated" | "moved";
}

export interface WhatsAppTemplate {
  key: string;
  name: string;
  category: "pendaftaran" | "pembayaran" | "seleksi" | "pengumuman";
  body: string;
}

export interface NotificationLog {
  id: string;
  tenantId: TenantCode;
  applicantRegNumber: string;
  recipientName: string;
  recipientPhone: string;
  templateKey: string;
  messagePreview: string;
  status: "sent" | "delivered" | "failed";
  timestamp: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  tenantId: TenantCode;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
}

export interface CMSNewsItem {
  id: string;
  tenantId: TenantCode;
  title: string;
  slug: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  isPinned: boolean;
  publishedAt: string;
  author: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  views: number;
}

export interface CMSAnnouncementItem {
  id: string;
  tenantId: TenantCode;
  title: string;
  slug: string;
  priority: "tinggi" | "sedang" | "normal";
  status: "published" | "draft";
  targetAudience: string;
  publishedAt: string;
  content: string;
}

export interface CMSEventItem {
  id: string;
  tenantId: TenantCode;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface CMSStaffItem {
  id: string;
  tenantId: TenantCode;
  name: string;
  role: string;
  subject?: string;
  education: string;
  category: "pimpinan" | "guru" | "staf";
  photo: string;
  order: number;
}

export interface CMSAchievementItem {
  id: string;
  tenantId: TenantCode;
  title: string;
  studentName: string;
  medalRank: string;
  level: "sekolah" | "kota" | "provinsi" | "nasional" | "internasional";
  category: string;
  year: number;
  description: string;
  photo: string;
}

export interface CMSContactMessage {
  id: string;
  tenantId: TenantCode;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  receivedAt: string;
  replyText?: string;
  repliedAt?: string;
}

export interface CMSDownloadItem {
  id: string;
  tenantId: TenantCode;
  title: string;
  category: "brosur" | "formulir" | "panduan" | "tata_tertib";
  fileName: string;
  fileSize: string;
  downloadCount: number;
  uploadedAt: string;
}

// ============================================================================
// INITIAL SEED DATA
// ============================================================================

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Super Administrator Yayasan",
    email: "superadmin@dharmaloka.sch.id",
    role: "super_admin",
    roleLabel: "Super Admin Yayasan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "active",
    lastLogin: "Baru saja",
  },
  {
    id: "usr-2",
    name: "Dra. Lindawati, M.Pd (Admin SMA)",
    email: "admin.sma@dharmaloka.sch.id",
    role: "school_admin",
    tenantId: "sma",
    roleLabel: "Admin Jenjang SMA",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    status: "active",
    lastLogin: "2 jam yang lalu",
  },
  {
    id: "usr-3",
    name: "Budi Santoso, S.Kom (Panitia SPMB)",
    email: "spmb@dharmaloka.sch.id",
    role: "spmb_officer",
    tenantId: "sma",
    roleLabel: "Panitia SPMB",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "active",
    lastLogin: "15 menit yang lalu",
  },
  {
    id: "usr-4",
    name: "Siti Rahmawati, S.E (Bagian Keuangan)",
    email: "finance@dharmaloka.sch.id",
    role: "finance",
    roleLabel: "Staf Keuangan",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    status: "active",
    lastLogin: "30 menit yang lalu",
  },
  {
    id: "usr-5",
    name: "Kevin Pratama, S.I.Kom (Editor Konten)",
    email: "editor@dharmaloka.sch.id",
    role: "content_editor",
    roleLabel: "Editor Konten",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "active",
    lastLogin: "1 hari yang lalu",
  },
];

export const INITIAL_APPLICANTS: AdminApplicant[] = [
  {
    id: "app-1",
    registrationNumber: "SMA-2026-G1-0001",
    tenantId: "sma",
    tenantLabel: "SMA Dharma Loka",
    waveName: "Gelombang 1 (Early Bird)",
    waveNumber: 1,
    trackName: "Jalur Prestasi Akademik",
    appliedAt: "2026-11-03 09:15:20",
    fullName: "Nathaniel Vincent Wijaya",
    nik: "1471011405090001",
    nisn: "0098765432",
    gender: "L",
    birthPlace: "Pekanbaru",
    birthDate: "2009-05-14",
    religion: "Buddha",
    address: "Jl. Riau No. 45, Senapelan, Pekanbaru",
    previousSchool: "SMP Dharma Loka Pekanbaru",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Wijaya Kusuma",
    fatherJob: "Wiraswasta",
    motherName: "Liana Dewi",
    motherJob: "Ibu Rumah Tangga",
    parentWhatsapp: "081268892101",
    parentEmail: "wijaya.kusuma@gmail.com",
    monthlyIncome: "Rp 15.000.000 - Rp 25.000.000",
    documentStatus: "approved",
    paymentStatus: "paid",
    selectionStatus: "passed",
    finalStatus: "enrolled",
    assignedNis: "26SMA0001",
    assignedClass: "X-MIPA 1",
    documents: [
      {
        id: "doc-1",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Nathaniel_Wijaya.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.2 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 09:20",
        status: "approved",
        notes: "Data KK dan NIK valid",
      },
      {
        id: "doc-2",
        type: "akta_lahir",
        label: "Akta Kelahiran",
        fileName: "Akta_Nathaniel.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "980 KB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 09:22",
        status: "approved",
        notes: "Sesuai tanggal lahir",
      },
      {
        id: "doc-3",
        type: "rapor",
        label: "Rapor SMP Smt 1-5",
        fileName: "Rapor_Nathaniel_Smt1_5.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "3.4 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 09:25",
        status: "approved",
        notes: "Rata-rata 92.4, memenuhi syarat jalur prestasi",
      },
      {
        id: "doc-4",
        type: "pas_foto",
        label: "Pas Foto Berwarna 3x4",
        fileName: "PasFoto_Nathaniel.jpg",
        fileUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        fileSize: "450 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-03 09:26",
        status: "approved",
      },
      {
        id: "doc-5",
        type: "sertifikat",
        label: "Sertifikat OSN Matematika",
        fileName: "Sertifikat_OSN_Nathaniel.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.5 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 09:28",
        status: "approved",
        notes: "Juara 2 OSN Tingkat Kota Pekanbaru",
      },
    ],
    invoices: [
      {
        id: "inv-1",
        invoiceNumber: "INV-2026-SMA-0001",
        type: "registration_form",
        typeLabel: "Biaya Formulir & Seleksi",
        amount: 250000,
        status: "paid",
        dueDate: "2026-11-05 23:59",
        paymentMethod: "midtrans_qris",
        paidAt: "2026-11-03 10:15",
      },
      {
        id: "inv-2",
        invoiceNumber: "INV-2026-SMA-0002",
        type: "enrollment_fee",
        typeLabel: "Uang Pangkal & Daftar Ulang (Diskon Early Bird)",
        amount: 6500000,
        status: "paid",
        dueDate: "2026-11-15 23:59",
        paymentMethod: "bank_transfer_manual",
        proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        paidAt: "2026-11-04 08:30",
        confirmedBy: "Siti Rahmawati (Finance)",
      },
    ],
    testSchedule: {
      datetime: "2026-11-04 08:00 - 10:30 WIB",
      room: "Lab Komputer CBT 1",
      interviewerName: "Drs. Suherman (Kepala SMA)",
    },
    testScores: {
      academic: 94.5,
      interview: 92.0,
      psychology: 90.0,
      finalAverage: 92.8,
    },
    selectionRank: 1,
    selectionNotes: "Lulus Jalur Prestasi dengan beasiswa potongan SPP 25%. Calon peserta olimpiade matematika sekolah.",
  },
  {
    id: "app-2",
    registrationNumber: "SMA-2026-G1-0002",
    tenantId: "sma",
    tenantLabel: "SMA Dharma Loka",
    waveName: "Gelombang 1 (Early Bird)",
    waveNumber: 1,
    trackName: "Jalur Reguler",
    appliedAt: "2026-11-03 11:40:15",
    fullName: "Clarissa Aurelia Tan",
    nik: "1471025508090002",
    nisn: "0097654321",
    gender: "P",
    birthPlace: "Pekanbaru",
    birthDate: "2009-08-15",
    religion: "Kristen",
    address: "Jl. Tuanku Tambusai, Kompleks Nangka Mas No. 12, Pekanbaru",
    previousSchool: "SMP Santa Maria Pekanbaru",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Tan Hian Guan",
    fatherJob: "Manajer Pemasaran",
    motherName: "Merry Tan",
    motherJob: "Pegawai Swasta",
    parentWhatsapp: "081371239988",
    parentEmail: "clarissa.tan.family@gmail.com",
    monthlyIncome: "Rp 10.000.000 - Rp 15.000.000",
    documentStatus: "revision_needed",
    paymentStatus: "paid",
    selectionStatus: "registered",
    finalStatus: "candidate",
    documents: [
      {
        id: "doc-201",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Clarissa.jpg",
        fileUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80",
        fileSize: "850 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-03 11:45",
        status: "approved",
      },
      {
        id: "doc-202",
        type: "akta_lahir",
        label: "Akta Kelahiran",
        fileName: "Akta_Clarissa_Blur.jpg",
        fileUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
        fileSize: "320 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-03 11:46",
        status: "rejected",
        notes: "Foto dokumen buram dan terpotong di bagian nomor akta. Mohon foto ulang dengan pencahayaan jelas.",
      },
      {
        id: "doc-203",
        type: "pas_foto",
        label: "Pas Foto 3x4",
        fileName: "Clarissa_Foto.jpg",
        fileUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        fileSize: "410 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-03 11:48",
        status: "approved",
      },
    ],
    invoices: [
      {
        id: "inv-201",
        invoiceNumber: "INV-2026-SMA-0003",
        type: "registration_form",
        typeLabel: "Biaya Formulir SPMB",
        amount: 250000,
        status: "paid",
        dueDate: "2026-11-05 23:59",
        paymentMethod: "midtrans_va",
        paidAt: "2026-11-03 12:10",
      },
    ],
    internalNotes: "Menunggu unggah ulang Akta Kelahiran yang lebih jelas.",
  },
  {
    id: "app-3",
    registrationNumber: "SMP-2026-G1-0001",
    tenantId: "smp",
    tenantLabel: "SMP Dharma Loka",
    waveName: "Gelombang 1 (Reguler)",
    waveNumber: 1,
    trackName: "Jalur Reguler",
    appliedAt: "2026-11-03 14:10:00",
    fullName: "Christian Jonathan Hartanto",
    nik: "1471031102120003",
    nisn: "0123456789",
    gender: "L",
    birthPlace: "Pekanbaru",
    birthDate: "2012-02-11",
    religion: "Buddha",
    address: "Kompleks Rajawali Asri Blok C-8, Sukajadi, Pekanbaru",
    previousSchool: "SD Dharma Loka Pekanbaru",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Hartanto Sasmita",
    fatherJob: "Pengusaha Retail",
    motherName: "Vivi Santika",
    motherJob: "Wiraswasta",
    parentWhatsapp: "082173456111",
    parentEmail: "hartanto.vivi@gmail.com",
    monthlyIncome: "Rp 25.000.000+",
    documentStatus: "approved",
    paymentStatus: "paid",
    selectionStatus: "scheduled",
    finalStatus: "candidate",
    testSchedule: {
      datetime: "2026-11-07 09:00 - 11:00 WIB",
      room: "Ruang Wawancara SMP 2B",
      interviewerName: "Megawati, S.Pd (Waka Kesiswaan SMP)",
    },
    documents: [
      {
        id: "doc-301",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Hartanto.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.1 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 14:12",
        status: "approved",
      },
      {
        id: "doc-302",
        type: "akta_lahir",
        label: "Akta Kelahiran",
        fileName: "Akta_Christian.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "920 KB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-03 14:15",
        status: "approved",
      },
      {
        id: "doc-303",
        type: "pas_foto",
        label: "Pas Foto 3x4",
        fileName: "Foto_Christian.jpg",
        fileUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        fileSize: "390 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-03 14:16",
        status: "approved",
      },
    ],
    invoices: [
      {
        id: "inv-301",
        invoiceNumber: "INV-2026-SMP-0001",
        type: "registration_form",
        typeLabel: "Formulir SPMB SMP",
        amount: 200000,
        status: "paid",
        dueDate: "2026-11-06 23:59",
        paymentMethod: "bank_transfer_manual",
        proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        paidAt: "2026-11-03 15:00",
        confirmedBy: "Siti Rahmawati (Finance)",
      },
    ],
  },
  {
    id: "app-4",
    registrationNumber: "TK-2026-G1-0001",
    tenantId: "tk",
    tenantLabel: "TK Dharma Loka (Playgroup & TK Ceria)",
    waveName: "Gelombang 1 (Tumbuh Ceria)",
    waveNumber: 1,
    trackName: "Jalur Reguler Bermain & Belajar",
    appliedAt: "2026-11-04 08:20:00",
    fullName: "Chloe Jennifer Salim",
    nik: "1471046604220004",
    gender: "P",
    birthPlace: "Pekanbaru",
    birthDate: "2022-04-26",
    religion: "Buddha",
    address: "Jl. Dahlia No. 19, Labuh Baru Timur, Pekanbaru",
    previousSchool: "Belum Pernah Sekolah (Pengasuhan Rumah)",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Salim Kurniawan",
    fatherJob: "Profesional IT",
    motherName: "Stephanie Salim",
    motherJob: "Desainer Grafis",
    parentWhatsapp: "081275990033",
    parentEmail: "salim.kurniawan@gmail.com",
    monthlyIncome: "Rp 15.000.000 - Rp 25.000.000",
    documentStatus: "pending",
    paymentStatus: "pending_approval",
    selectionStatus: "registered",
    finalStatus: "candidate",
    documents: [
      {
        id: "doc-401",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Salim.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.4 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 08:25",
        status: "pending",
      },
      {
        id: "doc-402",
        type: "akta_lahir",
        label: "Akta Kelahiran",
        fileName: "Akta_Chloe.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "850 KB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 08:27",
        status: "pending",
      },
      {
        id: "doc-403",
        type: "pas_foto",
        label: "Pas Foto Lucu 3x4",
        fileName: "Chloe_Cute.jpg",
        fileUrl: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=400&q=80",
        fileSize: "320 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-04 08:29",
        status: "pending",
      },
    ],
    invoices: [
      {
        id: "inv-401",
        invoiceNumber: "INV-2026-TK-0001",
        type: "registration_form",
        typeLabel: "Formulir Pendaftaran TK",
        amount: 150000,
        status: "pending_approval",
        dueDate: "2026-11-07 23:59",
        paymentMethod: "bank_transfer_manual",
        proofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        paidAt: "2026-11-04 09:10",
      },
    ],
    internalNotes: "Bukti transfer baru diunggah orang tua, butuh konfirmasi verifikasi bagian Keuangan.",
  },
  {
    id: "app-5",
    registrationNumber: "SD-2026-G1-0001",
    tenantId: "sd",
    tenantLabel: "SD Dharma Loka",
    waveName: "Gelombang 1 (Fondasi Kuat)",
    waveNumber: 1,
    trackName: "Jalur Reguler",
    appliedAt: "2026-11-04 10:05:00",
    fullName: "Dave Alexander Halim",
    nik: "1471051909190005",
    nisn: "0199887766",
    gender: "L",
    birthPlace: "Pekanbaru",
    birthDate: "2019-09-19",
    religion: "Katolik",
    address: "Jl. Angkasa No. 8, Payung Sekaki, Pekanbaru",
    previousSchool: "TK Dharma Loka Pekanbaru",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Halim Sutrisno",
    fatherJob: "Dokter Spesialis",
    motherName: "dr. Cynthia Halim",
    motherJob: "Dokter Gigi",
    parentWhatsapp: "08117622899",
    parentEmail: "halim.sutrisno@gmail.com",
    monthlyIncome: "Rp 25.000.000+",
    documentStatus: "approved",
    paymentStatus: "paid",
    selectionStatus: "tested",
    finalStatus: "candidate",
    testSchedule: {
      datetime: "2026-11-04 13:00 - 14:30 WIB",
      room: "Ruang Observasi Psikologi SD",
      interviewerName: "Ibu Suryani, S.Pd (Kepala SD)",
    },
    testScores: {
      academic: 88.0,
      interview: 90.0,
      finalAverage: 89.0,
    },
    selectionRank: 4,
    documents: [
      {
        id: "doc-501",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Halim.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.2 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 10:10",
        status: "approved",
      },
      {
        id: "doc-502",
        type: "akta_lahir",
        label: "Akta Kelahiran",
        fileName: "Akta_Dave.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "910 KB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 10:12",
        status: "approved",
      },
      {
        id: "doc-503",
        type: "pas_foto",
        label: "Pas Foto 3x4",
        fileName: "Dave_Foto.jpg",
        fileUrl: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=400&q=80",
        fileSize: "330 KB",
        mimeType: "image/jpeg",
        uploadedAt: "2026-11-04 10:15",
        status: "approved",
      },
    ],
    invoices: [
      {
        id: "inv-501",
        invoiceNumber: "INV-2026-SD-0001",
        type: "registration_form",
        typeLabel: "Formulir SPMB SD",
        amount: 200000,
        status: "paid",
        dueDate: "2026-11-07 23:59",
        paymentMethod: "midtrans_qris",
        paidAt: "2026-11-04 10:30",
      },
    ],
    internalNotes: "Hasil observasi kesiapan belajar sangat matang, nalar verbal dan sosial sangat baik.",
  },
  {
    id: "app-6",
    registrationNumber: "SMK-2026-G1-0001",
    tenantId: "smk",
    tenantLabel: "SMK Dharma Loka",
    waveName: "Gelombang 1 (Vokasi)",
    waveNumber: 1,
    trackName: "Jalur Rekayasa Perangkat Lunak (RPL)",
    appliedAt: "2026-11-04 11:15:00",
    fullName: "Rian Aditya Nugroho",
    nik: "1471062007090006",
    nisn: "0096655443",
    gender: "L",
    birthPlace: "Pekanbaru",
    birthDate: "2009-07-20",
    religion: "Islam",
    address: "Jl. Air Hitam, Labuh Baru Barat, Pekanbaru",
    previousSchool: "SMP Negeri 4 Pekanbaru",
    schoolOriginCity: "Kota Pekanbaru",
    fatherName: "Agus Nugroho",
    fatherJob: "Teknisi Elektronika",
    motherName: "Sri Wahyuni",
    motherJob: "Pedagang",
    parentWhatsapp: "085278119022",
    parentEmail: "rian.nugroho.tech@gmail.com",
    monthlyIncome: "Rp 5.000.000 - Rp 10.000.000",
    documentStatus: "approved",
    paymentStatus: "unpaid",
    selectionStatus: "registered",
    finalStatus: "candidate",
    documents: [
      {
        id: "doc-601",
        type: "kk",
        label: "Kartu Keluarga",
        fileName: "KK_Agus_Nugroho.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "1.1 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 11:20",
        status: "approved",
      },
      {
        id: "doc-602",
        type: "rapor",
        label: "Rapor SMP",
        fileName: "Rapor_Rian.pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "2.8 MB",
        mimeType: "application/pdf",
        uploadedAt: "2026-11-04 11:22",
        status: "approved",
      },
    ],
    invoices: [
      {
        id: "inv-601",
        invoiceNumber: "INV-2026-SMK-0001",
        type: "registration_form",
        typeLabel: "Formulir SPMB SMK",
        amount: 200000,
        status: "unpaid",
        dueDate: "2026-11-07 23:59",
        paymentMethod: "midtrans_va",
      },
    ],
    internalNotes: "Menunggu pembayaran formulir melalui Virtual Account Mandiri.",
  },
];

export const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    key: "REGISTRATION_SUCCESS",
    name: "Pendaftaran Berhasil & Tagihan Formulir",
    category: "pendaftaran",
    body: "Halo Bapak/Ibu {nama_ortu},\n\nTerima kasih telah mendaftarkan ananda *{nama_siswa}* di *{nama_sekolah}* untuk Tahun Ajaran 2026/2027.\n\nNomor Registrasi Anda: *{no_reg}*\nTotal Tagihan Formulir: *{total_tagihan}*\nBatas Pembayaran: *{batas_bayar}*\n\nSilakan selesaikan pembayaran dan pantau status berkas Anda melalui tautan portal berikut:\n{link_portal}\n\nSalam hangat,\n*Panitia SPMB Dharma Loka Pekanbaru*",
  },
  {
    key: "DOC_REVISION",
    name: "Pemberitahuan Perbaikan Berkas",
    category: "pendaftaran",
    body: "Yth. Bapak/Ibu {nama_ortu},\n\nSetelah dilakukan verifikasi dokumen calon siswa *{nama_siswa}* ({no_reg}), panitia menemukan berkas yang perlu diperbaiki:\n\nCatatan Panitia:\n_{catatan_revisi}_\n\nMohon unggah kembali dokumen pengganti sebelum tanggal {batas_waktu} di link ini:\n{link_portal}\n\nTerima kasih atas kerja samanya.",
  },
  {
    key: "TEST_SCHEDULE",
    name: "Undangan & Jadwal Tes Seleksi",
    category: "seleksi",
    body: "Salam Sejahtera Bapak/Ibu {nama_ortu},\n\nBerkas pendaftaran ananda *{nama_siswa}* ({no_reg}) telah diverifikasi lengkap. Berikut adalah jadwal tes observasi & wawancara:\n\n🗓️ Tanggal/Waktu: *{jadwal_tes}*\n📍 Lokasi/Ruang: *{ruang_tes}*\n👔 Pakaian: Seragam sekolah asal / rapi sopan\n\nHarap hadir 15 menit sebelum sesi dimulai. Kartu peserta ujian dapat diunduh di dashboard:\n{link_portal}",
  },
  {
    key: "ANNOUNCEMENT_PASSED",
    name: "Pengumuman Kelulusan & Daftar Ulang",
    category: "pengumuman",
    body: "Selamat Bapak/Ibu {nama_ortu}! 🎉\n\nBerdasarkan hasil tes seleksi SPMB 2026/2027, ananda *{nama_siswa}* ({no_reg}) dinyatakan:\n\n⭐ *LULUS DITERIMA DI {nama_sekolah}* ⭐\n\nSilakan masuk ke portal untuk mengunduh Surat Keputusan Kelulusan resmi serta menyelesaikan proses daftar ulang sebelum kuota terisi:\n{link_portal}\n\nSelamat bergabung di keluarga besar Dharma Loka!",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "log-1",
    timestamp: "2026-11-04 12:45:10",
    userName: "Siti Rahmawati, S.E",
    userRole: "Keuangan",
    tenantId: "sma",
    action: "APPROVE_PAYMENT",
    module: "Tagihan & Pembayaran",
    description: "Konfirmasi manual transfer Uang Pangkal INV-2026-SMA-0002 sebesar Rp 6.500.000 atas nama Nathaniel Vincent Wijaya.",
    ipAddress: "180.252.164.88",
  },
  {
    id: "log-2",
    timestamp: "2026-11-04 12:40:02",
    userName: "Budi Santoso, S.Kom",
    userRole: "Panitia SPMB",
    tenantId: "sma",
    action: "CONVERT_STUDENT",
    module: "Konversi Siswa",
    description: "Mengonversi pendaftar SMA-2026-G1-0001 menjadi Siswa Aktif kelas X-MIPA 1 dengan NIS 26SMA0001.",
    ipAddress: "180.252.164.88",
  },
  {
    id: "log-3",
    timestamp: "2026-11-04 11:50:33",
    userName: "Budi Santoso, S.Kom",
    userRole: "Panitia SPMB",
    tenantId: "sma",
    action: "REVISION_REQUESTED",
    module: "Verifikasi Berkas",
    description: "Meminta revisi Akta Kelahiran pendaftar SMA-2026-G1-0002 (Clarissa Aurelia Tan) karena foto buram.",
    ipAddress: "180.252.164.88",
  },
  {
    id: "log-4",
    timestamp: "2026-11-04 10:15:22",
    userName: "Super Administrator Yayasan",
    userRole: "Super Admin",
    tenantId: "portal",
    action: "UPDATE_SPMB_WAVE",
    module: "Pengaturan SPMB",
    description: "Memperbarui kuota Gelombang 1 jenjang SMA menjadi 120 siswa.",
    ipAddress: "36.88.212.14",
  },
  {
    id: "log-5",
    timestamp: "2026-11-04 09:30:00",
    userName: "Kevin Pratama, S.I.Kom",
    userRole: "Editor Konten",
    tenantId: "sma",
    action: "PUBLISH_NEWS",
    module: "CMS Berita",
    description: "Mempublikasikan artikel 'Prestasi Tim Robotika Dharma Loka di Kejuaraan Internasional'.",
    ipAddress: "114.122.35.71",
  },
];

export const INITIAL_CMS_NEWS: CMSNewsItem[] = [
  {
    id: "news-1",
    tenantId: "sma",
    title: "Prestasi Tim Robotika SMA Dharma Loka Raih Medali Emas Ajang Internasional",
    slug: "prestasi-tim-robotika-dharma-loka-kejuaraan-internasional",
    category: "Prestasi Siswa",
    status: "published",
    isPinned: true,
    publishedAt: "2026-11-03",
    author: "Super Administrator",
    excerpt: "Tim robotika SMA Dharma Loka Pekanbaru mengharumkan nama Indonesia di kompetisi sains robotik internasional.",
    content: "<p>Tim robotika binaan Sekolah Dharma Loka Pekanbaru kembali menorehkan prestasi gemilang di kancah global...</p>",
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    views: 1240,
  },
  {
    id: "news-2",
    tenantId: "portal",
    title: "Penerimaan Peserta Didik Baru (SPMB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    slug: "penerimaan-peserta-didik-baru-tahun-ajaran-2026-2027-dibuka",
    category: "Pengumuman Resmi",
    status: "published",
    isPinned: true,
    publishedAt: "2026-11-01",
    author: "Panitia SPMB",
    excerpt: "Yayasan Pendidikan Dharma Loka membuka pendaftaran calon peserta didik baru untuk jenjang TK, SD, SMP, SMA, dan SMK.",
    content: "<p>Pendaftaran dibuka secara daring 24 jam dengan kemudahan verifikasi berkas dan pembayaran otomatis...</p>",
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    views: 3480,
  },
  {
    id: "news-3",
    tenantId: "tk",
    title: "Semarak Festival Hari Anak & Eksplorasi Sensori PAUD-TK Dharma Loka",
    slug: "festival-hari-anak-eksplorasi-sensori-tk",
    category: "Kegiatan Siswa",
    status: "published",
    isPinned: false,
    publishedAt: "2026-10-28",
    author: "Ibu Linda (TK)",
    excerpt: "Murid-murid TK Dharma Loka berkreasi dengan cat ramah anak dan musik pentas budaya ceria.",
    content: "<p>Kegiatan outdoor menstimulasi motorik kasar dan kecerdasan sosial anak sejak usia dini...</p>",
    featuredImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    views: 890,
  },
];

export const INITIAL_CONTACT_MESSAGES: CMSContactMessage[] = [
  {
    id: "msg-1",
    tenantId: "sma",
    senderName: "Budi Pratama",
    senderPhone: "081234567890",
    senderEmail: "budi.pratama@gmail.com",
    subject: "Informasi Beasiswa Jalur Prestasi Olimpiade Sains",
    message: "Halo Panitia SPMB, apakah tersedia beasiswa penuh bagi calon siswa SMA yang pernah meraih medali perak OSN tingkat kota? Mohon info rinciannya.",
    status: "read",
    receivedAt: "2026-11-04 09:12",
  },
  {
    id: "msg-2",
    tenantId: "tk",
    senderName: "Jessica Lee",
    senderPhone: "081399887766",
    senderEmail: "jessica.lee@yahoo.com",
    subject: "Jadwal Tur Kampus & Observasi Playgroup",
    message: "Selamat pagi, saya ingin mengajak anak saya usia 3.5 tahun berkunjung ke TK Dharma Loka hari Sabtu ini. Apakah perlu reservasi terlebih dahulu?",
    status: "unread",
    receivedAt: "2026-11-04 11:30",
  },
];

// ============================================================================
// STORAGE HELPER WITH LOCALSTORAGE PERSISTENCE
// ============================================================================

const STORAGE_KEYS = {
  APPLICANTS: "dl_admin_applicants_v2",
  USERS: "dl_admin_users_v2",
  AUDIT_LOGS: "dl_admin_audit_logs_v2",
  NEWS: "dl_admin_news_v2",
  MESSAGES: "dl_admin_messages_v2",
  ACTIVE_TENANT: "dl_admin_active_tenant",
};

export const AdminStore = {
  // Applicants
  getApplicants: (): AdminApplicant[] => {
    if (typeof window === "undefined") return INITIAL_APPLICANTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(INITIAL_APPLICANTS));
        return INITIAL_APPLICANTS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_APPLICANTS;
    }
  },

  saveApplicants: (applicants: AdminApplicant[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  },

  updateApplicantStatus: (
    id: string,
    updates: Partial<AdminApplicant>,
    actorName: string = "Admin"
  ): AdminApplicant | null => {
    const list = AdminStore.getApplicants();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    const before = list[idx];
    const updated = { ...before, ...updates };
    list[idx] = updated;
    AdminStore.saveApplicants(list);

    // Record audit log
    AdminStore.addAuditLog({
      userName: actorName,
      userRole: "Panitia / Admin",
      tenantId: updated.tenantId,
      action: "UPDATE_APPLICANT",
      module: "SPMB Pendaftar",
      description: `Memperbarui status pendaftar ${updated.registrationNumber} (${updated.fullName}). Status seleksi: ${updated.selectionStatus}, Dokumen: ${updated.documentStatus}, Bayar: ${updated.paymentStatus}`,
    });

    return updated;
  },

  // Audit Logs
  getAuditLogs: (): AuditLogItem[] => {
    if (typeof window === "undefined") return INITIAL_AUDIT_LOGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
        return INITIAL_AUDIT_LOGS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  addAuditLog: (entry: Omit<AuditLogItem, "id" | "timestamp" | "ipAddress">): void => {
    const logs = AdminStore.getAuditLogs();
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      ipAddress: "180.252.164.88",
      ...entry,
    };

    logs.unshift(newLog);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
    }
  },

  // Active Tenant Filter in Admin
  getActiveTenantFilter: (): TenantCode => {
    if (typeof window === "undefined") return "portal";
    return (localStorage.getItem(STORAGE_KEYS.ACTIVE_TENANT) as TenantCode) || "portal";
  },

  setActiveTenantFilter: (tenant: TenantCode): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TENANT, tenant);
  },
};

