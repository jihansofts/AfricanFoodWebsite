import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // jose works in Edge runtime

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/vendor") && payload.role !== "vendor") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/vendor/:path*"],
};
