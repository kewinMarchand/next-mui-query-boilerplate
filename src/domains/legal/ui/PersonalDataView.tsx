import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { SITE } from '@/core/config'
import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'

import { LegalSection } from './LegalSection'

const { publisher } = SITE

export const PersonalDataView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/donnees-personnelles')}>
    <Typography variant="h1" gutterBottom>
      Données personnelles
    </Typography>

    <LegalSection title="Responsable de traitement">
      <Typography>
        {publisher.legalName}, {publisher.address}.
      </Typography>
    </LegalSection>

    <LegalSection title="Finalité et base légale">
      <Typography>
        Le formulaire de contact collecte votre nom, votre adresse e-mail et votre message, dans le
        seul but de vous répondre. Ce traitement repose sur votre consentement, exprimé par l'envoi
        du formulaire.
      </Typography>
    </LegalSection>

    <LegalSection title="Durée de conservation">
      <Typography>
        Les messages sont conservés trois ans à compter du dernier échange, puis supprimés.
      </Typography>
    </LegalSection>

    <LegalSection title="Vos droits">
      <Typography>Vous disposez sur vos données des droits suivants :</Typography>
      <ul>
        <li>accès ;</li>
        <li>rectification ;</li>
        <li>effacement ;</li>
        <li>opposition.</li>
      </ul>
      <Typography>
        Pour les exercer, écrivez à{' '}
        <MuiLink href={`mailto:${publisher.email}`} underline="always">
          {publisher.email}
        </MuiLink>
        . Si la réponse ne vous satisfait pas, vous pouvez adresser une réclamation à la{' '}
        <MuiLink href="https://www.cnil.fr/fr/plaintes" underline="always">
          Commission nationale de l'informatique et des libertés (CNIL)
        </MuiLink>
        .
      </Typography>
    </LegalSection>

    <LegalSection title="Cookies et stockage local">
      <Typography>
        Ce site ne dépose aucun cookie de mesure d'audience. Seule votre préférence pour le mode
        accessibilité renforcée est enregistrée dans votre navigateur, sans jamais nous être
        transmise.
      </Typography>
    </LegalSection>
  </PageContainer>
)
