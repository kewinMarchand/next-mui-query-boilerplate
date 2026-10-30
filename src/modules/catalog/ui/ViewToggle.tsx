import { Cluster } from '@kewinmarchand/boilerplates-ui/react'

import { Icon, Link } from '@/shared/ui/kit'

import { catalogHref } from '../domain/catalogQuery'

import type { Catalog } from '../domain/catalog'

interface ViewToggleProps {
  path: string
  query: Catalog.Query
}

const OPTIONS = [
  { view: 'grille', label: 'Grille', icon: 'layout-grid', testId: 'catalog-view-grid' },
  { view: 'liste', label: 'Liste', icon: 'list', testId: 'catalog-view-list' },
] as const

export const ViewToggle = ({ path, query }: ViewToggleProps) => (
  <nav aria-label="Affichage">
    <Cluster as="ul" gap="2">
      {OPTIONS.map((option) => {
        const isActive = query.view === option.view
        return (
          <li key={option.view}>
            <Link
              href={catalogHref(path, { ...query, view: option.view })}
              scroll={false}
              aria-current={isActive ? 'page' : undefined}
              data-testid={option.testId}
              className={isActive ? 'bui-button' : 'bui-button bui-button--outline'}
            >
              <Icon name={option.icon} />
              {option.label}
            </Link>
          </li>
        )
      })}
    </Cluster>
  </nav>
)
