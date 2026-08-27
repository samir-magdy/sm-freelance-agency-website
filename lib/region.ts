import { headers } from "next/headers";

// Geo detection is intentionally binary: the studio is Egypt-anchored, so the
// only thing we need to know is whether a visitor is inside Egypt (show EGP
// pricing) or outside it (point them to a quote in their local currency).
// Vercel and Cloudflare both stamp the visitor's country on the request.
const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"] as const;

/**
 * True only when the request is positively identified as coming from Egypt.
 * Anything else — a different country, or no country header at all (local dev,
 * un-geo'd requests, most crawlers) — is treated as outside Egypt, so pricing
 * is shown exclusively to Egyptian visitors.
 */
export async function isEgypt(): Promise<boolean> {
  const requestHeaders = await headers();
  for (const headerName of COUNTRY_HEADERS) {
    const value = requestHeaders.get(headerName);
    if (value) return value.toUpperCase() === "EG";
  }
  return false;
}
