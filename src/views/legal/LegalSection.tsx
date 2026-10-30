import { Stack, Text } from '@kewinmarchand/boilerplates-ui/react'

import styles from './legal.module.css'

import type { ReactNode } from 'react'

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <Stack as="section" gap="3" className={styles.section}>
    <Text variant="h2">{title}</Text>
    {children}
  </Stack>
)
