import { errorReportingConfig, glitchtipOptions } from './errorReporting'

const EXCLUDED_INTEGRATIONS = new Set(['BrowserTracing', 'BrowserSession', 'Replay'])

const config = errorReportingConfig(
  process.env.NEXT_PUBLIC_GLITCHTIP_DSN,
  process.env.NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT,
  process.env.NODE_ENV,
)
const pending: unknown[] = []
let capture: ((error: unknown) => void) | null = null

const afterDisplay = (task: () => void) => {
  const schedule = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(task) : setTimeout(task, 0)
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}

/** Le SDK navigateur se charge après l'affichage, et seulement si un DSN est fourni. */
export const scheduleClientErrorReporting = () => {
  if (!config) return
  const options = glitchtipOptions(config)
  afterDisplay(async () => {
    const { captureException, init } = await import('@sentry/nextjs')
    init({
      ...options,
      integrations: (defaults) =>
        defaults.filter((integration) => !EXCLUDED_INTEGRATIONS.has(integration.name)),
    })
    capture = (error) => captureException(error)
    pending.splice(0).forEach(capture)
  })
}

export const reportClientError = (error: unknown) => {
  if (!config) return
  if (capture) capture(error)
  else pending.push(error)
}
