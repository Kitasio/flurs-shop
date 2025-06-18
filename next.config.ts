import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://btcpay.flurs.art/**'),
      new URL('https://flurs-shop.fly.storage.tigris.dev/**'),
    ],
  },
};

export default nextConfig;
