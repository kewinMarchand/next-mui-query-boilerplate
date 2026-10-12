import { initServerErrorReporting, reportRequestError } from '@/shared/observability/index.server'

export async function register() {
  await initServerErrorReporting()
}

export const onRequestError = reportRequestError
