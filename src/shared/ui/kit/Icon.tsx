import type { IconName } from './iconNames'

interface IconProps {
  name: IconName
  size?: number
  label?: string
}

const SPRITE = '/icons.svg'

/** Symbole du sprite `public/icons.svg` (Lucide), décoratif sauf si un libellé est fourni. */
export const Icon = ({ name, size = 20, label }: IconProps) =>
  label ? (
    <svg width={size} height={size} role="img" aria-label={label}>
      <use href={`${SPRITE}#${name}`} />
    </svg>
  ) : (
    <svg width={size} height={size} aria-hidden="true" focusable="false">
      <use href={`${SPRITE}#${name}`} />
    </svg>
  )
