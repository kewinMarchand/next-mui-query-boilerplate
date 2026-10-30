import { Container } from '@kewinmarchand/boilerplates-ui/react'

import { Breadcrumb } from './Breadcrumb'
import styles from './PageContainer.module.css'

import type { BreadcrumbItem } from '@/shared/seo'
import type { ReactNode } from 'react'

interface PageContainerProps {
  breadcrumb?: BreadcrumbItem[]
  children: ReactNode
}

export const PageContainer = ({ breadcrumb, children }: PageContainerProps) => (
  <Container className={styles.page}>
    {breadcrumb && <Breadcrumb items={breadcrumb} />}
    {children}
  </Container>
)
