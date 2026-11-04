import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Panel Admin & SPMB | Sekolah Dharma Loka Pekanbaru",
    template: "%s | Admin Dharma Loka",
  },
  description: "Sistem Manajemen Konten (CMS) dan Pengelolaan SPMB Multi-Jenjang Sekolah Dharma Loka Pekanbaru",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {children}
    </div>
  );
}

