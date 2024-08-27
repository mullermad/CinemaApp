import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);

  // Load token from localStorage if on the client side
  if (process.client) {
    token.value = localStorage.getItem("authToken");
  }

  const setToken = (newToken: string) => {
    if (process.client) {
      localStorage.setItem("authToken", newToken); // Set token in localStorage
    }
    token.value = newToken;
  };

  const clearAuth = () => {
    if (process.client) {
      localStorage.removeItem("authToken"); // Remove token from localStorage
    }
    token.value = null;
  };

  const getToken = () => token.value;

  return { token, setToken, clearAuth, getToken };
});
