'use client'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useId } from 'react'

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
  const selectId = useId()
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
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel htmlFor={selectId} shrink>
          Trier par
        </InputLabel>
        <NativeSelect
          id={selectId}
          name="tri"
          value={navigation.query.sort}
          onChange={(event) => {
            if (isSort(event.target.value)) {
              navigation.apply(withFilters(query, { sort: event.target.value }))
            }
          }}
          input={
            <OutlinedInput
              label="Trier par"
              notched
              inputProps={{ 'data-testid': 'catalog-sort' }}
            />
          }
        >
          {SORTS.map((sort) => (
            <option key={sort} value={sort}>
              {SORT_LABELS[sort]}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      {!isHydrated && (
        <Button type="submit" variant="outlined">
          Trier
        </Button>
      )}
    </Stack>
  )
}
