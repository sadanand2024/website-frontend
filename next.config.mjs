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

// const nextConfig = {
//   output: 'export',
//   images: {
//       unoptimized: true,
//   },
//   distDir: 'out', // Where to export all pages
//   trailingSlash: true,
//   assetPrefix: '.',

//   // time in seconds of no pages generating during static
//   // generation before timing out
//   staticPageGenerationTimeout: 1000,
//   reactStrictMode: false
// }
