// Shared by the quote form client (QuoteModal) and its API route so
// validation can't drift between the two.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Allows digits plus common formatting characters (spaces, dashes, parens,
// leading +), but the character class alone can't require an actual digit —
// e.g. "------" would match. isValidPhone below also checks digit count.
const PHONE_CHARS_RE = /^[+]?[\d\s()-]{6,20}$/;
const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15; // E.164 max

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!PHONE_CHARS_RE.test(value)) return false;
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= MIN_PHONE_DIGITS && digitCount <= MAX_PHONE_DIGITS;
}
