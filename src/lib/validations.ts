import { z } from "zod";

/**
 * Skema Validasi Zod (Client & Server)
 * Sekolah Dharma Loka Pekanbaru — SPMB Online & Formulir Kontak
 */

// 1. Validasi Tahap 1 SPMB: Buat Akun & OTP
export const spmbStep1AccountSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap pendaftar minimal 3 karakter")
    .max(100, "Nama terlalu panjang"),
  whatsapp: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, "Format nomor WhatsApp Indonesia tidak valid (contoh: 081275008899)"),
  email: z.string().email("Masukkan alamat email yang valid"),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter"),
  otpVerified: z.boolean().refine((val) => val === true, {
    message: "Silakan verifikasi kode OTP terlebih dahulu",
  }),
});

// 2. Validasi Tahap 2 SPMB: Pilih Jenjang, Gelombang & Jalur
export const spmbStep2TrackSchema = z.object({
  level: z.enum(["tk", "sd", "smp", "sma"], {
    message: "Pilih jenjang pendidikan tujuan",
  }),
  wave: z.enum(["gelombang_1", "gelombang_2", "gelombang_3"]),
  track: z.enum(["reguler", "prestasi_akademik", "prestasi_non_akademik", "sibling"]),
});

// 3. Validasi Tahap 3 SPMB: Data Calon Siswa
export const spmbStep3StudentSchema = z.object({
  studentName: z.string().min(3, "Nama lengkap calon siswa wajib diisi"),
  nik: z
    .string()
    .regex(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka sesuai Kartu Keluarga"),
  nisn: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: "NISN harus terdiri dari 10 digit angka (kosongkan jika mendaftar TK/SD)",
    }),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  gender: z.enum(["L", "P"]),
  religion: z.enum(["Buddha", "Islam", "Kristen", "Katolik", "Hindu", "Konghucu"]),
  address: z.string().min(10, "Alamat lengkap domisili minimal 10 karakter"),
  previousSchool: z.string().optional(),
  achievementNotes: z.string().optional(),
});

// 4. Validasi Tahap 4 SPMB: Data Orang Tua / Wali
export const spmbStep4ParentSchema = z.object({
  fatherName: z.string().min(3, "Nama ayah kandung wajib diisi"),
  fatherOccupation: z.string().min(2, "Pekerjaan ayah wajib diisi"),
  motherName: z.string().min(3, "Nama ibu kandung wajib diisi"),
  motherOccupation: z.string().min(2, "Pekerjaan ibu wajib diisi"),
  guardianName: z.string().optional(),
  incomeBracket: z.enum([
    "under_5m",
    "5m_10m",
    "10m_25m",
    "above_25m",
  ]),
  parentPhone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, "Nomor telepon orang tua/wali tidak valid"),
  emergencyContact: z.string().optional(),
});

// 5. Validasi File Unggahan Berkas (Maks 2MB, PDF/JPG/PNG)
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export function validateUploadedFile(file: File): {
  valid: boolean;
  error?: string;
} {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Tipe berkas tidak didukung. Gunakan format PDF, JPG, atau PNG.",
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `Ukuran berkas (${(file.size / 1024 / 1024).toFixed(2)} MB) melebihi batas maksimal 2 MB.`,
    };
  }
  return { valid: true };
}

/**
 * Kompresi gambar di sisi klien (Client-side Image Compression)
 * Mengurangi ukuran foto JPG/PNG dari kamera HP Android agar di bawah 1MB sebelum diunggah.
 */
export async function compressImageClientSide(
  file: File,
  maxWidth = 1400,
  quality = 0.8
): Promise<{ file: File; previewUrl: string; compressedSizeKb: number }> {
  if (file.type === "application/pdf") {
    return {
      file,
      previewUrl: "",
      compressedSizeKb: Math.round(file.size / 1024),
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            file,
            previewUrl: event.target?.result as string,
            compressedSizeKb: Math.round(file.size / 1024),
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                previewUrl: dataUrl,
                compressedSizeKb: Math.round(file.size / 1024),
              });
              return;
            }
            const safeRandomName = `dl_${Date.now()}_${Math.random()
              .toString(36)
              .substring(2, 8)}.jpg`;
            const compressedFile = new File([blob], safeRandomName, {
              type: "image/jpeg",
            });
            resolve({
              file: compressedFile,
              previewUrl: dataUrl,
              compressedSizeKb: Math.round(compressedFile.size / 1024),
            });
          },
          "image/jpeg",
          quality
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// 6. Validasi Formulir Kontak dengan Anti-Spam Honeypot
export const contactFormSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, "Nomor WhatsApp tidak valid"),
  targetUnit: z.string().min(1, "Pilih unit jenjang tujuan"),
  subject: z.string().min(3, "Subjek pesan wajib diisi"),
  message: z
    .string()
    .min(10, "Isi pesan minimal 10 karakter")
    .max(1500, "Isi pesan maksimal 1500 karakter"),
  honeypot: z.string().max(0, "Deteksi spam otomatis"),
});

// 7. Validasi Cek Status Pengumuman SPMB
export const spmbCheckStatusSchema = z.object({
  registrationNumber: z
    .string()
    .min(5, "Masukkan Nomor Registrasi SPMB yang valid (contoh: SPMB-2026-DL-8821)"),
  birthDate: z.string().min(1, "Masukkan tanggal lahir calon siswa"),
});

