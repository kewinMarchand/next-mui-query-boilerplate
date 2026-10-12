export interface CategoryNode {
  slug: string
  name: string
  children?: CategoryNode[]
}

export const CATALOG_PATH = '/catalogue'

export const CATEGORY_TREE: CategoryNode[] = [
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

export const categoryHref = (slugs: string[]) =>
  slugs.length ? `${CATALOG_PATH}/${slugs.join('/')}` : CATALOG_PATH

interface CategoryEntry {
  href: string
  label: string
  slugs: string[]
}

const flatten = (nodes: CategoryNode[], parents: string[] = []): CategoryEntry[] =>
  nodes.flatMap((node) => {
    const slugs = [...parents, node.slug]
    return [
      { href: categoryHref(slugs), label: node.name, slugs },
      ...flatten(node.children ?? [], slugs),
    ]
  })

export const CATEGORY_ENTRIES: CategoryEntry[] = flatten(CATEGORY_TREE)
