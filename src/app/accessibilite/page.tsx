import { buildMetadata } from '@/core/seo'
import { AccessibilityView } from '@/domains/legal'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Déclaration d’accessibilité',
  description:
    'Déclaration d’accessibilité RGAA 4.1.2 : état de conformité, tests menés, mode accessibilité renforcée, contact et voies de recours.',
  path: '/accessibilite',
})

export default function AccessibilityPage() {
  return <AccessibilityView />
}
