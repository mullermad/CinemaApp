<template>
  <section class="w-full min-h-screen bg-gray-900 flex flex-col items-center shadow-lg mt-10">
    <!-- Container for the movie details -->
    <div class="relative max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
      <!-- Movie Poster -->
      <div class="flex-none w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
        <img :src="movie.poster_url" alt="Movie Poster" class="w-full h-auto object-cover rounded-lg shadow-lg" />
      </div>

      <!-- Movie Details -->
      <div class="flex-1 ml-0 md:ml-8">
        <h1 class="text-4xl text-white font-extrabold mb-4 leading-tight">{{ movie.title }}</h1>
        <p class="text-lg mb-6 text-white">{{ movie.description }}</p>

       <div class="mb-6 space-y-2">
  <p class="text-sm font-medium text-white p-2">
    <span class="font-semibold mr-3">GENRE:</span> 
    <span class="font-semibold text-xl">{{ movie.genre.name }}</span>
  </p>
  <p class="text-sm font-medium text-white p-2">
    <span class="font-semibold mr-3 ">RELEASE DATE:</span> 
    <span class="font-semibold text-xl">{{ movie.release_date }}</span>
  </p>
</div>

        

        <!-- Action Buttons -->
        <div class="flex space-x-4 mt-6">
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


const movie = computed(() => {
  return {
    movie_id: decodeURIComponent(route.query.movie_id || ''),
    title: decodeURIComponent(route.query.title || 'Unknown Title'),
    poster_url: decodeURIComponent(route.query.poster || 'default-poster.jpeg'),
    release_date: decodeURIComponent(route.query.release_date || 'Unknown Release Date'),
    description: decodeURIComponent(route.query.description || 'No description available.'),
    genre: { name: decodeURIComponent(route.query.genre || 'Unknown Genre') },
    schedules: (route.query.schedules || '').split('|').map(schedule => {
      const [Theatres, showtime] = schedule.split(':');
      return { Theatres, showtime };
    }),
    rating: decodeURIComponent(route.query.rating || 'PG-13'),
  };
});


const getTicketLink = computed(() => {
  return {
    path: '/teatorslist',
    query: {
      title: movie.value.title,
      poster: movie.value.poster_url,
      description: movie.value.description,
      schedules: movie.value.schedules.map(schedule => `${schedule.Theatres}:${schedule.showtime}`).join('|')
    }
  };
});


</script>

<style scoped>
/* Your styles remain the same */
</style>
