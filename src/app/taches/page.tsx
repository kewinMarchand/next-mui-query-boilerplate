import { buildMetadata } from '@/core/seo'
import { TasksView } from '@/domains/tasks'

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
