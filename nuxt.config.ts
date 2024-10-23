import { defineNuxtConfig } from "nuxt/config";
import path from "path";

const __dirname = path.resolve();

export default defineNuxtConfig({
  target: "static",
  ssr: false,
  generate: {
    fallback: true,
  },
  modules: ["@nuxtjs/apollo", "@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs: ["./stores"],
  },
  // router: {
  //   middleware: ["auth.global.ts"], // Apply middleware globally if needed
  // },
  apollo: {
    clients: {
      default: {
        // httpEndpoint: "https://hasuraapp.hasura.app/v1/graphql",
        httpEndpoint: "http://localhost:8080/v1/graphql",
        autoImports: true,
        httpLinkOptions: {
          headers: {
            Authorization: process.client
              ? `Bearer ${localStorage.getItem("authToken")}`
              : "",
            "Content-Type": "application/json",
          },
        },
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
  plugins: ["@/plugins/auth.ts"],
});

