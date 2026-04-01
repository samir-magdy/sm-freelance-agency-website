/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en',
      },
    ];
  },
};

export default nextConfig;