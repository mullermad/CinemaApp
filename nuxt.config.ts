import { defineNuxtConfig } from "nuxt/config";
import path from "path";

const __dirname = path.resolve();

export default defineNuxtConfig({
  alias: {
    "@": path.resolve(__dirname, "./"), // Resolve paths relative to __dirname
  },
  css: ["@/assets/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
