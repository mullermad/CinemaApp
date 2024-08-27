<template>
  <nav class="bg-gray-800 fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between shadow-sm dark:shadow-none">
    <!-- Home Link on the Left -->
    <nuxt-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">MovieVerse</span>
    </nuxt-link>
    
    <!-- Favorite Movies Link and Profile Avatar on the Right -->
    <div class="flex items-center space-x-4 ml-auto">
      <nuxt-link to="/bookmark" class=" px-5 mr-5 text-white text-lg font-semibold">
        favorites
      </nuxt-link>
      <div class="relative group">
        <img
          src="@/assets/img/profile.jpg"
          alt="Profile Avatar"
          class="w-10 h-10 rounded-full object-cover cursor-pointer"
          @click="toggleDropdown"
        />
       
        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20"
        >
          <div class="p-4">
            <p class="text-gray-900 dark:text-white text-lg">{{ userRole }}</p>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-600">
            <button
              @click="logout"
              class="w-full text-gray-900 dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-b-lg px-4 py-2 text-left transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Adjust path if necessary
import { useUserStore } from '@/stores/userStore'; // Adjust path if necessary
import { useRouter } from 'vue-router';

// Use auth store, user store, and router
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

// Reactive variables for user data
const avatarUrl = ref('');
const userRole = ref('');
const isDropdownOpen = ref(false);

// Fetch user data when the component is mounted
onMounted(() => {
  const user = userStore.user; // Get user from userStore
  if (user) {
    avatarUrl.value = user.avatarUrl || '@/assets/img/me.jpg'; // Use a default image if none is provided
    userRole.value = user.role;
  }

});

// Function to handle logout
const logout = async () => {
  // Clear the authentication token
  authStore.clearAuth();

  // Clear user-related data
  userStore.clearUserData();

  // Redirect to login page or home page
  router.push('/login');
};

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('nav')) {
    isDropdownOpen.value = false;
  }
});
</script>

<style scoped>
/* Adds a subtle drop shadow to the navbar */
nav {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Ensures the avatar image is styled properly */
img {
  cursor: pointer;
}

/* Dropdown menu styles */
.group-hover\:opacity-100 {
  opacity: 1 !important;
}

.group-hover\:opacity-0 {
  opacity: 0 !important;
}

/* Adjust dropdown position */
.relative {
  position: relative;
}

/* Dropdown menu */
.dropdown {
  display: none;
}

.dropdown-open {
  display: block;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 12rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #333;
  text-decoration: none;
  display: block;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>


<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore'; // Adjust path if necessary
import { useUserStore } from '@/stores/userStore'; // Adjust path if necessary
import { useRouter } from 'vue-router';

// Use auth store, user store, and router
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

// Reactive variables for user data
const avatarUrl = ref('');
const userRole = ref('');

// Fetch user data when the component is mounted
onMounted(() => {
  const user = userStore.user; // Get user from userStore
  if (user) {
    avatarUrl.value = user.avatarUrl || '@/assets/img/me.jpg'; // Use a default image if none is provided
    userRole.value = user.role;
  }
});

// Function to handle logout
const logout = async () => {
  // Clear the authentication token
  authStore.clearAuth();

  // Clear user-related data
  userStore.clearUserData();

  // Redirect to login page or home page
  router.push('/login');
};
</script>

<style scoped>
/* Adds a subtle drop shadow to the navbar */
nav {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Ensures the avatar image is styled properly */


/* Tooltip styles */
.group-hover\:opacity-100 {
  opacity: 1 !important;
}

.group-hover\:opacity-0 {
  opacity: 0 !important;
}
</style> -->


 