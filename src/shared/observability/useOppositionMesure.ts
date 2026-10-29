'use client'

import { useSyncExternalStore } from 'react'

import { abonnerOppositionMesure, changerOppositionMesure, mesureRefusee } from './oppositionMesure'

/** Refus de la mesure d'audience par le visiteur, et le moyen de le changer. Faux au rendu serveur. */
export const useOppositionMesure = () => {
  const refusee = useSyncExternalStore(abonnerOppositionMesure, mesureRefusee, () => false)
  return { refusee, changer: changerOppositionMesure }
}
