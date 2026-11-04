"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { AdminStore, TenantCode } from "@/lib/adminData";
import { TENANTS, TenantId } from "@/config/tenants";
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  CalendarCheck,
  CreditCard,
  Megaphone,
  UserPlus,
  MessageSquare,
  Settings,
  Newspaper,
  Bell,
  Calendar,
  Award,
  Image as ImageIcon,
  GraduationCap,
  Mail,
  Sliders,
  Shield,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  FolderDown,
  Loader2,
  Palette,
  Lock,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  requiredRole?: string[];
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
}

const TENANT_OPTIONS: Array<{ id: TenantCode; label: string; short: string }> = [
  { id: "portal", label: "🏛️ Semua Jenjang (Yayasan)", short: "Semua Unit" },
  { id: "tk", label: "🧸 TK Dharma Loka", short: "TK" },
  { id: "sd", label: "🎒 SD Dharma Loka", short: "SD" },
  { id: "smp", label: "🔬 SMP Dharma Loka", short: "SMP" },
  { id: "sma", label: "🎓 SMA Dharma Loka", short: "SMA" },
  { id: "smk", label: "⚙️ SMK Dharma Loka", short: "SMK" },
];

export function AdminLayout({
  children,
  title,
  subtitle,
  requiredRole,
  breadcrumbs,
  actions,
}: AdminLayoutProps) {
  const { user, loading, logout, hasRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTenant, setActiveTenant] = useState<TenantCode>("portal");
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [counts, setCounts] = useState({
    pendingDocs: 1,
    pendingPayments: 1,
    newApplicants: 2,
    unreadMessages: 1,
  });

  const pathname = usePathname();
  const router = useRouter();

  // Load active tenant filter and lock tenant if user is assigned to a specific unit
  useEffect(() => {
    if (user?.tenant_id && user.tenant_id in TENANTS) {
      const unitCode = user.tenant_id as TenantCode;
      setActiveTenant(unitCode);
      AdminStore.setActiveTenantFilter(unitCode);
    } else {
      setActiveTenant(AdminStore.getActiveTenantFilter());
    }

    const applicants = AdminStore.getApplicants();
    const pendingDocs = applicants.filter((a) => a.documentStatus === "pending").length;
    const pendingPayments = applicants.filter((a) => a.paymentStatus === "pending_approval").length;
    setCounts((prev) => ({
      ...prev,
      pendingDocs,
      pendingPayments,
    }));
  }, [user]);

  const handleSelectTenant = (code: TenantCode) => {
    // If unit admin is locked to their tenant, don't allow changing
    if (user?.tenant_id && user.tenant_id in TENANTS) {
      return;
    }
    setActiveTenant(code);
    AdminStore.setActiveTenantFilter(code);
    setTenantDropdownOpen(false);
    // Trigger custom event so active pages refresh filter immediately
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("admin_tenant_changed", { detail: code }));
    }
  };

  const userName = user?.name || "Administrator Dharma Loka";
  const userRole = (user?.role || "super_admin") as string;
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isSuperAdmin = userRole === "super_admin";
  const isSchoolAdmin = userRole === "school_admin";
  const isSpmbOfficer = userRole === "spmb_officer" || isSuperAdmin || isSchoolAdmin;
  const isFinance = userRole === "finance" || isSuperAdmin;
  const isEditor = userRole === "content_editor" || userRole === "editor" || isSuperAdmin || isSchoolAdmin;

  // Build categorized navigation items with role enforcement
  const navSections = [
    {
      title: "Iktisar & SPMB Core",
      items: [
        {
          href: "/admin",
          label: "Dashboard Utama",
          icon: LayoutDashboard,
          visible: true,
        },
        {
          href: "/admin/admissions",
          label: "Data Pendaftar (PPDB)",
          icon: Users,
          badge: counts.newApplicants > 0 ? `${counts.newApplicants} Baru` : undefined,
          badgeColor: "bg-blue-100 text-royal border-blue-200",
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/verification",
          label: "Verifikasi Berkas",
          icon: FileCheck2,
          badge: counts.pendingDocs > 0 ? `${counts.pendingDocs} Butuh Cek` : undefined,
          badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/selection",
          label: "Seleksi & Jadwal Tes",
          icon: CalendarCheck,
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/payments",
          label: "Tagihan & Pembayaran",
          icon: CreditCard,
          badge: counts.pendingPayments > 0 ? `${counts.pendingPayments} Verifikasi` : undefined,
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
          visible: isFinance || isSpmbOfficer,
        },
        {
          href: "/admin/admissions/announcements",
          label: "Pengumuman Kelulusan",
          icon: Megaphone,
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/conversion",
          label: "Konversi ke Siswa Aktif",
          icon: UserPlus,
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/whatsapp",
          label: "Notifikasi WhatsApp",
          icon: MessageSquare,
          visible: isSpmbOfficer,
        },
        {
          href: "/admin/admissions/settings",
          label: "Pengaturan Gelombang & Kuota",
          icon: Sliders,
          visible: isSuperAdmin || isSchoolAdmin,
        },
      ],
    },
    {
      title: "Manajemen Konten & Desain",
      items: [
        {
          href: "/admin/appearance",
          label: "Tampilan Web Jenjang",
          icon: Palette,
          badge: "Visual & Hero",
          badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
          visible: true,
        },
        {
          href: "/admin/news",
          label: "Berita & Artikel",
          icon: Newspaper,
          visible: isEditor,
        },
        {
          href: "/admin/announcements",
          label: "Pengumuman Sekolah",
          icon: Bell,
          visible: isEditor,
        },
        {
          href: "/admin/events",
          label: "Agenda & Kalender",
          icon: Calendar,
          visible: isEditor,
        },
        {
          href: "/admin/teachers",
          label: "Direktori GTK (Guru)",
          icon: GraduationCap,
          visible: isEditor || isSchoolAdmin,
        },
        {
          href: "/admin/achievements",
          label: "Prestasi Siswa",
          icon: Award,
          visible: isEditor,
        },
        {
          href: "/admin/gallery",
          label: "Galeri & Video",
          icon: ImageIcon,
          visible: isEditor,
        },
        {
          href: "/admin/programs",
          label: "Program Akademik",
          icon: Building2,
          visible: isEditor || isSchoolAdmin,
        },
        {
          href: "/admin/messages",
          label: "Pesan Masuk (Kontak)",
          icon: Mail,
          badge: counts.unreadMessages > 0 ? `${counts.unreadMessages}` : undefined,
          badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
          visible: isEditor || isSchoolAdmin,
        },
      ],
    },
    {
      title: "Master Data",
      items: [
        {
          href: "/admin/students",
          label: "Master Data Siswa Aktif",
          icon: Users,
          visible: isSuperAdmin || isSchoolAdmin,
        },
      ],
    },
    {
      title: "Sistem & Keamanan",
      items: [
        {
          href: "/admin/users",
          label: "Manajemen Staf & Role",
          icon: Shield,
          visible: isSuperAdmin,
        },
        {
          href: "/admin/settings",
          label: "Pengaturan & Integrasi",
          icon: Settings,
          visible: isSuperAdmin || isSchoolAdmin,
        },
        {
          href: "/admin/logs",
          label: "Log Aktivitas (Audit)",
          icon: History,
          visible: isSuperAdmin,
        },
      ],
    },
  ];

  const currentTenantObj = TENANT_OPTIONS.find((t) => t.id === activeTenant) || TENANT_OPTIONS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===================================================================
          1. SIDEBAR KIRI (CLEAN, WHITE, EXPANSIVE, MODERN)
      =================================================================== */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-royal flex items-center justify-center text-white shadow-md shadow-royal/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight block text-base leading-none">
                DHARMA LOKA
              </span>
              <span className="text-[11px] font-bold text-royal tracking-wider uppercase block mt-1">
                Portal Admin & SPMB
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge Info Card */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal text-white font-extrabold text-xs flex items-center justify-center uppercase shadow-2xs shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {userName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-50 text-royal border border-blue-200">
                  {userRole.replace("_", " ")}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Online" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Groups (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
          {navSections.map((section, idx) => {
            const visibleItems = section.items.filter((item) => item.visible);
            if (visibleItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                  {section.title}
                </p>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                        isActive
                          ? "bg-royal text-white shadow-sm shadow-royal/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-white" : "text-slate-500"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                            isActive
                              ? "bg-white/20 text-white border-white/30"
                              : item.badgeColor || "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/60 space-y-2">
          <Link
            href={user?.tenant_id ? `/?jenjang=${user.tenant_id}` : `/?jenjang=${activeTenant}`}
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-royal hover:bg-white border border-transparent hover:border-slate-200 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-royal" />
              Website {user?.tenant_id ? `Unit ${user.tenant_id.toUpperCase()}` : "Publik"}
            </span>
            <span className="text-[10px] text-slate-400">Tab Baru ↗</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi (Logout)</span>
          </button>
        </div>
      </aside>

      {/* ===================================================================
          2. MAIN CONTENT WRAPPER
      =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Topbar Header */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4 shadow-2xs">
          {/* Left: Mobile Toggle & Tenant Switcher */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Tenant Selector: Locked for Unit Admin, Switcher for Super Admin */}
            {user?.tenant_id && user.tenant_id in TENANTS ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-800 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{currentTenantObj.label}</span>
                <span className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-royal border border-blue-200">
                  <Lock className="w-3 h-3" /> Unit Terkunci
                </span>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-900 transition cursor-pointer"
                  title="Pilih unit jenjang untuk memfilter data"
                >
                  <span>{currentTenantObj.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {tenantDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setTenantDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 space-y-1">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                        Pilih Filter Unit Jenjang
                      </p>
                      {TENANT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectTenant(opt.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition cursor-pointer ${
                            activeTenant === opt.id
                              ? "bg-royal text-white"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {activeTenant === opt.id && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari calon siswa, no. registrasi, berkas, berita..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-royal/30 focus:border-royal transition"
              />
            </div>
          </div>

          {/* Right Actions: Notification bell, public link, profile */}
          <div className="flex items-center gap-3">
            {/* Quick Public Site Link */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-royal bg-blue-50 border border-blue-200 hover:bg-blue-100 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 relative cursor-pointer"
                aria-label="Lihat Notifikasi Tugas"
              >
                <Bell className="w-4 h-4" />
                {counts.pendingDocs + counts.pendingPayments > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {counts.pendingDocs + counts.pendingPayments}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <p className="text-xs font-extrabold uppercase text-slate-500">
                        Tugas Butuh Tindakan
                      </p>
                      <span className="text-[11px] font-bold text-royal">
                        {counts.pendingDocs + counts.pendingPayments} Pending
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {counts.pendingDocs > 0 && (
                        <Link
                          href="/admin/admissions/verification"
                          onClick={() => setNotificationOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50 transition border border-transparent hover:border-amber-200"
                        >
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-slate-900">
                              {counts.pendingDocs} Dokumen Perlu Verifikasi
                            </p>
                            <p className="text-slate-500 text-[11px]">
                              Buka split-screen verifikasi berkas pendaftar.
                            </p>
                          </div>
                        </Link>
                      )}
                      {counts.pendingPayments > 0 && (
                        <Link
                          href="/admin/admissions/payments"
                          onClick={() => setNotificationOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-200"
                        >
                          <CreditCard className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-slate-900">
                              {counts.pendingPayments} Pembayaran Menunggu Konfirmasi
                            </p>
                            <p className="text-slate-500 text-[11px]">
                              Bukti transfer manual baru diunggah orang tua.
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar Badge */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-royal text-white font-extrabold text-xs flex items-center justify-center uppercase shrink-0 shadow-2xs">
                {userInitials}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-extrabold text-slate-900 truncate max-w-[140px]">
                  {userName}
                </p>
                <p className="text-[10px] font-bold text-royal uppercase">
                  {userRole.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body Area */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          <div className="max-w-[1440px] mx-auto space-y-6">
            {/* Breadcrumb & Header Title Area */}
            {(title || breadcrumbs || actions) && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <div className="space-y-1">
                  {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <Link href="/admin" className="hover:text-royal">
                        Admin
                      </Link>
                      {breadcrumbs.map((b, i) => (
                        <React.Fragment key={i}>
                          <span>/</span>
                          {b.href ? (
                            <Link href={b.href} className="hover:text-royal">
                              {b.label}
                            </Link>
                          ) : (
                            <span className="font-bold text-slate-800">
                              {b.label}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </nav>
                  )}
                  {title && (
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500">
                      {subtitle}
                    </p>
                  )}
                </div>

                {actions && <div className="flex items-center gap-2.5">{actions}</div>}
              </div>
            )}

            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
