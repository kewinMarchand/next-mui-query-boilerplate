import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

import { Icon } from '@/core/ui/ui-kit'

import type { Task } from '../common/models/task'

interface TaskListProps {
  status: 'pending' | 'error' | 'success'
  tasks: Task.Entity[] | undefined
  errorMessage?: string
  onRetry: () => void
}

export const TaskList = ({ status, tasks, errorMessage, onRetry }: TaskListProps) => {
  if (status === 'pending') {
    return (
      <Stack
        spacing={1}
        role="status"
        data-testid="tasks-loading"
        aria-busy="true"
        aria-label="Chargement des tâches"
      >
        {[1, 2, 3].map((key) => (
          <Skeleton key={key} variant="rounded" height={48} />
        ))}
      </Stack>
    )
  }

  if (status === 'error') {
    return (
      <Alert
        severity="error"
        data-testid="tasks-error"
        action={
          <Button
            color="inherit"
            onClick={onRetry}
            data-testid="tasks-retry"
            startIcon={<Icon name="rotate-cw" />}
          >
            Réessayer
          </Button>
        }
      >
        {errorMessage}
      </Alert>
    )
  }

  if (!tasks?.length) {
    return (
      <Alert severity="info" data-testid="tasks-empty">
        Aucune tâche pour l'instant. Tout est à jour.
      </Alert>
    )
  }

  return (
    <List data-testid="tasks-list">
      {tasks.map((task) => (
        <ListItem key={task.id} data-testid="tasks-item">
          <ListItemIcon>
            <Icon name={task.done ? 'circle-check' : 'list-todo'} />
          </ListItemIcon>
          <ListItemText primary={task.title} secondary={task.done ? 'Terminée' : 'À faire'} />
        </ListItem>
      ))}
    </List>
  )
}
