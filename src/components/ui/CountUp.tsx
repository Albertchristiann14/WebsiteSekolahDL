"use client";

import React, { useEffect, useState } from "react";

/**
 * Komponen CountUp untuk Statistik Sekolah
 * Menghormati prefers-reduced-motion secara otomatis.
 */
export function CountUp({
  end,
  suffix = "",
  durationMs = 1200,
}: {
  end: number;
  suffix?: string;
  durationMs?: number;
}) {
  const [value, setValue] = useState<number>(end);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, durationMs]);

  return (
    <span>
      {value.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

