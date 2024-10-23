<template>
  <section class="bg-gray-900 relative w-full min-h-screen bg-cover bg-center pt-16">
    <div v-if="!loading && !error" class="relative z-10">
      <h2 class="text-2xl font-bold text-white drop-shadow-lg p-4">MOVIES IN THEATERS</h2>

      <!-- Search Input -->
      <div class="mb-6 max-w-lg mx-auto">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search movies by title"
          class="w-full border border-gray-300 shadow-md p-4 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue-500"
          @keydown.enter="searchMovies"
        />
      </div>

       <!-- Display 'No Results' Message if no movies found -->
      <div v-if="filteredMovies.length === 0" class="text-center text-white py-10">
        <p class="text-xl font-semibold">No results found for your search.</p>
        <!-- <p class="text-gray-400">Try a different title or check back later.</p> -->
      </div>

      <!-- Movies Grid with Pagination Carousels -->
      <div class="flex items-center justify-between mb-6">
        <!-- Backward Carousel Button -->
        <button
          @click="prevPage"
          class="px-6 py-4 bg-gray-700 text-white rounded-md transition duration-200 hover:bg-gray-500"
          :disabled="loading || currentPage === 1"
        >
          <span class="text-2xl">&lt;</span>
        </button>

        <!-- Movies Display -->
        <div class="w-full max-w-screen-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <router-link
            v-for="movie in filteredMovies"
            :key="movie.movie_id"
            :to="getMovieLink(movie)"
            class="relative block p-2 hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
          >
            <img :src="movie.poster_url[0]" :alt="movie.title" class="w-full h-auto object-cover" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 class="text-white text-lg font-semibold">{{ movie.title }}</h2>
            </div>
          </router-link>
        </div>

        <!-- Forward Carousel Button -->
        <button
          @click="nextPage"
          class="px-6 py-4 bg-gray-700 text-white rounded-lg transition duration-200 hover:bg-gray-500"
          :disabled="loading || filteredMovies.length < moviesPerPage"
        >
          <span class="text-2xl">&gt;</span>
        </button>
      </div>

      <!-- Pagination Dots -->
      <div class="flex justify-center mt-4">
        <span
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{
            'w-4 h-4 mx-2 rounded-full cursor-pointer': true,
            'bg-blue-500': currentPage === page,
            'bg-gray-400': currentPage !== page
          }"
        ></span>
      </div>

      <!-- Additional Links -->
      <div class="absolute top-4 right-4 z-30 flex flex-row items-center space-x-4 pt-5 pr-7 pb-2">
        <nuxt-link to="/movies-in-theaters" class="text-blue-400 hover:underline font-semibold">See All Movies</nuxt-link>
        <nuxt-link to="/movies-in-theaters" class="text-blue-400 hover:underline font-semibold">Find a Theatre</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Define the GraphQL query with an optional where clause for filtering by title
const GET_MOVIES_QUERY = gql`
  query GetMovies($limit: Int, $offset: Int, $title: String) {
    movie(limit: $limit, offset: $offset, where: { title: { _ilike: $title } }) {
      movie_id
      title
      poster_url
      stars
      release_date
      description
      genre {
        name
      }
      schedules {
        Theatres
        showtime
      }
    }
  }
`;

const GET_TOTAL_MOVIES_COUNT = gql`
  query GetTotalMoviesCount {
    movie_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const movies = ref([]);
const searchTerm = ref('');
const currentPage = ref(1);
const moviesPerPage = 5;
const offset = ref(0);
const totalMovies = ref(0);

// Set up the query with where clause included
const { result, loading, error, refetch } = useQuery(GET_MOVIES_QUERY, {
  limit: moviesPerPage,
  offset: offset.value,
  title: `%${searchTerm.value}%`, // Use % for partial matching with _ilike
});

// Fetch total movies count
const { result: totalMoviesResult } = useQuery(GET_TOTAL_MOVIES_COUNT);

// Watch for changes in the movies query result and update movies
watch(result, (newResult) => {
  if (newResult?.movie) {
    movies.value = newResult.movie;
  }
}, { immediate: true });

// Watch for changes in the total movies count query result
watch(totalMoviesResult, (newResult) => {
  if (newResult?.movie_aggregate?.aggregate?.count) {
    totalMovies.value = newResult.movie_aggregate.aggregate.count;
  }
}, { immediate: true });

// Compute total pages based on totalMovies and moviesPerPage
const totalPages = computed(() => Math.ceil(totalMovies.value / moviesPerPage));

// Computed property for filtered movies (same as the fetched movies)
const filteredMovies = computed(() => {
  return movies.value;
});

// Function to refetch movies with the updated parameters
const fetchMovies = () => {
  refetch({
    limit: moviesPerPage,
    offset: offset.value,
    title: `%${searchTerm.value}%`, // Use % for partial matching with _ilike
  });
};

// Navigation functions
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    offset.value -= moviesPerPage;
    fetchMovies();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    offset.value += moviesPerPage;
    fetchMovies();
  }
};

// Jump to a specific page
const goToPage = (page) => {
  currentPage.value = page;
  offset.value = (page - 1) * moviesPerPage;
  fetchMovies();
};

// Get a link for each movie
const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.replace(/\s+/g, '-')}`,
    query: { movie_id: movie.movie_id }
  };
};

// Function to handle search
const searchMovies = () => {
  currentPage.value = 1;
  offset.value = 0;
  fetchMovies();
};
</script>
