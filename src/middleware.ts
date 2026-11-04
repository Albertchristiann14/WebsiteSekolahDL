import { NextRequest, NextResponse } from "next/server";
import { resolveTenantId, TenantId } from "@/config/tenants";

/**
 * Multi-Tenant Middleware untuk Sekolah Dharma Loka Pekanbaru
 * Mendeteksi jenjang pendidikan dari subdomain (tk.dharmaloka.sch.id, sd.dharmaloka.sch.id, dll.)
 * maupun query parameter (?jenjang=sd) atau cookie (dl_tenant) untuk simulasi lokal.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Jangan intervensi route asset statis atau internal Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") || "dharmaloka.sch.id";
  const queryJenjang = searchParams.get("jenjang");
  const cookieJenjang = request.cookies.get("dl_tenant")?.value;

  // Prioritas: 1. Query param (?jenjang=sd) -> 2. Subdomain (sd.dharmaloka.sch.id) -> 3. Cookie (dl_tenant) -> 4. Portal Induk
  const hostTenant = resolveTenantId(host, null);
  let activeTenant: TenantId = "portal";

  if (queryJenjang) {
    activeTenant = resolveTenantId(host, queryJenjang);
  } else if (hostTenant !== "portal") {
    activeTenant = hostTenant;
  } else if (cookieJenjang) {
    activeTenant = resolveTenantId(host, cookieJenjang);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-id", activeTenant);
  requestHeaders.set("x-tenant-host", host);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-tenant-id", activeTenant);

  if (queryJenjang) {
    response.cookies.set("dl_tenant", activeTenant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 hari
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

