import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://btcpay.flurs.art/**')],
  },
};

export default nextConfig;
