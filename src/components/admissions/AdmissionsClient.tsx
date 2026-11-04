"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Calculator,
  Search,
  Printer,
  QrCode,
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  UserCheck,
  Sparkles,
  MessageCircle,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react";
import { useTenant } from "@/lib/tenantContext";
import { UNIT_TENANTS, TENANTS, TenantId } from "@/config/tenants";
import {
  SAMPLE_APPLICANTS,
  SpmbApplicantRecord,
} from "@/data/spmbDummy";
import { admissionFAQs } from "@/data/admissions";
import {
  spmbStep1AccountSchema,
  spmbStep3StudentSchema,
  spmbStep4ParentSchema,
  validateUploadedFile,
  compressImageClientSide,
} from "@/lib/validations";
import {
  Accordion,
  Badge,
  Card,
  Stepper,
  Toast,
} from "@/components/ui/DesignSystem";
import { publicApi } from "@/lib/api";

const DRAFT_STORAGE_KEY = "dl_spmb_draft_v2";

interface UploadedDocItem {
  key: string;
  label: string;
  required: boolean;
  fileName?: string;
  sizeKb?: number;
  previewUrl?: string;
  status: "empty" | "uploaded";
}

export function AdmissionsClient() {
  const { tenantId } = useTenant();
  const [activeMainTab, setActiveMainTab] = useState<
    "info" | "daftar" | "dashboard" | "status"
  >("info");

  // Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Baca hash / query param saat pertama kali dimuat
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (
      tabParam === "daftar" ||
      tabParam === "dashboard" ||
      tabParam === "status" ||
      tabParam === "info"
    ) {
      setActiveMainTab(tabParam);
    } else if (window.location.hash === "#daftar") {
      setActiveMainTab("daftar");
    }
  }, []);

  // =========================================================================
  // 1. STATE HITUNG MUNDUR GELOMBANG SPMB & KALKULATOR SIMULASI BIAYA
  // =========================================================================
  const [countdown, setCountdown] = useState({
    days: 56,
    hours: 14,
    minutes: 32,
    seconds: 19,
  });

  useEffect(() => {
    const target = new Date("2026-06-30T23:59:59+07:00").getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [calcLevel, setCalcLevel] = useState<"tk" | "sd" | "smp" | "sma">(
    tenantId !== "portal" ? (tenantId as any) : "sd"
  );
  const [calcTrack, setCalcTrack] = useState<
    "reguler" | "prestasi_akademik" | "sibling"
  >("reguler");
  const [calcInstallmentMonths, setCalcInstallmentMonths] = useState<
    1 | 3 | 6
  >(1);

  const calcResult = useMemo(() => {
    const unitCfg = TENANTS[calcLevel];
    const fees = unitCfg.spmb.fees;
    let discountRate = 0.1; // Diskon Early Bird Gelombang 1 default 10%
    if (calcTrack === "prestasi_akademik") discountRate = 0.5; // Beasiswa 50% Uang Pangkal
    if (calcTrack === "sibling") discountRate = 0.25; // Potongan saudara kandung 25%

    const discountAmount = Math.round(fees.developmentFee * discountRate);
    const netDevelopmentFee = fees.developmentFee - discountAmount;
    const totalInitial =
      fees.registrationForm +
      netDevelopmentFee +
      fees.annualActivity +
      fees.uniformPackage +
      fees.monthlyTuition;
    const installmentPerMonth = Math.round(
      netDevelopmentFee / calcInstallmentMonths
    );

    return {
      unitCfg,
      fees,
      discountRate: Math.round(discountRate * 100),
      discountAmount,
      netDevelopmentFee,
      totalInitial,
      installmentPerMonth,
    };
  }, [calcLevel, calcTrack, calcInstallmentMonths]);

  // =========================================================================
  // 2. STATE STEPPER PENDAFTARAN 6 TAHAP (AUTO-SAVE DRAFT)
  // =========================================================================
  const [currentStep, setCurrentStep] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [submittingSpmb, setSubmittingSpmb] = useState(false);
  const [submittedRecord, setSubmittedRecord] =
    useState<SpmbApplicantRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"va_bca" | "qris" | "transfer">("qris");
  const [paymentProofUploaded, setPaymentProofUploaded] = useState(false);

  const [form, setForm] = useState({
    // Step 1: Akun
    fullName: "",
    whatsapp: "",
    email: "",
    password: "",
    otpVerified: false,
    // Step 2: Jenjang & Jalur
    level: (tenantId !== "portal" ? tenantId : "sd") as "tk" | "sd" | "smp" | "sma",
    wave: "gelombang_1" as "gelombang_1" | "gelombang_2" | "gelombang_3",
    track: "reguler" as
      | "reguler"
      | "prestasi_akademik"
      | "prestasi_non_akademik"
      | "sibling",
    // Step 3: Data Calon Siswa
    studentName: "",
    nik: "",
    nisn: "",
    birthPlace: "Pekanbaru",
    birthDate: "2014-05-14",
    gender: "L" as "L" | "P",
    religion: "Buddha" as
      | "Buddha"
      | "Islam"
      | "Kristen"
      | "Katolik"
      | "Hindu"
      | "Konghucu",
    address: "",
    previousSchool: "",
    achievementNotes: "",
    // Step 4: Data Orang Tua/Wali
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    guardianName: "",
    incomeBracket: "10m_25m" as
      | "under_5m"
      | "5m_10m"
      | "10m_25m"
      | "above_25m",
    parentPhone: "",
    emergencyContact: "",
    // Step 6: Persetujuan
    statementAgreed: false,
  });

  const [docs, setDocs] = useState<UploadedDocItem[]>([
    { key: "kk", label: "Kartu Keluarga (KK)", required: true, status: "empty" },
    {
      key: "akta",
      label: "Akta Kelahiran Calon Siswa",
      required: true,
      status: "empty",
    },
    {
      key: "rapor",
      label: "Rapor / Ijazah Jenjang Sebelumnya",
      required: false,
      status: "empty",
    },
    {
      key: "foto",
      label: "Pas Foto Berwarna Ukuran 3x4",
      required: true,
      status: "empty",
    },
    {
      key: "prestasi",
      label: "Sertifikat / Piagam Prestasi (Opsional)",
      required: false,
      status: "empty",
    },
  ]);

  // Muat draft tersimpan dari localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm((prev) => ({ ...prev, ...parsed.form }));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Auto-save draft ke localStorage setiap kali form berubah
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ form, updatedAt: new Date().toISOString() })
      );
    } catch {
      // Ignore
    }
  }, [form]);

  const handleSendOtp = () => {
    if (!form.whatsapp || !form.email || !form.fullName) {
      setStepError(
        "Lengkapi Nama, Nomor WhatsApp, dan Email terlebih dahulu sebelum meminta OTP."
      );
      return;
    }
    setStepError(null);
    setOtpSent(true);
    setOtpInput("123456");
    showToast(
      "Kode OTP (Demo: 123456) telah dikirim ke WhatsApp & Email Anda.",
      "info"
    );
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() === "123456" || otpInput.trim().length === 6) {
      setForm((prev) => ({ ...prev, otpVerified: true }));
      setStepError(null);
      showToast("Nomor WhatsApp & Email berhasil diverifikasi!", "success");
    } else {
      setStepError("Kode OTP tidak sesuai. Gunakan kode 6 digit (contoh: 123456).");
    }
  };

  const handleFileChange = async (docKey: string, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const rawFile = fileList[0];
    const check = validateUploadedFile(rawFile);
    if (!check.valid) {
      showToast(check.error || "Berkas tidak valid", "error");
      return;
    }

    // Kompresi gambar otomatis di sisi klien jika bertipe image
    const compressed = await compressImageClientSide(rawFile);
    setDocs((prev) =>
      prev.map((d) =>
        d.key === docKey
          ? {
              ...d,
              fileName: compressed.file.name,
              sizeKb: compressed.compressedSizeKb,
              previewUrl: compressed.previewUrl,
              status: "uploaded",
            }
          : d
      )
    );
    showToast(
      `Berkas berhasil dikompresi & diunggah (${compressed.compressedSizeKb} KB)`,
      "success"
    );
  };

  const fillDemoDocuments = () => {
    setDocs((prev) =>
      prev.map((d) => ({
        ...d,
        fileName: `scan_${d.key}_dharma_loka.pdf`,
        sizeKb: 420,
        status: "uploaded",
      }))
    );
    showToast("Seluruh berkas persyaratan contoh berhasil dilampirkan.", "success");
  };

  const handleNextStep = () => {
    setStepError(null);
    if (currentStep === 0) {
      const check = spmbStep1AccountSchema.safeParse({
        fullName: form.fullName,
        whatsapp: form.whatsapp,
        email: form.email,
        password: form.password,
        otpVerified: form.otpVerified,
      });
      if (!check.success) {
        setStepError(check.error.issues[0]?.message || "Periksa data akun.");
        return;
      }
      if (!form.parentPhone) {
        setForm((p) => ({ ...p, parentPhone: p.whatsapp }));
      }
    } else if (currentStep === 2) {
      const check = spmbStep3StudentSchema.safeParse({
        studentName: form.studentName,
        nik: form.nik,
        nisn: form.nisn || undefined,
        birthPlace: form.birthPlace,
        birthDate: form.birthDate,
        gender: form.gender,
        religion: form.religion,
        address: form.address,
        previousSchool: form.previousSchool,
        achievementNotes: form.achievementNotes,
      });
      if (!check.success) {
        setStepError(check.error.issues[0]?.message || "Periksa data calon siswa.");
        return;
      }
    } else if (currentStep === 3) {
      const check = spmbStep4ParentSchema.safeParse({
        fatherName: form.fatherName,
        fatherOccupation: form.fatherOccupation,
        motherName: form.motherName,
        motherOccupation: form.motherOccupation,
        guardianName: form.guardianName,
        incomeBracket: form.incomeBracket,
        parentPhone: form.parentPhone,
        emergencyContact: form.emergencyContact,
      });
      if (!check.success) {
        setStepError(
          check.error.issues[0]?.message || "Periksa data orang tua/wali."
        );
        return;
      }
    } else if (currentStep === 4) {
      const missingRequired = docs.filter(
        (d) => d.required && d.status !== "uploaded"
      );
      if (missingRequired.length > 0) {
        setStepError(
          `Mohon unggah berkas wajib: ${missingRequired
            .map((m) => m.label)
            .join(", ")}`
        );
        return;
      }
    }

    setCurrentStep((s) => Math.min(5, s + 1));
  };

  const handleSubmitFinalSpmb = async () => {
    if (!form.statementAgreed) {
      setStepError(
        "Harap centang pernyataan kebenaran data sebelum mengirim pendaftaran."
      );
      return;
    }
    setStepError(null);
    setSubmittingSpmb(true);

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const regNo = `SPMB-2026-DL-${randomCode}`;
    const selectedTenant = TENANTS[form.level];

    // Kirim juga ke API backend Laravel agar muncul di tabel Admin CMS (/admin/admissions)
    try {
      await publicApi.submitAdmission({
        parent_name: `${form.fatherName || form.fullName} (Ortu dari ${
          form.studentName
        })`,
        email: form.email,
        phone: form.whatsapp,
        student_name: form.studentName,
        student_level: form.level,
        academic_year: "2026/2027",
        previous_school: form.previousSchool || "-",
        message: `No.Reg: ${regNo} | NIK: ${form.nik} | Jalur: ${form.track} | Gelombang: ${form.wave}`,
      });
    } catch {
      // Tetap lanjutkan pembuatan bukti registrasi
    }

    const newRecord: SpmbApplicantRecord = {
      registrationNumber: regNo,
      studentName: form.studentName,
      nik: form.nik,
      nisn: form.nisn || "-",
      birthPlace: form.birthPlace,
      birthDate: form.birthDate,
      gender: form.gender,
      level: form.level,
      levelLabel: selectedTenant.shortName,
      wave:
        form.wave === "gelombang_1"
          ? "Gelombang 1 (Early Bird)"
          : form.wave === "gelombang_2"
          ? "Gelombang 2"
          : "Gelombang 3",
      track: form.track.replace("_", " ").toUpperCase(),
      parentName: form.fatherName || form.fullName,
      whatsapp: form.whatsapp,
      email: form.email,
      previousSchool: form.previousSchool || "-",
      registeredAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      currentStepIndex: 1, // Berkas Diverifikasi / Menunggu Pembayaran
      selectionResult: "PROSES_VERIFIKASI",
      adminRevisionNote:
        "Pendaftaran baru berhasil diterima sistem. Silakan selesaikan pembayaran biaya formulir untuk mengaktifkan jadwal observasi.",
      testSchedule: {
        date: "Sabtu, 6 Juni 2026",
        time: "08.30 – 11.00 WIB",
        room: `Gedung ${selectedTenant.levelCode} — Ruang Observasi Utama`,
        interviewer: selectedTenant.principal.name,
      },
      invoice: {
        invoiceNumber: `INV/SPMB/2026/${randomCode}`,
        amount: selectedTenant.spmb.fees.registrationForm,
        status: "MENUNGGU_PEMBAYARAN",
        vaNumberBca: `390108127500${randomCode}`,
        vaNumberMandiri: `890220260000${randomCode}`,
      },
      documents: docs.map((d) => ({
        name: d.label,
        status: d.status === "uploaded" ? "Menunggu Verifikasi" : "Perlu Perbaikan",
      })),
    };

    setSubmittedRecord(newRecord);
    setDashboardRecord(newRecord);
    setSubmittingSpmb(false);
    showToast(
      `Pendaftaran Berhasil! Nomor Registrasi Anda: ${regNo}`,
      "success"
    );
  };

  // =========================================================================
  // 3. STATE DASHBOARD PENDAFTAR & CEK STATUS KELULUSAN
  // =========================================================================
  const [dashboardRecord, setDashboardRecord] = useState<SpmbApplicantRecord>(
    SAMPLE_APPLICANTS[0]
  );
  const [statusRegNo, setStatusRegNo] = useState("SPMB-2026-DL-8821");
  const [statusBirthDate, setStatusBirthDate] = useState("2014-05-14");
  const [checkedApplicant, setCheckedApplicant] =
    useState<SpmbApplicantRecord | null>(SAMPLE_APPLICANTS[0]);
  const [statusError, setStatusError] = useState<string | null>(null);

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusError(null);
    const allRecords = submittedRecord
      ? [submittedRecord, ...SAMPLE_APPLICANTS]
      : SAMPLE_APPLICANTS;

    const found = allRecords.find(
      (r) =>
        r.registrationNumber.toLowerCase() ===
        statusRegNo.trim().toLowerCase()
    );
    if (!found) {
      setCheckedApplicant(null);
      setStatusError(
        "Nomor Registrasi tidak ditemukan. Gunakan salah satu contoh nomor registrasi di bawah untuk simulasi."
      );
      return;
    }
    setCheckedApplicant(found);
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div className="space-y-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* =====================================================================
          MAIN NAVIGATION TABS SPMB ONLINE
      ===================================================================== */}
      <div className="bg-blue-50/70 p-2.5 rounded-3xl border border-blue-200 flex flex-wrap gap-2 no-print">
        {[
          {
            id: "info",
            label: "1. Info, Kuota & Simulasi Biaya",
            icon: Calculator,
          },
          {
            id: "daftar",
            label: "2. Pendaftaran Online (6 Tahap)",
            icon: FileText,
          },
          {
            id: "dashboard",
            label: "3. Dashboard Calon Siswa",
            icon: UserCheck,
          },
          {
            id: "status",
            label: "4. Cek Status & Pengumuman",
            icon: Search,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`flex-1 min-w-[210px] min-h-[50px] px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition cursor-pointer ${
                active
                  ? "bg-royal text-white shadow-md shadow-royal/20"
                  : "bg-white hover:bg-blue-50 text-primary-950 border border-blue-100"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          TAB 1: INFORMASI GELOMBANG, ALUR 5 LANGKAH, KUOTA & KALKULATOR BIAYA
      ===================================================================== */}
      {activeMainTab === "info" && (
        <div className="space-y-16">
          {/* Banner Gelombang Aktif + Hitung Mundur Real-time */}
          <div className="rounded-3xl bg-gradient-to-r from-primary-950 via-royal-dark to-royal text-white p-8 sm:p-10 shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-200 text-xs font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  GELOMBANG 1 (EARLY BIRD) AKTIF
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                  Penerimaan Murid Baru (SPMB) T.A. 2026/2027
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  Nikmati potongan Uang Pangkal 10% (Jalur Reguler) hingga 50% (Jalur Beasiswa Prestasi) khusus pendaftaran sebelum penutupan Gelombang 1.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveMainTab("daftar")}
                    className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-white text-royal font-extrabold text-sm shadow-lg hover:bg-blue-50 transition cursor-pointer"
                  >
                    <span>Daftar Online Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hitung Mundur */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center space-y-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                    Batas Waktu Penutupan Gelombang 1:
                  </p>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[
                      { val: countdown.days, label: "Hari" },
                      { val: countdown.hours, label: "Jam" },
                      { val: countdown.minutes, label: "Menit" },
                      { val: countdown.seconds, label: "Detik" },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="p-3 rounded-2xl bg-primary-950/60 border border-white/15"
                      >
                        <span className="text-2xl sm:text-3xl font-extrabold font-mono block">
                          {String(c.val).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] text-blue-200">
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Infografis 5 Langkah Alur Pendaftaran */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="blue">Alur Pendaftaran</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
                5 Langkah Mudah Pendaftaran SPMB Online
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "Buat Akun & OTP",
                  desc: "Registrasi nomor WhatsApp & email orang tua untuk menerima kode OTP.",
                },
                {
                  step: "02",
                  title: "Isi Biodata & Unggah Berkas",
                  desc: "Lengkapi data calon siswa serta unggah foto KK, Akta Lahir & Rapor.",
                },
                {
                  step: "03",
                  title: "Pembayaran Formulir",
                  desc: "Bayar biaya formulir secara instan melalui QRIS atau Virtual Account.",
                },
                {
                  step: "04",
                  title: "Observasi & Wawancara",
                  desc: "Cetak kartu peserta dan ikuti sesi observasi kesiapan belajar sesuai jadwal.",
                },
                {
                  step: "05",
                  title: "Pengumuman & Daftar Ulang",
                  desc: "Cek hasil kelulusan secara online dan selesaikan proses daftar ulang.",
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 space-y-3 relative">
                  <span className="inline-block px-3 py-1 rounded-xl bg-royal text-white font-mono font-extrabold text-xs">
                    Langkah {item.step}
                  </span>
                  <h4 className="text-base font-extrabold text-primary-950">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Kuota Tersisa per Jenjang */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge variant="emerald">Update Real-time</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950 mt-2">
                  Ketersediaan Kuota Kursi Tahun Ajaran 2026/2027
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {UNIT_TENANTS.map((u) => {
                const remaining = u.spmb.quotaTotal - u.spmb.quotaFilled;
                const pct = Math.round(
                  (u.spmb.quotaFilled / u.spmb.quotaTotal) * 100
                );
                return (
                  <Card key={u.id} className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-blue-50 text-royal font-extrabold text-xs">
                        Unit {u.levelCode}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-700">
                        Tersisa {remaining} Kursi
                      </span>
                    </div>
                    <h4 className="text-lg font-extrabold text-primary-950">
                      {u.shortName}
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Terisi: {u.spmb.quotaFilled} siswa</span>
                        <span>Kapasitas: {u.spmb.quotaTotal}</span>
                      </div>
                      <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-royal rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, level: u.id as any }));
                        setActiveMainTab("daftar");
                      }}
                      className="w-full min-h-[42px] py-2 rounded-xl bg-blue-50 hover:bg-royal text-royal hover:text-white text-xs font-extrabold transition cursor-pointer"
                    >
                      Daftar Jenjang {u.levelCode}
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* KALKULATOR SIMULASI BIAYA PENDIDIKAN */}
          <Card
            id="kalkulator-biaya"
            className="p-8 sm:p-10 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/40 border-2 border-blue-200 scroll-mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <Badge variant="blue">
                    <Calculator className="w-3.5 h-3.5" />
                    Simulasi Transparan
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
                    Kalkulator Estimasi Biaya Pendidikan
                  </h3>
                  <p className="text-sm text-slate-600">
                    Hitung perkiraan biaya masuk, potongan jalur prestasi/sibling, serta simulasi cicilan Uang Pangkal sesuai jenjang yang dipilih.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      1. Pilih Jenjang Pendidikan
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["tk", "sd", "smp", "sma"] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setCalcLevel(lvl)}
                          className={`min-h-[44px] py-2 rounded-xl text-xs font-extrabold uppercase border transition cursor-pointer ${
                            calcLevel === lvl
                              ? "bg-royal text-white border-royal shadow-sm"
                              : "bg-white text-primary-950 border-blue-200 hover:bg-blue-50"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      2. Pilih Jalur Pendaftaran
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "reguler", label: "Reguler (Diskon 10%)" },
                        {
                          id: "prestasi_akademik",
                          label: "Prestasi (Beasiswa 50%)",
                        },
                        { id: "sibling", label: "Saudara Kandung (25%)" },
                      ].map((tr) => (
                        <button
                          key={tr.id}
                          type="button"
                          onClick={() => setCalcTrack(tr.id as any)}
                          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            calcTrack === tr.id
                              ? "bg-primary-950 text-white border-primary-950"
                              : "bg-white text-slate-700 border-blue-200 hover:bg-blue-50"
                          }`}
                        >
                          {tr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      3. Skema Pembayaran Uang Pangkal
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { m: 1, label: "Bayar Penuh (1x)" },
                        { m: 3, label: "Cicilan 3 Bulan (0%)" },
                        { m: 6, label: "Cicilan 6 Bulan (0%)" },
                      ].map((inst) => (
                        <button
                          key={inst.m}
                          type="button"
                          onClick={() => setCalcInstallmentMonths(inst.m as any)}
                          className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            calcInstallmentMonths === inst.m
                              ? "bg-royal text-white border-royal"
                              : "bg-white text-slate-700 border-blue-200"
                          }`}
                        >
                          {inst.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hasil Rincian Kalkulator */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-200 shadow-elevated space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-bold text-royal uppercase">
                        Rincian Simulasi Biaya
                      </span>
                      <h4 className="text-xl font-extrabold text-primary-950">
                        {calcResult.unitCfg.name}
                      </h4>
                    </div>
                    <Badge variant="emerald">
                      Hemat {calcResult.discountRate}% Uang Pangkal
                    </Badge>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Biaya Formulir Pendaftaran</span>
                      <span className="font-bold text-primary-950">
                        {formatRupiah(calcResult.fees.registrationForm)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Uang Pangkal Normal</span>
                      <span className="line-through text-slate-400">
                        {formatRupiah(calcResult.fees.developmentFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>
                        Potongan Jalur ({calcResult.discountRate}%)
                      </span>
                      <span>- {formatRupiah(calcResult.discountAmount)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>UangPangkal Setelah Potongan</span>
                      <span className="font-extrabold text-primary-950">
                        {formatRupiah(calcResult.netDevelopmentFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Paket Seragam Lengkap (5 Stel)</span>
                      <span className="font-bold text-primary-950">
                        {formatRupiah(calcResult.fees.uniformPackage)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Kegiatan & Buku Tahunan</span>
                      <span className="font-bold text-primary-950">
                        {formatRupiah(calcResult.fees.annualActivity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>SPP Bulan Pertama (Juli 2026)</span>
                      <span className="font-bold text-primary-950">
                        {formatRupiah(calcResult.fees.monthlyTuition)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-600 block">
                        Total Estimasi Biaya Awal Masuk:
                      </span>
                      {calcInstallmentMonths > 1 && (
                        <span className="text-xs font-bold text-royal">
                          Cicilan Uang Pangkal:{" "}
                          {formatRupiah(calcResult.installmentPerMonth)} / bln (
                          {calcInstallmentMonths}x)
                        </span>
                      )}
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-royal">
                      {formatRupiah(calcResult.totalInitial)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        level: calcLevel,
                        track: calcTrack,
                      }));
                      setActiveMainTab("daftar");
                    }}
                    className="w-full min-h-[48px] py-3 rounded-2xl bg-royal hover:bg-royal-dark text-white font-extrabold text-sm shadow-md transition cursor-pointer"
                  >
                    Lanjut Daftar dengan Skema Ini →
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* FAQ SPMB */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="blue">Pertanyaan Umum SPMB</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
                Tanya Jawab Seputar Pendaftaran Murid Baru
              </h3>
            </div>
            <Accordion
              items={admissionFAQs.map((f, i) => ({
                id: `spmb-faq-${i}`,
                question: f.question,
                answer: f.answer,
              }))}
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: FORMULIR PENDAFTARAN ONLINE 6 TAHAP (STEPPER + AUTO-SAVE)
      ===================================================================== */}
      {activeMainTab === "daftar" && (
        <div id="daftar" className="max-w-4xl mx-auto space-y-8 scroll-mt-24">
          {!submittedRecord ? (
            <Card className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-5">
                <div>
                  <Badge variant="emerald">Auto-Save Draft Aktif</Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950 mt-2">
                    Formulir Pendaftaran SPMB Online
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Data otomatis tersimpan di perangkat Anda
                </span>
              </div>

              <Stepper
                currentStep={currentStep}
                onStepClick={(idx) => setCurrentStep(idx)}
                steps={[
                  { title: "Buat Akun", subtitle: "OTP WA/Email" },
                  { title: "Pilih Jenjang", subtitle: "Gelombang & Jalur" },
                  { title: "Data Siswa", subtitle: "NIK & Biodata" },
                  { title: "Data Ortu", subtitle: "Ayah, Ibu & Wali" },
                  { title: "Unggah Berkas", subtitle: "KK, Akta & Foto" },
                  { title: "Review & Kirim", subtitle: "Konfirmasi Akhir" },
                ]}
              />

              {stepError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm font-bold text-red-700 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}

              {/* STEP 1: BUAT AKUN & VERIFIKASI OTP */}
              {currentStep === 0 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Tahap 1: Buat Akun Pendaftar & Verifikasi OTP
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nama Lengkap Orang Tua / Pendaftar *
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        placeholder="Contoh: Hendri Tanoto"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm({ ...form, whatsapp: e.target.value })
                        }
                        placeholder="081275008899"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="ortu@email.com"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Buat Kata Sandi Portal Pendaftar *
                      </label>
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        placeholder="Minimal 8 karakter"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Box Verifikasi OTP */}
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold text-primary-950">
                          Verifikasi OTP WhatsApp / Email
                        </p>
                        <p className="text-xs text-slate-600">
                          Klik tombol kirim OTP untuk menerima 6 digit kode verifikasi.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="min-h-[42px] px-4 py-2 rounded-xl bg-white hover:bg-blue-100 text-royal border border-blue-200 text-xs font-extrabold cursor-pointer"
                      >
                        {otpSent ? "Kirim Ulang OTP" : "Kirim Kode OTP"}
                      </button>
                    </div>

                    {otpSent && (
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-blue-200/60">
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder="Masukkan 6 digit OTP"
                          className="w-44 min-h-[44px] px-4 py-2 rounded-xl bg-white border border-blue-300 font-mono font-extrabold text-base tracking-widest text-center"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="min-h-[44px] px-5 py-2 rounded-xl bg-royal text-white text-xs font-extrabold cursor-pointer"
                        >
                          Verifikasi Kode OTP
                        </button>
                        {form.otpVerified && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                            <CheckCircle2 className="w-4 h-4" />
                            Terverifikasi
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: PILIH JENJANG, GELOMBANG & JALUR */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Tahap 2: Pilih Unit Jenjang, Gelombang & Jalur Seleksi
                  </h3>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-600 mb-2">
                      Pilih Jenjang Pendidikan Tujuan *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {UNIT_TENANTS.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() =>
                            setForm({ ...form, level: u.id as any })
                          }
                          className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                            form.level === u.id
                              ? "bg-royal text-white border-royal shadow-md"
                              : "bg-white hover:bg-blue-50 text-primary-950 border-blue-200"
                          }`}
                        >
                          <p className="text-base font-extrabold">
                            {u.shortName}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              form.level === u.id
                                ? "text-blue-100"
                                : "text-slate-500"
                            }`}
                          >
                            Biaya Formulir:{" "}
                            {formatRupiah(u.spmb.fees.registrationForm)} • Sisa
                            Kuota: {u.spmb.quotaTotal - u.spmb.quotaFilled} kursi
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Gelombang Pendaftaran
                      </label>
                      <select
                        value={form.wave}
                        onChange={(e) =>
                          setForm({ ...form, wave: e.target.value as any })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm font-bold"
                      >
                        <option value="gelombang_1">
                          Gelombang 1 (Early Bird — Aktif)
                        </option>
                        <option value="gelombang_2">Gelombang 2 (Reguler)</option>
                        <option value="gelombang_3">Gelombang 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Jalur Seleksi SPMB
                      </label>
                      <select
                        value={form.track}
                        onChange={(e) =>
                          setForm({ ...form, track: e.target.value as any })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm font-bold"
                      >
                        <option value="reguler">Jalur Reguler Umum</option>
                        <option value="prestasi_akademik">
                          Jalur Beasiswa Prestasi Akademik (OSN/Rapor)
                        </option>
                        <option value="prestasi_non_akademik">
                          Jalur Prestasi Non-Akademik (Olahraga/Seni)
                        </option>
                        <option value="sibling">
                          Jalur Saudara Kandung (Sibling Dharma Loka)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DATA CALON SISWA */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Tahap 3: Biodata Lengkap Calon Siswa
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nama Lengkap Calon Siswa (Sesuai Akta Kelahiran) *
                      </label>
                      <input
                        type="text"
                        value={form.studentName}
                        onChange={(e) =>
                          setForm({ ...form, studentName: e.target.value })
                        }
                        placeholder="Nama lengkap anak"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nomor Induk Kependudukan / NIK (16 Digit) *
                      </label>
                      <input
                        type="text"
                        maxLength={16}
                        value={form.nik}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nik: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="147108xxxxxxxxxx"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        NISN (10 Digit — Opsional untuk TK/SD)
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={form.nisn}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nisn: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="014xxxxxxx"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Tempat Lahir *
                      </label>
                      <input
                        type="text"
                        value={form.birthPlace}
                        onChange={(e) =>
                          setForm({ ...form, birthPlace: e.target.value })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Tanggal Lahir *
                      </label>
                      <input
                        type="date"
                        value={form.birthDate}
                        onChange={(e) =>
                          setForm({ ...form, birthDate: e.target.value })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Jenis Kelamin *
                      </label>
                      <select
                        value={form.gender}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value as any })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm"
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Agama *
                      </label>
                      <select
                        value={form.religion}
                        onChange={(e) =>
                          setForm({ ...form, religion: e.target.value as any })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm"
                      >
                        <option value="Buddha">Buddha</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Alamat Lengkap Domisili di Pekanbaru/Riau *
                      </label>
                      <textarea
                        rows={2}
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                        className="w-full px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Asal Sekolah Sebelumnya
                      </label>
                      <input
                        type="text"
                        value={form.previousSchool}
                        onChange={(e) =>
                          setForm({ ...form, previousSchool: e.target.value })
                        }
                        placeholder="Contoh: SD Dharma Loka"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Catatan Prestasi (Jika Ada)
                      </label>
                      <input
                        type="text"
                        value={form.achievementNotes}
                        onChange={(e) =>
                          setForm({ ...form, achievementNotes: e.target.value })
                        }
                        placeholder="Contoh: Juara 1 Olimpiade Matematika Kota"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DATA ORANG TUA / WALI */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Tahap 4: Data Orang Tua / Wali Murid
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nama Lengkap Ayah Kandung *
                      </label>
                      <input
                        type="text"
                        value={form.fatherName}
                        onChange={(e) =>
                          setForm({ ...form, fatherName: e.target.value })
                        }
                        placeholder="Nama lengkap ayah"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Pekerjaan Ayah *
                      </label>
                      <input
                        type="text"
                        value={form.fatherOccupation}
                        onChange={(e) =>
                          setForm({ ...form, fatherOccupation: e.target.value })
                        }
                        placeholder="Wiraswasta / Karyawan Swasta / ASN / Dokter"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nama Lengkap Ibu Kandung *
                      </label>
                      <input
                        type="text"
                        value={form.motherName}
                        onChange={(e) =>
                          setForm({ ...form, motherName: e.target.value })
                        }
                        placeholder="Nama lengkap ibu"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Pekerjaan Ibu *
                      </label>
                      <input
                        type="text"
                        value={form.motherOccupation}
                        onChange={(e) =>
                          setForm({ ...form, motherOccupation: e.target.value })
                        }
                        placeholder="Pekerjaan ibu"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Rentang Penghasilan Gabungan Orang Tua
                      </label>
                      <select
                        value={form.incomeBracket}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            incomeBracket: e.target.value as any,
                          })
                        }
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm"
                      >
                        <option value="under_5m">&lt; Rp 5.000.000 / bulan</option>
                        <option value="5m_10m">
                          Rp 5.000.000 – Rp 10.000.000 / bulan
                        </option>
                        <option value="10m_25m">
                          Rp 10.000.000 – Rp 25.000.000 / bulan
                        </option>
                        <option value="above_25m">&gt; Rp 25.000.000 / bulan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                        Nomor Telepon / WhatsApp Orang Tua *
                      </label>
                      <input
                        type="tel"
                        value={form.parentPhone}
                        onChange={(e) =>
                          setForm({ ...form, parentPhone: e.target.value })
                        }
                        placeholder="081275008899"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: UNGGAH BERKAS PERSYARATAN (DRAG & DROP + KOMPRESI GAMBAR KLIEN) */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-primary-950">
                        Tahap 5: Unggah Berkas Persyaratan
                      </h3>
                      <p className="text-xs text-slate-600">
                        Format didukung: PDF, JPG, PNG (Maks. 2MB per berkas). Foto otomatis dikompresi di perangkat Anda.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={fillDemoDocuments}
                      className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-royal border border-blue-200 text-xs font-extrabold cursor-pointer self-start"
                    >
                      Isi Berkas Contoh (Demo Cepat)
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {docs.map((doc) => (
                      <div
                        key={doc.key}
                        className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          doc.status === "uploaded"
                            ? "bg-emerald-50/50 border-emerald-200"
                            : "bg-slate-50/60 border-blue-200 border-dashed"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-primary-950">
                              {doc.label}
                            </span>
                            {doc.required ? (
                              <Badge variant="red">Wajib</Badge>
                            ) : (
                              <Badge variant="slate">Opsional</Badge>
                            )}
                          </div>
                          {doc.status === "uploaded" ? (
                            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>
                                {doc.fileName} ({doc.sizeKb} KB — Terkompresi &
                                Siap Kirim)
                              </span>
                            </p>
                          ) : (
                            <p className="text-xs text-slate-500">
                              Tarik & lepas berkas ke sini atau klik tombol pilih file.
                            </p>
                          )}
                        </div>

                        <label className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-royal border border-blue-200 text-xs font-extrabold cursor-pointer shrink-0 shadow-2xs">
                          <Upload className="w-4 h-4" />
                          <span>
                            {doc.status === "uploaded"
                              ? "Ganti Berkas"
                              : "Pilih Berkas"}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChange(doc.key, e.target.files)
                            }
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: REVIEW & KIRIM PENDAFTARAN */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-extrabold text-primary-950">
                    Tahap 6: Review Data & Kirim Pendaftaran
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-blue-50/40 p-6 rounded-2xl border border-blue-100">
                    <div>
                      <span className="text-slate-500 block">
                        Nama Calon Siswa:
                      </span>
                      <strong className="text-primary-950 text-base">
                        {form.studentName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        Jenjang & Jalur:
                      </span>
                      <strong className="text-royal uppercase">
                        Unit {form.level} • {form.track.replace("_", " ")}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">NIK / NISN:</span>
                      <strong className="font-mono text-primary-950">
                        {form.nik} / {form.nisn || "-"}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        Tempat, Tanggal Lahir:
                      </span>
                      <strong className="text-primary-950">
                        {form.birthPlace}, {form.birthDate}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        Orang Tua (Ayah / Ibu):
                      </span>
                      <strong className="text-primary-950">
                        {form.fatherName} / {form.motherName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        Kontak WhatsApp & Email:
                      </span>
                      <strong className="text-primary-950">
                        {form.whatsapp} ({form.email})
                      </strong>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.statementAgreed}
                      onChange={(e) =>
                        setForm({ ...form, statementAgreed: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-royal"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      Saya menyatakan bahwa seluruh data dan berkas dokumen yang diunggah adalah benar dan dapat dipertanggungjawabkan sesuai ketentuan Penerimaan Peserta Didik Baru (SPMB) Sekolah Dharma Loka Pekanbaru.
                    </span>
                  </label>
                </div>
              )}

              {/* Tombol Navigasi Stepper */}
              <div className="pt-6 border-t border-blue-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-extrabold disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 min-h-[46px] px-6 py-2.5 rounded-2xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer"
                  >
                    <span>Lanjut ke Tahap {currentStep + 2}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submittingSpmb}
                    onClick={handleSubmitFinalSpmb}
                    className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-lg cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {submittingSpmb
                        ? "Memproses Registrasi..."
                        : "Kirim Pendaftaran SPMB"}
                    </span>
                  </button>
                )}
              </div>
            </Card>
          ) : (
            /* =================================================================
               HALAMAN SETELAH SUBMIT: NOMOR REGISTRASI, TAGIHAN VA/QRIS & CETAK PDF QR CODE
            ================================================================= */
            <div className="space-y-8">
              <Card className="p-8 sm:p-10 border-2 border-royal space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100 pb-6">
                  <div className="space-y-1.5">
                    <Badge variant="emerald">Pendaftaran Berhasil</Badge>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
                      Bukti Registrasi & Tagihan Formulir SPMB
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Simpan Nomor Registrasi ini untuk login ke Dashboard Pendaftar dan Cek Status Kelulusan.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 no-print">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-2xl bg-royal text-white text-xs font-extrabold shadow-sm cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Bukti PDF + QR Code</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("dashboard")}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-2xl bg-blue-50 text-royal border border-blue-200 text-xs font-extrabold cursor-pointer"
                    >
                      <span>Buka Dashboard Pendaftar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Kartu Bukti Pendaftaran dengan QR Code */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-blue-50/40 p-6 rounded-2xl border border-blue-200">
                  <div className="md:col-span-8 space-y-3 text-sm">
                    <p className="text-xs font-bold uppercase text-royal">
                      Nomor Registrasi Resmi:
                    </p>
                    <p className="text-2xl sm:text-3xl font-mono font-extrabold text-primary-950">
                      {submittedRecord.registrationNumber}
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-500 block">Nama Siswa:</span>
                        <strong>{submittedRecord.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Unit & Gelombang:
                        </span>
                        <strong>
                          {submittedRecord.levelLabel} ({submittedRecord.wave})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Nomor Tagihan:
                        </span>
                        <strong className="font-mono">
                          {submittedRecord.invoice.invoiceNumber}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Biaya Formulir:
                        </span>
                        <strong className="text-royal">
                          {formatRupiah(submittedRecord.invoice.amount)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-blue-100 text-center">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                        `https://dharmaloka.sch.id/admissions?reg=${submittedRecord.registrationNumber}`
                      )}`}
                      alt={`QR Code ${submittedRecord.registrationNumber}`}
                      width={136}
                      height={136}
                      className="rounded-lg"
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-500 mt-2">
                      QR Verifikasi Panitia SPMB
                    </span>
                  </div>
                </div>

                {/* Instruksi Pembayaran (QRIS / Virtual Account / Unggah Bukti) */}
                <div className="space-y-4 no-print">
                  <h3 className="text-base font-extrabold text-primary-950">
                    Pilih Metode Pembayaran Biaya Formulir ({formatRupiah(submittedRecord.invoice.amount)})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "qris", label: "QRIS Instan (Semua E-Wallet & M-Banking)" },
                      { id: "va_bca", label: "Virtual Account BCA / Mandiri" },
                      { id: "transfer", label: "Transfer Bank Manual" },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          paymentMethod === pm.id
                            ? "bg-royal text-white border-royal"
                            : "bg-white text-slate-700 border-blue-200"
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
                    {paymentMethod === "qris" && (
                      <p className="text-slate-700">
                        Pindai kode QRIS resmi <strong>Yayasan Pendidikan Dharma Loka (NMID: ID10260088291)</strong> melalui aplikasi BCA Mobile, Livin&apos; Mandiri, BRImo, GoPay, OVO, atau ShopeePay, lalu unggah bukti transaksi di bawah.
                      </p>
                    )}
                    {paymentMethod === "va_bca" && (
                      <div className="space-y-1">
                        <p>
                          Nomor BCA Virtual Account:{" "}
                          <strong className="font-mono text-royal">
                            {submittedRecord.invoice.vaNumberBca}
                          </strong>
                        </p>
                        <p>
                          Nomor Mandiri Virtual Account:{" "}
                          <strong className="font-mono text-royal">
                            {submittedRecord.invoice.vaNumberMandiri}
                          </strong>
                        </p>
                      </div>
                    )}
                    {paymentMethod === "transfer" && (
                      <p>
                        Bank BCA Cabang Pekanbaru — No. Rek:{" "}
                        <strong className="font-mono text-royal">
                          034-889-2026
                        </strong>{" "}
                        a.n. <strong>Yayasan Pendidikan Dharma Loka</strong>.
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>
                          {paymentProofUploaded
                            ? "Bukti Pembayaran Terunggah ✓"
                            : "Unggah Bukti Pembayaran"}
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={() => {
                            setPaymentProofUploaded(true);
                            setSubmittedRecord({
                              ...submittedRecord,
                              currentStepIndex: 2,
                              invoice: {
                                ...submittedRecord.invoice,
                                status: "LUNAS",
                              },
                            });
                            showToast(
                              "Bukti pembayaran diterima! Status tagihan diperbarui.",
                              "success"
                            );
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 3: DASHBOARD PENDAFTAR (TIMELINE 6 TAHAP, KELENGKAPAN BERKAS & KARTU TES)
      ===================================================================== */}
      {activeMainTab === "dashboard" && (
        <div className="space-y-8">
          {/* Bar Pemilih Akun Simulasi agar mudah diuji */}
          <Card className="p-5 bg-blue-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <div className="text-xs sm:text-sm">
              <span className="font-extrabold text-primary-950">
                Portal Dashboard Calon Siswa Aktif:{" "}
              </span>
              <span className="font-mono font-bold text-royal">
                {dashboardRecord.registrationNumber} ({dashboardRecord.studentName})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(submittedRecord
                ? [submittedRecord, ...SAMPLE_APPLICANTS]
                : SAMPLE_APPLICANTS
              ).map((rec) => (
                <button
                  key={rec.registrationNumber}
                  type="button"
                  onClick={() => setDashboardRecord(rec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    dashboardRecord.registrationNumber === rec.registrationNumber
                      ? "bg-royal text-white"
                      : "bg-white text-slate-700 border border-blue-200"
                  }`}
                >
                  {rec.studentName.split(" ")[0]} ({rec.level.toUpperCase()})
                </button>
              ))}
            </div>
          </Card>

          {/* Timeline Status 6 Tahap */}
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <Badge variant="blue">Progress Seleksi SPMB</Badge>
                <h2 className="text-2xl font-extrabold text-primary-950 mt-1">
                  Timeline Status Pendaftaran — {dashboardRecord.studentName}
                </h2>
              </div>
              <Badge
                variant={
                  dashboardRecord.invoice.status === "LUNAS"
                    ? "emerald"
                    : "gold"
                }
              >
                Tagihan Formulir: {dashboardRecord.invoice.status}
              </Badge>
            </div>

            <Stepper
              currentStep={dashboardRecord.currentStepIndex}
              steps={[
                { title: "Terdaftar", subtitle: dashboardRecord.registeredAt },
                { title: "Berkas Diverifikasi", subtitle: "Panitia SPMB" },
                {
                  title: "Pembayaran",
                  subtitle: dashboardRecord.invoice.status,
                },
                {
                  title: "Tes / Wawancara",
                  subtitle: dashboardRecord.testSchedule.date,
                },
                {
                  title: "Pengumuman",
                  subtitle: dashboardRecord.selectionResult,
                },
                { title: "Daftar Ulang", subtitle: "Aktivasi NIS" },
              ]}
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Progres Kelengkapan Berkas & Catatan Admin (7 Cols) */}
            <Card className="lg:col-span-7 p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-extrabold text-primary-950">
                Status Verifikasi Berkas & Catatan Panitia
              </h3>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-primary-950 space-y-1">
                <p className="font-extrabold text-royal">
                  Catatan Resmi Panitia Admin SPMB:
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {dashboardRecord.adminRevisionNote}
                </p>
              </div>

              <div className="space-y-2.5">
                {dashboardRecord.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="font-bold text-primary-950">
                      {doc.name}
                    </span>
                    <Badge
                      variant={
                        doc.status === "Terverifikasi" ? "emerald" : "gold"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Jadwal Tes & Unduh Kartu Peserta Tes (5 Cols) */}
            <Card className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="gold">Kartu Peserta Observasi</Badge>
                <h3 className="text-lg font-extrabold text-primary-950">
                  Jadwal Tes Observasi & Wawancara
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <p>
                    <span className="text-slate-500">Nomor Peserta:</span>{" "}
                    <strong className="font-mono text-royal">
                      {dashboardRecord.registrationNumber}
                    </strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Hari / Tanggal:</span>{" "}
                    <strong>{dashboardRecord.testSchedule.date}</strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Waktu:</span>{" "}
                    <strong>{dashboardRecord.testSchedule.time}</strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Ruang Lokasi:</span>{" "}
                    <strong>{dashboardRecord.testSchedule.room}</strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Penguji / Pewawancara:</span>{" "}
                    <strong>{dashboardRecord.testSchedule.interviewer}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full min-h-[46px] px-5 py-3 rounded-2xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Unduh Kartu Peserta Tes (PDF)</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: CEK STATUS & PENGUMUMAN KELULUSAN SPMB
      ===================================================================== */}
      {activeMainTab === "status" && (
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <Badge variant="blue">Pengumuman Seleksi Online</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-950">
                Cek Status Pendaftaran & Pengumuman Kelulusan
              </h2>
              <p className="text-sm text-slate-600">
                Masukkan Nomor Registrasi SPMB dan Tanggal Lahir calon siswa untuk melihat hasil seleksi.
              </p>
            </div>

            {/* Tombol Contoh Nomor Registrasi untuk Kemudahan Demo */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <p className="text-xs font-extrabold text-royal">
                Klik Contoh Nomor Registrasi Berikut untuk Mencoba:
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_APPLICANTS.map((samp) => (
                  <button
                    key={samp.registrationNumber}
                    type="button"
                    onClick={() => {
                      setStatusRegNo(samp.registrationNumber);
                      setStatusBirthDate(samp.birthDate);
                      setCheckedApplicant(samp);
                      setStatusError(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-royal hover:text-white text-primary-950 border border-blue-200 text-xs font-bold transition cursor-pointer"
                  >
                    {samp.registrationNumber} ({samp.selectionResult})
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleCheckStatus}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end"
            >
              <div className="sm:col-span-5">
                <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                  Nomor Registrasi SPMB *
                </label>
                <input
                  type="text"
                  required
                  value={statusRegNo}
                  onChange={(e) => setStatusRegNo(e.target.value)}
                  placeholder="SPMB-2026-DL-8821"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 font-mono text-sm font-bold"
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-xs font-extrabold uppercase text-slate-600 mb-1.5">
                  Tanggal Lahir Siswa *
                </label>
                <input
                  type="date"
                  required
                  value={statusBirthDate}
                  onChange={(e) => setStatusBirthDate(e.target.value)}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl border border-blue-200 text-sm"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full min-h-[46px] px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Cek Hasil</span>
                </button>
              </div>
            </form>

            {statusError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                {statusError}
              </div>
            )}

            {/* Hasil Pengumuman */}
            {checkedApplicant && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border-2 space-y-5 ${
                  checkedApplicant.selectionResult === "LULUS"
                    ? "bg-emerald-50/60 border-emerald-300"
                    : checkedApplicant.selectionResult === "WAITING_LIST"
                    ? "bg-amber-50/70 border-amber-300"
                    : "bg-blue-50/60 border-blue-200"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      No. Reg: {checkedApplicant.registrationNumber}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary-950">
                      {checkedApplicant.studentName}
                    </h3>
                    <p className="text-xs font-bold text-royal">
                      {checkedApplicant.levelLabel} • {checkedApplicant.track}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold ${
                      checkedApplicant.selectionResult === "LULUS"
                        ? "bg-emerald-600 text-white"
                        : checkedApplicant.selectionResult === "WAITING_LIST"
                        ? "bg-amber-600 text-white"
                        : "bg-royal text-white"
                    }`}
                  >
                    {checkedApplicant.selectionResult === "LULUS"
                      ? "DINYATAKAN LULUS SELEKSI"
                      : checkedApplicant.selectionResult === "WAITING_LIST"
                      ? "DAFTAR TUNGGU (WAITING LIST)"
                      : "DALAM PROSES VERIFIKASI"}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {checkedApplicant.scholarshipNote ||
                    checkedApplicant.adminRevisionNote}
                </p>

                {checkedApplicant.selectionResult === "LULUS" && (
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDashboardRecord(checkedApplicant);
                        setActiveMainTab("dashboard");
                      }}
                      className="min-h-[46px] px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold cursor-pointer shadow-sm"
                    >
                      Lanjutkan Konfirmasi Daftar Ulang →
                    </button>
                    <a
                      href={`https://wa.me/6281275008899?text=${encodeURIComponent(
                        `Halo Panitia SPMB Dharma Loka, saya orang tua dari ${checkedApplicant.studentName} (${checkedApplicant.registrationNumber}) yang dinyatakan LULUS ingin mengonfirmasi daftar ulang.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-2xl bg-white text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-extrabold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Kirim Konfirmasi via WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
