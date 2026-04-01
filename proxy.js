import { NextResponse } from "next/server";

const VALID_LANGS = ["en", "ar"];
const PUBLIC_FILE = /\.([^.]+)$/;

export function proxy(request) {
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

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.png, apple-icon.png, etc. (brand assets)
     * - robots.txt, sitemap.xml (SEO files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|apple-icon.png|brand.svg|business-logo.png|open-graph.webp|robots.txt|sitemap.xml|manifest.json|favicon-light.svg|favicon-dark.svg|project-screenshots).*)",
  ],
};
