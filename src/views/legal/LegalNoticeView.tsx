import { Text } from '@kewinmarchand/boilerplates-ui/react'

import { SITE } from '@/shared/config'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import styles from './legal.module.css'
import { LegalSection } from './LegalSection'

const { publisher } = SITE

export const LegalNoticeView = () => (
  <PageContainer breadcrumb={buildBreadcrumb('/mentions-legales')}>
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Mentions légales</h1>
    <Text>
      Les informations ci-dessous sont des valeurs d'exemple, fictives, à remplacer dans
      <code> src/shared/config/site.ts</code>.
    </Text>

    <LegalSection title="Éditeur">
      <Text>
        {publisher.legalName}, {publisher.address}. SIRET : {publisher.siret}.
      </Text>
      <Text>
        Contact :{' '}
        <a className="bui-link" href={`mailto:${publisher.email}`}>
          {publisher.email}
        </a>
      </Text>
    </LegalSection>

    <LegalSection title="Directeur de la publication">
      <Text>{publisher.publicationDirector}</Text>
    </LegalSection>

    <LegalSection title="Hébergeur">
      <Text>
        {publisher.host.name}, {publisher.host.address}.
      </Text>
    </LegalSection>

    <LegalSection title="Propriété intellectuelle">
      <Text>
        L'ensemble des contenus de ce site (textes, images, code) est la propriété de{' '}
        {publisher.legalName}, sauf mention contraire. Toute reproduction sans autorisation écrite
        préalable est interdite.
      </Text>
    </LegalSection>
  </PageContainer>
)
