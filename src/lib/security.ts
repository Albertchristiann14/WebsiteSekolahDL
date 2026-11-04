/**
 * Modul Keamanan Frontend & Masking Data Pribadi (UU PDP No. 27/2022)
 * Digunakan untuk menyamarkan NIK, KK, NISN, nomor telepon, dan email
 * saat ditampilkan di antarmuka publik maupun dashboard admin.
 */

export const SecurityUtils = {
  /**
   * Masking NIK / NISN / No KK (Contoh: 3201************01)
   */
  maskIdentifier(value?: string | null, frontVisible: number = 4, backVisible: number = 2): string {
    if (!value) return "-";
    const cleaned = value.trim();
    if (cleaned.length <= frontVisible + backVisible) {
      return "*".repeat(cleaned.length);
    }
    const front = cleaned.slice(0, frontVisible);
    const back = cleaned.slice(-backVisible);
    const middle = "*".repeat(cleaned.length - frontVisible - backVisible);
    return `${front}${middle}${back}`;
  },

  /**
   * Masking Email (Contoh: he****@gmail.com)
   */
  maskEmail(email?: string | null): string {
    if (!email || !email.includes("@")) return "-";
    const [user, domain] = email.split("@");
    if (user.length <= 2) {
      return `${user[0]}*@${domain}`;
    }
    const visibleUser = user.slice(0, 2);
    return `${visibleUser}${"*".repeat(user.length - 2)}@${domain}`;
  },

  /**
   * Masking Nomor Telepon / WhatsApp (Contoh: 0812****7890)
   */
  maskPhone(phone?: string | null): string {
    if (!phone) return "-";
    const cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) return phone;
    const front = cleaned.slice(0, 4);
    const back = cleaned.slice(-4);
    return `${front}****${back}`;
  },

  /**
   * Validasi Format NIK (Wajib 16 digit numerik)
   */
  isValidNik(nik: string): boolean {
    return /^\d{16}$/.test(nik.trim());
  },

  /**
   * Validasi Format NISN (Wajib 10 digit numerik)
   */
  isValidNisn(nisn: string): boolean {
    return /^\d{10}$/.test(nisn.trim());
  },

  /**
   * Catat aksi pembukaan NIK penuh (Unmasking) ke server untuk jejak audit
   */
  async recordUnmaskAudit(applicantId: string, fieldName: string, reason: string = "Verifikasi Berkas") {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("dharma_loka_token") : null;
      if (!token) return;

      await fetch("http://127.0.0.1:8000/api/admin/audit/unmask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          applicant_id: applicantId,
          field_name: fieldName,
          reason,
        }),
      });
    } catch {
      // Background audit fails gracefully without breaking UI
    }
  },
};

