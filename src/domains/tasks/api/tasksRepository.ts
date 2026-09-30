import type { Task } from '../common/models/task'

const TASKS: Task.Entity[] = [
  { id: '1', title: 'Brancher la vraie API', done: false },
  { id: '2', title: 'Générer les types OpenAPI', done: false },
  { id: '3', title: 'Lancer make qa', done: true },
]

const LATENCY_MS = 300

export const findAllTasks = (): Promise<Task.Entity[]> =>
  new Promise((resolve) => setTimeout(() => resolve(TASKS), LATENCY_MS))
