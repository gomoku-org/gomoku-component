/** @type { import('@storybook/react-vite').StorybookConfig } */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    // Om Board fortfarande strular i SB, kan du exkludera dess stories:
    // "!../src/components/Board/**",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  docs: { autodocs: true },
  async viteFinal(cfg) {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      // Mocka app-hookarna så Board kan laddas i Storybook
      "gomoku-app/context": path.resolve(__dirname, "./mocks/context.js"),
      "gomoku-app/api":     path.resolve(__dirname, "./mocks/api.js"),
    };
    return cfg;
  },
};

export default config;
