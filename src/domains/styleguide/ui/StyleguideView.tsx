import Typography from '@mui/material/Typography'

import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'

import { ButtonsSection } from './sections/ButtonsSection'
import { ColorsSection } from './sections/ColorsSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { FormsSection } from './sections/FormsSection'
import { IconsLogoSection } from './sections/IconsLogoSection'
import { MediaSection } from './sections/MediaSection'
import { NavigationSection } from './sections/NavigationSection'
import { SpacingSection } from './sections/SpacingSection'
import { TypographySection } from './sections/TypographySection'

export const StyleguideView = () => (
  <PageContainer
    breadcrumb={buildBreadcrumb('/', [{ label: 'Charte graphique', href: '/charte-graphique' }])}
  >
    <Typography variant="h1" gutterBottom>
      Charte graphique
    </Typography>
    <Typography>
      Page de développement : composants et jetons réels du projet. Le bouton « Accessibilité
      renforcée » de l'en-tête permet de comparer les deux modes.
    </Typography>
    <ColorsSection />
    <TypographySection />
    <SpacingSection />
    <ButtonsSection />
    <FormsSection />
    <FeedbackSection />
    <NavigationSection />
    <MediaSection />
    <IconsLogoSection />
  </PageContainer>
)
