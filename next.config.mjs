/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
    runtime: 'edge',
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

export default nextConfig
