import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'

import { CATALOG_PATH, categoryHref } from '@/shared/config'
import { itemListJsonLd, JsonLd } from '@/shared/seo'
import { Link, PicturePreload } from '@/shared/ui/kit'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import { ActiveFilters } from './ActiveFilters'
import { CatalogFilters } from './CatalogFilters'
import { CatalogPagination } from './CatalogPagination'
import { CatalogTitle } from './CatalogTitle'
import { CatalogTransitionProvider, PendingResults } from './CatalogTransition'
import { productImage } from './ProductCard'
import { ProductResults } from './ProductResults'
import { SortSelect } from './SortSelect'
import { ViewToggle } from './ViewToggle'
import { catalogHref, clearFilters } from '../domain/catalogQuery'
import { resolveCategoryPath, trailHrefs } from '../domain/categories'
import { parseCatalogQuery } from '../domain/parseCatalogQuery'
import { CatalogLoadError } from '../infrastructure/CatalogLoadError'
import { findCatalogPage } from '../infrastructure/catalogRepository'

import type { SearchParams } from '../domain/catalogQuery'

interface CatalogViewProps {
  slugs: string[]
  searchParams: SearchParams
}

const productCount = (count: number) => `${count} produit${count > 1 ? 's' : ''}`

export const CatalogView = async ({ slugs, searchParams }: CatalogViewProps) => {
  const match = resolveCategoryPath(slugs)
  if (!match) notFound()

  const query = parseCatalogQuery(searchParams)
  const path = categoryHref(slugs)
  const title = match.current?.name ?? 'Catalogue'
  const page = await findCatalogPage(slugs, query).catch((error: unknown) => {
    console.error(error)
    return null
  })
  const href = catalogHref(path, query)

  const firstProduct = page?.products[0]

  return (
    <>
      {firstProduct && <PicturePreload {...productImage(firstProduct)} />}
      <PageContainer breadcrumb={buildBreadcrumb(CATALOG_PATH, trailHrefs(match.trail))}>
        <CatalogTitle title={title} focusKey={href} />
        {match.children.length > 0 && (
          <Box
            component="ul"
            aria-label="Sous-catégories"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, mb: 3, p: 0 }}
          >
            {match.children.map((child) => (
              <li key={child.slug}>
                <Chip
                  component={Link}
                  href={categoryHref([...slugs, child.slug])}
                  clickable
                  label={child.name}
                  variant="outlined"
                  sx={{ minHeight: 44, borderRadius: 22 }}
                />
              </li>
            ))}
          </Box>
        )}

        <CatalogTransitionProvider>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 2, md: 6 },
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '280px minmax(0, 1fr)' },
              alignItems: 'start',
            }}
          >
            <div>
              {page && (
                <CatalogFilters
                  path={path}
                  query={query}
                  facets={page.facets}
                  subcategories={page.subcategories}
                  total={page.total}
                />
              )}
            </div>
            <div>
              <ActiveFilters path={path} query={query} />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  role="status"
                  sx={{ fontWeight: 600 }}
                  data-testid="catalog-results-count"
                >
                  {page ? productCount(page.total) : ''}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                  <SortSelect path={path} query={query} />
                  <ViewToggle path={path} query={query} />
                </Box>
              </Box>
              {page ? (
                <>
                  <PendingResults view={query.view}>
                    <ProductResults
                      status="success"
                      products={page.products}
                      view={query.view}
                      clearHref={catalogHref(path, clearFilters(query))}
                    />
                  </PendingResults>
                  <CatalogPagination
                    path={path}
                    query={query}
                    page={page.page}
                    pageCount={page.pageCount}
                  />
                  <JsonLd
                    data={itemListJsonLd(
                      path,
                      page.products.map((product) => product.name),
                    )}
                  />
                </>
              ) : (
                <ProductResults
                  status="error"
                  products={undefined}
                  view={query.view}
                  errorMessage={new CatalogLoadError().message}
                  retryHref={href}
                />
              )}
            </div>
          </Box>
        </CatalogTransitionProvider>
      </PageContainer>
    </>
  )
}
