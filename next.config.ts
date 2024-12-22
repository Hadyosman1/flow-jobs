import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "jpn71p7qgt9szvmj.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
