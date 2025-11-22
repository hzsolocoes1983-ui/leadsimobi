/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081',
    NEXT_PUBLIC_N8N_URL: process.env.NEXT_PUBLIC_N8N_URL || 'http://localhost:5679',
  },
}

module.exports = nextConfig

