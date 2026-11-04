"use client";

import React, { useState } from "react";
import { ChevronDown, Check, X, CheckCircle2, AlertCircle, Info } from "lucide-react";

/**
 * 1. BUTTON — ukuran minimal 44px tinggi (min-h-[44px]) ramah sentuhan layar HP Android
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 min-h-[44px] font-bold rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    primary:
      "bg-royal hover:bg-royal-dark text-white shadow-md shadow-royal/20",
    secondary:
      "bg-blue-50 hover:bg-blue-100 text-royal border border-blue-200",
    outline:
      "bg-white hover:bg-blue-50/60 text-primary-950 border-2 border-blue-100 hover:border-royal/40",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-primary-950",
    whatsapp:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * 2. CARD — sudut membulat (rounded-2xl), bayangan halus, latar putih bersih
 */
export function Card({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl border border-blue-100/90 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * 3. BADGE
 */
export function Badge({
  children,
  variant = "blue",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "blue" | "gold" | "emerald" | "slate" | "red";
  className?: string;
}) {
  const styles = {
    blue: "bg-blue-50 text-royal border-blue-200",
    gold: "bg-amber-50 text-amber-800 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * 4. ACCORDION (FAQ & Kurikulum)
 */
export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? "bg-blue-50/40 border-royal/40 shadow-sm"
                : "bg-white border-blue-100 hover:border-blue-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full min-h-[54px] px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <span className="text-base font-bold text-primary-950">
                {item.question}
              </span>
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                  isOpen
                    ? "bg-royal text-white rotate-180"
                    : "bg-blue-50 text-royal"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-slate-600 text-base leading-relaxed border-t border-blue-100/60">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * 5. STEPPER — Indikator Tahapan Pendaftaran SPMB & Timeline Status
 */
export function Stepper({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: Array<{ title: string; subtitle?: string }>;
  currentStep: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>
            Tahap {currentStep + 1} dari {steps.length}:{" "}
            <strong className="text-royal">{steps[currentStep]?.title}</strong>
          </span>
          <span className="text-royal">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Selesai
          </span>
        </div>
        <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-royal transition-all duration-300 rounded-full"
            style={{
              width: `${Math.round(((currentStep + 1) / steps.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Stepper Circles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <button
              key={step.title}
              type="button"
              disabled={!onStepClick || index > currentStep}
              onClick={() => onStepClick && index <= currentStep && onStepClick(index)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 min-h-[52px] ${
                isCurrent
                  ? "bg-royal text-white border-royal shadow-md shadow-royal/20"
                  : isCompleted
                  ? "bg-blue-50/90 text-primary-950 border-blue-200 cursor-pointer hover:bg-blue-100/70"
                  : "bg-white text-slate-400 border-slate-200/80 cursor-default"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  isCurrent
                    ? "bg-white text-royal"
                    : isCompleted
                    ? "bg-royal text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-xs font-bold truncate ${
                    isCurrent
                      ? "text-white"
                      : isCompleted
                      ? "text-primary-950"
                      : "text-slate-500"
                  }`}
                >
                  {step.title}
                </p>
                {step.subtitle && (
                  <p
                    className={`text-[10px] truncate ${
                      isCurrent ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 6. MODAL — Aksesibel dengan tombol tutup & backdrop
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`bg-white rounded-3xl border border-blue-100 shadow-2xl w-full ${maxWidth} overflow-hidden my-8`}
      >
        <div className="px-6 py-4 border-b border-blue-100 flex items-center justify-between bg-blue-50/40">
          <h3 className="text-lg font-extrabold text-primary-950">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-slate-500 hover:text-primary-950 hover:bg-blue-50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/**
 * 7. TOAST NOTIFICATION
 */
export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}) {
  const styles = {
    success: "bg-emerald-50 border-emerald-300 text-emerald-900",
    error: "bg-red-50 border-red-300 text-red-900",
    info: "bg-blue-50 border-blue-300 text-primary-950",
  };
  const Icon =
    type === "success"
      ? CheckCircle2
      : type === "error"
      ? AlertCircle
      : Info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl border shadow-xl flex items-center gap-3 max-w-md w-[92%] ${styles[type]}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-bold flex-1">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="p-1 rounded-lg hover:bg-black/5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * 8. SKELETON LOADER
 */
export function Skeleton({ className = "h-48 w-full" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-blue-100/60 rounded-2xl ${className}`}
      aria-hidden="true"
    />
  );
}
