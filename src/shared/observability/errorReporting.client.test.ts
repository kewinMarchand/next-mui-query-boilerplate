const sentry = vi.hoisted(() => ({ init: vi.fn(), captureException: vi.fn() }))
vi.mock('@sentry/nextjs', () => sentry)

import { reportClientError, scheduleClientErrorReporting } from './errorReporting.client'

describe('suivi des erreurs du navigateur sans DSN', () => {
  it('ne charge pas le SDK et n’envoie rien', async () => {
    scheduleClientErrorReporting()
    reportClientError(new Error('ignorée'))
    window.dispatchEvent(new Event('load'))
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(sentry.init).not.toHaveBeenCalled()
    expect(sentry.captureException).not.toHaveBeenCalled()
    expect(document.querySelectorAll('script')).toHaveLength(0)
  })
})
