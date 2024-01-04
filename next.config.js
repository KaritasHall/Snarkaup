const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "on9coewl1bh1lia7.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
