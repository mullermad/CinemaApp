<template>
  <nav class="bg-gray-900 fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between shadow-sm dark:shadow-none border-b border-gray-700">
    <button 
      class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" 
      @click="reloadPage"
    >
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">MovieVerse</span>
    </button>
    <div class="flex items-center space-x-4 ml-auto">
          <!-- bookmarks -->
<div v-if="userRole !== 'admin'">
  <button @click="toggleFavoritesDropdown" class="px-5 mr-5 text-white text-lg font-semibold">
    All Bookmarks
  </button>
</div>

      <div v-if="isFavoritesDropdownOpen" class="relative">
        <div
          class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20"
        >
          <div class="p-4">
            <!-- <h2 class="text-gray-900 dark:text-white text-lg">My Bookmarked Movies:</h2> -->
            <div v-if="loading">
              <p class="text-gray-700 dark:text-gray-300">Loading...</p>
            </div>
            <ul v-else>
              <li v-if="!bookmarks.length" class="text-gray-700 dark:text-gray-300">No bookmarks found.</li>
              <li v-for="bookmark in bookmarks" :key="bookmark.bookmark_id" class="text-gray-700 dark:text-gray-300">
                {{ bookmark.movie }} - {{ bookmark.schedule_id }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="relative group">
        <img
          src="@/assets/img/profile.jpg"
          alt="Profile Avatar"
          class="w-10 h-10 rounded-full object-cover cursor-pointer"
          @click="toggleUserDropdown"
        />
       
        <div
          v-if="isUserDropdownOpen"
          class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20"
        >
          <div class="p-4">
            <nuxt-link :to="{ name: 'user', params: { userId: getUserId() } }" class="text-gray-900 dark:text-white text-lg">
              <button @click="toggleUserDropdown"> {{ userRole }}</button>
 
</nuxt-link>

            <!-- <nuxt-link to="/user" class="text-gray-900 dark:text-white text-lg">{{ userRole }}</nuxt-link> -->
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
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const avatarUrl = ref('');
const userRole = ref('');
const isUserDropdownOpen = ref(false);
const isFavoritesDropdownOpen = ref(false);
const bookmarks = ref([]);
const loading = ref(false); // Loading state

// Function to get user_id from localStorage
const getUserId = () => {
  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;
  return userData ? userData.user_id : null;
};

// GraphQL query to fetch bookmarks
const GET_BOOKMARKS = gql`
  query MyQuery {
    bookmark(where: { user_id: { _eq: "${getUserId()}" } }) {
      user_id
      movie
      bookmark_id
      created_at
      schedule_id
    }
  }
`;
// Function to get the auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Fetch bookmarks function
const fetchBookmarks = async () => {
  loading.value = true; // Set loading to true
   const token = getAuthToken(); // Get the auth token
  const { result, error } = await useQuery(GET_BOOKMARKS, { userId: getUserId() }, {
    context: {
      headers: {
        'Content-Type': 'application/json', // Specify content type if necessary
        Authorization: token ? `Bearer ${token}` : '' // Include Authorization header if token exists
      },
    },
  });
  loading.value = false; // Set loading to false once done
  if (error.value) {
    console.error('Error fetching bookmarks:', error.value);
    return [];
  }
  return result.value.bookmark || [];
};

// Fetch user data when the component is mounted
onMounted(async () => {
  const user = userStore.user; 
  if (user) {
    avatarUrl.value = user.avatarUrl || '@/assets/img/me.jpg'; 
    userRole.value = user.role;
  }
});

// Function to handle logout
const logout = async () => {
  authStore.clearAuth();
  userStore.clearUserData();
  router.push('/login');
};

// Toggle favorites dropdown and fetch bookmarks if opening
const toggleFavoritesDropdown = async () => {
  if (!isFavoritesDropdownOpen.value) {
    bookmarks.value = await fetchBookmarks(); // Fetch bookmarks when opening dropdown
  }
  isFavoritesDropdownOpen.value = !isFavoritesDropdownOpen.value;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('nav')) {
    isUserDropdownOpen.value = false;
    isFavoritesDropdownOpen.value = false;
  }
});

// Reload the page
const reloadPage = () => {
  console.log("Button clicked, redirecting to home...");
  window.location.href = '/';
};

</script>

<style scoped>
nav {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
img {
  cursor: pointer;
}
</style>
