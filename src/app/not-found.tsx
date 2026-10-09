import { NotFoundView } from '@/domains/errors'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundView />
}
