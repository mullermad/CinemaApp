<template>
  <div class="bg-gray-900 min-h-screen">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 w-full z-50 mb-5 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       
        <!-- Conditional rendering based on screen size -->
        <div>
          <!-- Hamburger Menu Button - visible on small screens -->
          <button
            v-if="isSmallScreen"
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          <!-- "Admin Page" Header - visible on large screens -->
          <h1 v-else class="text-xl font-semibold text-gray-900 dark:text-white">Admin Page</h1>
        </div>
      </div>
    </nav>

    <!-- Sidebar - Hidden by default on small screens, shown when isSidebarOpen is true -->
    <div 
      :class="{
        'block': !isSmallScreen || isSidebarOpen,
        'hidden': isSmallScreen && !isSidebarOpen
      }"
      class="fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 sm:relative sm:block sm:w-auto"
    >
      <Adminsidebar />
    </div>

    <!-- Main Content -->
    <div class="pt-16"> <!-- Adjust for the fixed navbar height -->
      <slot />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isSidebarOpen = ref(false);
const isSmallScreen = ref(window.innerWidth < 640);

const toggleSidebar = () => {
  // Only toggle the sidebar if it's a small screen
  if (isSmallScreen.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

// Update screen size status
const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640;
  // Ensure the sidebar is hidden on small screens by default
  if (isSmallScreen.value) {
    isSidebarOpen.value = false;
  } else {
    // Ensure the sidebar is open on larger screens
    isSidebarOpen.value = true;
  }
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
  updateScreenSize(); // Initialize sidebar state on mount
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<style scoped>
/* Ensures the navigation bar stays fixed at the top */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
}
</style>
