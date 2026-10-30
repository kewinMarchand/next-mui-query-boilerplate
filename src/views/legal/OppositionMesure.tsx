'use client'

import { useId } from 'react'

import { Checkbox } from '@kewinmarchand/boilerplates-ui/react'

import { useOppositionMesure } from '@/shared/observability'

/** Case d'opposition à la mesure d'audience, gardée dans ce navigateur (fiche CNIL n° 17). */
export const OppositionMesure = () => {
  const { refusee, changer } = useOppositionMesure()
  const inputId = useId()

  return (
    <>
      <Checkbox
        id={inputId}
        label="Ne pas mesurer mes visites sur ce site"
        checked={refusee}
        onChange={(event) => changer(event.target.checked)}
        data-testid="legal-opposition-mesure"
      />
      <p className="bui-text" role="status" aria-live="polite" data-testid="legal-opposition-etat">
        {refusee
          ? 'Vos visites ne sont plus mesurées depuis ce navigateur.'
          : 'Vos visites sont mesurées, de façon anonyme.'}
      </p>
    </>
  )
}
