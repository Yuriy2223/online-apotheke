/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      // Додайте інші домени за потреби
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
