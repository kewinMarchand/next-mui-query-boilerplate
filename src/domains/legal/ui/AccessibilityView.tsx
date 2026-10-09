import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { ACCESSIBILITY_COMPLIANCE, SITE } from '@/core/config'
import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'

import { LegalSection } from './LegalSection'

const { publisher, accessibility } = SITE

export const AccessibilityView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/accessibilite')}>
    <Typography variant="h1" gutterBottom>
      Déclaration d'accessibilité
    </Typography>
    <Typography>
      {publisher.legalName} s'engage à rendre ce site accessible conformément à l'article 47 de la
      loi n° 2005-102 du 11 février 2005. Cette déclaration s'applique à {SITE.name}.
    </Typography>

    <LegalSection title="État de conformité">
      <Typography data-testid="legal-compliance-status">
        Ce site est <strong>{ACCESSIBILITY_COMPLIANCE}</strong> avec le référentiel général
        d'amélioration de l'accessibilité (RGAA), version 4.1.2.
      </Typography>
      {accessibility.auditDate ? (
        <Typography>
          Audit réalisé le {accessibility.auditDate}
          {accessibility.auditor && ` par ${accessibility.auditor}`} :{' '}
          {accessibility.complianceRate} % des critères RGAA respectés.
        </Typography>
      ) : (
        <Typography>Aucun audit n'a encore été réalisé.</Typography>
      )}
    </LegalSection>

    <LegalSection title="Résultats des tests">
      <Typography>
        Tests automatisés axe-core uniquement (règles WCAG 2.1 A et AA), sur chaque page, sur
        ordinateur et mobile, dans les deux modes d'affichage. Ils ne couvrent qu'une partie des
        critères du RGAA et ne valent pas audit.
      </Typography>
    </LegalSection>

    <LegalSection title="Contenus non accessibles">
      <Typography>À compléter après audit.</Typography>
    </LegalSection>

    <LegalSection title="Mode accessibilité renforcée">
      <Typography>
        Le bouton « Accessibilité renforcée » de l'en-tête agrandit le texte, augmente les
        espacements et le contraste, souligne les liens, épaissit l'indicateur de focus et coupe les
        animations. Le choix est mémorisé dans votre navigateur.
      </Typography>
    </LegalSection>

    <LegalSection title="Environnement de test">
      <ul>
        <li>Chromium (Playwright), affichage ordinateur et mobile ;</li>
        <li>axe-core, via @axe-core/playwright ;</li>
        <li>Lighthouse CI.</li>
      </ul>
    </LegalSection>

    <LegalSection title="Retour d'information et contact">
      <Typography>
        Si vous ne parvenez pas à accéder à un contenu ou à un service, écrivez à{' '}
        <MuiLink href={`mailto:${publisher.email}`} underline="always">
          {publisher.email}
        </MuiLink>{' '}
        pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre
        forme.
      </Typography>
    </LegalSection>

    <LegalSection title="Voies de recours">
      <Typography>
        Si vous avez signalé un défaut d'accessibilité sans obtenir de réponse satisfaisante, vous
        pouvez saisir le{' '}
        <MuiLink href="https://formulaire.defenseurdesdroits.fr/" underline="always">
          Défenseur des droits
        </MuiLink>{' '}
        par le formulaire en ligne, contacter un délégué dans votre région ou écrire, sans
        affranchissement, à : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.
      </Typography>
    </LegalSection>
  </PageContainer>
)
