"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import {
  LayoutDashboard,
  Newspaper,
  Bell,
  Users,
  GraduationCap,
  Award,
  Image as ImageIcon,
  Settings,
  Mail,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  UserCheck,
  Edit3,
  Loader2,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requiredRole?: ("super_admin" | "school_admin" | "editor")[];
}

export function AdminLayout({
  children,
  title,
  requiredRole,
}: AdminLayoutProps) {
  const { user, loading, logout, hasRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const userName = user?.name || "Admin Staff";
  const userRole = user?.role || "school_admin";
  const userInitials = userName.substring(0, 2).toUpperCase();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  const hasAccess =
    !requiredRole || (user && requiredRole.includes(userRole as any));

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-blue-50/40 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 text-royal animate-spin mx-auto" />
          <p className="text-sm font-bold text-primary-950">
            Memuat Sesi Admin CMS...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      title: "Utama & Layanan",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        {
          href: "/admin/admissions",
          label: "Pendaftaran (PPDB)",
          icon: Users,
          badge: "CRM",
        },
        { href: "/admin/messages", label: "Pesan Masuk", icon: Mail },
      ],
    },
    {
      title: "Manajemen Konten",
      items: [
        { href: "/admin/news", label: "Berita & Artikel", icon: Newspaper },
        { href: "/admin/announcements", label: "Pengumuman", icon: Bell },
        {
          href: "/admin/programs",
          label: "Program Akademik",
          icon: GraduationCap,
        },
        { href: "/admin/achievements", label: "Prestasi Siswa", icon: Award },
        { href: "/admin/gallery", label: "Galeri Foto", icon: ImageIcon },
      ],
    },
    {
      title: "Sistem & Pengaturan",
      items: [
        ...(hasRole(["super_admin"])
          ? [
              {
                href: "/admin/users",
                label: "Manajemen Staf",
                icon: UserCheck,
              },
            ]
          : []),
        ...(hasRole(["super_admin", "school_admin"])
          ? [
              {
                href: "/admin/settings",
                label: "Pengaturan Sekolah",
                icon: Settings,
              },
            ]
          : []),
        { href: "/admin/logs", label: "Log Aktivitas", icon: History },
      ],
    },
  ];

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "super_admin":
        return {
          label: "Super Admin",
          color: "bg-blue-100 text-royal border-blue-200",
          icon: Shield,
        };
      case "school_admin":
        return {
          label: "School Admin",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: UserCheck,
        };
      default:
        return {
          label: "Editor",
          color: "bg-slate-100 text-slate-700 border-slate-200",
          icon: Edit3,
        };
    }
  };

  const roleInfo = getRoleBadge(userRole);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-slate-50/70 text-primary-950 flex flex-col md:flex-row font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-primary-950/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Bright White & Blue Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-blue-100 flex flex-col z-50 transition-transform duration-300 ease-in-out shadow-sm ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 border-b border-blue-100 flex items-center justify-between px-6 bg-blue-50/40">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal flex items-center justify-center text-white shadow-md shadow-royal/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-primary-950 tracking-tight block leading-none text-base">
                DHARMA LOKA
              </span>
              <span className="text-[11px] uppercase font-bold tracking-wider text-royal block mt-1">
                Portal Admin CMS
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-500 hover:text-royal p-1.5 rounded-lg"
            aria-label="Tutup menu samping"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-royal flex items-center justify-center text-white font-extrabold text-sm uppercase shrink-0 shadow-sm">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary-950 truncate">
              {userName}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${roleInfo.color}`}
              >
                <RoleIcon className="w-3 h-3" />
                {roleInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navItems.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
                {group.title}
              </p>
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-royal text-white shadow-md shadow-royal/20"
                        : "text-slate-600 hover:bg-blue-50/80 hover:text-royal"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-royal"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-blue-50 text-royal border border-blue-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-blue-100 bg-slate-50/60 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-royal hover:bg-white border border-transparent hover:border-blue-100 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-royal" />
              Kembali ke Situs Publik
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Bright White Top Navbar */}
        <header className="h-20 border-b border-blue-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-primary-950 hover:text-royal p-2 rounded-xl hover:bg-blue-50"
              aria-label="Buka menu navigasi admin"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-primary-950 tracking-tight">
                {title || "Dashboard Pengelola"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                Sistem Manajemen Konten Sekolah Dharma Loka Pekanbaru
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs sm:text-sm font-bold text-royal transition-colors border border-blue-200/80"
            >
              <ExternalLink className="w-4 h-4 text-royal" />
              <span>Lihat Website Publik</span>
            </Link>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <div className="text-right">
              <p className="text-sm font-bold text-primary-950 truncate max-w-[160px] sm:max-w-none">
                {userName}
              </p>
              <p className="text-xs font-semibold text-royal capitalize">
                {userRole.replace("_", " ")}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-slate-50/70">
          <div className="max-w-[1360px] mx-auto">
            {!hasAccess ? (
              <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white border border-red-200 shadow-lg text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                  <Shield className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-extrabold text-primary-950">
                  Akses Dibatasi
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Akun Anda ({user.role}) tidak memiliki izin untuk mengakses
                  halaman ini. Hubungi Super Administrator untuk mengubah
                  tingkat akses.
                </p>
                <Link
                  href="/admin"
                  className="inline-block px-5 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-sm font-bold text-white transition-colors"
                >
                  Kembali ke Dashboard
                </Link>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
