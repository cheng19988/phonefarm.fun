import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/multi-device-lab-rack",
        destination: "/products/iphone-phone-farm",
        permanent: true,
      },
      {
        source: "/products/iphone-farm",
        destination: "/products/iphone-phone-farm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
