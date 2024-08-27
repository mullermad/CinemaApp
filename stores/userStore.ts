// import { defineStore } from "pinia";
// import { ref, computed, watch } from "vue";
// import { useAuthStore } from "./authStore";
// import { useQuery } from "@vue/apollo-composable";
// import gql from "graphql-tag";

// export const useUserStore = defineStore("user", () => {
//   const user = ref<any>(null);

//   // Load user data from localStorage if available
//   if (typeof window !== "undefined") {
//     // Ensure it's only run on the client side
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         user.value = JSON.parse(userData);
//       } catch (e) {
//         console.error("Failed to parse user data from localStorage:", e);
//         localStorage.removeItem("user"); // Clear corrupted data
//       }
//     }
//   }

//   const setUser = (userData: any) => {
//     user.value = userData;
//     console.log("am inside userstore", user.value);

//     if (typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
//     }
//   };

//   const clearUserData = () => {
//     user.value = null;
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user"); // Remove user data from localStorage
//     }
//   };

//   const USER_QUERY = gql`
//     query GetUser {
//       user {
//         user_id
//         username
//         email
//         role
//       }
//     }
//   `;

//   // Function to fetch user data from server
//   const fetchUser = async () => {
//     const authStore = useAuthStore();

//     if (authStore.getToken()) {
//       try {
//         const { result, loading, error } = useQuery(USER_QUERY);
//         console.log("reeeeeeeeeeeeeeeeeeeeeeesult", result);

//         watch(
//           result,
//           (newResult) => {
//             if (newResult?.user) {
//               setUser(newResult.user);
//             }
//           },
//           { immediate: true }
//         );
//         console.log("kkkkkkkkkkkk", result);

//         if (error.value) {
//           throw new Error(`GraphQL query error: ${error.value.message}`);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         authStore.clearAuth(); // Clear auth if fetching user fails
//         throw err; // Re-throw error to handle it in middleware or elsewhere
//       }
//     }
//   };

//   return { user, setUser, clearUserData, fetchUser };
// });
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "./authStore";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);

  // Load user data from localStorage if available
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        user.value = JSON.parse(userData);
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        localStorage.removeItem("user"); // Clear corrupted data
      }
    }
  }

  const setUser = (userData: any) => {
    user.value = userData;
    console.log("User data set in store:", user.value);

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
    }
  };

  const clearUserData = () => {
    user.value = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("user"); // Remove user data from localStorage
    }
  };

  const USER_QUERY = gql`
    query GetAuthenticatedUser {
      authenticatedUser {
        user_id
        username
        email
        role
      }
    }
  `;

  // Function to fetch user data from server
  const fetchUser = async () => {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    

    if (token) {
      try {
        const { result, loading, error } = useQuery(
          USER_QUERY,
          {},
          {
            context: {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the headers
              },
            },
          }
        );

        // Use `useResult` to handle the response data
        const userData = useResult(
          result,
          null,
          (data) => data.authenticatedUser
        );

        watch(
          userData,
          (newUserData) => {
            if (newUserData) {
              setUser(newUserData);
            }
          },
          { immediate: true }
        );

        if (error.value) {
          throw new Error(`GraphQL query error: ${error.value.message}`);
        }
    console.log("inside usestore fetch usersssssssss  userData", userData);

      } catch (err) {
        console.error("Failed to fetch user data:", err);
        authStore.clearAuth(); // Clear auth if fetching user fails
        clearUserData(); // Clear user data if fetching fails
        throw err; // Re-throw error to handle it in middleware or elsewhere
      }
    }
  
  
  
  };

  return { user, setUser, clearUserData, fetchUser };
});
