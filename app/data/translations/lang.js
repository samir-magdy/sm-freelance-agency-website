// .origin guarantees no trailing slash, preventing malformed double-slash URLs
// in downstream string concatenation (e.g. `${SITE_URL}/ar`).
export const SITE_URL = new URL("https://samirmagdy.com").origin;
