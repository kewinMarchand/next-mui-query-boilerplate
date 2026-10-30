import { TOKENS } from '@/shared/theme/tokens'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

export const SpacingSection = () => (
  <StyleguideSection title="Espacements et rayons">
    {Object.entries(TOKENS.space).map(([step, value]) => (
      <div key={step} className={styles.row}>
        <p className={`bui-text bui-text--body-sm ${styles.rowLabel}`}>
          --bui-space-{step} ({value})
        </p>
        <div className={styles.bar} style={{ width: `var(--bui-space-${step})` }} />
      </div>
    ))}
    <div className={styles.row}>
      <div className={styles.radius} style={{ borderRadius: 'var(--bui-radius-md)' }} />
      <p className="bui-text bui-text--body-sm">--bui-radius-md = {TOKENS.radius.md}</p>
    </div>
  </StyleguideSection>
)
