import { Text } from '@kewinmarchand/boilerplates-ui/react'

import { ACCESSIBILITY_COMPLIANCE, SITE } from '@/shared/config'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import styles from './legal.module.css'
import { LegalSection } from './LegalSection'

const { publisher, accessibility } = SITE

export const AccessibilityView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/accessibilite')}>
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Déclaration d'accessibilité</h1>
    <Text>
      {publisher.legalName} s'engage à rendre ce site accessible conformément à l'article 47 de la
      loi n° 2005-102 du 11 février 2005. Cette déclaration s'applique à {SITE.name}.
    </Text>

    <LegalSection title="État de conformité">
      <p className="bui-text" data-testid="legal-compliance-status">
        Ce site est <strong>{ACCESSIBILITY_COMPLIANCE}</strong> avec le référentiel général
        d'amélioration de l'accessibilité (RGAA), version 4.1.2.
      </p>
      {accessibility.auditDate ? (
        <Text>
          Audit réalisé le {accessibility.auditDate}
          {accessibility.auditor && ` par ${accessibility.auditor}`} :{' '}
          {accessibility.complianceRate} % des critères RGAA respectés.
        </Text>
      ) : (
        <Text>Aucun audit n'a encore été réalisé.</Text>
      )}
    </LegalSection>

    <LegalSection title="Résultats des tests">
      <Text>
        Tests automatisés axe-core uniquement (règles WCAG 2.1 A et AA), sur chaque page, sur
        ordinateur et mobile, dans les deux modes d'affichage. Ils ne couvrent qu'une partie des
        critères du RGAA et ne valent pas audit.
      </Text>
    </LegalSection>

    <LegalSection title="Contenus non accessibles">
      <Text>À compléter après audit.</Text>
    </LegalSection>

    <LegalSection title="Mode accessibilité renforcée">
      <Text>
        Le bouton « Accessibilité renforcée » de l'en-tête agrandit le texte, augmente les
        espacements et le contraste, souligne les liens, épaissit l'indicateur de focus et coupe les
        animations. Le choix est mémorisé dans votre navigateur.
      </Text>
    </LegalSection>

    <LegalSection title="Environnement de test">
      <ul>
        <li>Chromium (Playwright), affichage ordinateur et mobile ;</li>
        <li>axe-core, via @axe-core/playwright ;</li>
        <li>Lighthouse CI.</li>
      </ul>
    </LegalSection>

    <LegalSection title="Retour d'information et contact">
      <Text>
        Si vous ne parvenez pas à accéder à un contenu ou à un service, écrivez à{' '}
        <a className="bui-link" href={`mailto:${publisher.email}`}>
          {publisher.email}
        </a>{' '}
        pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre
        forme.
      </Text>
    </LegalSection>

    <LegalSection title="Voies de recours">
      <Text>
        Si vous avez signalé un défaut d'accessibilité sans obtenir de réponse satisfaisante, vous
        pouvez saisir le{' '}
        <a className="bui-link" href="https://formulaire.defenseurdesdroits.fr/">
          Défenseur des droits
        </a>{' '}
        par le formulaire en ligne, contacter un délégué dans votre région ou écrire, sans
        affranchissement, à : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.
      </Text>
    </LegalSection>
  </PageContainer>
)
