import React from "react";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  align = "left",
  className = "",
  theme = "light",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-5 ${
            isDark
              ? "bg-white/15 text-white border border-white/20"
              : "bg-blue-50 text-royal border border-blue-200/70"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isDark ? "bg-white" : "bg-royal"
            }`}
            aria-hidden="true"
          />
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
            {tag}
          </span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight font-sans leading-[1.2] ${
          isDark ? "text-white" : "text-primary-950"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg lg:text-xl leading-relaxed ${
            isDark ? "text-blue-100" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
