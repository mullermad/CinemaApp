<template>
  <section class="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center shadow-lg mt-8">
    <!-- Container for the movie details -->
    <div class="relative max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
      <!-- Movie Poster -->
      <div class="flex-none w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
        <img :src="getImageUrl(movie.poster)" alt="Movie Poster" class="w-full h-auto object-cover rounded-lg shadow-lg" />
      </div>

      <!-- Movie Details -->
      <div class="flex-1 ml-0 md:ml-8">
        <h1 class="text-4xl text-black dark:text-white font-extrabold mb-4 leading-tight">{{ movie.title }}</h1>
        <p class="text-lg mb-6 text-black dark:text-white">{{ movie.description }}</p>

        <div class="mb-6">
          <p class="text-sm font-medium mb-1 text-black dark:text-white">GENRE: <span class="font-normal">Drama</span></p>
          <p class="text-sm font-medium mb-1 text-black dark:text-white">RELEASE DATE: <span class="font-normal">{{ movie.releaseDate }}</span></p>
          <p class="text-sm font-medium text-black dark:text-white">RATING: <span class="font-normal">{{ movie.rating }}</span></p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4 mt-6">
          <button @click="bookmarkMovie" class="px-6 py-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300">
            <i class="fas fa-heart mr-2"></i> Add to Favorites
          </button>
          <nuxt-link :to="getTicketLink" class="px-6 py-3 bg-red-400 rounded-lg font-semibold text-white hover:bg-red-500 transition duration-300">
            Get Tickets
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isLogin = ref(true);
const route = useRoute();
const router = useRouter();

const getImageUrl = (filename) => {
  return new URL(`../assets/img/${filename}`, import.meta.url).href;
};

const movie = computed(() => {
  return {
    title: decodeURIComponent(route.query.title || 'Unknown Title'),
    poster: decodeURIComponent(route.query.poster || 'default-poster.jpeg'),
    description: decodeURIComponent(route.query.description || 'No description available.'),
    stars: (route.query.stars || '').split(','),
    schedule: (route.query.schedule || '').split('|'),
    rating: 'PG-13',
    releaseDate: 'Friday, Aug 23, 2024',
  };
});

const bookmarkMovie = () => {
  if (isLogin.value) {
    alert('Movie bookmarked!');
  } else {
    router.push('/login');
  }
};

const getTicketLink = computed(() => {
  return {
    path: '/teatorslist',
    query: {
      title: movie.value.title,
      poster: movie.value.poster,
      description: movie.value.description,
      rating: movie.value.rating,
      releaseDate: movie.value.releaseDate
    }
  };
});
</script>

<style scoped>
/* Your styles remain the same */
</style>
