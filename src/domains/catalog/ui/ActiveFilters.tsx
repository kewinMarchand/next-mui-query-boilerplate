import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import { Icon, Link } from '@/core/ui/ui-kit'

import { TitleFocusLink } from './TitleFocusLink'
import { EXPOSURE_LABELS } from '../common/models/catalog'
import {
  catalogHref,
  clearFilters,
  isFilteredOrSorted,
  withFilters,
} from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface ActiveFiltersProps {
  path: string
  query: Catalog.Query
}

const activeFilters = (query: Catalog.Query) => [
  ...query.exposures.map((value) => ({
    label: EXPOSURE_LABELS[value],
    next: withFilters(query, { exposures: query.exposures.filter((item) => item !== value) }),
  })),
  ...query.sizes.map((value) => ({
    label: `Taille ${value}`,
    next: withFilters(query, { sizes: query.sizes.filter((item) => item !== value) }),
  })),
  ...(query.priceMin !== null
    ? [{ label: `Dès ${query.priceMin} €`, next: withFilters(query, { priceMin: null }) }]
    : []),
  ...(query.priceMax !== null
    ? [{ label: `Jusqu'à ${query.priceMax} €`, next: withFilters(query, { priceMax: null }) }]
    : []),
  ...(query.inStock ? [{ label: 'En stock', next: withFilters(query, { inStock: false }) }] : []),
]

export const ActiveFilters = ({ path, query }: ActiveFiltersProps) => {
  if (!isFilteredOrSorted(query)) return null

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
