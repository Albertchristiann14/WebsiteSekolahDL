import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm sm:text-base ${className}`}>
      <ol className="flex items-center space-x-2.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center text-slate-600 hover:text-royal font-medium transition-colors"
            title="Kembali ke Beranda"
          >
            <Home className="w-4 h-4 mr-1.5 text-royal" aria-hidden="true" />
            <span>Beranda</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2.5">
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="font-bold text-royal line-clamp-1" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-royal font-medium transition-colors line-clamp-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
