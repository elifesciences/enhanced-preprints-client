var path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/previews/:path*',
        destination: '/reviewed-preprints/:path*',
      },
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
      {
        // Expose path for manuscript bibtex download
        source: '/reviewed-preprints/:msid(\\d+v{0,1}\\d*).bib',
        destination: '/api/citations/:msid/bibtex',
      },
      {
        // Expose path for manuscript ris download
        source: '/reviewed-preprints/:msid(\\d+v{0,1}\\d*).ris',
        destination: '/api/citations/:msid/ris',
      },
      {
        source: '/ping',
        destination: '/api/ping',
      },
      {
        source: '/status',
        destination: '/api/status',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ],
    fallback: [
      {
        source: '/reviewed-preprints/:path*',
        destination: '/reviewed-preprints/:path*/fulltext',
      },
    ]
  }),
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  assetPrefix: process.env.ASSET_PREFIX ?? '',
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    // This removes the modular CSS requirement, allowing us to use regular SCSS imports in components
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });

    return config;
  },
}

module.exports = nextConfig
