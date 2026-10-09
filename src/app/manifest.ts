import { SITE } from '@/core/config'

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: 'Boilerplate',
    description: SITE.description,
    lang: 'fr',
    start_url: '/',
    display: 'standalone',
    theme_color: '#1d4ed8',
    background_color: '#ffffff',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
