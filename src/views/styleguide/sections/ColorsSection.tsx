import { TOKENS } from '@/shared/theme/tokens'

import { contrastLevel, contrastRatio } from '@/views/styleguide/contrast'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

const { color } = TOKENS

const SHOWN = [
  'primary',
  'primary-dark',
  'secondary',
  'text',
  'text-muted',
  'surface',
  'surface-muted',
  'success',
  'error',
  'info',
  'warning',
] as const

const isBackground = (token: string) => token.startsWith('surface')

export const ColorsSection = () => (
  <StyleguideSection title="Couleurs">
    <p className={`bui-text ${styles.muted}`}>Valeurs du mode clair.</p>
    <ul className={styles.swatches}>
      {SHOWN.map((token) => {
        const value = color[token]
        const ratio = isBackground(token)
          ? contrastRatio(color.text, value)
          : contrastRatio(value, color.surface)
        return (
          <li key={token} className={styles.swatch}>
            <div
              className={styles.swatchColor}
              style={{ background: `var(--bui-color-${token})` }}
            />
            <div className={styles.swatchBody}>
              <p className={`bui-text ${styles.swatchName}`}>{`--bui-color-${token}`}</p>
              <p className="bui-text bui-text--body-sm">{value}</p>
              <p className="bui-text bui-text--body-sm">
                {isBackground(token) ? 'Texte sur ce fond' : 'Contraste sur fond'} :{' '}
                {ratio.toFixed(2)}:1, {contrastLevel(ratio)}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  </StyleguideSection>
)
