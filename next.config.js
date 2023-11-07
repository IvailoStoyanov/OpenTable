/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // time in seconds of no pages generating during static generation before timing out
  staticPageGenerationTimeout: 180,
}

module.exports = nextConfig
