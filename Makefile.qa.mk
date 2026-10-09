qa: lint format-check typecheck test-unit ## QA rapide : lint, format, types, tests unitaires

qa-full: qa test-e2e test-a11y test-dev metrics ## QA complète : QA rapide + e2e + a11y + Lighthouse

lint: ## ESLint
	yarn lint

lint-fix: ## ESLint avec correction automatique
	yarn lint:fix

format: ## Prettier (écriture)
	yarn format

format-check: ## Prettier (vérification)
	yarn format:check

typecheck: ## Vérification des types TypeScript
	yarn typecheck

test: test-unit test-e2e test-a11y test-dev ## Tous les tests

test-unit: ## Tests unitaires et fonctionnels (Vitest + Testing Library)
	yarn test:unit

test-e2e: ## Tests end-to-end desktop et mobile (Playwright)
	yarn test:e2e

test-a11y: ## Tests d'accessibilité WCAG 2.1 AA (axe-core + Playwright)
	yarn test:a11y

test-dev: ## Pages de développement (charte graphique) servies par next dev
	yarn test:dev

metrics: build ## Métriques Lighthouse CI (perf ≥ 90, a11y et SEO = 100)
	CHROME_PATH=$$(node -e 'console.log(require("@playwright/test").chromium.executablePath())') yarn lhci

.PHONY: qa qa-full lint lint-fix format format-check typecheck test test-unit test-e2e test-a11y test-dev metrics
