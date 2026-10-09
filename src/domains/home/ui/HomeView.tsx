import Box from '@mui/material/Box'

import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/core/seo'
import { PageContainer } from '@/core/ui/layouts'
import { Carousel } from '@/features/carousel'

import { BlogSection } from './BlogSection'
import { HomeHero } from './HomeHero'
import { FEATURED_SLIDES } from '../api/featuredSlides'

export const HomeView = () => (
  <>
    <HomeHero />
    <PageContainer>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 8, py: 2 }}>
        <Carousel title="À la une" slides={FEATURED_SLIDES} data-testid="home-carousel" />
        <BlogSection />
      </Box>
    </PageContainer>
    <JsonLd data={organizationJsonLd()} />
    <JsonLd data={websiteJsonLd()} />
  </>
)
