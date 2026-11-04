import { TENANTS, TenantConfig, TenantId } from "@/config/tenants";

export const TenantStore = {
  getStorageKey(tenantId: string): string {
    return `dl_custom_tenant_${tenantId}`;
  },

  getCustomOverrides(tenantId: TenantId): Partial<TenantConfig> | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(this.getStorageKey(tenantId));
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse custom tenant settings:", err);
      return null;
    }
  },

  getMergedConfig(tenantId: TenantId): TenantConfig {
    const base = TENANTS[tenantId] || TENANTS.portal;
    const custom = this.getCustomOverrides(tenantId);
    if (!custom) return base;

    return {
      ...base,
      ...custom,
      theme: {
        ...base.theme,
        ...(custom.theme || {}),
      },
      contact: {
        ...base.contact,
        ...(custom.contact || {}),
      },
      principal: {
        ...base.principal,
        ...(custom.principal || {}),
      },
      stats: {
        ...base.stats,
        ...(custom.stats || {}),
      },
      heroSlides: custom.heroSlides && custom.heroSlides.length > 0 ? custom.heroSlides : base.heroSlides,
      featuredPrograms:
        custom.featuredPrograms && custom.featuredPrograms.length > 0
          ? custom.featuredPrograms
          : base.featuredPrograms,
      extracurriculars:
        custom.extracurriculars && custom.extracurriculars.length > 0
          ? custom.extracurriculars
          : base.extracurriculars,
    };
  },

  saveCustomOverrides(tenantId: TenantId, overrides: Partial<TenantConfig>): TenantConfig {
    if (typeof window === "undefined") return this.getMergedConfig(tenantId);

    try {
      const existing = this.getCustomOverrides(tenantId) || {};
      const updated = {
        ...existing,
        ...overrides,
        theme: {
          ...(existing.theme || {}),
          ...(overrides.theme || {}),
        },
        contact: {
          ...(existing.contact || {}),
          ...(overrides.contact || {}),
        },
        principal: {
          ...(existing.principal || {}),
          ...(overrides.principal || {}),
        },
        stats: {
          ...(existing.stats || {}),
          ...(overrides.stats || {}),
        },
      };

      window.localStorage.setItem(this.getStorageKey(tenantId), JSON.stringify(updated));

      // Dispatch custom event for real-time listener across components
      window.dispatchEvent(
        new CustomEvent("dl_tenant_appearance_updated", { detail: tenantId })
      );

      return this.getMergedConfig(tenantId);
    } catch (err) {
      console.error("Failed to save tenant overrides:", err);
      return this.getMergedConfig(tenantId);
    }
  },

  resetToDefault(tenantId: TenantId): TenantConfig {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(this.getStorageKey(tenantId));
      window.dispatchEvent(
        new CustomEvent("dl_tenant_appearance_updated", { detail: tenantId })
      );
    }
    return TENANTS[tenantId] || TENANTS.portal;
  },
};
