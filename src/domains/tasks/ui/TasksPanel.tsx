'use client'

import { useTasks } from './hooks/useTasks'
import { TaskList } from './TaskList'

export const TasksPanel = () => {
  const { status, data, error, refetch } = useTasks()

  return (
    <div aria-live="polite">
      <TaskList
        status={status}
        tasks={data}
        {...(error && { errorMessage: error.message })}
        onRetry={() => void refetch()}
      />
    </div>
  )
}
