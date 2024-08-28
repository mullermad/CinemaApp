<template>
  <section>
    <div class="bg-gray-900 min-h-screen p-8 mt-8">
      <!-- Movie Title -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white">{{ movie.title }}</h1>
        <p class="text-xl text-white">{{ movie.description }}</p>
      </div>

      <div class="text-center mb-12">
        <h1 class="text-2xl font-bold text-white">Theatres List</h1>
      </div>

      <!-- Theater List -->
      <div
        v-for="theater in theaters"
        :key="theater.name"
        class="bg-gray-800 shadow-xl rounded-lg p-6 mb-8 max-w-4xl mx-auto"
      >
        <!-- Theater Name -->
        <h2 class="text-3xl font-semibold text-white mb-2">{{ theater.name }}</h2>

        <!-- Theater Description -->
        <div class="text-sm text-gray-400 mb-6">
          <p>{{ theater.description }}</p>
        </div>

        <!-- Showtimes -->
        <div v-if="theater.showtimes.length" class="flex flex-wrap justify-between  gap-3 mb-6">
          <nuxt-link
            v-for="time in theater.showtimes"
            :key="time"
            :to="{ 
              path: '/teatorslist/selectseats', 
              query: { 
                title: movie.title, 
                theater: theater.name, 
                time 
              } 
            }"
            class="px-6 py-3  bg-red-600 text-white rounded-full hover:bg-gray-900 transition duration-300"
          >
            {{ formatTime(time) }}
          </nuxt-link>
          <button @click="bookmarkMovie" class=" px-6 py-3 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300">
            <i class="fas fa-heart mr-2"></i> Add to Favorites
          </button>
        </div>
        <p v-else class="text-gray-400 text-center">No showtimes available</p>
      </div>
       
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { format, parseISO } from 'date-fns';

// Format time to "3:00 PM" format using date-fns
const formatTime = (isoDate) => {
  try {
    const date = parseISO(isoDate);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return 'Invalid Time';
  }
};

const route = useRoute();

const movie = computed(() => {
  return {
    title: decodeURIComponent(route.query.title || 'Unknown Title'),
    poster_url: decodeURIComponent(route.query.poster || 'default-poster.jpeg'),
    description: decodeURIComponent(route.query.description || 'No description available.'),
    rating: decodeURIComponent(route.query.rating || 'PG-13'),
    releaseDate: decodeURIComponent(route.query.releaseDate || 'Unknown Release Date'),
    schedules: (route.query.schedules || '').split('|').map(schedule => {
      const [Theatres, showtime] = schedule.split(':');
      return { Theatres, showtime };
    }).filter(schedule => schedule.Theatres && schedule.showtime) // Filter out invalid schedules
  };
});

const theaters = computed(() => {
  const theatersMap = {};

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

  return Object.values(theatersMap);
});



const bookmarkMovie = () => {
  
    alert('Movie bookmarked!');
 
};
</script>

<style scoped>
/* Custom styles can be adjusted here */
</style>
