export interface ErrorReportingConfig {
  dsn: string
  environment: string
}

export const SCENARIO_HEADER = 'x-scenario'

/** Sans DSN, le suivi des erreurs est éteint : aucun SDK chargé, aucune requête. */
export const errorReportingConfig = (
  dsn: string | undefined,
  environment: string | undefined,
  nodeEnv: string | undefined,
): ErrorReportingConfig | null =>
  dsn
    ? { dsn, environment: environment || (nodeEnv === 'production' ? 'production' : 'development') }
    : null

// Signaux de contrôle de Next (notFound, redirect) : ce sont des réponses voulues, pas des erreurs.
const CONTROL_FLOW_DIGESTS = ['NEXT_HTTP_ERROR_FALLBACK', 'NEXT_REDIRECT', 'NEXT_NOT_FOUND']

/**
 * Seules les erreurs inattendues remontent. Les 404 et redirections (signaux de Next), la
 * maintenance 503 (une réponse du proxy, pas une erreur) et les scénarios de test (en-tête
 * X-Scenario) restent locaux.
 */
export const shouldReportError = ({
  digest,
  scenario,
}: {
  digest: string | undefined
  scenario: string | null | undefined
}) => !scenario && !CONTROL_FLOW_DIGESTS.some((prefix) => digest?.startsWith(prefix))

/** Aucune donnée personnelle, aucune trace de performance, aucun rejeu de session. */
export const glitchtipOptions = ({ dsn, environment }: ErrorReportingConfig) => ({
  dsn,
  environment,
  sendDefaultPii: false,
  tracesSampleRate: 0,
})
