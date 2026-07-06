/** @type {import('next').NextConfig} */
// for vercel
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [process.env.DEV_LOCAL],
  async redirects() {
    return [
      { source: "/portfolio", destination: "/#portfolio", permanent: true },
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