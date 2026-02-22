import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "ar"];
const PUBLIC_FILE = /\.([^.]+)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip _next internals, API routes, and public files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already at a valid lang route — pass through
  if (
    VALID_LANGS.some(
      (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
    )
  ) {
    return NextResponse.next();
  }

  // Everything else (including /) → redirect to /en (default language)
  const url = request.nextUrl.clone();
  url.pathname = `/en`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
