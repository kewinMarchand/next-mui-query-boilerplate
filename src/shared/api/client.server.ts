import { headers } from 'next/headers'

import { createApiClient } from './client'

/**
 * Client de la requête en cours : `API_URL` relue à l'exécution (repli sur la valeur du build) et
 * `X-Scenario` reçu relayé à l'API. Lire les en-têtes rend la route dynamique.
 */
export const serverApiClient = async () =>
  createApiClient(
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '',
    (await headers()).get('X-Scenario'),
  )
