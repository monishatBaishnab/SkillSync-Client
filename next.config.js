/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: "preact/compat",
      "react-dom": "preact/compat",
    };
    return config;
  },
};

module.exports = nextConfig;
