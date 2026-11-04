import React from "react";
import { Info } from "lucide-react";

interface DemoBadgeProps {
  label?: string;
  className?: string;
}

export function DemoBadge({ label = "Demo / Konfirmasi Resmi Diperlukan", className = "" }: DemoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${className}`}
      title="Data demonstrasi disiapkan oleh Krevia Digital untuk keperluan proposal klien"
    >
      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

