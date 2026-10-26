import { initServerErrorReporting, reportRequestError } from '@/shared/observability/index.server'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') (await import('@/shared/security')).announceStartup()
  await initServerErrorReporting()
}

export const onRequestError = reportRequestError
