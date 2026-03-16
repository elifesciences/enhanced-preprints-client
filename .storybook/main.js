const webpack = require('webpack');

module.exports = {
  "stories": ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook-community/storybook-dark-mode",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  "framework": {
    name: "@storybook/nextjs",
    // Add this
    options: {}
  },

  "webpackFinal": async (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve || {}).fallback,
        fs: false,
        stream: false,
        os: false,
      },
    };

    config.plugins.push(
     new webpack.DefinePlugin({
       'process.env.NEXT_PUBLIC_SITE_NAME': JSON.stringify(process.env.NEXT_PUBLIC_SITE_NAME),
     })
   );

    // Return the altered config
    return config;
  },

  docs: {},

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
