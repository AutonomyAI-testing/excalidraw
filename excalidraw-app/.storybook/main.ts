import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...((config.resolve.alias as Record<string, string>) || {}),
      "@excalidraw/common": resolve(__dirname, "../../packages/common/src/index.ts"),
      "@excalidraw/element": resolve(__dirname, "../../packages/element/src/index.ts"),
      "@excalidraw/excalidraw": resolve(__dirname, "../../packages/excalidraw/index.tsx"),
      "@excalidraw/math": resolve(__dirname, "../../packages/math/src/index.ts"),
      "@excalidraw/utils": resolve(__dirname, "../../packages/utils/src/index.ts"),
    };
    // Remove PWA plugin that causes issues with Storybook build
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin: any) => {
        if (!plugin) return true;
        const name = Array.isArray(plugin) ? plugin[0]?.name : plugin?.name;
        return !name || !name.includes("pwa");
      });
    }
    return config;
  },
};

export default config;
