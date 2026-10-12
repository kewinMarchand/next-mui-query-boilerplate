import {
  errorReportingConfig,
  glitchtipOptions,
  SCENARIO_HEADER,
  shouldReportError,
} from './errorReporting'

import type * as Sentry from '@sentry/nextjs'
import type { Instrumentation } from 'next'

let sentry: typeof Sentry | null = null

/** Charge le SDK serveur seulement si un DSN est fourni : sans DSN, rien n'est importé. */
export const initServerErrorReporting = async () => {
  const config = errorReportingConfig(
    process.env.GLITCHTIP_DSN,
    process.env.NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT,
    process.env.NODE_ENV,
  )
  if (!config) return
  sentry = await import('@sentry/nextjs')
  sentry.init({
    ...glitchtipOptions(config),
    integrations: (defaults) =>
      defaults.map((integration) =>
        integration.name === 'Http' && sentry
          ? sentry.httpIntegration({ maxRequestBodySize: 'none' })
          : integration,
      ),
  })
}

const headerValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

export const reportRequestError: Instrumentation.onRequestError = (error, request, context) => {
  if (!sentry) return
  const digest =
    error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string'
      ? error.digest
      : undefined
  if (!shouldReportError({ digest, scenario: headerValue(request.headers[SCENARIO_HEADER]) })) {
    return
  }
  sentry.captureRequestError(error, request, context)
}
