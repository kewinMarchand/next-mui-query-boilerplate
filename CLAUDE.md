# CLAUDE.md — next-mui-query-boilerplate

Boilerplate personnel. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet.

## Choix du projet

- **Type** : application Next.js App Router, rendu serveur par défaut.
- **Design system** : MUI v9, branché via `@mui/material-nextjs/v16-appRouter` (`AppRouterCacheProvider` dans `src/app/layout.tsx`). Thème dans `src/core/theme/theme.ts` (`cssVariables: true`).
- **Données serveur côté client** : TanStack Query. Un `QueryClient` par navigateur, créé par `useState(makeQueryClient)` dans `src/core/providers/Providers.tsx`. Devtools en développement uniquement.
- **Formulaires** : react-hook-form + zod (`@hookform/resolvers/zod`), schéma dans `common/models/` du domaine.
- **Icônes** : `lucide-react`, uniquement via `src/core/ui/ui-kit/Icon.tsx` (règle ESLint).
- **Unité de police** : `px`. Police Inter via `next/font/google` (servie localement au build).
- **Images** : composant `Picture` (`src/core/ui/ui-kit/Picture.tsx`), qui sert les variantes AVIF puis WebP générées à l'avance dans `public/images/` (`<nom>-<largeur>.<ext>`). Exception assumée à « toujours `next/image` » : l'optimiseur de Next encode à la première requête, et Lighthouse CI, qui ne passe qu'une fois sur chaque page, mesurait l'accueil entre 0,83 et 0,92 selon que le cache était chaud. Avec les variantes statiques, toutes les pages passent 0,9. La règle `@next/next/no-img-element` est désactivée pour ce seul fichier.
- **Langue** : français uniquement. URLs en français (`/taches`, `/contact`, `/catalogue`).
- **Points de rupture** : `md` = 1024 px (bascule ordinateur : menu en cascade, colonne de filtres), `xl` = 1440 px (largeur max du conteneur, jeton unique via `MuiContainer` `maxWidth: 'xl'`). Gouttières 16, 24 puis 32 px.
- **Mise en page** : `<main>` est pleine largeur. Chaque vue s'enveloppe dans `PageContainer` (conteneur + fil d'Ariane), sauf le hero de l'accueil qui reste bord à bord.
- **Carrousel** : `embla-carousel-react` 8, importé uniquement dans `src/features/carousel/`. Retenu pour le glisser souris, le swipe et la molette, qu'un carrousel maison en `scroll-snap` ne gère pas proprement au pointeur. Poids mesuré sur les fichiers ESM publiés : 11,2 ko gzip pour le cœur, 0,5 ko pour l'adaptateur React. Embla 8 ne gère pas la molette seul (vérifié par un test e2e en `page.mouse.wheel` horizontal, resté sur la diapositive 1) : `embla-carousel-wheel-gestures` 8 l'ajoute, pour 2,3 ko gzip plus 4,4 ko pour sa dépendance `wheel-gestures` (fichiers ESM publiés). Sans JavaScript, la piste reste en `overflow-x: auto` + `scroll-snap`, Embla prend la main au montage (`data-embla-ready`).
- **Mode accessibilité renforcée** : script inline dans `<head>` (`src/core/theme/a11yMode.ts`), surcharges CSS sous `html[data-a11y-mode="enhanced"]` injectées par `MuiCssBaseline`, aucun second thème JavaScript. Les espacements WCAG 1.4.12 ne visent que le texte de `<main>`.
- **Catalogue** : état dans l'URL (source unique), lu et écrit par `catalogQuery.ts` (zod). Rendu serveur sans frontière de chargement, formulaire GET qui marche sans JavaScript, navigation client avec `useOptimistic` quand JavaScript est là. Les squelettes s'affichent pendant la transition d'un filtre ou d'un tri (`CatalogTransition.tsx`).
- **SEO** : `src/core/seo/buildMetadata.ts` est le seul constructeur de métadonnées. Pages de catalogue filtrées ou triées en `noindex, follow`, canonique sans filtres.
- **Erreurs** : `not-found.tsx`, `error.tsx` et `global-error.tsx` délèguent au domaine `errors`. `/_erreur-test` (dossier `%5Ferreur-test`) lève une erreur en développement, ou sur un build lancé avec `ENABLE_TEST_ROUTES=1`. `MAINTENANCE=1` fait répondre 503 à toutes les pages via `src/proxy.ts`.
- **Charte graphique** : `/charte-graphique`, `notFound()` dès que `NODE_ENV === 'production'`. Testée par `playwright.dev.config.ts` sur `next dev` (port 3101).
- **API** : aucune. Les dépôts des domaines (`api/`) renvoient des données en mémoire. `make api-types` génère `src/core/api/schema.d.ts` quand `API_SCHEMA_URL` est renseigné.
- **Cibles tactiles** : 44 px minimum (`MuiButton` `minHeight: 44`).

## Versions épinglées, et pourquoi

| Paquet       | Version | Raison                                                         |
| ------------ | ------- | -------------------------------------------------------------- |
| `typescript` | `~6.0`  | typescript-eslint 8 ne supporte pas TypeScript 7 (`peer <6.1`) |
| `eslint`     | `^9`    | eslint-config-next 16 casse avec ESLint 10                     |
| `jsdom`      | `^29`   | jsdom 30 exige Node ≥ 24.15                                    |
| `vite`       | `^8`    | peer obligatoire de Vitest 5                                   |

## Règles ESLint propres au projet

- `@typescript-eslint/no-namespace` avec `allowDeclarations` : les types de domaine sont en `export declare namespace Xxx {}`.
- `no-restricted-imports` : import profond d'un domaine (`@/domains/x/...`) interdit depuis `app/`, `core/` et `features/`. Autorisé à l'intérieur du domaine lui-même, pour respecter la limite d'un niveau de chemin relatif.
- `import/internal-regex: ^@/` : place les imports `@/` en « internes » et laisse les imports de type en dernier.

## Pièges connus

- `output: 'standalone'` n'est activé que si `NEXT_OUTPUT=standalone` (Dockerfile). Sinon `next start`, utilisé par Playwright et Lighthouse, avertit.
- Lighthouse CI lance Chrome avec `--no-sandbox` : Ubuntu restreint les user namespaces (`apparmor_restrict_unprivileged_userns=1`) et le bac à sable de Chrome ne démarre pas. Il ne visite que `localhost`. Les rapports restent en local (`.lighthouseci/`), jamais sur un stockage public.
- Playwright sert le build sur le port 3100, `next dev` sur le 3101 pour les pages de développement, Lighthouse sur le 3200, pour ne pas entrer en collision avec `make up` (3000).
- Un `aria-label` sur un `div` sans rôle est une violation axe (`aria-prohibited-attr`) : les squelettes de chargement portent `role="status"`.
- Dans `sx`, un nombre entre 0 et 1 est une fraction : `width: 1` vaut 100 % et `m: -1` un pas d'espacement négatif. Le masquage visuel (`VISUALLY_HIDDEN`) a provoqué un débordement horizontal de 150 px avant d'être écrit en chaînes (`'1px'`).
- Un `loading.tsx` diffuse la page dans une `div hidden` déplacée par un script : sans JavaScript, le catalogue restait un squelette, `notFound()` répondait 200 et le `<link rel="prev">` n'était pas remonté dans `<head>`. Le catalogue n'a donc pas de `loading.tsx`.
- Une grille CSS dont la colonne vaut `auto` prend la largeur minimale de son contenu : le carrousel débordait à 375 px. Les grilles qui contiennent une piste défilante utilisent `minmax(0, 1fr)`.
- La règle `react-hooks/refs` refuse `objet.propriété` dès que l'objet retourné par un hook contient une ref : déstructurer le retour du hook.
- Embla sous jsdom exige `matchMedia`, `ResizeObserver` et `IntersectionObserver` : le test du carrousel les remplace par des bouchons.
- Une page d'erreur rendue entièrement côté client recrée `<html>` sans l'attribut posé par le script inline : `useA11yMode` le repose au montage.
- Le `Drawer` MUI place le focus sur le panneau après les effets des composants : le menu mobile focalise son titre dans `onEntered`.
- Afficher les filtres en ligne avant l'hydratation puis les replier sur mobile décalait toute la page (clic raté en e2e, CLS). Avant hydratation, le mobile reçoit un `<details>` fermé, remplacé ensuite par le bouton « Filtrer ».
- Le nom du site dans le header était un `<p>` : la marge « après paragraphe » du mode renforcé ouvrait un espace sous la navigation. Il est devenu le texte du lien logo, et le mode renforcé ne vise plus que `<main>`.
- Un `next dev` lancé dans le dépôt écrit des types dans `.next/dev/types`. Périmés, ils cassent `tsc` (`Route` non assignable) jusqu'à la prochaine compilation du serveur de développement.
- Les dossiers préfixés par `_` sont privés dans l'App Router : une URL qui commence par `_` s'écrit `%5F` dans le nom du dossier.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
