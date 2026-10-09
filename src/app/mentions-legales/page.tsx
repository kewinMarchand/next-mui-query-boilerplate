import { buildMetadata } from '@/core/seo'
import { LegalNoticeView } from '@/domains/legal'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    'Éditeur, directeur de la publication, hébergeur et propriété intellectuelle du site, avec les informations issues de la configuration.',
  path: '/mentions-legales',
})

export default function LegalNoticePage() {
  return <LegalNoticeView />
}
