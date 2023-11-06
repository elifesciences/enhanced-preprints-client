module.exports = {
  extends: ["stylelint-config-standard-scss"],
  "plugins": [
    "stylelint-order",
    "stylelint-prettier",
    "stylelint-selector-bem-pattern",
  ],
  rules: {
    "order/properties-alphabetical-order": true,
    "plugin/selector-bem-pattern": {
      "preset": "bem"
    },
    "prettier/prettier": true,
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/dollar-variable-empty-line-before": null,
    "selector-class-pattern": null,
  }
}
