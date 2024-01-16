module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', "no-only-tests"],
  extends: ["airbnb/base", "airbnb-typescript/base", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:storybook/recommended", "plugin:json/recommended", "plugin:@next/next/recommended", "plugin:@next/next/core-web-vitals", "plugin:deprecation/recommended"],
  rules: {
    "eol-last": ["error", "always"],
    "deprecation/deprecation": 1,
    "import/prefer-default-export": 0,
    "max-len": ["error", {
      "code": 240
    }],
    "import/extensions": 0,
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ["**/*.stories.*", "**/.storybook/**/*.*", "**/*.test.tsx", "**/browser-tests/**/*.*"],
      "peerDependencies": true
    }],
    "operator-linebreak": 0,
    "no-only-tests/no-only-tests": ["error", {
      "focus": ["only"]
    }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use

    }
  }
};
