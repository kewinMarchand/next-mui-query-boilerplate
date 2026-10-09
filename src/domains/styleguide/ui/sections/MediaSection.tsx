import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Picture } from '@/core/ui/ui-kit'
import { ProductCard } from '@/domains/catalog'
import { BlogGrid } from '@/domains/home'

import { StyleguideSection } from '../StyleguideSection'

const PRODUCT = {
  id: 'exemple',
  slug: 'exemple',
  name: 'Heliconia rostrata',
  categorySlug: 'heliconia',
  price: 3290,
  exposure: 'soleil',
  size: 'M',
  inStock: false,
  image: 1,
} as const

const ARTICLE = {
  id: 'exemple',
  title: 'Carte de blog',
  excerpt: 'Illustration, titre, extrait et date lisible par les machines.',
  publishedAt: '2026-10-01',
  image: '/images/blog-1',
}

export const MediaSection = () => (
  <StyleguideSection title="Médias et cartes">
    <BlogGrid status="success" articles={[ARTICLE]} />
    <Box
      sx={{ display: 'grid', gap: 2, mt: 3, gridTemplateColumns: { xs: '1fr', md: '280px 1fr' } }}
    >
      <ProductCard product={PRODUCT} position={1} isPriority={false} />
      <ProductCard product={PRODUCT} position={2} isPriority={false} />
    </Box>
    <Typography variant="body2" sx={{ mt: 1 }}>
      La même carte produit en grille (colonne étroite) et en liste (colonne large), via une requête
      de conteneur.
    </Typography>
    <Box sx={{ mt: 3, maxWidth: 480 }}>
      <Picture
        src="/images/slide-2"
        widths={[640, 1280]}
        width={1280}
        height={720}
        alt=""
        sizes="480px"
        style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', borderRadius: 8 }}
      />
      <Typography variant="body2">Image au ratio 16:9, dimensions posées.</Typography>
    </Box>
  </StyleguideSection>
)
