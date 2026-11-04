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
        <div className="inline-flex items-center gap-2 mb-3">
          <span
            className={`h-1.5 w-6 rounded-full ${
              isDark ? "bg-gold" : "bg-gold-dark"
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-xs font-semibold tracking-wide uppercase ${
              isDark ? "text-gold-light" : "text-primary-700"
            }`}
          >
            {tag}
          </span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-sans leading-tight ${
          isDark ? "text-white" : "text-primary-950"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-primary-200" : "text-slate-text"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

