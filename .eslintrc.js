module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb/base', 'airbnb-typescript/base', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  rules: {
    "import/prefer-default-export": 0,
    "max-len": ["error", { "code": 240 }],
    "import/extensions": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.stories.*",
          "**/.storybook/**/*.*"
        ],
        "peerDependencies": true
      }
    ],
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  }
};
