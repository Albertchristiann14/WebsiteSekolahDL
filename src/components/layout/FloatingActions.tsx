"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useTenant } from "@/lib/tenantContext";

/**
 * Tombol Melayang (Floating Actions):
 * 1. Tombol WhatsApp Melayang (pesan otomatis terisi sesuai jenjang/subdomain aktif)
 * 2. Tombol Back-to-Top
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { tenant } = useTenant();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 360);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${tenant.contact.whatsapp}?text=${encodeURIComponent(
    tenant.contact.whatsappDefaultText
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 no-print">
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas halaman"
          title="Kembali ke Atas"
          className="w-12 h-12 rounded-2xl bg-white hover:bg-blue-50 text-primary-950 border-2 border-blue-200 shadow-elevated flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-royal" />
        </button>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat WhatsApp ${tenant.shortName}`}
        className="group inline-flex items-center gap-3 px-4 py-3 min-h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-elevated shadow-emerald-900/20 transition-all hover:-translate-y-0.5"
      >
        <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 fill-current" />
        </span>
        <div className="text-left pr-1">
          <span className="block text-[10px] uppercase tracking-wider text-emerald-100 font-semibold leading-none">
            Tanya Panitia SPMB
          </span>
          <span className="block text-sm font-extrabold leading-tight mt-0.5">
            Chat WhatsApp
          </span>
        </div>
      </a>
    </div>
  );
}

