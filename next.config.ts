import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "keek-institute.t3.tigrisfiles.io",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
