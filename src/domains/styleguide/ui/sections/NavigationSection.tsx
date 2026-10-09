import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MuiLink from '@mui/material/Link'
import Stack from '@mui/material/Stack'

import { Breadcrumb, buildBreadcrumb } from '@/core/ui/layouts'
import { Icon, Link } from '@/core/ui/ui-kit'
import { CatalogPagination } from '@/domains/catalog'

import { StyleguideSection } from '../StyleguideSection'

const QUERY = {
  exposures: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  inStock: false,
  sort: 'pertinence',
  view: 'grille',
  page: 5,
} as const

export const NavigationSection = () => (
  <StyleguideSection title="Navigation">
    <Breadcrumb
      items={buildBreadcrumb('/catalogue', [
        { label: 'Plantes aquatiques', href: '/catalogue/plantes-aquatiques' },
      ])}
      withJsonLd={false}
    />
    <CatalogPagination
      path="/catalogue"
      query={{ ...QUERY, exposures: [], sizes: [] }}
      page={5}
      pageCount={10}
    />
    <Box component="ul" sx={{ display: 'flex', gap: 1, listStyle: 'none', p: 0, my: 3 }}>
      <li>
        <Chip
          label="Mi-ombre"
          icon={<Icon name="x" size={16} />}
          aria-label="Retirer le filtre : Mi-ombre"
          clickable
        />
      </li>
      <li>
        <Chip
          label="Taille M"
          icon={<Icon name="x" size={16} />}
          aria-label="Retirer le filtre : Taille M"
          clickable
        />
      </li>
    </Box>
    <Stack direction="row" sx={{ gap: 3, flexWrap: 'wrap' }}>
      <MuiLink component={Link} href="/" underline="always">
        Lien interne
      </MuiLink>
      <MuiLink href="https://www.w3.org/WAI/standards-guidelines/wcag/fr" underline="always">
        Lien externe : les WCAG sur le site du W3C
      </MuiLink>
    </Stack>
  </StyleguideSection>
)
