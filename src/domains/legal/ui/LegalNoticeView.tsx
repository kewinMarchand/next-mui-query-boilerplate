import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'
import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'

import { LegalSection } from './LegalSection'

const { publisher } = SITE

export const LegalNoticeView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/mentions-legales')}>
    <Typography variant="h1" gutterBottom>
      Mentions légales
    </Typography>
    <Typography>
      Les informations ci-dessous sont des valeurs d'exemple, fictives, à remplacer dans
      <code> src/core/config/site.ts</code>.
    </Typography>

    <LegalSection title="Éditeur">
      <Typography>
        {publisher.legalName}, {publisher.address}. SIRET : {publisher.siret}.
      </Typography>
      <Typography>
        Contact :{' '}
        <MuiLink href={`mailto:${publisher.email}`} underline="always">
          {publisher.email}
        </MuiLink>
      </Typography>
    </LegalSection>

    <LegalSection title="Directeur de la publication">
      <Typography>{publisher.publicationDirector}</Typography>
    </LegalSection>

    <LegalSection title="Hébergeur">
      <Typography>
        {publisher.host.name}, {publisher.host.address}.
      </Typography>
    </LegalSection>

    <LegalSection title="Propriété intellectuelle">
      <Typography>
        L'ensemble des contenus de ce site (textes, images, code) est la propriété de{' '}
        {publisher.legalName}, sauf mention contraire. Toute reproduction sans autorisation écrite
        préalable est interdite.
      </Typography>
    </LegalSection>
  </PageContainer>
)
