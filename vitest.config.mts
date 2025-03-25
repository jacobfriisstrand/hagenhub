import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      include: ["src/"], // Only track coverage for the /api folder
      exclude: ["**/node_modules/**", "**/*.test.ts", "**/*.spec.ts", "**/src/app/**", "**/*.config.ts", "**/*.mjs"],
    },
  },
});
