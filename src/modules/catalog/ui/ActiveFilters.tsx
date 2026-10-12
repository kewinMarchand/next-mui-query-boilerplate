import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import { Icon, Link } from '@/shared/ui/kit'

import { EXPOSURE_LABELS, sizeLabel } from './labels'
import { TitleFocusLink } from './TitleFocusLink'
import { catalogHref, clearFilters, isFiltered, withFilter } from '../domain/catalogQuery'

import type { Catalog } from '../domain/catalog'

interface ActiveFiltersProps {
  path: string
  query: Catalog.Query
}

const activeFilters = (query: Catalog.Query) => [
  ...query.exposures.map((value) => ({
    label: EXPOSURE_LABELS[value],
    next: withFilter(query, { exposures: query.exposures.filter((item) => item !== value) }),
  })),
  ...query.sizes.map((value) => ({
    label: sizeLabel(value),
    next: withFilter(query, { sizes: query.sizes.filter((item) => item !== value) }),
  })),
  ...(query.priceMin !== null
    ? [{ label: `Dès ${query.priceMin} €`, next: withFilter(query, { priceMin: null }) }]
    : []),
  ...(query.priceMax !== null
    ? [{ label: `Jusqu'à ${query.priceMax} €`, next: withFilter(query, { priceMax: null }) }]
    : []),
  ...(query.inStock ? [{ label: 'En stock', next: withFilter(query, { inStock: false }) }] : []),
]

export const ActiveFilters = ({ path, query }: ActiveFiltersProps) => {
  if (!isFiltered(query)) return null

  return (
    <Box
      data-testid="catalog-active-filters"
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}
    >
      <Box
        component="ul"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, p: 0 }}
      >
        {activeFilters(query).map((filter) => (
          <li key={filter.label}>
            <Chip
              component={Link}
              href={catalogHref(path, filter.next)}
              scroll={false}
              clickable
              label={filter.label}
              icon={<Icon name="x" size={16} />}
              aria-label={`Retirer le filtre : ${filter.label}`}
              data-testid="catalog-active-filter"
              sx={{ minHeight: 44, borderRadius: 22 }}
            />
          </li>
        ))}
      </Box>
      <TitleFocusLink
        href={catalogHref(path, clearFilters(query))}
        data-testid="catalog-clear-filters"
        sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
      >
        Tout effacer
      </TitleFocusLink>
    </Box>
  )
}
