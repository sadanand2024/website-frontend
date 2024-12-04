/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // trailingSlash: true,
};

export default nextConfig;
