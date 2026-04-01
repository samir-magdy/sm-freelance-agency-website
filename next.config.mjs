/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
 allowedDevOrigins: [process.env.DEV_LOCAL],
};

export default nextConfig;