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
    "order/order": [
      [
        "custom-properties",
        "dollar-variables",
        "declarations",
        {
          "type": "at-rule",
          "name": "include",
          "hasBlock": false
        },
        {
          "type": "rule",
          "selector": "/^&:\\w/"
        },
        {
          "type": "rule",
          "selector": "/^&::\\w/"
        },
        "rules"
      ]
    ],
  },
};
