import { Text } from '@kewinmarchand/boilerplates-ui/react'

import { SITE } from '@/shared/config'
import { isAudienceMeasurementEnabled } from '@/shared/observability'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import styles from './legal.module.css'
import { LegalSection } from './LegalSection'
import { OppositionMesure } from './OppositionMesure'

const { publisher } = SITE

export const PersonalDataView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/donnees-personnelles')}>
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Données personnelles</h1>

    <LegalSection title="Responsable de traitement">
      <Text>
        {publisher.legalName}, {publisher.address}.
      </Text>
    </LegalSection>

    <LegalSection title="Finalité et base légale">
      <Text>
        Le formulaire de contact collecte votre nom, votre adresse e-mail et votre message, dans le
        seul but de vous répondre. Ce traitement repose sur votre consentement, exprimé par l'envoi
        du formulaire.
      </Text>
    </LegalSection>

    <LegalSection title="Durée de conservation">
      <Text>
        Les messages sont conservés trois ans à compter du dernier échange, puis supprimés.
      </Text>
    </LegalSection>

    <LegalSection title="Vos droits">
      <Text>Vous disposez sur vos données des droits suivants :</Text>
      <ul>
        <li>accès ;</li>
        <li>rectification ;</li>
        <li>effacement ;</li>
        <li>opposition.</li>
      </ul>
      <Text>
        Pour les exercer, écrivez à{' '}
        <a className="bui-link" href={`mailto:${publisher.email}`}>
          {publisher.email}
        </a>
        . Si la réponse ne vous satisfait pas, vous pouvez adresser une réclamation à la{' '}
        <a className="bui-link" href="https://www.cnil.fr/fr/plaintes">
          Commission nationale de l'informatique et des libertés (CNIL)
        </a>
        .
      </Text>
    </LegalSection>

    <LegalSection title="Cookies et stockage local">
      <Text>
        Ce site ne dépose aucun cookie de mesure d'audience. Seule votre préférence pour le mode
        accessibilité renforcée est enregistrée dans votre navigateur, sans jamais nous être
        transmise.
      </Text>
    </LegalSection>

    {isAudienceMeasurementEnabled && (
      <div data-testid="legal-audience-measurement">
        <LegalSection title="Mesure d'audience">
          <Text>
            La fréquentation du site est mesurée avec Matomo, hébergé par l'éditeur, configuré sans
            cookie et sans identifiant : aucun suivi d'un site à l'autre, aucune donnée transmise à
            un tiers. Les statistiques produites sont anonymes et servent uniquement à améliorer le
            site. Les données brutes sont conservées 25 mois au plus.
          </Text>
          <Text>
            Vous pouvez vous opposer à cette mesure : votre choix est gardé dans ce navigateur, sans
            cookie.
          </Text>
          <OppositionMesure />
        </LegalSection>
      </div>
    )}
  </PageContainer>
)
