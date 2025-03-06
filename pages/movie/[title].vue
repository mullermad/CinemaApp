<template>
  <section class="w-full min-h-screen bg-gray-900 flex flex-col items-center shadow-lg mt-10">
    <div class="relative max-w-screen-xl mx-auto px-4 py-8 flex flex-col">
      <!-- Main Poster Image on Top -->
      <div class="mb-8">
        <img :src="movie.poster_url[0]" alt="Main Movie Poster" class="w-full h-96 object-cover rounded-lg shadow-lg" />
      </div>

      <!-- Movie Details Section -->
      <div class="flex flex-col md:flex-row items-start">
        <div class="flex-none w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:mr-8">
          <img :src="movie.poster_url[1]" alt="Secondary Movie Poster"
            class="w-full h-80 object-cover rounded-lg shadow-md" />
        </div>

        <!-- Movie Info and Rating Section -->
        <div class="flex-1 space-y-6">
          <!-- Movie Rating and Rate Button -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center text-yellow-500">
              <span class="text-2xl font-bold">{{ averageRating }}</span>
              <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.461a1 1 0 00.95.691h3.641c.969 0 1.371 1.24.588 1.81l-2.942 2.14a1 1 0 00-.364 1.118l1.12 3.461c.3.921-.755 1.688-1.54 1.118l-2.942-2.14a1 1 0 00-1.176 0l-2.942 2.14c-.784.57-1.838-.197-1.54-1.118l1.12-3.461a1 1 0 00-.364-1.118l-2.942-2.14c-.783-.57-.38-1.81.588-1.81h3.641a1 1 0 00.95-.691l1.12-3.461z" />
              </svg>
            </div>
            <button @click="openRatingModal"
              class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300">
              Rate This
            </button>
          </div>

          <!-- Movie Title -->
          <h1 class="text-4xl text-white font-extrabold">{{ movie.title }}</h1>

          <!-- Release Date and Duration -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
            <p class="text-lg">
              <span class="font-semibold text-white">Release Date:</span>
              {{ movie.release_date }}
            </p>
            <p class="text-lg">
              <span class="font-semibold text-white">Duration:</span>
              {{ movie.duration }} minutes
            </p>
            <p class="text-lg">
              <span class="font-semibold text-white">Genre:</span>
              {{ movie.genre.name }}
            </p>
          </div>

          <!-- Description -->
          <p class="text-gray-400 leading-relaxed">
            {{ movie.description }}
          </p>

          <!-- Get Tickets Button -->
          <div class="ticket-btn flex space-x-4 mt-6">
            <nuxt-link data-cy="get-ticket" :to="getTicketLink(movie)"
              class="px-6 py-3 bg-red-400 rounded-lg font-semibold text-white hover:bg-red-500 transition duration-300">
              Get Tickets
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Cast & Crew Section -->
      <div class="mt-12">
        <h2 class="text-3xl text-white font-bold mb-6">Cast & Crew</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <!-- Director Card -->
          <div class="flex flex-col items-center">
            <img :src="movie.director.poster_url" alt="Director Image"
              class="w-24 h-24 object-cover rounded-full shadow-md" />
            <p class="text-lg text-white mt-2 font-semibold">
              {{ movie.director.name }}
            </p>
            <p class="text-sm text-gray-400">Director</p>
          </div>

          <!-- Stars Cards -->
          <div v-for="(starName, index) in movie.stars.split(',')" :key="index" class="flex flex-col items-center">
            <img :src="getStarPoster(starName.trim())" alt="Actor Image"
              class="w-24 h-24 object-cover rounded-full shadow-md" />
            <p class="text-lg text-white mt-2 font-semibold">
              {{ starName.trim() }}
            </p>
            <p class="text-sm text-gray-400">Actor</p>
          </div>
        </div>
      </div>

      <!-- Thumbnail Row -->
      <div class="flex space-x-2 overflow-x-auto mt-8 pb-4">
        <img v-for="(url, index) in movie.poster_url.slice(0)" :key="index" :src="url" alt="Movie Thumbnail"
          class="w-32 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300 cursor-pointer" />
      </div>
    </div>

    <!-- Rating Modal -->
    <transition name="fade">
      <div v-if="isRatingModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl text-white mb-4">Rate {{ movie.title }}</h2>
          <StarRating :movieId="movie.movie_id" @rate="submitRating" @closeModal="closeRatingModal" />
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";

const GET_MOVIE_BY_ID_QUERY = gql`
  query GetMovieById($id: uuid!) {
    movie(where: { movie_id: { _eq: $id } }) {
      movie_id
      title
      poster_url
      release_date
      description
      genre {
        name
      }
      duration
      director {
        name
        poster_url
      }
      stars
    }
  }
`;

const GET_STARS_QUERY = gql`
  query GetStars {
    star {
      star_id
      name
      poster_url
    }
  }
`;

const GET_AVERAGE_RATING_QUERY = gql`
  query GetAverageRating($movie_id: uuid!) {
    rating_aggregate(where: { movie_id: { _eq: $movie_id } }) {
      aggregate {
        avg {
          rating
        }
      }
    }
  }
`;

const token = localStorage.getItem("authToken");
const route = useRoute();
const movie_id = route.query.movie_id || "";
const movie = ref({
  title: "",
  release_date: "",
  description: "",
  genre: { name: "" },
  duration: "",
  director: { name: "" },
  stars: "",
  poster_url: [],
  schedules: [],
});

const { result: movieResult } = useQuery(
  GET_MOVIE_BY_ID_QUERY,
  { id: movie_id },
  {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  }
);

watch(
  movieResult,
  (newResult) => {
    if (newResult?.movie?.[0]) {
      movie.value = newResult.movie[0];
      console.log("Movie ID:", movie.value.movie_id);
    }
  },
  { immediate: true }
);

const { result: ratingResult } = useQuery(
  GET_AVERAGE_RATING_QUERY,
  { movie_id },
  {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  }
);

const averageRating = computed(() => {
  return (
    ratingResult.value?.rating_aggregate?.aggregate?.avg?.rating?.toFixed(1) ||
    0
  );
});

const { result: starsResult } = useQuery(GET_STARS_QUERY, {
  context: {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  },
});

const stars = computed(() => starsResult.value?.star || []);
console.log("starrrrrrrrrrrrrrrrr", stars.value)
const getStarPoster = (starName) => {
  const star = stars.value.find(
    (s) => s.name.trim().toLowerCase() === starName.toLowerCase()
  );
  return star ? star.poster_url : "path/to/default/poster.jpg"; // Replace with your default poster path
};

const isRatingModalOpen = ref(false);

const openRatingModal = () => {
  isRatingModalOpen.value = true;
};

const closeRatingModal = () => {
  isRatingModalOpen.value = false;
};

const submitRating = (rating) => {
  // Implement rating submission logic here
  console.log("Rating submitted:", rating);
  closeRatingModal();
};

const getTicketLink = (movie) => {
  return {
    path: "/teatorslist",
    query: { movie_id: movie.movie_id },
  };
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
