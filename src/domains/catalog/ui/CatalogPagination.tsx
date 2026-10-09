import Box from '@mui/material/Box'

import { VISUALLY_HIDDEN } from '@/core/ui/ui-kit'

import { TitleFocusLink } from './TitleFocusLink'
import { paginationWindow } from '../common/models/catalogFilters'
import { catalogHref } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface CatalogPaginationProps {
  path: string
  query: Catalog.Query
  page: number
  pageCount: number
}

const ITEM_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 44,
  minHeight: 44,
  px: 1,
  borderRadius: 1,
} as const

export const CatalogPagination = ({ path, query, page, pageCount }: CatalogPaginationProps) => {
  if (pageCount <= 1) return null

  const hrefOf = (target: number) => catalogHref(path, { ...query, page: target })
  const previous = page > 1 ? hrefOf(page - 1) : null
  const next = page < pageCount ? hrefOf(page + 1) : null

  return (
    <Box component="nav" aria-label="Pagination" data-testid="catalog-pagination" sx={{ mt: 4 }}>
      {previous && <link rel="prev" href={previous} />}
      {next && <link rel="next" href={next} />}
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 0.5,
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        <li>
          {previous ? (
            <TitleFocusLink href={previous} rel="prev" sx={ITEM_SX}>
              Précédent
            </TitleFocusLink>
          ) : (
            <Box component="span" sx={{ ...ITEM_SX, color: 'text.secondary' }}>
              Précédent
            </Box>
          )}
        </li>
        {paginationWindow(page, pageCount).map((entry, index) => (
          <li key={entry === 'ellipsis' ? `ellipsis-${index}` : entry}>
            {entry === 'ellipsis' ? (
              <Box component="span" aria-hidden="true" sx={ITEM_SX}>
                …
              </Box>
            ) : entry === page ? (
              <Box
                component="span"
                aria-current="page"
                sx={{
                  ...ITEM_SX,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                }}
              >
                <Box component="span" sx={VISUALLY_HIDDEN}>
                  Page{' '}
                </Box>
                {entry}
              </Box>
            ) : (
              <TitleFocusLink href={hrefOf(entry)} aria-label={`Page ${entry}`} sx={ITEM_SX}>
                {entry}
              </TitleFocusLink>
            )}
          </li>
        ))}
        <li>
          {next ? (
            <TitleFocusLink href={next} rel="next" sx={ITEM_SX}>
              Suivant
            </TitleFocusLink>
          ) : (
            <Box component="span" sx={{ ...ITEM_SX, color: 'text.secondary' }}>
              Suivant
            </Box>
          )}
        </li>
      </Box>
    </Box>
  )
}
