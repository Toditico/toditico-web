/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
