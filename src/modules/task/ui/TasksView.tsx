import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import { TasksPanel } from './TasksPanel'
import styles from './TasksView.module.css'

export const TasksView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/taches')}>
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Tâches</h1>
    <p className={`bui-text ${styles.intro}`}>
      Données chargées côté client avec TanStack Query : chargement, erreur et liste vide sont
      gérés.
    </p>
    <TasksPanel />
  </PageContainer>
)
