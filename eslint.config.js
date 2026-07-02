const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const noOnlyTests = require("eslint-plugin-no-only-tests");
const { fixupPluginRules } = require("@eslint/compat");
const nextPlugin = require("@next/eslint-plugin-next");
const js = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "no-only-tests": noOnlyTests,
        "next": fixupPluginRules(nextPlugin),
        "import": importPlugin,
    },
    extends: [
        ...compat.extends("plugin:react/recommended"),
        ...compat.extends("plugin:react/jsx-runtime"),
        ...compat.extends("plugin:storybook/recommended"),
        ...compat.extends("plugin:json/recommended-legacy"),
        ...compat.extends("plugin:@next/next/recommended"),
        ...compat.extends("plugin:@next/next/core-web-vitals"),
    ],
    rules: {
        "eol-last": ["error", "always"],
        "@typescript-eslint/no-deprecated": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        "import/prefer-default-export": 0, 
        "max-len": ["error", {
            "code": 240,
        }],

        "import/order": ["error", {
            alphabetize: {
                order: "asc",
            },
            groups: [
                "builtin",
                "external",
                "internal",
                "index",
                "sibling",
                "parent",
            ],
        }],

        "import/extensions": 0,
        "import/no-duplicates": "error",

        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": [
                "**/*.stories.*",
                "**/.storybook/**/*.*",
                "**/*.test.*",
                "**/browser-tests/**/*.*",
            ],

            "peerDependencies": true,
        }],

        "operator-linebreak": 0,

        "no-only-tests/no-only-tests": ["error", {
            "focus": ["only"],
        }],

        "react/jsx-indent": ["error", 2],
        "react/jsx-indent-props": ["error", 2],
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
