<template>
  <div class="flex min-h-screen bg-gray-900">
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4 rounded-lg border-gray-700 bg-gray-800 shadow-lg">
        <h1 class="text-2xl font-bold mb-4 text-white">Manage Movies</h1>

        <!-- Movie List -->
        <div class="space-y-4">
          <div v-for="movie in paginatedMovies" :key="movie.movie_id"
            class="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
            <div>
              <h2 class="text-lg text-white">{{ movie.title }}</h2>
              <p class="text-gray-400">
                Genre: {{ movie.genre.name }} | Director: {{ movie.director ? movie.director.name : 'Unknown' }}
              </p>
              <p class="text-gray-400">Stars: {{ movie.stars }}</p>
            </div>
            <button @click="confirmDelete(movie.movie_id)"
              class="delete-movie bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
          <button @click="previousPage" :disabled="currentPage === 1"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <div class="flex items-center">
            <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
            <div class="flex mx-2">
              <button v-for="page in totalPagesArray" :key="page"
                :class="['mx-1', currentPage === page ? 'bg-blue-600' : 'bg-blue-500', 'text-white px-3 py-1 rounded-lg hover:bg-blue-600']"
                @click="setPage(page)">
                {{ page }}
              </button>
            </div>
          </div>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>



      <!-- Delete Confirmation Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p class="text-gray-700 mb-6">Are you sure you want to delete the movie "{{ selectedMovie.title }}"? This
            action cannot be undone.</p>
          <div class="flex justify-end space-x-4">
            <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Cancel
            </button>
            <button @click="handleDelete(selectedMovie.movie_id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Confirm
            </button>
          </div>
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

// Fetch movies using the query
const { result, loading, error, refetch } = useQuery(GET_MOVIES_QUERY);

// Replace with the actual token retrieval logic
const token = localStorage.getItem("authToken");

// Define the deleteMovie mutation with context
const deleteMovie = useMutation(DELETE_MOVIE_MUTATION, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

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

// Confirm deletion of a movie
const confirmDelete = (movie_id) => {
  if (confirm("Are you sure you want to delete this movie? This action cannot be undone.")) {
    handleDelete(movie_id);
  }
};

// Handle deletion of a movie
const handleDelete = async (movie_id) => {
  const { mutate } = deleteMovie; // Get the mutate function
  try {
    const variables = { movie_id }; // Prepare variables for mutation
    const { data } = await mutate(variables); // Execute mutation
    const deletedMovieId = data.delete_movie_by_pk.movie_id; // Get the deleted movie ID
    console.log('Deleted movie ID:', deletedMovieId);

    // Refetch movies to update the list after deletion
    refetch();
    alert(`Movie deleted successfully`);
  } catch (err) {
    console.error('Error deleting movie:', err);
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
