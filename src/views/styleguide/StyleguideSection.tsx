import styles from './styleguide.module.css'

import type { ReactNode } from 'react'

interface StyleguideSectionProps {
  title: string
  children: ReactNode
}

export const StyleguideSection = ({ title, children }: StyleguideSectionProps) => (
  <section className={styles.section} data-testid="styleguide-section">
    <h2 className={`bui-text bui-text--h2 ${styles.sectionTitle}`}>{title}</h2>
    {children}
  </section>
)
