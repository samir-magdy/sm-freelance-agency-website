/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["192.168.1.248"],

  async redirects() {
    return [
      { source: "/portfolio", destination: "/#portfolio", permanent: false },
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