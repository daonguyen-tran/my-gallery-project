import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // Autorise toutes les images externes
      },
      {
        protocol: "http",
        hostname: "**",   // (si tu testes des URLs non https)
      }
    ],
  },
};

export default nextConfig;