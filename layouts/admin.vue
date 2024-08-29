

<!-- <script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

// Access the auth and user stores
const authStore = useAuthStore();
const userStore = useUserStore();

// Refs to track loading state and user data
const loading = ref(true);
const user = ref(null);

// Computed property to determine if the user is authenticated
const isAuthenticated = computed(() => !!authStore.getToken());

const isSidebarOpen = ref(false);
const isSmallScreen = ref(false);

const updateScreenSize = () => {
  if (typeof window !== 'undefined') {
    isSmallScreen.value = window.innerWidth < 640;
    // Ensure the sidebar is hidden on small screens by default
    if (isSmallScreen.value) {
      isSidebarOpen.value = false;
    } else {
      // Ensure the sidebar is open on larger screens
      isSidebarOpen.value = true;
    }
  }
};

const toggleSidebar = () => {
  // Only toggle the sidebar if it's a small screen
  if (isSmallScreen.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

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

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScreenSize);
  }
});
</script> -->


<!-- <style scoped>
/* Ensures the navigation bar stays fixed at the top */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
}
</style> -->

<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <span>Loading...</span>
    </div>

    <div v-else class="bg-gray-900 min-h-screen flex flex-col lg:flex-row">
      <!-- Navigation Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <!-- Hamburger Menu Button - visible on medium and small screens -->
          <!-- <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button> -->
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white lg:hidden">Admin Page</h1>
        </div>
      </nav>

      <!-- Sidebar - Hidden on small screens, shown on large screens or when isSidebarOpen is true -->
      <div
        :class="{
          'lg:w-64': true, // Fixed width on large screens
          'w-64': isSidebarOpen && isMediumOrSmallScreen, // Show sidebar when open on small/medium screens
          'hidden': isMediumOrSmallScreen && !isSidebarOpen // Hide sidebar on small/medium screens when closed
        }"
        class="bg-gray-800 transition-width duration-300 ease-in-out"
      >
        <Adminsidebar v-if="!isMediumOrSmallScreen || isSidebarOpen" />
      </div>

      <!-- Mobile Menu - Shown only on small screens when the sidebar is open -->
      <div
        v-if="isSidebarOpen && isMediumOrSmallScreen"
        class="fixed inset-0 z-40 bg-gray-800 bg-opacity-75 lg:hidden"
        @click="toggleSidebar"
      >
        <div class="flex flex-col items-center pt-16">
          <Adminsidebar />
        </div>
      </div>

    
 <!-- <div>
<LoginNavbar v-if="isAuthenticated" :user="user" /> 
       <Nav v-else />
 </div> -->
      <!-- Main Content -->
      <div :class="{'flex-1': true, 'ml-0': isSidebarOpen || !isMediumOrSmallScreen, 'lg:-ml-64': !isMediumOrSmallScreen}" class="pt-16">
  <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

       <LoginNavbar v-if="isAuthenticated" :user="user" /> 
       <Nav v-else />
        <slot />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

// Access the auth and user stores
const authStore = useAuthStore();
const userStore = useUserStore();

// Refs to track loading state and user data
const loading = ref(true);
const user = ref(null);

// Computed property to determine if the user is authenticated
const isAuthenticated = computed(() => !!authStore.getToken());

const isSidebarOpen = ref(false);
const isMediumOrSmallScreen = ref(window.innerWidth < 1024);

const updateScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMediumOrSmallScreen.value = window.innerWidth < 1024; // 1024px is the breakpoint for large screens
    // Ensure the sidebar is hidden on medium or small screens by default
    if (isMediumOrSmallScreen.value) {
      isSidebarOpen.value = false;
    } else {
      // Ensure the sidebar is open on large screens
      isSidebarOpen.value = true;
    }
  }
};

const toggleSidebar = () => {
  // Only toggle the sidebar if it's a medium or small screen
  if (isMediumOrSmallScreen.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

// Check authentication and load user data on component mount
onMounted(() => {
  // Initialize screen size
  updateScreenSize();

  // Add event listener for window resize to update screen size
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateScreenSize);
  }

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

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScreenSize);
  }
});
</script>

<style scoped>
/* Adjustments for the sidebar transition */
.transition-width {
  transition: width 0.3s ease;
}

/* Ensuring the content area takes full width when sidebar is hidden */
@media (max-width: 1024px) {
  .hidden {
    display: none;
  }
}

.flex-1 {
  flex: 1;
}
</style>
