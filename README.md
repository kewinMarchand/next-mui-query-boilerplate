# next-mui-query-boilerplate

Point de départ pour une application **Next.js App Router** avec **MUI**, **TanStack Query**, **react-hook-form + zod**, et toute la chaîne qualité : lint, format, types, tests unitaires, end-to-end, accessibilité et Lighthouse.

Trois pages de démonstration montrent chaque brique en situation :

| Page       | Ce qu'elle montre                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| `/`        | Mise en page MUI, navigation, liens Next dans des boutons MUI                                               |
| `/taches`  | Chargement côté client avec TanStack Query et ses trois états : chargement, erreur avec relance, liste vide |
| `/contact` | Formulaire validé par un schéma zod, erreurs liées aux champs, envoi par mutation TanStack Query            |

## Stack

| Brique                                 | Rôle                                                     |
| -------------------------------------- | -------------------------------------------------------- |
| Next.js 16 (App Router, Turbopack)     | Routage, rendu serveur, metadata, sitemap                |
| React 19, TypeScript 6 (strict)        | UI et typage                                             |
| MUI 9 + Emotion                        | Design system, thème dans `src/core/theme/theme.ts`      |
| TanStack Query 5                       | Cache et synchronisation des données serveur côté client |
| react-hook-form + zod 4                | Formulaires, validation et types dérivés du même schéma  |
| lucide-react                           | Icônes, via le wrapper `Icon`                            |
| ESLint 9, Prettier, Husky, lint-staged | Qualité du code, vérifiée à chaque commit                |
| Vitest 5 + Testing Library             | Tests unitaires et fonctionnels                          |
| Playwright + axe-core                  | Tests end-to-end et accessibilité, desktop et mobile     |
| Lighthouse CI                          | Performance, accessibilité, SEO, bonnes pratiques        |

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

Variables d'environnement (`.env.local`) :

| Variable               | Rôle                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL publique, utilisée pour les URL canoniques, Open Graph et le sitemap |
| `API_SCHEMA_URL`       | Schéma OpenAPI de l'API consommée, lu par `make api-types`               |

## Commandes

`make help` liste toutes les commandes. Les principales :

| Commande                               | Effet                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `make up`                              | Serveur de développement                                                          |
| `make build` / `make start`            | Build de production, puis le servir                                               |
| `make qa`                              | QA rapide : lint, format, types, tests unitaires                                  |
| `make qa-full`                         | QA complète : QA rapide, e2e, accessibilité, Lighthouse                           |
| `make test-unit`                       | Vitest                                                                            |
| `make test-e2e`                        | Playwright, desktop et mobile                                                     |
| `make test-a11y`                       | axe-core, WCAG 2.1 AA, sur chaque page                                            |
| `make metrics`                         | Lighthouse CI : échoue sous 90 en performance ou sous 100 en accessibilité et SEO |
| `make api-types`                       | Génère `src/core/api/schema.d.ts` depuis `API_SCHEMA_URL`                         |
| `make docker-build` / `make docker-up` | Image de production, sur le port `PORT` (3000 par défaut)                         |

## Architecture

```
src/
  app/         routeur uniquement : chaque page délègue à une vue de domains/
  domains/     un dossier par page, avec sa logique métier
    tasks/
      api/             accès aux données (ici en mémoire)
      common/models/   types et schémas, sans dépendance au framework
      common/exceptions/
      ui/              composants, dont la vue rendue par la page
      ui/hooks/        état, effets et appels (useTasks)
      index.ts         seul export public du domaine
  core/        socle transverse : config, thème, providers, layouts, ui-kit
tests/
  e2e/         un fichier par page
  a11y/        audit axe de chaque page
```

Le sens des dépendances est `domains/` vers `core/`, jamais l'inverse. Hors de son propre dossier, un domaine ne s'importe que par son `index.ts`, et une règle ESLint le vérifie.

Les conventions de code viennent du `CLAUDE.md` global de l'auteur. Le `CLAUDE.md` de ce dépôt note les choix propres au projet, les versions épinglées et les pièges connus.

## Recettes

### Ajouter une page

1. Créer le domaine `src/domains/<nom>/` avec sa vue `ui/<Nom>View.tsx` et son `index.ts`.
2. Créer `src/app/<route>/page.tsx`, qui exporte sa `metadata` et rend la vue.
3. Ajouter la route à `src/core/config/navigation.ts` (menu et sitemap) et à `tests/e2e/routes.ts` (tests de réponse et d'accessibilité).
4. Écrire `tests/e2e/<route>.e2e.ts`.

### Charger des données avec TanStack Query

Le pattern est dans `src/domains/tasks/` :

- `api/tasksRepository.ts` fournit la donnée. Pour brancher une vraie API, remplacer son contenu par un appel typé, sans toucher à l'UI.
- `ui/hooks/useTasks.ts` encapsule `useQuery`, avec une clé de cache exportée et une erreur métier (`TasksLoadError`).
- `ui/TaskList.tsx` affiche les trois états à partir de props, ce qui le rend testable sans réseau.
- `ui/TasksPanel.tsx` est le seul composant client : il relie le hook au composant d'affichage.

### Ajouter un champ de formulaire

1. Ajouter le champ et son message d'erreur dans `src/domains/contact/common/models/contactSchema.ts`. Le type du formulaire en découle.
2. Ajouter le `TextField` dans `ContactForm.tsx` avec `{...form.register('champ')}`, `error` et `helperText`. MUI relie le message au champ par `aria-describedby`.

### Ajouter une icône

Importer l'icône lucide dans `src/core/ui/ui-kit/Icon.tsx` et l'ajouter à `ICONS`. Ne jamais importer `lucide-react` ailleurs, ESLint le refuse.

## Tests

- **Unitaires et fonctionnels** : fichiers `*.test.ts(x)` à côté du code testé.
- **End-to-end** : Playwright sert le build de production sur le port 3100. Les éléments sont ciblés par `data-testid`, préfixé par le domaine (`tasks-list`, `contact-submit`). Chaque rendu conditionnel est testé présent et absent.
- **Accessibilité** : `tests/a11y/` passe axe-core sur chaque route de `tests/e2e/routes.ts`. Axe ne couvre qu'une partie du RGAA, un audit manuel reste nécessaire.

## Intégration continue

`.github/workflows/ci.yml` lance `make qa`, puis les tests e2e, accessibilité et Lighthouse, à chaque push sur `main` et sur chaque pull request. En cas d'échec, le rapport Playwright est joint au run.

## Licence

MIT
