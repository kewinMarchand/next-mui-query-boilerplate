'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useId } from 'react'

import { useOppositionMesure } from '@/shared/observability'

import type { ChangeEvent } from 'react'

/** Case d'opposition à la mesure d'audience, gardée dans ce navigateur (fiche CNIL n° 17). */
export const OppositionMesure = () => {
  const { refusee, changer } = useOppositionMesure()
  const inputId = useId()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 44 }}>
        <Box
          component="input"
          type="checkbox"
          id={inputId}
          checked={refusee}
          onChange={(event: ChangeEvent<HTMLInputElement>) => changer(event.target.checked)}
          data-testid="legal-opposition-mesure"
          sx={{ width: 20, height: 20, minHeight: 'auto', flexShrink: 0 }}
        />
        <Typography component="label" htmlFor={inputId}>
          Ne pas mesurer mes visites sur ce site
        </Typography>
      </Box>
      <Typography role="status" aria-live="polite" data-testid="legal-opposition-etat">
        {refusee
          ? 'Vos visites ne sont plus mesurées depuis ce navigateur.'
          : 'Vos visites sont mesurées, de façon anonyme.'}
      </Typography>
    </>
  )
}
