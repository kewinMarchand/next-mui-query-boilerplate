import { Price } from '@/modules/catalog/domain/price'

import type { Catalog } from '@/modules/catalog/domain/catalog'

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

type Seed = [
  name: string,
  category: string,
  price: number,
  exposure: Catalog.Exposure,
  size: Catalog.Size,
  inStock: boolean,
]

const SEEDS: Seed[] = [
  ['Monstera deliciosa', 'monstera', 3490, 'mi-ombre', 'L', true],
  ['Monstera adansonii', 'monstera', 1990, 'mi-ombre', 'M', true],
  ['Monstera variegata', 'monstera', 8900, 'mi-ombre', 'S', false],
  ['Fougère de Boston', 'fougeres', 1590, 'ombre', 'M', true],
  ['Fougère nid d’oiseau', 'fougeres', 2290, 'ombre', 'S', true],
  ['Fougère arborescente', 'fougeres', 12900, 'mi-ombre', 'L', true],
  ['Anthurium rouge', 'anthurium', 2490, 'mi-ombre', 'M', true],
  ['Anthurium blanc', 'anthurium', 2690, 'mi-ombre', 'S', false],
  ['Anthurium clarinervium', 'anthurium', 4590, 'ombre', 'S', true],
  ['Strelitzia reginae', 'strelitzia', 3990, 'soleil', 'M', true],
  ['Strelitzia nicolai', 'strelitzia', 6990, 'soleil', 'L', true],
  ['Strelitzia juncea', 'strelitzia', 5490, 'soleil', 'M', false],
  ['Palmier de Chine', 'palmiers', 4990, 'soleil', 'L', true],
  ['Palmier nain', 'palmiers', 2990, 'soleil', 'S', true],
  ['Palmier bleu du Mexique', 'palmiers', 9900, 'soleil', 'L', true],
  ['Heliconia rostrata', 'heliconia', 3290, 'soleil', 'M', true],
  ['Heliconia psittacorum', 'heliconia', 2790, 'mi-ombre', 'M', true],
  ['Heliconia wagneriana', 'heliconia', 4490, 'soleil', 'L', false],
  ['Calliandra rouge', 'calliandra', 3590, 'soleil', 'M', true],
  ['Calliandra blanc', 'calliandra', 3790, 'soleil', 'S', true],
  ['Calliandra nain', 'calliandra', 2490, 'mi-ombre', 'S', true],
  ['Nénuphar blanc', 'nenuphars', 1890, 'soleil', 'S', true],
  ['Nénuphar rose', 'nenuphars', 2190, 'soleil', 'M', true],
  ['Lotus sacré', 'nenuphars', 2990, 'soleil', 'L', true],
]

const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const PRODUCTS: Catalog.Product[] = SEEDS.map(
  ([name, categorySlug, price, exposure, size, inStock], index) => ({
    id: String(index + 1),
    slug: slugify(name),
    name,
    categorySlug,
    price: Price.fromCents(price),
    exposure,
    size,
    inStock,
    image: (index % 12) + 1,
  }),
)
