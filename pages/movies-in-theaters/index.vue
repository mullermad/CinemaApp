<template>
  <section class="bg-gray-900 relative w-full min-h-screen bg-cover bg-center pt-16">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 text-white text-xl font-bold">
      Loading...
    </div>

    <!-- Error State -->
    <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-red-600 bg-opacity-80 text-white text-xl font-bold">
      Error loading movies: {{ error.message }}
    </div>

    <!-- Movies List -->
    <div v-if="!loading && !error" class="relative z-10 max-w-screen-xl mx-auto px-6">
      <!-- Title and Search Centered on Large Screens -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-center mt-4">
        <h1 class="text-3xl font-bold text-white mb-4 lg:mb-0 lg:mr-6">Movies List</h1>

        <!-- Centered Search Input -->
      <div class="w-full lg:w-1/2 xl:max-w-2xl mb-4 lg:mb-0 lg:flex lg:justify-center">
  <input
    type="text"
    v-model="searchTerm"
    @keyup.enter="searchMovies"
    placeholder="Search movies"
    class="w-full border border-gray-500 shadow-lg p-4 lg:p-5 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
  />
</div>

      </div>

      <!-- Filters: Genre and Director -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <!-- Genre Filter -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="genre in uniqueGenres"
            :key="genre"
            @click="filterByGenre(genre)"
            :class="{
              'bg-blue-600': activeGenre === genre,
              'bg-gray-900': activeGenre !== genre
            }"
            class="px-4 py-2 rounded-full text-white font-medium hover:bg-blue-700 transition duration-300"
          >
            {{ genre }}
          </button>
        </div>

        <!-- Director Filter -->
        <div class="w-full lg:max-w-xs">
          <select
            v-model="activeDirector"
            @change="searchMovies"
            class="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">Filter by a Director</option>
            <option
              v-for="director in directors"
              :key="director"
              :value="director"
            >
              {{ director }}
            </option>
          </select>
        </div>
      </div>

      <!-- No Movies Found Message -->
      <div v-if="filteredMovies.length === 0" class="text-center my-8 text-xl font-semibold text-gray-300">
        No movies found for the selected criteria.
      </div>

      <!-- Movies Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        <router-link
          v-for="movie in filteredMovies"
          :key="movie.movie_id"
          :to="getMovieLink(movie)"
          class="relative block p-2 hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden bg-gray-900"
        >
          <img :src="movie.poster_url[0]" :alt="movie.title" class="w-full h-72 object-cover rounded-t-lg" />
          <div class="p-4">
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

const token = localStorage.getItem("authToken");

const GET_MOVIES_QUERY = gql`
  query GetMovies($limit: Int, $offset: Int, $title: String, $genre: String, $director: String) {
    movie(
      limit: $limit,
      offset: $offset,
      where: {
        title: { _ilike: $title },
        genre: { name: { _ilike: $genre } },
        director: { name: { _ilike: $director } }
      }
    ) {
      movie_id
      title
      poster_url
      genre {
        name
      }
      director {
        name
      }
    }
  }
`;

const GET_GENRES = gql`
  query GetGenres {
    genre {
      name
    }
  }
`;

const GET_DIRECTORS = gql`
  query GetDirectors {
    director {
      name
    }
  }
`;

const movies = ref([]);
const genres = ref([]);
const directors = ref([]);
const searchTerm = ref('');
const activeGenre = ref('');
const activeDirector = ref('');
const currentPage = ref(1);
const moviesPerPage = 5;
const offset = ref(0);
const totalMovies = ref(0);

const { result, loading, error, refetch } = useQuery(
  GET_MOVIES_QUERY,
  {
    limit: moviesPerPage,
    offset: offset.value,
    title: `%${searchTerm.value}%`,
    genre: activeGenre.value ? `%${activeGenre.value}%` : '%%',
    director: activeDirector.value ? `%${activeDirector.value}%` : '%%'
  },
  {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
);

const { result: genreResult } = useQuery(
  GET_GENRES,
  {},
  {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
);

const { result: directorResult } = useQuery(
  GET_DIRECTORS,
  {},
  {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
);

watch(result, (newResult) => {
  if (newResult?.movie) {
    movies.value = newResult.movie;
  }
}, { immediate: true });

watch(genreResult, (newResult) => {
  if (newResult?.genre) {
    genres.value = newResult.genre.map(g => g.name);
  }
}, { immediate: true });

watch(directorResult, (newResult) => {
  if (newResult?.director) {
    directors.value = newResult.director.map(d => d.name);
  }
}, { immediate: true });

const uniqueGenres = computed(() => [...new Set(genres.value)]);
const filteredMovies = computed(() => movies.value);

const fetchMovies = () => {
  refetch({
    limit: moviesPerPage,
    offset: offset.value,
    title: `%${searchTerm.value}%`,
    genre: activeGenre.value ? `%${activeGenre.value}%` : '%%',
    director: activeDirector.value ? `%${activeDirector.value}%` : '%%'
  });
};

const filterByGenre = (genre) => {
  activeGenre.value = genre;
  searchMovies();
};

const searchMovies = () => {
  currentPage.value = 1;
  offset.value = 0;
  fetchMovies();
};

const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.replace(/\s+/g, '-')}`,
    query: { movie_id: movie.movie_id }
  };
};
</script>


<!-- 
<script setup>
import { ref, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_MOVIES_QUERY = gql`
  query GetMovies($limit: Int, $offset: Int, $title: String, $genre: String, $director: String) {
    movie(
      limit: $limit,
      offset: $offset,
      where: {
        title: { _ilike: $title },
        genre: { name: { _ilike: $genre } },
        director: { name: { _ilike: $director } }
      }
    ) {
      movie_id
      title
      poster_url
      genre {
        name
      }
      director {
        name
      }
    }
  }
`;

const GET_GENRES = gql`
  query GetGenres {
    genre {
      name
    }
  }
`;

const GET_DIRECTORS = gql`
  query GetDirectors {
    director {
      name
    }
  }
`;

const movies = ref([]);
const genres = ref([]);
const directors = ref([]);
const searchTerm = ref('');
const activeGenre = ref('');
const activeDirector = ref('');
const currentPage = ref(1);
const moviesPerPage = 5;
const offset = ref(0);
const totalMovies = ref(0);
const token = localStorage.getItem("authToken");


const { result, loading, error, refetch } = useQuery(GET_MOVIES_QUERY, {
  limit: moviesPerPage,
  offset: offset.value,
  title: `%${searchTerm.value}%`,
  genre: activeGenre.value ? `%${activeGenre.value}%` : '%%',
  director: activeDirector.value ? `%${activeDirector.value}%` : '%%'
});

const { result: genreResult } = useQuery(GET_GENRES);
const { result: directorResult } = useQuery(GET_DIRECTORS);

watch(result, (newResult) => {
  if (newResult?.movie) {
    movies.value = newResult.movie;
  }
}, { immediate: true });

watch(genreResult, (newResult) => {
  if (newResult?.genre) {
    genres.value = newResult.genre.map(g => g.name);
  }
}, { immediate: true });

watch(directorResult, (newResult) => {
  if (newResult?.director) {
    directors.value = newResult.director.map(d => d.name);
  }
}, { immediate: true });

const uniqueGenres = computed(() => [...new Set(genres.value)]);
const filteredMovies = computed(() => movies.value);

const fetchMovies = () => {
  refetch({
    limit: moviesPerPage,
    offset: offset.value,
    title: `%${searchTerm.value}%`,
    genre: activeGenre.value ? `%${activeGenre.value}%` : '%%',
    director: activeDirector.value ? `%${activeDirector.value}%` : '%%'
  });
};

const filterByGenre = (genre) => {
  activeGenre.value = genre;
  searchMovies();
};

const searchMovies = () => {
  currentPage.value = 1;
  offset.value = 0;
  fetchMovies();
};

const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.replace(/\s+/g, '-')}`,
    query: { movie_id: movie.movie_id }
  };
};
</script> -->
