import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  docs: { autodocs: true },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "gomoku-app/context": path.resolve(__dirname, "./mocks/context.js"),
      "gomoku-app/api":     path.resolve(__dirname, "./mocks/api.js")
    };
    return config;
  }
};
