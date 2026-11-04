"use client";

import React, { useState, useEffect } from "react";
import { TenantId } from "@/config/tenants";

interface PancaDharmaGatewayProps {
  onSelectUnit: (unit: TenantId) => void;
}

const TYPEWRITER_PHRASES = [
  "Sekolah Dharma Loka",
  "Cerdas, Berbudi, Berprestasi",
  "Yayasan Pendidikan Panca Dharma",
];

/**
 * Emblem SVG Resmi Yayasan Pendidikan Panca Dharma Pekanbaru
 * (Roda Dharma 8 Jari-jari Biru + Obor Menyala + Buku Terbuka + Pita Merah)
 */
function PancaDharmaCrest({
  ribbonText = "PANCA DHARMA",
  levelLabel,
  showOuterText = false,
  size = 180,
}: {
  ribbonText?: string;
  levelLabel?: string;
  showOuterText?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Logo ${ribbonText}`}
    >
      <defs>
        {/* Jalur melengkung untuk teks atas "YAYASAN PENDIDIKAN" */}
        <path
          id="topArcPath"
          d="M 32,126 A 88,88 0 1,1 208,126"
          fill="none"
        />
      </defs>

      {/* Teks Melengkung Atas & Teks Bawah (Hanya untuk Logo Utama Yayasan) */}
      {showOuterText && (
        <>
          <text
            fill="#D91B1B"
            fontSize="15"
            fontWeight="800"
            letterSpacing="3.2"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            <textPath
              href="#topArcPath"
              startOffset="50%"
              textAnchor="middle"
            >
              YAYASAN PENDIDIKAN
            </textPath>
          </text>

          <text
            x="120"
            y="222"
            textAnchor="middle"
            fill="#D91B1B"
            fontSize="15"
            fontWeight="800"
            letterSpacing="4.5"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            PEKANBARU
          </text>
        </>
      )}

      {/* Kaki Penyangga Bawah Roda Dharma */}
      <path
        d="M100 192 L114 166 H126 L140 192 H127 L120 178 L113 192 Z"
        fill="#0044CC"
        stroke="#081C4A"
        strokeWidth="2.2"
      />

      {/* 8 Jari-Jari Roda Dharma (Dharmachakra) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 120 112)`}>
          {/* Batang jari-jari */}
          <rect
            x="116"
            y="42"
            width="8"
            height="140"
            rx="3"
            fill="#0044CC"
            stroke="#081C4A"
            strokeWidth="2"
          />
          {/* Ujung luar jari-jari (knob) */}
          <circle
            cx="120"
            cy="40"
            r="5.5"
            fill="#0044CC"
            stroke="#081C4A"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Lingkaran Luar Roda Dharma */}
      <circle
        cx="120"
        cy="112"
        r="54"
        fill="none"
        stroke="#081C4A"
        strokeWidth="15"
      />
      <circle
        cx="120"
        cy="112"
        r="54"
        fill="none"
        stroke="#0044CC"
        strokeWidth="11"
      />

      {/* Lingkaran Poros Tengah */}
      <circle
        cx="120"
        cy="112"
        r="16"
        fill="#0044CC"
        stroke="#081C4A"
        strokeWidth="2.5"
      />

      {/* Obor (Torch) di Tengah */}
      <path
        d="M116 105 H124 L122 132 H118 Z"
        fill="#F59E0B"
        stroke="#111827"
        strokeWidth="2"
      />
      {/* Api Obor */}
      <path
        d="M120 72 C110 84, 111 96, 120 104 C129 96, 130 84, 120 72 Z"
        fill="#EF4444"
        stroke="#111827"
        strokeWidth="2"
      />
      <path
        d="M120 80 C115 88, 116 95, 120 101 C124 95, 125 88, 120 80 Z"
        fill="#FACC15"
      />

      {/* Buku Terbuka (Putih dengan Garis Halaman) */}
      <path
        d="M78 124 Q98 118 120 126 Q142 118 162 124 L168 152 Q144 146 120 154 Q96 146 72 152 Z"
        fill="#FFFFFF"
        stroke="#111827"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Garis Tengah Buku */}
      <line
        x1="120"
        y1="126"
        x2="120"
        y2="154"
        stroke="#111827"
        strokeWidth="2.5"
      />
      {/* Garis-garis halaman buku */}
      <path
        d="M82 133 Q100 129 115 135 M80 141 Q100 137 115 143 M158 133 Q140 129 125 135 M160 141 Q140 137 125 143"
        stroke="#334155"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Label Jenjang di Atas Buku (TK / SD / SMP / SMA / SMK) */}
      {levelLabel && (
        <text
          x="120"
          y="144"
          textAnchor="middle"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="5"
          paintOrder="stroke"
          fontSize="28"
          fontWeight="900"
          fontFamily="Arial Black, Arial, sans-serif"
        >
          {levelLabel}
        </text>
      )}

      {/* Pita Merah Melengkung ("PANCA DHARMA" / "DHARMA LOKA") */}
      {/* Ekor Pita Kiri & Kanan */}
      <path
        d="M44 172 L66 164 L66 182 L44 188 L52 179 Z"
        fill="#B91C1C"
        stroke="#111827"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M196 172 L174 164 L174 182 L196 188 L188 179 Z"
        fill="#B91C1C"
        stroke="#111827"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Badan Utama Pita Merah */}
      <path
        d="M60 158 H180 L174 179 H66 Z"
        fill="#EF4444"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Teks di Dalam Pita */}
      <text
        x="120"
        y="173"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={ribbonText.length > 11 ? "11.5" : "12.5"}
        fontWeight="900"
        letterSpacing="0.8"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        {ribbonText}
      </text>
    </svg>
  );
}

const DIAMOND_UNITS: Array<{ id: TenantId; label: string; title: string }> = [
  { id: "tk", label: "TK", title: "TK Dharma Loka Pekanbaru" },
  { id: "sd", label: "SD", title: "SD Dharma Loka Pekanbaru" },
  { id: "smp", label: "SMP", title: "SMP Dharma Loka Pekanbaru" },
  { id: "sma", label: "SMA", title: "SMA Dharma Loka Pekanbaru" },
  { id: "smk", label: "SMK", title: "SMK Dharma Loka Pekanbaru" },
];

export function PancaDharmaGateway({ onSelectUnit }: PancaDharmaGatewayProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 55 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-10 select-none overflow-x-hidden">
      {/* 1. Logo Utama Yayasan Pendidikan Panca Dharma Pekanbaru */}
      <div className="mb-6 sm:mb-8 flex flex-col items-center">
        <PancaDharmaCrest
          ribbonText="PANCA DHARMA"
          showOuterText={true}
          size={195}
        />
      </div>

      {/* 2. Teks Animasi Typewriter ("Sekolah|") */}
      <div className="h-14 flex items-center justify-center mb-10 sm:mb-14">
        <h1
          className="text-3xl sm:text-4xl text-slate-900 italic font-normal tracking-wide flex items-center"
          style={{ fontFamily: "var(--font-lora), Georgia, 'Times New Roman', serif" }}
        >
          <span>{displayText}</span>
          <span
            className="inline-block w-[2.5px] h-8 sm:h-9 bg-slate-800 ml-1 animate-pulse"
            aria-hidden="true"
          />
        </h1>
      </div>

      {/* 3. Barisan 5 Belah Ketupat Biru (TK, SD, SMP, SMA, SMK) */}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-11 py-6 px-4">
        {DIAMOND_UNITS.map((unit) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => onSelectUnit(unit.id)}
            title={`Masuk ke ${unit.title}`}
            aria-label={`Masuk ke ${unit.title}`}
            className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-[118px] md:h-[118px] bg-[#0B65FF] hover:bg-[#0051DF] rotate-45 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {/* Isi Belah Ketupat Diputar Balik (-45deg) agar Tegak */}
            <div className="-rotate-45 flex items-center justify-center pointer-events-none">
              <PancaDharmaCrest
                ribbonText="DHARMA LOKA"
                levelLabel={unit.label}
                showOuterText={false}
                size={96}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

