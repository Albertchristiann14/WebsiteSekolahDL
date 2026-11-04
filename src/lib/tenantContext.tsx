"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  TENANTS,
  TenantConfig,
  TenantId,
  resolveTenantId,
} from "@/config/tenants";

interface TenantContextValue {
  tenantId: TenantId;
  tenant: TenantConfig;
  setTenantId: (id: TenantId) => void;
  isPortal: boolean;
}

const TenantContext = createContext<TenantContextValue>({
  tenantId: "portal",
  tenant: TENANTS.portal,
  setTenantId: () => {},
  isPortal: true,
});

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function TenantProvider({
  children,
  initialTenantId = "portal",
}: {
  children: React.ReactNode;
  initialTenantId?: TenantId;
}) {
  const [tenantId, setTenantIdState] = useState<TenantId>(initialTenantId);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const queryJenjang = params.get("jenjang");
    const hostTenant = resolveTenantId(window.location.hostname, null);
    const savedCookie = getCookie("dl_tenant");
    const savedStorage = window.localStorage.getItem("dl_tenant");

    if (queryJenjang && queryJenjang in TENANTS) {
      const resolved = queryJenjang as TenantId;
      setTenantIdState(resolved);
      window.localStorage.setItem("dl_tenant", resolved);
      document.cookie = `dl_tenant=${resolved}; path=/; max-age=2592000; SameSite=Lax`;
    } else if (hostTenant !== "portal") {
      setTenantIdState(hostTenant);
    } else if (savedCookie && savedCookie in TENANTS) {
      setTenantIdState(savedCookie as TenantId);
    } else if (savedStorage && savedStorage in TENANTS) {
      setTenantIdState(savedStorage as TenantId);
    }
  }, []);

  const setTenantId = (id: TenantId) => {
    setTenantIdState(id);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dl_tenant", id);
      document.cookie = `dl_tenant=${id}; path=/; max-age=2592000; SameSite=Lax`;
    }
  };

  const tenant = TENANTS[tenantId] || TENANTS.portal;

  // Injeksi variabel CSS dinamis sesuai jenjang aktif (--primary, --primary-foreground, --accent, --surface, --muted)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--primary", tenant.theme.primary);
    root.style.setProperty("--primary-foreground", tenant.theme.primaryForeground);
    root.style.setProperty("--accent", tenant.theme.accent);
    root.style.setProperty("--surface", tenant.theme.surface);
    root.style.setProperty("--muted", tenant.theme.muted);
    root.setAttribute("data-tenant", tenant.id);
  }, [tenant]);

  return (
    <TenantContext.Provider
      value={{
        tenantId,
        tenant,
        setTenantId,
        isPortal: tenantId === "portal",
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}

