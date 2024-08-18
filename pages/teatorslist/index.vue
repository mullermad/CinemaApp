<template>
  <section>
    <nuxt-link to="/teatorslist/selectseats">
      <div class="bg-gray-900 min-h-screen p-8 mt-8">
        <!-- Movie Title -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-white">{{ movie.title }}</h1>
          <p class="text-xl  text-white">{{ movie.description }}</p>
          
        </div>
         <div class="text-center mb-12">
          <h1 class="text-2xl font-bold text-white">Theatres List</h1>
         
          
        </div>
        <!-- Theater List -->
        <div
          v-for="theater in theaters"
          :key="theater.id"
          class="bg-gray-800 shadow-xl rounded-lg p-6 mb-8 max-w-4xl mx-auto"
        >
          <!-- Theater Name -->

          <h2 class="text-3xl font-semibold text-white mb-2">{{ theater.name }}</h2>

          <!-- Theater Description -->
          <div class="text-sm text-gray-400 mb-6">
            <p>{{ theater.description }}</p>
          </div>

          <!-- Showtimes -->
          <div class="flex flex-wrap gap-3 mb-6">
            <button
              v-for="time in theater.showtimes"
              :key="time"
              class="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-gray-900 transition duration-300"
            >
              {{ time }}
            </button>
          </div>

        
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const movie= computed(() => {
  return {
   title: route.query.title || "Unknown Movie",
   poster: route.query.poster || "Unknown Movie",
   description: route.query.description || "Unknown Movie",
   rating: route.query.rating || "Unknown Movie",
   releaseDate: route.query.releaseDate || "Unknown Movie",

  }
      
});

const theaters = ref([
  {
    id: 1,
    name: "AMC Newport Centre 11",
    description:
      "AMC Signature Recliners, Reserved Seating, Laser at AMC, Closed Caption, Audio Description",
    showtimes: ["1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"],
  },
  {
    id: 2,
    name: "AMC Empire 25",
    description:
      "IMAX, Dolby Cinema, Reserved Seating, Closed Caption, Audio Description",
    showtimes: ["12:00 PM", "2:45 PM", "5:30 PM", "8:15 PM"],
  },
]);
</script>

<style scoped>
/* Custom styles can be adjusted here */
</style>
