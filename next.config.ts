import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  
};
module.exports = {
  allowedDevOrigins: ['192.168.1.191'],
}
export default nextConfig;
