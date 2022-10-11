/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/:msid(\\d+v{0,1}\\d*)',
        destination: '/reviewed-preprints/:msid',
      },
      {
        source: '/reviewed-preprints/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        source: '/reviewed-preprints/:path((?!\\d+v{0,1}\\d*))',
        destination: '/:path*',
      },
    ],
  }),
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  assetPrefix: process.env.ASSET_PREFIX ?? '',
}

module.exports = nextConfig
