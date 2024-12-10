<template>
  <section>
    <div class="bg-gray-900 min-h-screen p-8 mt-8">
      <!-- Movie Title -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white">{{ movie.title }}</h1>
        <p class="text-xl text-white">{{ movie.description }}</p>
      </div>

      <div class="theators-list text-center mb-12">
        <h1 class=" text-2xl font-bold text-white">Theatres List</h1>
      </div>

      <!-- Theater List -->
      <div v-if="theaters.length > 0">
        <div v-for="theater in theaters" :key="theater.name"
          class="bg-gray-800 shadow-xl rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <!-- Theater Name -->
          <h2 class="text-3xl font-semibold text-white mb-2">{{ theater.name }}</h2>

          <!-- Theater Description -->
          <div class="text-sm text-gray-400 mb-6">
            <p>{{ theater.description }}</p>
          </div>

          <!-- Showtimes -->
          <div v-if="theater.showtimes.length" class="showtime flex flex-wrap justify-between gap-3 mb-6">
            <nuxt-link data-cy="formatted-showtime" v-for="time in theater.showtimes" :key="time" :to="{
              path: '/teatorslist/selectseats',
              query: {
                title: movie.title,
                theater: theater.name,
                time
              }
            }" class="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-gray-900 transition duration-300">
              <h3 class="formatted-showtime">{{ formatTime(time) }}</h3>
            </nuxt-link>
            <button @click="showBookmarkModal = true"
              class="favourite-button px-6 py-3 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300">
              <i class="fas fa-heart mr-2"></i> Add to Favorites
            </button>
          </div>

          <p v-else class="text-gray-400 text-center">No showtimes available</p>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 text-xl mt-8">
        No theaters available for this movie.
      </div>

      <!-- Bookmark Modal -->
      <div v-if="showBookmarkModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-bold mb-4">Bookmark Movie</h2>
          <p>{{ bookmarkMessage }}</p>
          <div class="flex justify-end mt-4">
            <button @click="addBookmark" class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">Confirm</button>
            <button @click="showBookmarkModal = false" class="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
import { format, parseISO } from 'date-fns';

const token = localStorage.getItem("authToken");
const showBookmarkModal = ref(false);
const bookmarkMessage = ref('');

const formatTime = (isoDate) => {
  try {
    const date = parseISO(isoDate);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return 'Invalid Time';
  }
};

const GET_MOVIE_BY_ID_QUERY = gql`
  query GetMovieById($id: uuid!) {
    movie(where: { movie_id: { _eq: $id } }) {
      movie_id
      title
      description
      schedules {
        Theatres
        showtime
      }
    }
  }
`;
// const ADD_BOOKMARK_MUTATION = gql`
// mutation AddBookmark($user_id: uuid!, $movie: String!) {
//     insert_schedule_one(object: {cinemaschedule: {data: {user_id: $user_id}}}) {
//     Theatres
//     movie_id
//     showtime
//   }
// `;
const ADD_BOOKMARK_MUTATION = gql`
mutation AddBookmark($user_id: uuid!, $movie: String!) {
    insert_bookmark_one(object: {user_id: $user_id, movie: $movie}) {
      movie
      bookmark_id
      user_id
      created_at
    }
  }
`;


const route = useRoute();
const movie_id = route.query.movie_id || '';

const { result, loading, error } = useQuery(GET_MOVIE_BY_ID_QUERY, { id: movie_id }, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

const { mutate } = useMutation(ADD_BOOKMARK_MUTATION, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

const movie = computed(() => {
  if (loading.value) return { title: 'Loading...', description: 'Loading...' };
  if (error.value) return { title: 'Error', description: 'Could not load movie.' };
  const movieData = result.value.movie[0] || {};
  return {
    title: movieData.title || 'Unknown Title',
    description: movieData.description || 'No description available.',
    schedules: movieData.schedules || [],
  };
});

const theaters = computed(() => {
  const theatersMap = {};
  if (Array.isArray(movie.value.schedules)) {
    movie.value.schedules.forEach(schedule => {
      const { Theatres, showtime } = schedule;
      if (!theatersMap[Theatres]) {
        theatersMap[Theatres] = {
          name: Theatres,
          showtimes: []
        };
      }
      theatersMap[Theatres].showtimes.push(showtime);
    });
  }
  return Object.values(theatersMap);
});

const addBookmark = async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_id = userData ? userData.user_id : null; // Get user_id from local storage

  // Check if user_id is available
  if (!user_id) {
    bookmarkMessage.value = 'You need to be logged in to bookmark this movie.';
    return;
  }

  const movie_title = movie.value.title || "Unknown Title"; // Movie title

  const variables = {
    user_id,
    movie: movie_title,
  };

  try {
    const { data } = await mutate(variables);
    console.log('Bookmark added successfully:', data);
    bookmarkMessage.value = 'Movie bookmarked successfully!';
    showBookmarkModal.value = false;
  } catch (error) {
    console.error('Error bookmarking movie:', error);
    bookmarkMessage.value = 'An error occurred while bookmarking the movie.';
  }
};
</script>
