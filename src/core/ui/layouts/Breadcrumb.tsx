import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'

import { breadcrumbJsonLd, JsonLd } from '@/core/seo'
import { Link } from '@/core/ui/ui-kit'

import type { BreadcrumbItem } from '@/core/seo'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  withJsonLd?: boolean
}

export const Breadcrumb = ({ items, withJsonLd = true }: BreadcrumbProps) => (
  <Box component="nav" aria-label="Fil d'Ariane" data-testid="layout-breadcrumb" sx={{ mb: 2 }}>
    <Box
      component="ol"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        listStyle: 'none',
        m: 0,
        p: 0,
        typography: 'body2',
        '& li + li::before': { content: '"›" / ""', mx: 1, color: 'text.secondary' },
      }}
    >
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <li key={item.href} aria-current="page">
            {item.label}
          </li>
        ) : (
          <li key={item.href}>
            <MuiLink
              component={Link}
              href={item.href}
              sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
            >
              {item.label}
            </MuiLink>
          </li>
        ),
      )}
    </Box>
    {withJsonLd && <JsonLd data={breadcrumbJsonLd(items)} />}
  </Box>
)
