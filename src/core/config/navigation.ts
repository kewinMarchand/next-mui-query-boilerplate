import { CATALOG_PATH, CATEGORY_ENTRIES } from './categories'

export interface NavigationItem {
  href: string
  label: string
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { href: '/', label: 'Accueil' },
  { href: CATALOG_PATH, label: 'Catalogue' },
  { href: '/taches', label: 'Tâches' },
  { href: '/contact', label: 'Contact' },
]

export const LEGAL_NAVIGATION: NavigationItem[] = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/donnees-personnelles', label: 'Données personnelles' },
  { href: '/accessibilite', label: 'Déclaration d’accessibilité' },
  { href: '/plan-du-site', label: 'Plan du site' },
]

export const SITE_MAP: NavigationItem[] = [...MAIN_NAVIGATION, ...LEGAL_NAVIGATION]

export const SITEMAP_ENTRIES: NavigationItem[] = [
  ...SITE_MAP,
  ...CATEGORY_ENTRIES.map(({ href, label }) => ({ href, label })),
]
