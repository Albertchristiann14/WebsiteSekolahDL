"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

/**
 * Tombol Share Artikel Berita (WhatsApp, Facebook, Salin Tautan)
 */
export function ShareButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://dharmaloka.sch.id/news/${slug}`;

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `${title} — Sekolah Dharma Loka Pekanbaru: ${shareUrl}`
  )}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500 mr-1">
        <Share2 className="w-4 h-4 text-royal" />
        Bagikan:
      </span>

      <a
        href={whatsappShare}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-extrabold transition"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      <a
        href={facebookShare}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-royal text-royal hover:text-white border border-blue-200 text-xs font-extrabold transition"
      >
        <span>Facebook</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary-950 text-xs font-extrabold transition cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700">Tautan Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-600" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>
    </div>
  );
}

