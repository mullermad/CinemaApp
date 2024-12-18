import { defineNuxtConfig } from "nuxt/config";
import path from "path";

const __dirname = path.resolve();
const ADMINSECRET = "your_admin_secret_here";

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
        httpEndpoint: "https://hasuraapp.hasura.app/v1/graphql",
        autoImports: true,
        httpLinkOptions: {
          headers: {
            Authorization: process.client
              ? `Bearer ${localStorage.getItem("authToken")}`
              : "",
            "Content-Type": "application/json",
            "x-hasura-admin-secret": ADMINSECRET,
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
