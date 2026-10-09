interface Rgb {
  r: number
  g: number
  b: number
}

const WHITE: Rgb = { r: 255, g: 255, b: 255 }

const fromHex = (hex: string): Rgb => {
  const full = hex.length === 3 ? [...hex].map((char) => char + char).join('') : hex
  const channel = (index: number) => Number.parseInt(full.slice(index, index + 2), 16)
  return { r: channel(0), g: channel(2), b: channel(4) }
}

const parseColor = (color: string, background: Rgb = WHITE): Rgb => {
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1]
  if (hex) return fromHex(hex)

  const parts = color
    .match(/rgba?\(([^)]+)\)/)?.[1]
    ?.split(',')
    .map(Number.parseFloat)
  if (!parts || parts.length < 3) throw new Error(`Couleur non reconnue : ${color}`)
  const [r = 0, g = 0, b = 0, alpha = 1] = parts
  const blend = (value: number, under: number) => Math.round(value * alpha + under * (1 - alpha))
  return { r: blend(r, background.r), g: blend(g, background.g), b: blend(b, background.b) }
}

const linear = (channel: number) => {
  const value = channel / 255
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

const luminance = ({ r, g, b }: Rgb) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)

/** Ratio WCAG entre une couleur, éventuellement translucide, et son fond opaque. */
export const contrastRatio = (foreground: string, background: string) => {
  const under = parseColor(background)
  const a = luminance(parseColor(foreground, under))
  const b = luminance(under)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export type ContrastLevel = 'AAA' | 'AA' | 'insuffisant'

export const contrastLevel = (ratio: number): ContrastLevel =>
  ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'insuffisant'
