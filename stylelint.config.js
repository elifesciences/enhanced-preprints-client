module.exports = {
  extends: ["stylelint-config-standard-scss"],
  "plugins": [
    "stylelint-order",
    "stylelint-selector-bem-pattern",
  ],
  rules: {
    "order/properties-alphabetical-order": true,
    "plugin/selector-bem-pattern": {
      "preset": "bem"
    },
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/dollar-variable-empty-line-before": null,
    "selector-class-pattern": null,
  }
}
