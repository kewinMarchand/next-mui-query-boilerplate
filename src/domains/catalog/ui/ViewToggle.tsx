import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { Icon, Link } from '@/core/ui/ui-kit'

import { catalogHref } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface ViewToggleProps {
  path: string
  query: Catalog.Query
}

const OPTIONS = [
  { view: 'grille', label: 'Grille', icon: 'layout-grid', testId: 'catalog-view-grid' },
  { view: 'liste', label: 'Liste', icon: 'list', testId: 'catalog-view-list' },
] as const

export const ViewToggle = ({ path, query }: ViewToggleProps) => (
  <Box component="nav" aria-label="Affichage">
    <Box component="ul" sx={{ display: 'flex', gap: 1, listStyle: 'none', m: 0, p: 0 }}>
      {OPTIONS.map((option) => {
        const isActive = query.view === option.view
        return (
          <li key={option.view}>
            <Button
              component={Link}
              href={catalogHref(path, { ...query, view: option.view })}
              scroll={false}
              variant={isActive ? 'contained' : 'outlined'}
              aria-current={isActive ? 'page' : undefined}
              startIcon={<Icon name={option.icon} />}
              data-testid={option.testId}
            >
              {option.label}
            </Button>
          </li>
        )
      })}
    </Box>
  </Box>
)
