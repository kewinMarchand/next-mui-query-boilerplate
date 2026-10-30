import { Stack } from '@kewinmarchand/boilerplates-ui/react'

import { TOKENS } from '@/shared/theme/tokens'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

const { size, 'line-height': lineHeight } = TOKENS.font

const VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'title',
  'lead',
  'body',
  'body-sm',
  'caption',
  'overline',
] as const

const TIGHT = new Set(['h1', 'h2', 'h3', 'h4', 'title'])

export const TypographySection = () => (
  <StyleguideSection title="Typographie">
    <Stack gap="4">
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p className={`bui-text bui-text--${variant}`}>
            {variant} : Plantes tropicales de démonstration
          </p>
          <p className={`bui-text bui-text--body-sm ${styles.muted}`}>
            Taille {size[variant]}, interlignage{' '}
            {TIGHT.has(variant) ? lineHeight.tight : lineHeight.normal}
          </p>
        </div>
      ))}
    </Stack>
  </StyleguideSection>
)
