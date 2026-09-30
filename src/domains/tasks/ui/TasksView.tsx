import Typography from '@mui/material/Typography'

import { TasksPanel } from './TasksPanel'

export const TasksView = () => (
  <>
    <Typography variant="h1" gutterBottom>
      Tâches
    </Typography>
    <Typography sx={{ mb: 3 }}>
      Données chargées côté client avec TanStack Query : chargement, erreur et liste vide sont
      gérés.
    </Typography>
    <TasksPanel />
  </>
)
