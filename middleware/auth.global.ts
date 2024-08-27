// // middleware/auth.ts

// import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
// import { useAuthStore } from "../stores/authStore";
// import { useUserStore } from "../stores/userStore";

// export default defineNuxtRouteMiddleware(async (to) => {
//   const authStore = useAuthStore();
//   const userStore = useUserStore();

//   // Allow initial page render
//   if (process.client) {
//     const token = localStorage.getItem("authToken");
//     const isAuthenticated = !!token;

//     console.log(`Navigating to: ${to.path}`);
//     console.log(`Authenticated: ${isAuthenticated}`);

//     // Allow the homepage to be displayed without checking authentication
//     if (to.path === "/") {
//       return; // No need to redirect or check authentication for the homepage
//     }

//     // Handle authenticated users
//     if (isAuthenticated) {
//       authStore.setToken(token);

//       // Fetch user data if not already fetched
//       if (!userStore.user) {
//         try {
//           await userStore.fetchUser();
//         } catch (err) {
//           console.error("Failed to fetch user data:", err);
//           authStore.clearAuth();
//           return navigateTo("/login");
//         }
//       }

//       // Redirect authenticated users away from login and signup pages
//       if (to.path === "/login" || to.path === "/signup") {
//         console.log(
//           "Redirecting authenticated user from login/signup page to home."
//         );
//         return navigateTo("/");
//       }
//     } else {
//       // Redirect unauthenticated users to login page if trying to access protected routes
//       if (to.path !== "/login" && to.path !== "/signup") {
//         console.log("Redirecting unauthenticated user to login page.");
//         return navigateTo("/login");
//       }
//     }
//   }
// });


// corrcted


// import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
// import { useAuthStore } from "../stores/authStore";
// import { useUserStore } from "../stores/userStore";

// export default defineNuxtRouteMiddleware(async (to) => {
//   const authStore = useAuthStore();
//   const userStore = useUserStore();

//   if (process.client) {
//     const token = localStorage.getItem("authToken");
//     const isAuthenticated = !!token;

//     console.log(`Navigating to: ${to.path}`);
//     console.log(`Authenticated: ${isAuthenticated}`);

//     // Allow the homepage to be displayed regardless of authentication status
//     if (to.path === "/") {
//       if (isAuthenticated) {
//         // If authenticated, set the token in the auth store
//         authStore.setToken(token);

//         // Fetch user data if not already fetched
//         if (!userStore.user) {
//           try {
//             await userStore.fetchUser();
//           } catch (err) {
//             console.error("Failed to fetch user data:", err);
//             authStore.clearAuth();
//             // Optionally, you can still navigate to the homepage even if user data fetch fails
//           }
//         }
//       } else {
//         // If not authenticated, ensure any previous state is cleared
//         authStore.clearAuth();
//         userStore.clearUserData(); // Make sure to implement this if you want to clear user data
//       }

//       return; // Render the homepage without redirection
//     }

//     // Handle other routes as usual
//     if (isAuthenticated) {
//       authStore.setToken(token);

//       if (!userStore.user) {
//         try {
//           await userStore.fetchUser();
//         } catch (err) {
//           console.error("Failed to fetch user data:", err);
//           authStore.clearAuth();
//           return navigateTo("/login");
//         }
//       }

//       if (to.path === "/login" || to.path === "/signup") {
//         return navigateTo("/");
//       }
//     } else {
//       if (to.path !== "/login" && to.path !== "/signup") {
//         return navigateTo("/login");
//       }
//     }
//   }
// });


// 3rd
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
