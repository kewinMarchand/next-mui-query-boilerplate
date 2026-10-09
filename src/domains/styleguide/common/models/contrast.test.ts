import { contrastLevel, contrastRatio } from './contrast'

describe('contrastRatio', () => {
  it('vaut 21 pour du noir sur du blanc et 1 pour deux couleurs identiques', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 1)
    expect(contrastRatio('#1d4ed8', '#1d4ed8')).toBe(1)
  })

  it('calcule le primaire du thème sur blanc', () => {
    expect(contrastRatio('#1d4ed8', '#ffffff')).toBeCloseTo(6.7, 1)
  })

  it('mélange une couleur translucide avec son fond', () => {
    expect(contrastRatio('rgba(0, 0, 0, 0.6)', '#fff')).toBeCloseTo(5.74, 1)
  })

  it('refuse une couleur illisible', () => {
    expect(() => contrastRatio('bleu', '#fff')).toThrow('Couleur non reconnue')
  })
})

describe('contrastLevel', () => {
  it('classe en AAA, AA ou insuffisant', () => {
    expect(contrastLevel(7)).toBe('AAA')
    expect(contrastLevel(4.5)).toBe('AA')
    expect(contrastLevel(4.49)).toBe('insuffisant')
  })
})
