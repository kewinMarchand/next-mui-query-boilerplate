import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import { Picture } from '@/core/ui/ui-kit'

import { EXPOSURE_LABELS, formatPrice } from '../common/models/catalog'

import type { Catalog } from '../common/models/catalog'

interface ProductCardProps {
  product: Catalog.Product
  position: number
  isPriority: boolean
}

export const ProductCard = ({ product, position, isPriority }: ProductCardProps) => (
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
        '@container (min-width: 520px)': { gridTemplateColumns: '200px 1fr', alignItems: 'center' },
      }}
    >
      <Picture
        src={`/images/products/product-${product.image}`}
        widths={[400, 800]}
        width={800}
        height={800}
        alt={product.name}
        isPriority={position === 1}
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={position === 1 ? 'high' : 'low'}
        sizes="(min-width: 1024px) 300px, (min-width: 600px) 50vw, 100vw"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
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
