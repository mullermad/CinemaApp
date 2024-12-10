import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://192.168.32.1:3000",
    setupNodeEvents(on, config) {
      // require("cypress-localstorage-commands/plugin")(on, config);
      // return config;
    },
  },
});
