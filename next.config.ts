import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [process.env.DEV_LOCAL!],
  async redirects() {
    return [
      // Lang-aware root: bare shareable links (e.g. /?lang=ar&quote=open)
      // land on the right locale instead of always falling through to /en.
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "ar" }],
        destination: "/ar",
        permanent: true,
      },
      { source: "/", destination: "/en", permanent: true },
      { source: "/portfolio", destination: "/en#portfolio", permanent: true },
      // Redirects for updated slugs, remove when new pages have been fully indexed and old ones removed.
      {
        source: "/portfolio/interior-design-site-demo",
        destination: "/portfolio/interior-design-website-design",
        permanent: true,
      },
      {
        source: "/portfolio/travel-agency-website",
        destination: "/portfolio/travel-tourism-website-design",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/portfolio/:slug", destination: "/portfolio/:slug/index.html" },
    ];
  },
};

export default nextConfig;
