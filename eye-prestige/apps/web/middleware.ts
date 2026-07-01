import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pre-computed hash of "admin@eyeprestige.com" + "eye-prestige-admin-secret-salt-2026"
const SUPER_ADMIN_TOKEN = "ca1f4f7d5db7c173845481c46363eb36dc7a919aee08205b65a10db75156a122";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie || sessionCookie !== SUPER_ADMIN_TOKEN) {
      // Redirect to admin login page
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
