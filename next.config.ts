import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT === 'standalone' && { output: 'standalone' }),
  poweredByHeader: false,
  // Build séparé pour les tests d'observabilité, qui fixent les variables publiques au build.
  ...(process.env.NEXT_DIST_DIR && { distDir: process.env.NEXT_DIST_DIR }),
}

export default nextConfig
