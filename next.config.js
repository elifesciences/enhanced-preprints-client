/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: "/api/article/:path*",
      destination: "http://localhost:3001/api/article/:path*",
      basePath: false,
    }
  ]
}

module.exports = nextConfig
