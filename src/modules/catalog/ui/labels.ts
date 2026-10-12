import type { Catalog } from '../domain/catalog'

export const EXPOSURE_LABELS: Record<Catalog.Exposure, string> = {
  soleil: 'Soleil',
  'mi-ombre': 'Mi-ombre',
  ombre: 'Ombre',
}

export const sizeLabel = (size: Catalog.Size) => `Taille ${size}`

export const SORT_LABELS: Record<Catalog.Sort, string> = {
  pertinence: 'Pertinence',
  'prix-asc': 'Prix croissant',
  'prix-desc': 'Prix décroissant',
  nom: 'Nom',
}
