/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  reactStrictMode: true,
  swcMinify: true,
  // assetPrefix: ".",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
