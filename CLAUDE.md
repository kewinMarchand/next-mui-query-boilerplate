# CLAUDE.md — next-mui-query-boilerplate

Boilerplate personnel. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet.

## Choix du projet

- **Type** : application Next.js App Router, rendu serveur par défaut.
- **Design system** : MUI v9, branché via `@mui/material-nextjs/v16-appRouter` (`AppRouterCacheProvider` dans `src/app/layout.tsx`). Thème dans `src/core/theme/theme.ts` (`cssVariables: true`).
- **Données serveur côté client** : TanStack Query. Un `QueryClient` par navigateur, créé par `useState(makeQueryClient)` dans `src/core/providers/Providers.tsx`. Devtools en développement uniquement.
- **Formulaires** : react-hook-form + zod (`@hookform/resolvers/zod`), schéma dans `common/models/` du domaine.
- **Icônes** : `lucide-react`, uniquement via `src/core/ui/ui-kit/Icon.tsx` (règle ESLint).
- **Unité de police** : `px`. Police Inter via `next/font/google` (servie localement au build).
- **Langue** : français uniquement. URLs en français (`/taches`, `/contact`).
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
- Playwright sert le build sur le port 3100, Lighthouse sur le 3200, pour ne pas entrer en collision avec `make up` (3000).
- Un `aria-label` sur un `div` sans rôle est une violation axe (`aria-prohibited-attr`) : les squelettes de chargement portent `role="status"`.
