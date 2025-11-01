import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/vendor") && decoded.role !== "vendor") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/customer") && decoded.role !== "customer") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/vendor/:path*", "/:path*"],
};
