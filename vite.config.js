// vite.config.js (komponent-repo)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.js"),
      name: "GomokuComponent",
      formats: ["es"],
      fileName: "gomoku-component"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "prop-types",
        /^gomoku-app\/.*/
        // OBS: INTE "react-confetti" här – den ska bundlas
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  },
  resolve: {
    alias: {
      // Inga alias till appen här
    }
  }
});
