import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/shared/seo'
import { Carousel } from '@/shared/ui/carousel'
import { PageContainer } from '@/shared/ui/layout'

import { BlogSection } from '@/modules/blog'

import { FEATURED_SLIDES } from './featuredSlides'
import { HomeHero } from './HomeHero'
import styles from './HomeView.module.css'

export const HomeView = () => (
  <>
    <HomeHero />
    <PageContainer>
      <div className={styles.sections}>
        <Carousel title="À la une" slides={FEATURED_SLIDES} data-testid="home-carousel" />
        <BlogSection />
      </div>
    </PageContainer>
    <JsonLd data={organizationJsonLd()} />
    <JsonLd data={websiteJsonLd()} />
  </>
)
