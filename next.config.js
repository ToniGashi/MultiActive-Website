/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "azureblobimg.blob.core.windows.net",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

module.exports = nextConfig;
