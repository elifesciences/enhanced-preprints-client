import { defineConfig, globalIgnores } from "eslint/config";

import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import noOnlyTests from "eslint-plugin-no-only-tests";
import { fixupPluginRules } from "@eslint/compat";
import deprecationPlugin from "eslint-plugin-deprecation";
import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import stylistic from '@stylistic/eslint-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { FlatCompat } from "@eslint/eslintrc";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});
export default defineConfig([{
    languageOptions: {
        parser: tsParser,

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "no-only-tests": noOnlyTests,
        "deprecation": fixupPluginRules(deprecationPlugin),
        "next": fixupPluginRules(nextPlugin),
        "import": importPlugin,
        "@stylistic": stylistic
    },
    extends: compat.extends(
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:storybook/recommended",
        "plugin:json/recommended",
        "plugin:@next/next/recommended",
        "plugin:@next/next/core-web-vitals",
    ),
    rules: {
        "@stylistic/eol-last": ["error", "always"],
        "deprecation/deprecation": "warn",
        "import/prefer-default-export": 0,

        "@stylistic/max-len": ["error", {
            "code": 240,
        }],

        "import/extensions": 0,

        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": [
                "**/*.stories.*",
                "**/.storybook/**/*.*",
                "**/*.test.*",
                "**/browser-tests/**/*.*",
            ],

            "peerDependencies": true,
        }],

        "@stylistic/operator-linebreak": 0,

        "no-only-tests/no-only-tests": ["error", {
            "focus": ["only"],
        }],

        "@stylistic/jsx-indent": ["error", 2],
        "@stylistic/jsx-indent-props": ["error", 2],
        "@typescript-eslint/consistent-type-imports": ["error", { "fixStyle": "inline-type-imports" }],
        "@typescript-eslint/no-non-null-assertion": "warn",
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}, globalIgnores([
    "**/.eslintrc.js",
    "**/next.config.js",
    "**/stylelint.config.js",
    "**/next-env.d.ts",
    "**/playwright.config.ts",
    "**/jest.config.js",
])]);
