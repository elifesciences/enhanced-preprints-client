const { fixupPluginRules } = require('@eslint/compat');
const {
  FlatCompat,
} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const stylistic = require('@stylistic/eslint-plugin');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const {
  defineConfig,
  globalIgnores,
} = require('eslint/config');

const importPlugin = require('eslint-plugin-import');
const noOnlyTests = require('eslint-plugin-no-only-tests');


const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([{
  files: [
    'src/.*.tsx', 'src/**/.*.tsx', 'src/*.ts', 'src/**/*.ts', 'src/*.json', 'src/**/*.json',
    'browser-tests/*.tsx', 'browser-tests/**/*.tsx', 'browser-tests/*.ts', 'browser-tests/**/*.ts', 'browser-tests/*.json', 'browser-tests/**/*.json',
    'wiremock/*.tsx', 'wiremock/**/*.tsx', 'wiremock/*.ts', 'wiremock/**/*.ts', 'wiremock/*.json', 'wiremock/**/*.json',
  ],
  languageOptions: {
    parser: tsParser,

    parserOptions: {
      project: './tsconfig.json',
    },
  },

  plugins: {
    '@typescript-eslint': typescriptEslint,
    'no-only-tests': noOnlyTests,
    'next': fixupPluginRules(nextPlugin),
    'import': importPlugin,
    '@stylistic': stylistic,
  },
  extends: [
    ...compat.extends('plugin:react/recommended'),
    ...compat.extends('plugin:react/jsx-runtime'),
    ...compat.extends('plugin:storybook/recommended'),
    ...compat.extends('plugin:json/recommended-legacy'),
    ...compat.extends('plugin:@next/next/recommended'),
    ...compat.extends('plugin:@next/next/core-web-vitals'),
  ],
  rules: {
    '@stylistic/eol-last': ['error', 'always'],
    'no-unreachable': 'error',
    '@typescript-eslint/no-deprecated': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    'import/prefer-default-export': 0,
    '@stylistic/max-len': ['error', {
      'code': 260,
    }],
    '@stylistic/quotes': ['error', 'single'],

    'import/order': ['error', {
      alphabetize: {
        order: 'asc',
      },
      groups: [
        'builtin',
        'external',
        'internal',
        'index',
        'sibling',
        'parent',
      ],
    }],

    'import/extensions': 0,
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',

    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/*.stories.*',
        '**/.storybook/**/*.*',
        '**/*.test.*',
        '**/browser-tests/**/*.*',
      ],

      'peerDependencies': true,
    }],

    '@stylistic/operator-linebreak': 0,
    '@stylistic/indent': ['error', 2],

    'no-only-tests/no-only-tests': ['error', {
      'focus': ['only'],
    }],

    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    '@typescript-eslint/consistent-type-imports': ['error', { 'fixStyle': 'inline-type-imports' }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
}, {
  files: [
    'src/*.json', 'src/**/*.json',
    'browser-tests/*.json', 'browser-tests/**/*.json',
    'wiremock/*.json', 'wiremock/**/*.json',
  ],
  rules: {
    '@stylistic/quotes': 'off',
  },
}, {
  files: ['eslint.config.js'],
  languageOptions: {
    parser: tsParser,
    sourceType: 'commonjs',
  },
  plugins: {
    '@typescript-eslint': typescriptEslint,
    'import': importPlugin,
    '@stylistic': stylistic,
  },
  rules: {
    'no-unreachable': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', { 'fixStyle': 'inline-type-imports' }],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/max-len': ['error', {
      'code': 260,
    }],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/operator-linebreak': 0,

    'import/order': ['error', {
      alphabetize: {
        order: 'asc',
      },
      groups: [
        'builtin',
        'external',
        'internal',
        'index',
        'sibling',
        'parent',
      ],
    }],

    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
  },
}, globalIgnores([
  '**/.eslintrc.js',
  '**/next.config.js',
  '**/stylelint.config.js',
  '**/next-env.d.ts',
  '**/playwright.config.ts',
  '**/jest.config.js',
  '**/.yarn/'
])]);
