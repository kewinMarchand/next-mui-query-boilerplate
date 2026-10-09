// @vitest-environment node
import { proxy } from './proxy'

describe('proxy de maintenance', () => {
  afterEach(() => {
    delete process.env.MAINTENANCE
  })

  it('laisse passer les requêtes hors maintenance', () => {
    expect(proxy().status).toBe(200)
  })

  it('répond 503 avec Retry-After et la page autonome quand MAINTENANCE=1', async () => {
    process.env.MAINTENANCE = '1'
    const response = proxy()

    expect(response.status).toBe(503)
    expect(response.headers.get('Retry-After')).toBe('3600')
    expect(await response.text()).toContain('<h1>Site en maintenance</h1>')
  })
})
