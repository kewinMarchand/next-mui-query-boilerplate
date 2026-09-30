import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const RELATIVE_DEPTH = { group: ['../../*'], message: 'Utiliser l’alias @/ au-delà d’un niveau.' }
const ICONS_WRAPPER = {
  group: ['lucide-react'],
  message: 'Les icônes passent par le wrapper @/core/ui/ui-kit/Icon.',
}
const DOMAIN_PUBLIC_API = {
  group: ['@/domains/*/*'],
  message: "Un domaine s'importe uniquement via son index.ts public.",
}

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
      'src/core/api/schema.d.ts',
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
    files: ['src/app/**', 'src/core/**', 'src/features/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, DOMAIN_PUBLIC_API] },
      ],
    },
  },
  {
    files: ['src/core/ui/ui-kit/Icon.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
]

export default config
