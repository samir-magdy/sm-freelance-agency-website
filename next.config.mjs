/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["192.168.1.217"],
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/en",
      },
    ];
  },
};

export default nextConfig;
