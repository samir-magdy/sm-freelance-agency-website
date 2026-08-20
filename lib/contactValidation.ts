// Shared by the quote form client (QuoteModal) and its API route so
// validation can't drift between the two.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 11;
// Letters (any script, e.g. Latin or Arabic) and spaces only — no digits or symbols.
const NAME_RE = /^[\p{L}\s]+$/u;
const MAX_NAME_LENGTH = 30;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= MIN_PHONE_DIGITS;
}

export function isValidName(value: string): boolean {
  return value.length > 0 && value.length < MAX_NAME_LENGTH && NAME_RE.test(value);
}

// Requires a real-looking domain (label.tld) once normalized — catches
// typos like a bare word with no dot.
const HOSTNAME_RE = /^([\w-]+\.)+[a-z]{2,}$/i;

// Bare domains ("example.com") are what users actually type into a "paste a
// link" field, so treat a missing scheme as shorthand for https://. An
// explicit http:// is upgraded too — there's no legitimate reason to keep
// serving a reference link over plain HTTP today.
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return `https://${trimmed.replace(/^https?:\/\//i, "")}`;
}

export function isValidUrl(value: string): boolean {
  const normalized = normalizeUrl(value);
  if (!normalized) return false;
  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return false;
  }
  return url.protocol === "https:" && HOSTNAME_RE.test(url.hostname);
}
