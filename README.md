# next-mui-query-boilerplate

Point de départ pour une application **Next.js App Router** avec **MUI**, **TanStack Query**, **react-hook-form + zod**, et toute la chaîne qualité : lint, format, types, tests unitaires, end-to-end, accessibilité et Lighthouse.

Les pages de démonstration montrent chaque brique en situation :

| Page                                                                            | Ce qu'elle montre                                                                                           |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                                                                             | Hero pleine largeur (image LCP), carrousel Embla, grille de blog rendue côté serveur                        |
| `/catalogue/[...]`                                                              | Catalogue à facettes rendu côté serveur, état dans l'URL, formulaire GET qui marche sans JavaScript         |
| `/taches`                                                                       | Chargement côté client avec TanStack Query et ses trois états : chargement, erreur avec relance, liste vide |
| `/contact`                                                                      | Formulaire validé par un schéma zod, erreurs liées aux champs, envoi par mutation TanStack Query            |
| `/mentions-legales`, `/donnees-personnelles`, `/accessibilite`, `/plan-du-site` | Pages légales alimentées par la config du site, déclaration RGAA calculée                                   |
| `/charte-graphique`                                                             | Charte graphique, **en développement uniquement** (404 sur le build de production)                          |

Le header porte le logo, la navigation, le menu de catégories (cascade sur ordinateur, panneau par niveaux sur mobile) et le bouton du **mode accessibilité renforcée**.

## Stack

| Brique                                 | Rôle                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Next.js 16 (App Router, Turbopack)     | Routage, rendu serveur, metadata, sitemap                                |
| React 19, TypeScript 6 (strict)        | UI et typage                                                             |
| MUI 9 + Emotion                        | Design system, thème dans `src/core/theme/theme.ts`                      |
| TanStack Query 5                       | Cache et synchronisation des données serveur côté client                 |
| react-hook-form + zod 4                | Formulaires, validation et types dérivés du même schéma                  |
| Embla Carousel 8 + wheel-gestures      | Carrousel (glisser, swipe, molette), dans `features/carousel` uniquement |
| lucide-react                           | Icônes, via le wrapper `Icon`                                            |
| ESLint 9, Prettier, Husky, lint-staged | Qualité du code, vérifiée à chaque commit                                |
| Vitest 5 + Testing Library             | Tests unitaires et fonctionnels                                          |
| Playwright + axe-core                  | Tests end-to-end et accessibilité, desktop et mobile                     |
| Lighthouse CI                          | Performance, accessibilité, SEO, bonnes pratiques                        |

## Prérequis

- Node.js 24.14 ou plus (`.nvmrc`)
- Yarn 1
- Docker, pour l'image de production (optionnel)

## Démarrage

```sh
git clone https://github.com/kewinMarchand/next-mui-query-boilerplate.git
cd next-mui-query-boilerplate
cp .env.example .env.local
make install   # dépendances + navigateur Chromium des tests e2e
make up        # http://localhost:3000
```

Variables d'environnement :

| Variable               | Rôle                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL publique, utilisée pour les URL canoniques, Open Graph, JSON-LD et le sitemap       |
| `API_SCHEMA_URL`       | Schéma OpenAPI de l'API consommée, lu par `make api-types`                              |
| `MAINTENANCE`          | `1` : toutes les pages répondent 503 avec `Retry-After` (page autonome, `src/proxy.ts`) |
| `ENABLE_TEST_ROUTES`   | `1` : active `/_erreur-test` sur un build de production. Posée par Playwright seulement |

## Commandes

`make help` liste toutes les commandes. Les principales :

| Commande                               | Effet                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `make up`                              | Serveur de développement                                                          |
| `make build` / `make start`            | Build de production, puis le servir                                               |
| `make qa`                              | QA rapide : lint, format, types, tests unitaires                                  |
| `make qa-full`                         | QA complète : QA rapide, e2e, accessibilité, pages de dev, Lighthouse             |
| `make test-unit`                       | Vitest                                                                            |
| `make test-e2e`                        | Playwright, desktop et mobile, sur le build de production (port 3100)             |
| `make test-a11y`                       | axe-core, WCAG 2.1 AA, sur chaque page, dans les deux modes d'affichage           |
| `make test-dev`                        | Charte graphique, servie par `next dev` (port 3101)                               |
| `make metrics`                         | Lighthouse CI : échoue sous 90 en performance ou sous 100 en accessibilité et SEO |
| `make api-types`                       | Génère `src/core/api/schema.d.ts` depuis `API_SCHEMA_URL`                         |
| `make docker-build` / `make docker-up` | Image de production, sur le port `PORT` (3000 par défaut)                         |

## Architecture

```
src/
  app/          routeur uniquement : chaque page délègue à une vue de domains/
  proxy.ts      mode maintenance (503)
  domains/      un dossier par page ou groupe de pages, avec sa logique métier
    catalog/
      api/               dépôt en mémoire (seule couche à changer au branchement de l'API)
      common/models/     types (namespace Catalog), filtres, tri, pagination, URL : fonctions pures
      services/          métadonnées SEO du catalogue
      ui/                vue serveur, filtres et tri client, cartes, pagination
    home/ tasks/ contact/ legal/ errors/ styleguide/
  features/     briques agnostiques du métier (carousel)
  core/         socle : config, seo, thème, providers, layouts, ui-kit, hooks
tests/
  e2e/          un fichier par page ou par brique transverse
  a11y/         audit axe de chaque page, dans les deux modes
  dev/          pages réservées au développement
```

Le sens des dépendances est `domains/` vers `features/` vers `core/`, jamais l'inverse. Un domaine ne s'importe que par son `index.ts` : une règle ESLint interdit l'import profond (`@/domains/x/...`) depuis `app/`, `core/` et `features/`.

**Sources uniques** :

- `src/core/config/site.ts` : nom, description, URL, éditeur (valeurs fictives), état d'audit d'accessibilité.
- `src/core/config/navigation.ts` et `categories.ts` : navigation principale, liens légaux, arbre des catégories. Le header, le footer, le plan du site, le sitemap XML et le fil d'Ariane en dérivent.
- `src/core/seo/` : `buildMetadata` construit title, description, canonique, robots, Open Graph et Twitter de chaque route. Les JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `ItemList`) en partagent les URL absolues.

Les conventions de code viennent du `CLAUDE.md` global de l'auteur. Le `CLAUDE.md` de ce dépôt note les choix propres au projet, les versions épinglées et les pièges rencontrés.

## Recettes

### Ajouter une page

1. Créer le domaine `src/domains/<nom>/` avec sa vue `ui/<Nom>View.tsx` et son `index.ts`. La vue s'enveloppe dans `<PageContainer breadcrumb={buildBreadcrumb('/<route>')}>`.
2. Créer `src/app/<route>/page.tsx`, qui exporte `metadata = buildMetadata({ title, description, path })` et rend la vue.
3. Ajouter la route à `src/core/config/navigation.ts` (menu, plan du site, sitemap, fil d'Ariane) et à `tests/e2e/routes.ts` (réponse, SEO, débordement, axe), puis à `.lighthouserc.json`.
4. Écrire `tests/e2e/<route>.e2e.ts`.

### Ajouter une catégorie ou une facette au catalogue

- Catégorie : ajouter le nœud dans `CATEGORY_TREE` (`src/core/config/categories.ts`). Le menu, le plan du site, le sitemap et le fil d'Ariane suivent. Un slug absent de l'arbre répond 404.
- Facette : ajouter le champ au produit et à `Catalog.Query`, le lire et l'écrire dans `catalogQuery.ts` (zod ignore les valeurs invalides), le filtrer et le compter dans `catalogFilters.ts`, l'afficher dans `FiltersForm.tsx`. Chaque étape a son test unitaire à côté.
- Tout changement de filtre passe par `withFilters`, qui remet la page à 1 et conserve le reste (vue comprise).

### Charger des données avec TanStack Query

Le pattern est dans `src/domains/tasks/` :

- `api/tasksRepository.ts` fournit la donnée. Pour brancher une vraie API, remplacer son contenu par un appel typé, sans toucher à l'UI.
- `ui/hooks/useTasks.ts` encapsule `useQuery`, avec une clé de cache exportée et une erreur métier (`TasksLoadError`).
- `ui/TaskList.tsx` affiche les trois états à partir de props, ce qui le rend testable sans réseau.
- `ui/TasksPanel.tsx` est le seul composant client : il relie le hook au composant d'affichage.

Les données utiles au référencement (blog de l'accueil, catalogue) sont au contraire lues côté serveur dans la vue.

### Ajouter un champ de formulaire

1. Ajouter le champ et son message d'erreur dans `src/domains/contact/common/models/contactSchema.ts`. Le type du formulaire en découle.
2. Ajouter le `TextField` dans `ContactForm.tsx` avec `{...form.register('champ')}`, `error` et `helperText`. MUI relie le message au champ par `aria-describedby`.

### Ajouter une icône

Importer l'icône lucide dans `src/core/ui/ui-kit/Icon.tsx` et l'ajouter à `ICONS`. Ne jamais importer `lucide-react` ailleurs, ESLint le refuse. La charte graphique liste automatiquement les icônes du wrapper.

### Ajuster le mode accessibilité renforcée

Tout est dans `src/core/theme/a11yMode.ts` : le script inline qui pose `data-a11y-mode="enhanced"` sur `<html>` avant le premier rendu, et les surcharges CSS injectées par `MuiCssBaseline`. Les espacements de texte ne visent que le contenu de `<main>`, jamais le header, la navigation ni le footer. Un composant qui a besoin d'un style propre à ce mode utilise `ENHANCED_MODE_SELECTOR` dans son `sx`.

### Déclarer un audit d'accessibilité

Renseigner `accessibility` dans `src/core/config/site.ts` (date, taux de conformité, auditeur). L'état « non conforme », « partiellement conforme » ou « totalement conforme » est recalculé pour la déclaration et le lien du footer.

### Passer le site en maintenance

Démarrer le serveur avec `MAINTENANCE=1`. Toutes les routes répondent 503 avec `Retry-After: 3600` et une page HTML autonome.

## Tests

- **Unitaires et fonctionnels** : fichiers `*.test.ts(x)` à côté du code testé.
- **End-to-end** : Playwright sert le build de production sur le port 3100, avec `ENABLE_TEST_ROUTES=1` pour la route de test de la 500. Les éléments sont ciblés par `data-testid`, préfixé par le domaine (`tasks-list`, `catalog-product`, `layout-breadcrumb`). Chaque rendu conditionnel est testé présent et absent. Un test vérifie qu'aucune page ne déborde horizontalement à 375, 768 et 1280 px dans les deux modes et enregistre des captures de l'accueil et du catalogue dans `test-results/`.
- **Accessibilité** : `tests/a11y/` passe axe-core sur chaque route de `tests/e2e/routes.ts`, sur le catalogue filtré, la 404, la 500 et les menus ouverts, dans les deux modes. Axe ne couvre qu'une partie du RGAA, un audit manuel reste nécessaire.
- **Pages de développement** : `tests/dev/` vérifie la charte graphique sur `next dev` (port 3101). Le build de production, lui, vérifie qu'elle répond 404.

## Intégration continue

`.github/workflows/ci.yml` lance `make qa`, puis les tests e2e, accessibilité, pages de développement et Lighthouse, à chaque push sur `main` et sur chaque pull request. En cas d'échec, le rapport Playwright est joint au run.

## Licence

MIT
