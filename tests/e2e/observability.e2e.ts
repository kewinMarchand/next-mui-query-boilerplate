import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { gunzipSync } from 'node:zlib'

import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'
import type { ChildProcess } from 'node:child_process'
import type { Server } from 'node:http'

const APP_PORT = 3102
const GLITCHTIP_PORT = 3103
const APP_URL = `http://localhost:${APP_PORT}`
const DSN = `http://clefactice@localhost:${GLITCHTIP_PORT}/1`

// Les variables publiques sont figées au build : ce test construit sa propre version dans
// .next-obs, avec des valeurs factices, et ne contacte aucune instance réelle.
const ENV = {
  ...process.env,
  NEXT_DIST_DIR: '.next-obs',
  NEXT_PUBLIC_SITE_URL: APP_URL,
  ENABLE_TEST_ROUTES: '1',
  GLITCHTIP_DSN: DSN,
  NEXT_PUBLIC_GLITCHTIP_DSN: DSN,
}

const envelopes: string[] = []
const events = () => envelopes.filter((body) => body.includes('"type":"event"'))

const startFakeGlitchtip = () =>
  createServer((request, response) => {
    response.setHeader('access-control-allow-origin', '*')
    response.setHeader('access-control-allow-headers', '*')
    if (request.method === 'OPTIONS') {
      response.writeHead(204).end()
      return
    }
    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => chunks.push(chunk))
    request.on('end', () => {
      const body = Buffer.concat(chunks)
      const gzipped = request.headers['content-encoding'] === 'gzip'
      envelopes.push((gzipped ? gunzipSync(body) : body).toString('utf8'))
      response.writeHead(200, { 'content-type': 'application/json' }).end('{}')
    })
  }).listen(GLITCHTIP_PORT)

const run = (command: string, args: string[]) =>
  new Promise<void>((resolve, reject) => {
    spawn(command, args, { env: ENV, stdio: 'ignore' }).on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} : code ${code}`)),
    )
  })

const throwInBrowser = async (page: Page, message: string) => {
  await page.waitForFunction(() => '__SENTRY__' in window)
  await page.evaluate((text) => {
    setTimeout(() => {
      throw new Error(text)
    })
  }, message)
}

test.describe('Suivi des erreurs GlitchTip, avec un DSN factice', () => {
  test.describe.configure({ mode: 'serial' })

  let app: ChildProcess | undefined
  let glitchtip: Server | undefined

  test.beforeAll(async () => {
    test.skip(test.info().project.name !== 'desktop', 'Vérification des envois, une seule fois.')
    test.setTimeout(300_000)
    glitchtip = startFakeGlitchtip()
    await run('yarn', ['build'])
    app = spawn('yarn', ['start', '--port', String(APP_PORT)], { env: ENV, stdio: 'ignore' })
    await expect
      .poll(async () => (await fetch(APP_URL).catch(() => null))?.status, { timeout: 30_000 })
      .toBe(200)
  })

  test.afterAll(() => {
    app?.kill()
    glitchtip?.close()
  })

  test.beforeEach(() => {
    envelopes.length = 0
  })

  test('une erreur serveur inattendue est envoyée', async ({ request }) => {
    expect((await request.get(`${APP_URL}/_erreur-test`)).status()).toBe(500)

    await expect
      .poll(() => events().some((body) => body.includes('Erreur volontaire de la route de test')))
      .toBe(true)
  })

  test('une erreur du navigateur est envoyée après l’affichage', async ({ page }) => {
    await page.goto(APP_URL)
    await throwInBrowser(page, 'Erreur navigateur volontaire')

    await expect
      .poll(() => events().some((body) => body.includes('Erreur navigateur volontaire')))
      .toBe(true)
  })

  test('rien n’est envoyé pour une 404 ni pour un scénario de test', async ({ page, request }) => {
    expect((await page.goto(`${APP_URL}/route-inexistante`))?.status()).toBe(404)
    const scenario = await request.get(`${APP_URL}/_erreur-test`, {
      headers: { 'X-Scenario': 'error' },
    })
    expect(scenario.status()).toBe(500)

    await throwInBrowser(page, 'Témoin après la 404')
    await expect.poll(() => events().length).toBeGreaterThan(0)

    expect(events()).toHaveLength(1)
    expect(events()[0]).toContain('Témoin après la 404')
  })
})
