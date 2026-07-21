import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [process.env.DEV_LOCAL!],
  async redirects() {
    return [
      { source: "/portfolio", destination: "/#portfolio", permanent: true },
      // Redirects for updated slugs, remove when new pages have been fully indexed and old ones removed.
      {
        source: "/portfolio/dental-clinic-site-demo",
        destination: "/portfolio/healthcare-website-design",
        permanent: true,
      },
      {
        source: "/portfolio/interior-design-site-demo",
        destination: "/portfolio/interior-design-website-design",
        permanent: true,
      },
      {
        source: "/portfolio/pet-care-site-demo",
        destination: "/portfolio/petcare-website-design",
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
      { source: "/", destination: "/en" },
      { source: "/portfolio/:slug", destination: "/portfolio/:slug/index.html" },
    ];
  },
};

export default nextConfig;
