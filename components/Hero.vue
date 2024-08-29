<template>
  <section class="bg-gray-900 relative w-full min-h-screen bg-cover bg-center pt-16">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white text-xl font-bold"
    >
      Loading...
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="absolute inset-0 flex items-center justify-center bg-red-600 bg-opacity-80 text-white text-xl font-bold"
    >
      Error loading movies: {{ error.message }}
    </div>

    <!-- Movies List -->
    <div v-if="!loading && !error" class="relative z-10">
  <div class="absolute top-4 left-4 z-30 flex flex-col items-start space-y-2">
        <h2 class="text-2xl font-bold text-white  drop-shadow-lg">MOVIES IN THEATERS</h2>
                <nuxt-link to="/movies-in-theaters" class="text-blue-400 hover:underline font-semibold mt-2">SEE ALL MOVIES</nuxt-link>

      </div>
          <h1 class="text-3xl font-bold text-center my-8 text-white p-8 mt-12">Movies List</h1>

      <!-- Search Input -->
      <div class="mb-6  max-w-lg mx-auto">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search movies by title"
          class="w-full border border-gray-300 shadow-md p-4 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue-500"
        />
      </div>
    

      <!-- Movies Grid -->
      <div class="w-full max-w-screen-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <router-link
          v-for="movie in filteredMovies"
          :key="movie.movie_id"
          :to="getMovieLink(movie)"
          class="relative block p-2 hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
        >
          <img :src="movie.poster_url" :alt="movie.title" class="w-full h-auto object-cover" />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 class="text-white text-lg font-semibold">{{ movie.title }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script setup>

import { ref, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
const user = ref(null);


// Define the GraphQL query
const GET_MOVIES_QUERY = gql`
 query GetMovies {
  movie {
    movie_id
    title
    poster_url
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

//  query GetMovies {
//     movie {
//       movie_id
//       title
//       poster_url
//       release_date
//       description
//       stars
//       schedules {
//         showtime
//       }
       
//     }
//   }
// Use the query
const { result, loading, error } = useQuery(GET_MOVIES_QUERY);

// Define reactive variables
const movies = ref([]);
const searchTerm = ref('');

// Watch for changes in the result and update movies
watch(result, (newResult) => {
  if (newResult?.movie) {
    movies.value = newResult.movie;
  }
}, { immediate: true });

// Computed property to filter movies based on search term
const filteredMovies = computed(() => {
  if (!searchTerm.value) {
    return movies.value;
  }
  return movies.value.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Function to generate a movie link
const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
    query: {
      movie_id: movie.movie_id || '',
      title: movie.title || '',
      poster: movie.poster_url || '',
      release_date: movie.release_date || '',
      description: movie.description || '',
      genre: (movie.genre && movie.genre.name) || '',
      schedules: (movie.schedules && movie.schedules.map(schedule => `${schedule.Theatres}:${schedule.showtime}`).join('|')) || ''
    }
  };
};

// const getMovieLink = (movie) => {
//   return {
//     path: `/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
//     query: {
//       title: movie.title,
//       poster: movie.poster_url,
//       description: movie.description,
//       stars: (movie.stars && Array.isArray(movie.stars)) ? movie.stars.join(',') : '',
//       schedule: movie.schedules?.map(schedule => schedule.showtime).join('|') || ''
//     }
//   };
// };
</script>
<style scoped>
section {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.loader {
  text-align: center;
  font-size: 1.5em;
  margin: 20px;
}

.error {
  color: red;
  text-align: center;
  font-size: 1.2em;
  margin: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-details {
  padding: 15px;
}

.view-details-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
}

.view-details-button:hover {
  background-color: #0056b3;
}
</style>
