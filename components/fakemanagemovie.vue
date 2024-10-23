<template>
  <div class="flex min-h-screen bg-gray-900">
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4 rounded-lg border-gray-700 bg-gray-800 shadow-lg">
        <h1 class="text-2xl font-bold mb-4 text-white">Manage Movies</h1>

        <!-- Movie List -->
        <div class="space-y-4">
          <div v-for="movie in paginatedMovies" :key="movie.movie_id" class="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
            <div>
              <h2 class="text-lg text-white">{{ movie.title }}</h2>
              <p class="text-gray-400">Genre: {{ movie.genre.name }} | Director: {{ movie.director ? movie.director.name : 'Unknown' }}</p>
              <p class="text-gray-400">Stars: {{ movie.stars }}</p>
            </div>
            <button @click="handleDelete(movie.movie_id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Delete</button>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
          <button @click="previousPage" :disabled="currentPage === 1" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <div class="flex items-center">
            <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex mx-2">
              <button
                v-for="page in totalPagesArray"
                :key="page"
                :class="['mx-1', currentPage === page ? 'bg-blue-600' : 'bg-blue-500', 'text-white px-3 py-1 rounded-lg hover:bg-blue-600']"
                @click="setPage(page)"
              >
                {{ page }}
              </button>
            </div>
          </div>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

import { ref, computed } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

// Define the query to get movies
const GET_MOVIES_QUERY = gql`
  query MyQuery {
    movie {
      movie_id
      title
      genre {
        name
      }
      director {
        name
      }
      stars
    }
  }
`;

// Define the mutation for deleting a movie
const DELETE_MOVIE_MUTATION = gql`
  mutation MyMutation($movie_id: uuid!) {
    delete_movie_by_pk(movie_id: $movie_id) {
      movie_id
      title
    }
  }
`;

const { result, loading, error, refetch } = useQuery(GET_MOVIES_QUERY);
const deleteMovie = useMutation(DELETE_MOVIE_MUTATION);

const currentPage = ref(1);
const itemsPerPage = 5; // Number of movies per page

const paginatedMovies = computed(() => {
  if (!result.value || !result.value.movie) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  return result.value.movie.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  if (!result.value || !result.value.movie) return 0;
  return Math.ceil(result.value.movie.length / itemsPerPage);
});

// Create an array for pagination buttons
const totalPagesArray = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

// Handle deletion of a movie
const handleDelete = async (movie_id) => {
  try {
    await deleteMovie({ variables: { movie_id } });
    alert(`Movie deleted successfully`);
    refetch(); // Refetch movies to update the list after deletion
  } catch (e) {
    console.error('Error deleting movie:', e);
    alert('Failed to delete movie');
  }
};

// Pagination controls
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Set the current page
const setPage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
