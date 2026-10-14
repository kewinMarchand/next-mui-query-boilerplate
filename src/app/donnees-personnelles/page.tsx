import { buildMetadata } from '@/shared/seo'

import { PersonalDataView } from '@/views/legal'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Données personnelles',
  description:
    'Traitement des données du formulaire de contact : responsable, finalité, base légale, durée de conservation, droits et réclamation CNIL.',
  path: '/donnees-personnelles',
})

export default function PersonalDataPage() {
  return <PersonalDataView />
}
