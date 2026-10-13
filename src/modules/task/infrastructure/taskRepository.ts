import { ApiError, browserApiClient } from '@/shared/api/client'

import { toTask } from './http/taskTranslation'

import type { Task } from '../domain/task'

/** Appelée dans le navigateur, par TanStack Query. */
export const findAllTasks = async (): Promise<Task.Entity[]> => {
  const { data, response } = await browserApiClient().GET('/api/tasks')
  if (!data) throw new ApiError(response)
  return data.map(toTask)
}
