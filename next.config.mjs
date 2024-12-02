/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // Enables static export
  distDir: "out",          // Specifies the output folder (default: "out")
  reactStrictMode: true,   // Enables React strict mode
  swcMinify: true,         // Enables SWC-based minification
  images: {
    unoptimized: true,     // Disables image optimization (for static export)
  },
  // assetPrefix: ".",      // Uncomment if using custom asset prefix for assets
};

module.exports = nextConfig;  // Export the configuration using CommonJS syntax