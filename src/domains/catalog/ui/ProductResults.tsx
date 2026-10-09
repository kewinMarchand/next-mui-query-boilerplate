import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

import { Link } from '@/core/ui/ui-kit'

import { ProductCard } from './ProductCard'
import { TitleFocusLink } from './TitleFocusLink'

import type { Catalog } from '../common/models/catalog'

interface ProductResultsProps {
  status: 'pending' | 'error' | 'success'
  products: Catalog.Product[] | undefined
  view: Catalog.View
  errorMessage?: string
  retryHref?: string
  clearHref?: string
}

const PRIORITY_COUNT = 4

const listSx = (view: Catalog.View) =>
  ({
    display: 'grid',
    gap: 2,
    listStyle: 'none',
    m: 0,
    p: 0,
    gridTemplateColumns:
      view === 'liste' ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
  }) as const

export const ProductResults = ({
  status,
  products,
  view,
  errorMessage,
  retryHref = '',
  clearHref = '',
}: ProductResultsProps) => {
  if (status === 'pending') {
    return (
      <Box role="status" aria-label="Chargement des produits" aria-busy="true" sx={listSx(view)}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Skeleton key={key} variant="rounded" height={320} />
        ))}
      </Box>
    )
  }

  if (status === 'error') {
    return (
      <Alert
        severity="error"
        data-testid="catalog-error"
        action={
          <Button component={Link} href={retryHref} color="inherit" data-testid="catalog-retry">
            Réessayer
          </Button>
        }
      >
        {errorMessage}
      </Alert>
    )
  }

  if (!products?.length) {
    return (
      <Alert severity="info" data-testid="catalog-empty">
        Aucun produit ne correspond à ces filtres.{' '}
        <TitleFocusLink href={clearHref} data-testid="catalog-clear-filters">
          Tout effacer
        </TitleFocusLink>
      </Alert>
    )
  }

  return (
    <Box component="ul" sx={listSx(view)}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} position={index + 1} isPriority={index < PRIORITY_COUNT} />
        </li>
      ))}
    </Box>
  )
}
