import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT === 'standalone' && { output: 'standalone' }),
  poweredByHeader: false,
  // Origine de l'API pour le navigateur, figée au build. Le serveur relit API_URL à l'exécution.
  env: { NEXT_PUBLIC_API_URL: process.env.API_URL || 'http://localhost:8090' },
  // Build séparé pour les tests d'observabilité, qui fixent les variables publiques au build.
  ...(process.env.NEXT_DIST_DIR && { distDir: process.env.NEXT_DIST_DIR }),
}

export default nextConfig
