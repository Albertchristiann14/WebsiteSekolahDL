import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Lora } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { AuthProvider } from "@/lib/authContext";
import { TenantProvider } from "@/lib/tenantContext";
import { getTenantConfig, TenantId } from "@/config/tenants";
import { schoolInfo } from "@/data/schoolInfo";
import { JsonLd, buildSchoolJsonLd } from "@/components/ui/JsonLd";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const tenantId = (headersList.get("x-tenant-id") || "portal") as TenantId;
  const tenant = getTenantConfig(tenantId);

  return {
    title: {
      default: `${tenant.name} | Pendidikan Terpadu Berkarakter & Unggul`,
      template: `%s | ${tenant.shortName}`,
    },
    description: tenant.description,
    keywords: [
      "Sekolah Dharma Loka Pekanbaru",
      "TK Dharma Loka",
      "SD Dharma Loka",
      "SMP Dharma Loka",
      "SMA Dharma Loka",
      "SPMB Dharma Loka Pekanbaru",
      "PPDB Sekolah Terbaik Pekanbaru",
      "Sekolah Trilingual Riau",
    ],
    authors: [{ name: "Sekolah Dharma Loka Pekanbaru" }],
    alternates: {
      canonical: `https://${tenant.subdomain}`,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `https://${tenant.subdomain}`,
      title: `${tenant.name} — ${tenant.tagline}`,
      description: tenant.description,
      siteName: tenant.name,
      images: [
        {
          url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: tenant.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tenant.name} — Pekanbaru, Riau`,
      description: tenant.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const initialTenantId = (headersList.get("x-tenant-id") || "portal") as TenantId;
  const tenant = getTenantConfig(initialTenantId);

  const schoolJsonLd = buildSchoolJsonLd({
    name: tenant.name,
    url: `https://${tenant.subdomain}`,
    description: tenant.description,
    phone: tenant.contact.phone,
    email: tenant.contact.email,
    street: schoolInfo.address.street,
  });

  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable} ${lora.variable}`}
      data-tenant={initialTenantId}
    >
      <body className="antialiased flex flex-col min-h-screen bg-white text-slate-900">
        <JsonLd data={schoolJsonLd} />
        <a href="#main-content" className="skip-to-content">
          Lewati ke Konten Utama
        </a>
        <TenantProvider initialTenantId={initialTenantId}>
          <AuthProvider>
            <Navbar />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </AuthProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
