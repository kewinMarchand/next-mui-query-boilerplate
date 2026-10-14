import Box from '@mui/material/Box'

import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/shared/seo'
import { Carousel } from '@/shared/ui/carousel'
import { PageContainer } from '@/shared/ui/layout'

import { BlogSection } from '@/modules/blog'

import { FEATURED_SLIDES } from './featuredSlides'
import { HomeHero } from './HomeHero'

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
