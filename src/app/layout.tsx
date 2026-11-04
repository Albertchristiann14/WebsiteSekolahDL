import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/authContext";
import { schoolInfo } from "@/data/schoolInfo";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${schoolInfo.name} | Pendidikan Terpadu TK, SD, SMP, SMA, SMK`,
    template: `%s | ${schoolInfo.name}`,
  },
  description:
    "Situs resmi profil Sekolah Dharma Loka di Pekanbaru, Riau. Menyediakan pendidikan berkualitas terpadu dari TK hingga SMA/SMK dengan kurikulum trilingual, riset STEM, dan pembinaan budi pekerti luhur.",
  keywords: [
    "Sekolah Dharma Loka",
    "Dharma Loka Pekanbaru",
    "Sekolah Terbaik Pekanbaru",
    "TK Dharma Loka",
    "SD Dharma Loka",
    "SMP Dharma Loka",
    "SMA Dharma Loka",
    "SMK Dharma Loka",
    "PPDB Pekanbaru",
    "Pendidikan Karakter Pekanbaru",
  ],
  authors: [{ name: "Sekolah Dharma Loka Pekanbaru" }, { name: "Krevia Digital" }],
  creator: "Krevia Digital",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dharmaloka.sch.id",
    title: `${schoolInfo.name} | Mengembangkan Potensi, Membina Budi Pekerti`,
    description:
      "Institusi pendidikan terpadu unggulan di Pekanbaru. Informasi pendaftaran siswa baru, program akademik trilingual, sarana modern, dan prestasi siswa.",
    siteName: schoolInfo.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: schoolInfo.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <a href="#main-content" className="skip-to-content">
          Lewati ke Konten Utama
        </a>
        <AuthProvider>
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

