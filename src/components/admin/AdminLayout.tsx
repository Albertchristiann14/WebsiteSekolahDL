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
  Loader2
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requiredRole?: ("super_admin" | "school_admin" | "editor")[];
}

export function AdminLayout({ children, title, requiredRole }: AdminLayoutProps) {
  const { user, loading, logout, hasRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Defensive user fallbacks
  const userName = user?.name || "Admin Staff";
  const userRole = user?.role || "school_admin";
  const userInitials = userName.substring(0, 2).toUpperCase();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  // Handle role restrictions
  const hasAccess = !requiredRole || (user && requiredRole.includes(userRole as any));

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-300">Memuat Sesi Admin CMS...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      title: "Ikhtisar",
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/admissions", label: "Pendaftaran (PPDB)", icon: Users, badge: "CRM" },
        { href: "/admin/messages", label: "Pesan Masuk", icon: Mail },
      ]
    },
    {
      title: "Konten Publik",
      items: [
        { href: "/admin/news", label: "Berita & Artikel", icon: Newspaper },
        { href: "/admin/announcements", label: "Pengumuman", icon: Bell },
        { href: "/admin/programs", label: "Program Akademik", icon: GraduationCap },
        { href: "/admin/achievements", label: "Prestasi Siswa", icon: Award },
        { href: "/admin/gallery", label: "Galeri Foto", icon: ImageIcon },
      ]
    },
    {
      title: "Sistem & Konfigurasi",
      items: [
        ...(hasRole(["super_admin"]) ? [
          { href: "/admin/users", label: "Manajemen Pengguna", icon: UserCheck }
        ] : []),
        ...(hasRole(["super_admin", "school_admin"]) ? [
          { href: "/admin/settings", label: "Pengaturan Sekolah", icon: Settings }
        ] : []),
        { href: "/admin/logs", label: "Log Aktivitas", icon: History },
      ]
    }
  ];

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "super_admin":
        return {
          label: "Super Admin",
          color: "bg-red-500/10 text-red-400 border-red-500/30",
          icon: Shield
        };
      case "school_admin":
        return {
          label: "School Admin",
          color: "bg-gold/10 text-gold-light border-gold/30",
          icon: UserCheck
        };
      default:
        return {
          label: "Editor",
          color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
          icon: Edit3
        };
    }
  };

  const roleInfo = getRoleBadge(userRole);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-900 border border-gold/40 flex items-center justify-center text-gold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-white tracking-tight block leading-tight text-base">
                Dharma Loka
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold-light">
                Admin CMS Panel
              </span>
            </div>
          </Link>
          <button 
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Tutup menu samping"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-800 border border-primary-700 flex items-center justify-center text-white font-bold text-sm uppercase">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${roleInfo.color}`}>
                <RoleIcon className="w-3 h-3" />
                {roleInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
          {navItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                {group.title}
              </p>
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = item.href === "/admin" 
                  ? pathname === "/admin"
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-primary-900 text-gold-light border border-gold/30 shadow-sm"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon className={`w-4 h-4 ${isActive ? "text-gold" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
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
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Situs Publik
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              aria-label="Buka menu navigasi admin"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {title || "CMS Dashboard"}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Sistem Manajemen Konten Sekolah Dharma Loka Pekanbaru
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
              Situs Publik
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div className="text-right">
              <p className="text-xs font-semibold text-white truncate max-w-[140px] sm:max-w-none">
                {userName}
              </p>
              <p className="text-[10px] text-slate-400 capitalize">{userRole.replace("_", " ")}</p>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950">
          {!hasAccess ? (
            <div className="max-w-md mx-auto my-16 p-6 rounded-2xl bg-slate-900 border border-red-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Akses Dibatasi</h2>
              <p className="text-sm text-slate-400">
                Akun Anda ({user.role}) tidak memiliki izin untuk mengakses halaman ini. Hubungi Super Administrator untuk mengubah tingkat akses.
              </p>
              <Link
                href="/admin"
                className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

    </div>
  );
}

