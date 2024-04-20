import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-plugin-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
