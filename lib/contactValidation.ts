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
