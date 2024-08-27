import { defineNuxtConfig } from "nuxt/config";
import path from "path";

const __dirname = path.resolve();

export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs: ["./stores"],
  },
  router: {
    middleware: ["auth"], // Apply middleware globally if needed
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
        autoImports: true,
      },
    },
  },
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
  plugins: ["@/plugins/auth.ts",],
});

