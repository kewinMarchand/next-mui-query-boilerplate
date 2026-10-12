import { existsSync, readdirSync } from 'node:fs'

import boundaries from '@boundaries/eslint-plugin'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const MODULES_ROOT = 'src/modules'
const LAYERS = ['domain', 'application', 'infrastructure', 'ui']

const MODULES_WITHOUT_APPLICATION = readdirSync(MODULES_ROOT).filter(
  (module) => !existsSync(`${MODULES_ROOT}/${module}/application`),
)

const RELATIVE_DEPTH = { group: ['../../*'], message: 'Utiliser l’alias @/ au-delà d’un niveau.' }
const ICONS_WRAPPER = {
  group: ['lucide-react'],
  message: 'Les icônes passent par le wrapper @/shared/ui/kit/Icon.',
}
const FRAMEWORKS = {
  group: [
    'react',
    'react/*',
    'react-dom',
    'react-dom/*',
    'next',
    'next/*',
    '@mui/*',
    '@emotion/*',
    '@tanstack/*',
    'react-hook-form',
    '@hookform/*',
    'embla-carousel',
    'embla-carousel-*',
  ],
  message: 'Le domaine ne dépend d’aucun framework : données immuables et fonctions pures.',
}

const sameModule = (type) => ({
  element: { type, captured: { module: '{{ from.element.captured.module }}' } },
})

const policy = (from, to, message, extra = {}) => ({
  from: { element: { type: from } },
  allow: { to: typeof to === 'string' ? { element: { type: to } } : to, ...extra },
  message,
})

const ARCHITECTURE_POLICIES = [
  policy('routes', 'views', 'Routage : vues, index public des modules et socle seulement.'),
  policy('routes', 'module', 'Routage : vues, index public des modules et socle seulement.'),
  policy('routes', 'shared', 'Routage : vues, index public des modules et socle seulement.'),
  policy('routes', 'routes', 'Routage : vues, index public des modules et socle seulement.'),
  policy('views', 'module', 'Vue : index public des modules et socle seulement.'),
  policy('views', 'shared', 'Vue : index public des modules et socle seulement.'),
  policy(
    'views',
    { element: { type: 'views', captured: { view: '{{ from.element.captured.view }}' } } },
    'Vue : index public des modules et socle seulement.',
  ),
  ...LAYERS.map((layer) =>
    policy('module', sameModule(layer), 'Index public : seulement les couches de son module.'),
  ),
  policy('domain', sameModule('domain'), 'Domaine : seulement le domaine de son module.'),
  policy('domain', 'shared', 'Domaine : seulement les types du socle.', {
    dependency: { kind: 'type' },
  }),
  policy('application', sameModule('domain'), 'Application : domaine et infrastructure du module.'),
  policy(
    'application',
    sameModule('infrastructure'),
    'Application : domaine et infrastructure du module.',
  ),
  policy('application', 'shared', 'Application : seulement les types du socle.', {
    dependency: { kind: 'type' },
  }),
  policy(
    'infrastructure',
    sameModule('domain'),
    'Infrastructure : domaine du module et client HTTP.',
  ),
  policy(
    'infrastructure',
    sameModule('infrastructure'),
    'Infrastructure : domaine du module et client HTTP.',
  ),
  policy('infrastructure', 'shared-api', 'Infrastructure : domaine du module et client HTTP.'),
  policy('ui', sameModule('domain'), 'Interface : domaine, application et interface du module.'),
  policy(
    'ui',
    sameModule('application'),
    'Interface : domaine, application et interface du module.',
  ),
  policy('ui', sameModule('ui'), 'Interface : domaine, application et interface du module.'),
  policy('ui', 'shared', 'Interface : domaine, application et interface du module.'),
  ...MODULES_WITHOUT_APPLICATION.map((module) => ({
    from: { element: { type: 'ui', captured: { module } } },
    allow: { to: sameModule('infrastructure') },
  })),
  policy('shared', 'shared', 'Socle : n’importe ni module, ni vue, ni routage.'),
]

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
      'src/shared/api/schema.d.ts',
    ],
  },
  {
    settings: { 'import/internal-regex': '^@/' },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/no-unescaped-entities': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER] }],
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        ...LAYERS.map((layer) => ({
          type: layer,
          pattern: `${MODULES_ROOT}/*/${layer}`,
          capture: ['module'],
          partialMatch: false,
          exclusive: true,
        })),
        { type: 'module', pattern: `${MODULES_ROOT}/*`, capture: ['module'], partialMatch: false },
        { type: 'shared-api', pattern: 'src/shared/api', partialMatch: false, exclusive: true },
        { type: 'shared', pattern: 'src/shared/*', capture: ['area'], partialMatch: false },
        { type: 'views', pattern: 'src/views/*', capture: ['view'], partialMatch: false },
        { type: 'routes', pattern: 'src/app', partialMatch: false },
        // Fichiers à la racine de src/ (proxy.ts) : couche de routage, comme app/.
        { type: 'routes', pattern: 'src', partialMatch: false },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkInternals: false,
          message:
            'Architecture : la couche « {{ from.element.type }} » ne peut pas importer « {{ to.element.type }} ».',
          policies: ARCHITECTURE_POLICIES,
        },
      ],
    },
  },
  {
    files: ['src/modules/*/domain/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, FRAMEWORKS] }],
    },
  },
  {
    files: ['tools/**'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['src/shared/ui/kit/Icon.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    files: ['src/shared/ui/kit/Picture.tsx'],
    rules: { '@next/next/no-img-element': 'off' },
  },
]

export default config
