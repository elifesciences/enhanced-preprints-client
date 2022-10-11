/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
  ],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  basePath: '/reviewed-preprints',
}

module.exports = nextConfig
