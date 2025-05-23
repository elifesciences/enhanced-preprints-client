module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: [
    "stylelint-order",
    "stylelint-prettier",
    "stylelint-selector-bem-pattern",
  ],
  rules: {
    "plugin/selector-bem-pattern": {
      preset: "bem",
    },
    "prettier/prettier": [
      true,
      {
        printWidth: 240,
      },
    ],
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/dollar-variable-empty-line-before": null,
    "selector-class-pattern": null,
  },
};
