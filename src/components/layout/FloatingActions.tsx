"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useTenant } from "@/lib/tenantContext";

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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 no-print">
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas halaman"
          title="Kembali ke Atas"
          className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-primary-950 border border-slate-200 shadow-md flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-royal" />
        </button>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat WhatsApp ${tenant.shortName}`}
        className="inline-flex items-center gap-2.5 h-12 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="whitespace-nowrap">Chat WhatsApp</span>
      </a>
    </div>
  );
}
