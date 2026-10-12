import { errorReportingConfig, glitchtipOptions, shouldReportError } from './errorReporting'

describe('suivi des erreurs', () => {
  it('reste éteint sans DSN', () => {
    expect(errorReportingConfig(undefined, undefined, 'production')).toBeNull()
    expect(errorReportingConfig('', 'production', 'production')).toBeNull()
  })

  it('prend l’environnement de Node par défaut', () => {
    expect(errorReportingConfig('http://cle@erreurs.test/1', undefined, 'development')).toEqual({
      dsn: 'http://cle@erreurs.test/1',
      environment: 'development',
    })
    expect(errorReportingConfig('http://cle@erreurs.test/1', '', 'production')?.environment).toBe(
      'production',
    )
    expect(
      errorReportingConfig('http://cle@erreurs.test/1', 'recette', 'production')?.environment,
    ).toBe('recette')
  })

  it('ne remonte que les erreurs inattendues hors scénario de test', () => {
    expect(shouldReportError({ digest: undefined, scenario: null })).toBe(true)
    expect(shouldReportError({ digest: '1770003232', scenario: undefined })).toBe(true)
    expect(shouldReportError({ digest: 'NEXT_HTTP_ERROR_FALLBACK;404', scenario: null })).toBe(
      false,
    )
    expect(shouldReportError({ digest: 'NEXT_REDIRECT;replace;/;307;', scenario: null })).toBe(
      false,
    )
    expect(shouldReportError({ digest: undefined, scenario: 'error' })).toBe(false)
  })

  it('n’envoie ni donnée personnelle ni trace de performance', () => {
    expect(
      glitchtipOptions({ dsn: 'http://cle@erreurs.test/1', environment: 'production' }),
    ).toEqual({
      dsn: 'http://cle@erreurs.test/1',
      environment: 'production',
      sendDefaultPii: false,
      tracesSampleRate: 0,
    })
  })
})
