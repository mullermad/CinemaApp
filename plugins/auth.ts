import { defineNuxtPlugin } from "nuxt/app";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  // const authStore = useAuthStore();
  const userStore = useUserStore();

  if (process.client) {
    const token = localStorage.getItem("authToken");
    console.log("lllllllllllllllllllllllllll plugin", token);

    if (userStore.user) {
      console.log("fetchinggggggggggggggggggggggggggggggg");
      
      await userStore.fetchUser();
    }
  }
});
