import { initServerErrorReporting, reportRequestError } from '@/shared/observability/index.server'
import { announceStartup } from '@/shared/security'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') announceStartup()
  await initServerErrorReporting()
}

export const onRequestError = reportRequestError
