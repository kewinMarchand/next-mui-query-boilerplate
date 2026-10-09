import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import { AfterHydration, Picture } from '@/core/ui/ui-kit'

import { EXPOSURE_LABELS, formatPrice } from '../common/models/catalog'

import type { Catalog } from '../common/models/catalog'

interface ProductCardProps {
  product: Catalog.Product
  position: number
  isPriority: boolean
}

export const productImage = (product: Catalog.Product) => ({
  src: `/images/products/product-${product.image}`,
  widths: [400, 800],
  sizes: '(min-width: 1024px) 300px, (min-width: 600px) 50vw, 100vw',
})

export const ProductCard = ({ product, position, isPriority }: ProductCardProps) => {
  const image = (
    <Picture
      {...productImage(product)}
      width={800}
      height={800}
      alt={product.name}
      loading={isPriority ? 'eager' : 'lazy'}
      fetchPriority={position === 1 ? 'high' : 'low'}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )

  return (
    <Card
      component="article"
      variant="outlined"
      id={`produit-${position}`}
      data-testid="catalog-product"
      sx={{ containerType: 'inline-size', height: '100%' }}
    >
      <Box
        sx={{
          display: 'grid',
          '@container (min-width: 520px)': {
            gridTemplateColumns: '200px 1fr',
            alignItems: 'center',
          },
        }}
      >
        {isPriority ? (
          image
        ) : (
          // Au-delà des premières, l'image attend l'hydratation pour laisser la bande passante à l'image LCP.
          <AfterHydration placeholder={<Box sx={{ aspectRatio: '1 / 1', bgcolor: 'grey.100' }} />}>
            {image}
          </AfterHydration>
        )}
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            {product.name}
          </Typography>
          <Typography sx={{ fontWeight: 700 }} data-testid="catalog-product-price">
            {formatPrice(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Exposition : {EXPOSURE_LABELS[product.exposure]} · Taille {product.size}
          </Typography>
          {!product.inStock && (
            <Chip label="Rupture de stock" size="small" variant="outlined" sx={{ mt: 1 }} />
          )}
        </Box>
      </Box>
    </Card>
  )
}
