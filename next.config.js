/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: "/api/article/:path*",
      destination: "http://api:3000/api/article/:path*",
      basePath: false,
    },
    {
      source: "/storybook/:path*",
      destination: "http://storybook:6006/:path*",
      basePath: false,
    },
  ]
}

module.exports = nextConfig
