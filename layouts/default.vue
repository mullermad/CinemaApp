<template>
  <div class="flex flex-col min-h-screen">
    <!-- Render nothing until loading is complete to prevent flashing -->
    <div v-if="loading" class="flex-grow bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <!-- Optional: Add a loading spinner or message here -->
      <span>Loading...</span>
    </div>

    <!-- Conditionally render LoginNavbar if authenticated, otherwise render Nav -->
    <div v-else class="flex-grow">
      <LoginNavbar v-if="isAuthenticated" :user="user" />
      <Nav v-else />
      <NuxtPage />
    </div>

    <!-- Footer that always appears at the bottom -->
    <Footer class="mt-auto" />
  </div>
</template>




<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/authStore"; // Adjust path if necessary
import { useUserStore } from "@/stores/userStore"; // Adjust path if necessary

// Access the auth and user stores
const authStore = useAuthStore();
const userStore = useUserStore();

// Refs to track loading state and user data
const loading = ref(true);
const user = ref(null);

// Computed property to determine if the user is authenticated
const isAuthenticated = computed(() => !!authStore.getToken());

// Check authentication and load user data on component mount
onMounted(() => {
  // Check if token exists in localStorage
  const token = authStore.getToken();

  // Check if user data exists in localStorage
  const storedUser = localStorage.getItem('user');
  
  if (token && storedUser) {
    try {
      user.value = JSON.parse(storedUser); // Parse and set user data
      userStore.setUser(user.value); // Optionally set user data in the store
      loading.value = false; // Set loading to false
    } catch (e) {
      console.error("Failed to parse user data from localStorage:", e);
      authStore.clearAuth(); // Clear auth if parsing fails
      userStore.clearUserData(); // Clear user data if parsing fails
      loading.value = false; // Set loading to false
    }
  } else {
    authStore.clearAuth(); // Clear auth if token or user data is missing
    userStore.clearUserData(); // Clear user data if token or user data is missing
    loading.value = false; // Set loading to false
  }
});
</script>
<style scoped>
/* Ensure Footer is always at the bottom of the page */
.footer {
  margin-top: auto;
}
</style>