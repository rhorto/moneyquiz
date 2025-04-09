/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL || 'https://affiliate-dashboard-api.onrender.com/api',
  },
  images: {
    domains: ['via.placeholder.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
