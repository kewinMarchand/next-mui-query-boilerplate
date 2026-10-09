'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MuiLink from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useId } from 'react'

import { Link, VISUALLY_HIDDEN } from '@/core/ui/ui-kit'

import { QueryHiddenFields } from './QueryHiddenFields'
import { withFilters } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'
import type { FocusEvent, FormEvent, ReactNode } from 'react'

interface FiltersFormProps {
  path: string
  query: Catalog.Query
  facets: Catalog.Facets
  subcategories: Catalog.CategoryLink[]
  isHydrated: boolean
  onApply: (next: Catalog.Query) => void
}

// `as object` : le type de `slotProps.input` des Checkbox et Switch MUI n'accepte pas les attributs data-*.
const FILTER_KEYS = ['exposition', 'taille', 'prix_min', 'prix_max', 'en_stock', 'page']

const toggle = <T,>(values: T[], value: T) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

const parsePrice = (raw: string) => {
  const value = Number.parseInt(raw, 10)
  return Number.isNaN(value) || value < 0 ? null : value
}

const FacetGroup = ({ legend, children }: { legend: string; children: ReactNode }) => (
  <Box component="details" open sx={{ borderBottom: 1, borderColor: 'divider', py: 1 }}>
    <Box
      component="summary"
      sx={{
        cursor: 'pointer',
        minHeight: 44,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
      }}
    >
      {legend}
    </Box>
    <Box component="fieldset" sx={{ border: 0, m: 0, p: 0 }}>
      <Box component="legend" sx={VISUALLY_HIDDEN}>
        {legend}
      </Box>
      {children}
    </Box>
  </Box>
)

interface PriceFieldProps {
  label: string
  name: string
  defaultValue: number | null
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
  testId: string
}

// FormControl + OutlinedInput plutôt que TextField : TextField embarque Select, Menu et Popover.
const PriceField = ({ label, name, defaultValue, onBlur, testId }: PriceFieldProps) => {
  const id = useId()
  return (
    <FormControl size="small">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        name={name}
        type="number"
        defaultValue={defaultValue ?? ''}
        onBlur={onBlur}
        inputProps={{ min: 0, inputMode: 'numeric', 'data-testid': testId }}
      />
    </FormControl>
  )
}

export const FiltersForm = ({
  path,
  query,
  facets,
  subcategories,
  isHydrated,
  onApply,
}: FiltersFormProps) => {
  const applyPrice = (key: 'priceMin' | 'priceMax') => (event: FocusEvent<HTMLInputElement>) => {
    const value = parsePrice(event.target.value)
    if (value !== query[key]) onApply(withFilters(query, { [key]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isHydrated) return
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onApply(
      withFilters(query, {
        priceMin: parsePrice(String(data.get('prix_min') ?? '')),
        priceMax: parsePrice(String(data.get('prix_max') ?? '')),
      }),
    )
  }

  return (
    <form method="get" action={path} onSubmit={onSubmit} data-testid="catalog-filters">
      <QueryHiddenFields query={query} omit={FILTER_KEYS} />

      {subcategories.length > 0 && (
        <FacetGroup legend="Catégorie">
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {subcategories.map((category) => (
              <li key={category.href}>
                <MuiLink
                  component={Link}
                  href={category.href}
                  sx={{ display: 'flex', alignItems: 'center', minHeight: 44 }}
                >
                  {category.name} ({category.count})
                </MuiLink>
              </li>
            ))}
          </Box>
        </FacetGroup>
      )}

      <FacetGroup legend="Exposition">
        {facets.exposure.map((facet) => {
          const checked = query.exposures.includes(facet.value)
          return (
            <FormControlLabel
              key={facet.value}
              sx={{ display: 'flex', minHeight: 44 }}
              label={`${facet.label} (${facet.count})`}
              disabled={facet.count === 0 && !checked}
              control={
                <Checkbox
                  name="exposition"
                  value={facet.value}
                  checked={checked}
                  onChange={() =>
                    onApply(withFilters(query, { exposures: toggle(query.exposures, facet.value) }))
                  }
                  slotProps={{
                    input: { 'data-testid': `catalog-filter-exposure-${facet.value}` } as object,
                  }}
                />
              }
            />
          )
        })}
      </FacetGroup>

      <FacetGroup legend="Taille">
        {facets.size.map((facet) => {
          const checked = query.sizes.includes(facet.value)
          return (
            <FormControlLabel
              key={facet.value}
              sx={{ display: 'flex', minHeight: 44 }}
              label={`${facet.label} (${facet.count})`}
              disabled={facet.count === 0 && !checked}
              control={
                <Checkbox
                  name="taille"
                  value={facet.value}
                  checked={checked}
                  onChange={() =>
                    onApply(withFilters(query, { sizes: toggle(query.sizes, facet.value) }))
                  }
                  slotProps={{
                    input: { 'data-testid': `catalog-filter-size-${facet.value}` } as object,
                  }}
                />
              }
            />
          )
        })}
      </FacetGroup>

      <FacetGroup legend="Prix (en euros)">
        <Box
          key={`${query.priceMin}-${query.priceMax}`}
          sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, py: 1 }}
        >
          <PriceField
            label="Minimum"
            name="prix_min"
            defaultValue={query.priceMin}
            onBlur={applyPrice('priceMin')}
            testId="catalog-filter-price-min"
          />
          <PriceField
            label="Maximum"
            name="prix_max"
            defaultValue={query.priceMax}
            onBlur={applyPrice('priceMax')}
            testId="catalog-filter-price-max"
          />
        </Box>
      </FacetGroup>

      <FacetGroup legend="Disponibilité">
        <FormControlLabel
          sx={{ display: 'flex', minHeight: 44 }}
          label="En stock uniquement"
          control={
            <Switch
              name="en_stock"
              value="1"
              checked={query.inStock}
              onChange={() => onApply(withFilters(query, { inStock: !query.inStock }))}
              slotProps={{
                input: {
                  role: 'switch',
                  'aria-checked': query.inStock,
                  'data-testid': 'catalog-filter-in-stock',
                } as object,
              }}
            />
          }
        />
      </FacetGroup>

      <Button
        type="submit"
        data-testid="catalog-filters-submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, display: isHydrated ? 'none' : undefined }}
      >
        Appliquer les filtres
      </Button>
      {isHydrated && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Les filtres s'appliquent dès qu'ils changent.
        </Typography>
      )}
    </form>
  )
}
