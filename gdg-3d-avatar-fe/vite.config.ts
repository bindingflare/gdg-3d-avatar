// vite.config.ts

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        create: path.resolve(__dirname, "create/index.html"),
      },
    },
  },
});

// https://vite.dev/guide/build.html#multi-page-app
