.DEFAULT_GOAL := help
include Makefile.qa.mk

help: ## Affiche cette aide
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances et le navigateur des tests e2e
	yarn install --frozen-lockfile
	npx playwright install chromium

up: ## Lance le serveur de développement (http://localhost:3000)
	yarn dev

build: ## Build de production
	yarn build

start: ## Sert le build de production
	yarn start

api-types: ## Génère les types TypeScript depuis le schéma OpenAPI (API_SCHEMA_URL)
	yarn api:types

docker-build: ## Construit l'image Docker de production
	docker compose build

docker-up: ## Lance l'image de production (port PORT, 3000 par défaut)
	docker compose up

docker-down: ## Arrête le conteneur
	docker compose down

.PHONY: help install up build start api-types docker-build docker-up docker-down
