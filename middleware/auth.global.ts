
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (process.client) {
    const token = localStorage.getItem("authToken");
    // const userData = JSON.parse(localStorage.getItem("user")); // Assuming user data includes user_id and role
    const userJson = localStorage.getItem("user");
    const userData = userJson ? JSON.parse(userJson) : null;
    const isAuthenticated = !!token;
    const userRole = userData?.role;

    console.log(`Navigating to: ${to.path}`);
    console.log(`Authenticated: ${isAuthenticated}`);
    console.log(`User Role: ${userRole}`);

    // Allow the homepage to be displayed regardless of authentication status
    if (to.path === "/") {
      if (isAuthenticated) {
        authStore.setToken(token);

        // Fetch user data if not already fetched
        if (!userStore.user) {
          try {
            await userStore.fetchUser();
          } catch (err) {
            console.error("Failed to fetch user data:", err);
            authStore.clearAuth();
            userStore.clearUserData();
          }
        }
      } else {
        authStore.clearAuth();
        userStore.clearUserData();
      }

      return; // Render the homepage without redirection
    }

    // Handle authentication and role-based navigation
    if (isAuthenticated) {
      authStore.setToken(token);

      if (!userStore.user) {
        try {
          await userStore.fetchUser();
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          authStore.clearAuth();
          return navigateTo("/login");
        }
      }

      // Redirect admin to admin routes only
      if (userRole === "admin") {
        if (!to.path.startsWith("/admin")) {
          return navigateTo("/admin"); // Redirect admin to /admin if trying to access other routes
        }
      } else {
        // Redirect non-admins away from admin routes
        if (to.path.startsWith("/admin")) {
          return navigateTo("/"); // Redirect non-admins to the homepage
        }
      }

      // Redirect non-user roles away from user routes
      if (to.path.startsWith("/user") && userRole !== "user") {
        return navigateTo("/"); // Redirect non-user roles to the homepage
      }

      // Prevent authenticated users from accessing login/signup pages
      if (to.path === "/login" || to.path === "/signup") {
        return navigateTo("/");
      }
    } else {
      // Redirect unauthenticated users to login, except for public pages
      if (to.path !== "/login" && to.path !== "/signup") {
        return navigateTo("/login");
      }
    }
  }
});
