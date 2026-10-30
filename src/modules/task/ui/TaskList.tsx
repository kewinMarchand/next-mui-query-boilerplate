import { Alert, Button, Skeleton, Stack } from '@kewinmarchand/boilerplates-ui/react'

import { Icon } from '@/shared/ui/kit'

import styles from './TaskList.module.css'

import type { Task } from '../domain/task'

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
        gap="2"
        role="status"
        data-testid="tasks-loading"
        aria-busy="true"
        aria-label="Chargement des tâches"
      >
        {[1, 2, 3].map((key) => (
          <Skeleton key={key} height="48px" />
        ))}
      </Stack>
    )
  }

  if (status === 'error') {
    return (
      <div data-testid="tasks-error">
        <Alert
          variant="error"
          action={
            <Button variant="ghost" onClick={onRetry} data-testid="tasks-retry">
              <Icon name="rotate-cw" />
              Réessayer
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      </div>
    )
  }

  if (!tasks?.length) {
    return (
      <div data-testid="tasks-empty">
        <Alert>Aucune tâche pour l'instant. Tout est à jour.</Alert>
      </div>
    )
  }

  return (
    <ul data-testid="tasks-list" className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} data-testid="tasks-item" className={styles.item}>
          <Icon name={task.done ? 'circle-check' : 'list-todo'} />
          <div>
            <p className="bui-text">{task.title}</p>
            <p className={`bui-text bui-text--body-sm ${styles.status}`}>
              {task.done ? 'Terminée' : 'À faire'}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
