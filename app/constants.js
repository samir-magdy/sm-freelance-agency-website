// .origin guarantees no trailing slash, preventing malformed double-slash URLs
// in downstream string concatenation (e.g. `${SITE_URL}/ar`).
export const SITE_URL = new URL("https://smwebdesign.studio").origin;
export const SITE_NAME = "SM Web Design Studio";
export const TWITTER_HANDLE = "@SMWebDesignCo";
