/** @type { import('@storybook/react-vite').StorybookConfig } */
const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  docs: { autodocs: true },
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      // mocka app-hookar så Board kan laddas i SB
      "gomoku-app/context": path.resolve(__dirname, "./mocks/context.js"),
      "gomoku-app/api":     path.resolve(__dirname, "./mocks/api.js"),
    };
    return cfg;
  },
};
