import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';

import importPlugin from 'eslint-plugin-import';
import jsonPlugin from 'eslint-plugin-json';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import reactPlugin from 'eslint-plugin-react';
import storybookPlugin from 'eslint-plugin-storybook';


const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  files: [
    'src/*.tsx', 'src/**/*.tsx', 'src/*.ts', 'src/**/*.ts', 'src/*.json', 'src/**/*.json',
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
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ...storybookPlugin.configs['flat/recommended'],
    jsonPlugin.configs.recommended,
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
    '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
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
  files: ['eslint.config.mjs'],
  languageOptions: {
    parser: tsParser,
    sourceType: 'module',
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
