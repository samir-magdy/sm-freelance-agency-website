/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["192.168.1.145"],

  // Replaces proxy.js middleware — resolved at Vercel's routing layer, no Edge Function invocation
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/en",
      },
    ];
  },

  async headers() {
    // HTML pages — CDN caches for 1 year (purged on deploy), browser revalidates every 24 hours.
    // Listed for both the rewritten root ("/") and the direct locale paths ("/en", "/ar")
    // because headers() matches the incoming request URL, not the rewrite destination.
    const htmlCache = [
      {
        key: "Cache-Control",
        value:
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=59",
      },
    ];

    return [
      { source: "/", headers: htmlCache },
      { source: "/:lang(en|ar)", headers: htmlCache },
      { source: "/:lang(en|ar)/resources", headers: htmlCache },
      { source: "/:lang(en|ar)/resources/:slug", headers: htmlCache },
    ];
  },
};

export default nextConfig;