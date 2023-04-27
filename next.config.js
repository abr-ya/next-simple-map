/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
