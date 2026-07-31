import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.grace.moscow',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
