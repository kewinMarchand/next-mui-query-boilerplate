import { CATALOG_NAVIGATION } from '@/shared/config'
import { Link } from '@/shared/ui/kit'
import { Breadcrumb, buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import styles from './errors.module.css'

export const NotFoundView = () => (
  <PageContainer>
    <Breadcrumb
      items={buildBreadcrumb('/', [{ label: 'Page introuvable', href: '/404' }])}
      withJsonLd={false}
    />
    <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Page introuvable</h1>
    <p className={`bui-text ${styles.intro}`}>
      La page demandée n'existe pas ou a été déplacée. Ces liens peuvent vous aider à retrouver
      votre chemin.
    </p>
    <div className={styles.actions}>
      <Link href="/" className="bui-button" data-testid="errors-home-link">
        Retour à l'accueil
      </Link>
      <Link href="/plan-du-site" className="bui-button bui-button--outline">
        Plan du site
      </Link>
      <Link href={CATALOG_NAVIGATION.href} className="bui-button bui-button--outline">
        Catalogue
      </Link>
    </div>
  </PageContainer>
)
