import Container from '@mui/material/Container'

import { Breadcrumb } from './Breadcrumb'

import type { BreadcrumbItem } from '@/core/seo'
import type { ReactNode } from 'react'

interface PageContainerProps {
  breadcrumb?: BreadcrumbItem[]
  children: ReactNode
}

export const PageContainer = ({ breadcrumb, children }: PageContainerProps) => (
  <Container sx={{ py: 4 }}>
    {breadcrumb && <Breadcrumb items={breadcrumb} />}
    {children}
  </Container>
)
