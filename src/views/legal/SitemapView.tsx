import { CATALOG_NAVIGATION, SITE_MAP } from '@/shared/config'
import { Link } from '@/shared/ui/kit'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import { getCategoryMenu } from '@/modules/catalog'

import styles from './legal.module.css'

import type { NavigationNode } from '@/shared/config'

const LINK_CLASS = `bui-link ${styles.touchLink}`

const CategoryList = ({ nodes }: { nodes: NavigationNode[] }) => (
  <ul>
    {nodes.map((node) => (
      <li key={node.id}>
        <Link href={node.href} className={LINK_CLASS}>
          {node.label}
        </Link>
        {node.children.length > 0 && <CategoryList nodes={node.children} />}
      </li>
    ))}
  </ul>
)

export const SitemapView = async () => {
  const categoryMenu = await getCategoryMenu()

  return (
    <PageContainer breadcrumb={buildBreadcrumb('/plan-du-site')}>
      <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Plan du site</h1>
      <ul data-testid="legal-sitemap">
        {SITE_MAP.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={LINK_CLASS}>
              {label}
            </Link>
            {href === CATALOG_NAVIGATION.href && <CategoryList nodes={categoryMenu} />}
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
