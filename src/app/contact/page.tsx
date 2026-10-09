import { buildMetadata } from '@/core/seo'
import { ContactView } from '@/domains/contact'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Démo de formulaire : validation par schéma zod avec react-hook-form, erreurs liées aux champs et envoi par mutation.',
  path: '/contact',
})

export default function ContactPage() {
  return <ContactView />
}
