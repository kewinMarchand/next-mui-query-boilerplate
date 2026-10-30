'use client'

import { Button } from '@kewinmarchand/boilerplates-ui/react'

import { useReportError } from '@/shared/observability'
import { Icon, Link } from '@/shared/ui/kit'
import { Breadcrumb, buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import styles from './errors.module.css'

interface ServerErrorViewProps {
  error?: Error & { digest?: string }
}

export const ServerErrorView = ({ error }: ServerErrorViewProps) => {
  useReportError(error)

  return (
    <PageContainer>
      <Breadcrumb
        items={buildBreadcrumb('/', [{ label: 'Une erreur est survenue', href: '/500' }])}
        withJsonLd={false}
      />
      <h1 className={`bui-text bui-text--h1 ${styles.title}`}>Une erreur est survenue</h1>
      <p className={`bui-text ${styles.intro}`}>
        La page n'a pas pu s'afficher. Réessayez dans quelques instants, le problème est peut-être
        passager.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => window.location.reload()} data-testid="errors-retry">
          <Icon name="rotate-cw" />
          Réessayer
        </Button>
        <Link href="/" className="bui-button bui-button--outline" data-testid="errors-home-link">
          Retour à l'accueil
        </Link>
      </div>
    </PageContainer>
  )
}
