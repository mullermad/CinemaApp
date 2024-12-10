import { defineNuxtPlugin } from "nuxt/app";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  // const authStore = useAuthStore();
  const userStore = useUserStore();

  if (process.client) {
    const token = localStorage.getItem("authToken");

    if (userStore.user) {
      await userStore.fetchUser();
    }
  }
});
