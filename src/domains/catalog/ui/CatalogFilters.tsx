'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useId, useState } from 'react'

import { useHydrated } from '@/core/ui/hooks/useHydrated'
import { Icon } from '@/core/ui/ui-kit'

import { FiltersForm } from './FiltersForm'
import { useCatalogNavigation } from './hooks/useCatalogNavigation'
import { countActiveFilters } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface CatalogFiltersProps {
  path: string
  query: Catalog.Query
  facets: Catalog.Facets
  subcategories: Catalog.CategoryLink[]
  total: number
}

export const CatalogFilters = ({
  path,
  query,
  facets,
  subcategories,
  total,
}: CatalogFiltersProps) => {
  const isHydrated = useHydrated()
  const titleId = useId()
  const drawerId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useCatalogNavigation(path, query)
  const activeCount = countActiveFilters(navigation.query)

  const form = (
    <FiltersForm
      path={path}
      query={navigation.query}
      facets={facets}
      subcategories={subcategories}
      isHydrated={isHydrated}
      onApply={navigation.apply}
    />
  )

  const filterLabel = `Filtrer${activeCount > 0 ? ` (${activeCount} actif${activeCount > 1 ? 's' : ''})` : ''}`

  return (
    <>
      {!isHydrated && (
        <Box component="details" sx={{ display: { md: 'none' } }}>
          <Box
            component="summary"
            data-testid="catalog-filters-summary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minHeight: 44,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <Icon name="sliders-horizontal" />
            {filterLabel}
          </Box>
          {form}
        </Box>
      )}
      {isHydrated && (
        <Button
          variant="outlined"
          startIcon={<Icon name="sliders-horizontal" />}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={drawerId}
          onClick={() => setIsOpen(true)}
          data-testid="catalog-filters-open"
          sx={{ display: { md: 'none' } }}
        >
          {filterLabel}
        </Button>
      )}

      {!isOpen && (
        <Box
          component="aside"
          aria-labelledby={titleId}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Typography
            variant="h2"
            id={titleId}
            sx={{ fontSize: 'calc(20px * var(--font-scale, 1))' }}
          >
            Filtres
          </Typography>
          {form}
        </Box>
      )}

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{
          paper: {
            id: drawerId,
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': `${drawerId}-title`,
            sx: { width: 'min(360px, 90vw)', p: 2 },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="h2"
            id={`${drawerId}-title`}
            sx={{ flexGrow: 1, fontSize: 'calc(20px * var(--font-scale, 1))' }}
          >
            Filtres
          </Typography>
          <IconButton
            aria-label="Fermer les filtres"
            onClick={() => setIsOpen(false)}
            sx={{ width: 48, height: 48 }}
          >
            <Icon name="x" />
          </IconButton>
        </Box>
        {form}
        <Button variant="contained" fullWidth onClick={() => setIsOpen(false)} sx={{ mt: 2 }}>
          Voir les {total} produits
        </Button>
      </Drawer>
    </>
  )
}
