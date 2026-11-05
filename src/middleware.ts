import { NextRequest, NextResponse } from "next/server";
import { resolveTenantId, TenantId, TENANTS } from "@/config/tenants";

/**
 * Multi-Tenant Middleware untuk Sekolah Cendekia Bangsa
 * Mendeteksi jenjang pendidikan dari subdomain maupun query parameter (?jenjang=sd)
 * atau cookie (dl_tenant) untuk routing lokal/single-domain di Vercel atau localhost.
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

  const host = request.headers.get("host") || "cendekiabangsa.sch.id";
  const queryJenjang = searchParams.get("jenjang");
  const cookieJenjang = request.cookies.get("dl_tenant")?.value;

  // Prioritas deteksi tenant:
  // 1. Query param (?jenjang=sd atau ?jenjang=portal) selalu menang
  // 2. Subdomain spesifik (mis. sd.dharmaloka.sch.id / sd.localhost)
  // 3. Jika mengakses homepage "/" pada root domain, selalu buka Halaman Pusat (portal gateway)
  // 4. Jika di subpage (mis. /about), baca cookie dl_tenant
  const hostTenant = resolveTenantId(host, null);
  let activeTenant: TenantId = "portal";

  if (queryJenjang && queryJenjang in TENANTS) {
    activeTenant = queryJenjang as TenantId;
  } else if (hostTenant !== "portal") {
    activeTenant = hostTenant;
  } else if (pathname === "/") {
    activeTenant = "portal";
  } else {
    const cookieJenjang = request.cookies.get("dl_tenant")?.value;
    if (cookieJenjang && cookieJenjang in TENANTS) {
      activeTenant = cookieJenjang as TenantId;
    } else {
      activeTenant = "portal";
    }
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

  // Bersihkan atau perbarui cookie sesuai kondisi
  if (queryJenjang) {
    if (queryJenjang === "portal") {
      response.cookies.delete("dl_tenant");
    } else {
      response.cookies.set("dl_tenant", activeTenant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 hari
        sameSite: "lax",
      });
    }
  } else if (pathname === "/" && hostTenant === "portal") {
    response.cookies.delete("dl_tenant");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

