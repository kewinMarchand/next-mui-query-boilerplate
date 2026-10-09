import { SITE } from '@/core/config'

export const MAINTENANCE_RETRY_AFTER_SECONDS = 3600

/** Page 503 autonome : aucune donnée, aucun script, styles en ligne. */
export const maintenancePage = () => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Site en maintenance · ${SITE.name}</title>
<style>body{margin:0;font-family:system-ui,sans-serif;color:#111;background:#fff;display:grid;place-items:center;min-height:100vh;padding:16px;box-sizing:border-box}main{max-width:40rem}h1{font-size:2rem}</style>
</head>
<body>
<main>
<h1>Site en maintenance</h1>
<p>${SITE.name} est en cours de maintenance. Merci de revenir dans une heure environ.</p>
</main>
</body>
</html>`
