import { TasksView } from '@/modules/task'
import { buildMetadata } from '@/shared/seo'

import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Tâches',
  description:
    'Démo TanStack Query : liste de tâches chargée côté client avec gestion du chargement, des erreurs et de la liste vide.',
  path: '/taches',
})

export default function TasksPage() {
  return <TasksView />
}
