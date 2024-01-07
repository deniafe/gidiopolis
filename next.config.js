/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/html',
    ],
  },
  transpilePackages: [
    '@react-email/components',
    '@react-email/render',
    '@react-email/html',
  ]
}

module.exports = nextConfig
