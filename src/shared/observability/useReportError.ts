'use client'

import { useEffect } from 'react'

import { reportClientError } from './errorReporting.client'

/**
 * Remonte une erreur affichée par une frontière d'erreur. Une erreur porteuse d'un `digest` vient
 * du rendu serveur, déjà remontée par `onRequestError` : on ne la double pas.
 */
export const useReportError = (error: (Error & { digest?: string }) | undefined) => {
  useEffect(() => {
    if (error && !error.digest) reportClientError(error)
  }, [error])
}
