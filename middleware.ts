// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ✅ Allow public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon.ico") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // ✅ Protect /vendor routes
  if (pathname.startsWith("/vendor")) {
    if (!token) {
      // Not logged in → redirect to login page
      return NextResponse.redirect(new URL("/create-product-vendor", req.url));
    }

    if (token.role !== "vendor") {
      // Logged in but not vendor → redirect to home
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vendor/:path*"], // 👈 protects all vendor routes
};
