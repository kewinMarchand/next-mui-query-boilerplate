// svgstore ne publie pas de types : seule l'API utilisée par tools/icons.mts est déclarée.
declare module 'svgstore' {
  interface Sprite {
    add(id: string, svg: string): Sprite
    toString(options?: { inline?: boolean }): string
  }
  const svgstore: (options?: { svgAttrs?: Record<string, string> }) => Sprite
  export default svgstore
}
