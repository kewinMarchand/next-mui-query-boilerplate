import { useQuery } from '@tanstack/react-query'

import { findAllTasks } from '@/modules/task/infrastructure/taskRepository'
import { TasksLoadError } from '@/modules/task/infrastructure/TasksLoadError'

export const TASKS_QUERY_KEY = ['tasks'] as const

const fetchTasks = async () => {
  try {
    return await findAllTasks()
  } catch {
    throw new TasksLoadError()
  }
}

export const useTasks = () => useQuery({ queryKey: TASKS_QUERY_KEY, queryFn: fetchTasks })
