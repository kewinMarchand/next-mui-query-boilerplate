export interface NavigationItem {
  href: string
  label: string
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { href: '/', label: 'Accueil' },
  { href: '/taches', label: 'Tâches' },
  { href: '/contact', label: 'Contact' },
]
