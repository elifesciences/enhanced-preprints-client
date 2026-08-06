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

const sharedPlugins = {
  '@typescript-eslint': typescriptEslint,
  'import': importPlugin,
  '@stylistic': stylistic,
};

const sharedRules = {
  '@stylistic/arrow-parens': ['error', 'always'],
  '@stylistic/arrow-spacing': 'error',
  '@stylistic/block-spacing': 'error',
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/indent': ['error', 2],
  '@stylistic/max-len': ['error', { 'code': 260 }],
  '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
  '@stylistic/operator-linebreak': 0,
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/semi': ['error', 'always'],
  '@typescript-eslint/consistent-type-imports': ['error', { 'fixStyle': 'inline-type-imports' }],
  '@typescript-eslint/no-non-null-assertion': 'warn',
  '@typescript-eslint/no-unused-vars': 'error',
  'arrow-body-style': ['error', 'as-needed'],
  'import/extensions': 0,
  'import/no-cycle': 'error',
  'import/no-duplicates': 'error',
  'import/no-extraneous-dependencies': ['error', {
    'devDependencies': [
      '**/*.stories.*',
      '**/.storybook/**/*.*',
      '**/*.test.*',
      '**/browser-tests/**/*.*',
      'eslint.config.mjs',
    ],
    'peerDependencies': true,
  }],
  'import/order': ['error', {
    alphabetize: {
      order: 'asc',
    },
    groups: [
      'builtin',
      'external',
      'index',
      'internal',
      'sibling',
      'parent',
    ],
  }],
  'import/prefer-default-export': 0,
  'no-unreachable': 'error',
};

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([{
  files: [
    'src/*.tsx', 'src/**/*.tsx', 'src/*.ts', 'src/**/*.ts', 'src/*.json', 'src/**/*.json',
    'browser-tests/*.tsx', 'browser-tests/**/*.tsx', 'browser-tests/*.ts', 'browser-tests/**/*.ts', 'browser-tests/*.json', 'browser-tests/**/*.json',
    'wiremock/*.tsx', 'wiremock/**/*.tsx', 'wiremock/*.ts', 'wiremock/**/*.ts', 'wiremock/*.json', 'wiremock/**/*.json',
  ],
  languageOptions: {
    parser: tsParser,
    parserOptions: { project: './tsconfig.json' },
  },
  plugins: {
    ...sharedPlugins,
    'no-only-tests': noOnlyTests,
    'next': fixupPluginRules(nextPlugin),
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
    ...sharedRules,
    '@typescript-eslint/no-deprecated': 'warn',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    'no-only-tests/no-only-tests': ['error', { 'focus': ['only'] }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
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
    '@stylistic/comma-dangle': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/semi': 'off',
  },
}, {
  files: ['eslint.config.mjs'],
  languageOptions: {
    parser: tsParser,
    sourceType: 'module',
  },
  plugins: { ...sharedPlugins },
  rules: { ...sharedRules },
}, globalIgnores([
  '**/.eslintrc.js',
  '**/next.config.js',
  '**/stylelint.config.js',
  '**/next-env.d.ts',
  '**/playwright.config.ts',
  '**/jest.config.js',
  '**/.yarn/',
])]);
