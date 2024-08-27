<template>
  <section class="bg-gray-900">
    <div class="container mx-auto p-8 ">
      <h1 class="text-3xl font-bold mb-6">Your Bookmarked Movies</h1>
      <div v-if="filteredBookmarkedMovies.length">
        <div
          v-for="movie in filteredBookmarkedMovies"
          :key="movie.bookmark_id"
          class="mb-4 p-4 bg-gray-700 rounded-lg flex items-center justify-between"
        >
          <div>
            <h2 class="text-xl text-white">
              Movie<span class="ml-8 p-3">{{ movie.movie }}</span>
            </h2>
            <h2 class="text-xl text-white">
              Bookmarked Date<span class="ml-8 p-3">{{ formatDate(movie.created_at) }}</span>
            </h2>
          </div>
          <nuxt-link
            to="/"
            class="px-6 py-3 rounded-lg text-white font-semibold transition duration-300"
          >
            Back
          </nuxt-link>
        </div>
      </div>
      <p v-else class="text-gray-500">No bookmarked movies found.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { format, parseISO } from 'date-fns';

// Define the query
const GET_BOOKMARKS = gql`
  query MyQuery {
    bookmark {
      user_id
      bookmark_id
      movie
      created_at
    }
  }
`;

// Reactive variable to hold bookmarks
const bookmarks = ref([]);
const user_id = ref(null);

// Get user_id from localStorage
const getUserId = () => {
   const userJson = localStorage.getItem("user");
    const userData = userJson ? JSON.parse(userJson) : null;
  // const userData = JSON.parse(localStorage.getItem("user"));
  return userData ? userData.user_id : null;
};

// Fetch and filter bookmarks
const filteredBookmarkedMovies = computed(() => {
  return bookmarks.value.filter(bookmark => bookmark.user_id === user_id.value);
});

// Format date and time
const formatDate = (isoDate) => {
  try {
    const date = parseISO(isoDate);
    return format(date, 'MMM dd h:mm a'); // Format to "Aug 11 3:00 PM"
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return 'Invalid Date';
  }
};

// Execute the query and handle user_id
const { result, loading, error } = useQuery(GET_BOOKMARKS);

onMounted(() => {
  user_id.value = getUserId(); // Set user_id when component mounts
  if (result.value && !loading.value && !error.value) {
    bookmarks.value = result.value.bookmark;
  } else if (error.value) {
    console.error('Error fetching bookmarks:', error.value);
  }
});
</script>

<style scoped>
/* Custom styles can be adjusted here */
</style>
