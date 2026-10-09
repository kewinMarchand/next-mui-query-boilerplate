'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { useHydrated } from '@/core/ui/hooks/useHydrated'

import { useCatalogNavigation } from './hooks/useCatalogNavigation'
import { QueryHiddenFields } from './QueryHiddenFields'
import { SORT_LABELS, SORTS } from '../common/models/catalog'
import { withFilters } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface SortSelectProps {
  path: string
  query: Catalog.Query
}

const isSort = (value: string): value is Catalog.Sort => SORTS.some((sort) => sort === value)

export const SortSelect = ({ path, query }: SortSelectProps) => {
  const isHydrated = useHydrated()
  const navigation = useCatalogNavigation(path, query)

  return (
    <Stack
      component="form"
      method="get"
      action={path}
      direction="row"
      sx={{ gap: 1, alignItems: 'center' }}
    >
      <QueryHiddenFields query={query} omit={['tri', 'page']} />
      <TextField
        select
        label="Trier par"
        name="tri"
        size="small"
        value={navigation.query.sort}
        onChange={(event) => {
          if (isSort(event.target.value)) {
            navigation.apply(withFilters(query, { sort: event.target.value }))
          }
        }}
        slotProps={{ select: { native: true }, htmlInput: { 'data-testid': 'catalog-sort' } }}
        sx={{ minWidth: 200 }}
      >
        {SORTS.map((sort) => (
          <option key={sort} value={sort}>
            {SORT_LABELS[sort]}
          </option>
        ))}
      </TextField>
      {!isHydrated && (
        <Button type="submit" variant="outlined">
          Trier
        </Button>
      )}
    </Stack>
  )
}
