import { breadcrumbJsonLd, JsonLd } from '@/shared/seo'
import { Link } from '@/shared/ui/kit'

import styles from './Breadcrumb.module.css'

import type { BreadcrumbItem } from '@/shared/seo'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  withJsonLd?: boolean
}

export const Breadcrumb = ({ items, withJsonLd = true }: BreadcrumbProps) => (
  <nav aria-label="Fil d'Ariane" data-testid="layout-breadcrumb" className={styles.breadcrumb}>
    <ol className={`bui-text bui-text--body-sm ${styles.list}`}>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <li key={item.href} aria-current="page">
            {item.label}
          </li>
        ) : (
          <li key={item.href}>
            <Link href={item.href} className={`bui-link ${styles.link}`}>
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ol>
    {withJsonLd && <JsonLd data={breadcrumbJsonLd(items)} />}
  </nav>
)
