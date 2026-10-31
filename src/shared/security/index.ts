import { cspReportRoute, startupLine } from '@kewinmarchand/csp'

export { siteCsp } from './csp'
export { CSP_HEADER } from '@kewinmarchand/csp'

/** Route POST /api/csp-report : 204 et une ligne sur la sortie standard, 400 ou 413. */
export const cspReportHandler = cspReportRoute()

/** Ligne de démarrage, pour retrouver le bon fichier de log chez l'hébergeur. */
export const announceStartup = () =>
  process.stdout.write(`${startupLine('boilerplate-next', process.env.NODE_ENV ?? 'production')}\n`)
