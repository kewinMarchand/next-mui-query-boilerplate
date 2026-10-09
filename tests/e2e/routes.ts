export const ROUTES = [
  '/',
  '/taches',
  '/contact',
  '/catalogue',
  '/catalogue/plantes-interieur',
  '/catalogue/plantes-interieur/feuillages',
  '/mentions-legales',
  '/donnees-personnelles',
  '/accessibilite',
  '/plan-du-site',
] as const

export const MODES = ['standard', 'enhanced'] as const

export type Mode = (typeof MODES)[number]
