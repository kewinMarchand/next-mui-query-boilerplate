import type { Catalog } from '../domain/catalog'

export const CATEGORY_TREE: Catalog.Category[] = [
  {
    slug: 'plantes-interieur',
    name: 'Plantes d’intérieur',
    children: [
      {
        slug: 'feuillages',
        name: 'Feuillages',
        children: [
          { slug: 'monstera', name: 'Monstera' },
          { slug: 'fougeres', name: 'Fougères' },
        ],
      },
      {
        slug: 'plantes-a-fleurs',
        name: 'Plantes à fleurs',
        children: [
          { slug: 'anthurium', name: 'Anthurium' },
          { slug: 'strelitzia', name: 'Strelitzia' },
        ],
      },
    ],
  },
  {
    slug: 'plantes-exterieur',
    name: 'Plantes d’extérieur',
    children: [
      { slug: 'palmiers', name: 'Palmiers' },
      {
        slug: 'arbustes-a-fleurs',
        name: 'Arbustes à fleurs',
        children: [
          { slug: 'heliconia', name: 'Heliconia' },
          { slug: 'calliandra', name: 'Calliandra' },
        ],
      },
    ],
  },
  {
    slug: 'plantes-aquatiques',
    name: 'Plantes aquatiques',
    children: [{ slug: 'nenuphars', name: 'Nénuphars' }],
  },
]
