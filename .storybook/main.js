module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-dark-mode"
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

    // Return the altered config
    return config;
  },
  docs: {
    autodocs: true
  },
  staticDirs: ['../public']
};
