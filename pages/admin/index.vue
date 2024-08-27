<template>
  <div class="flex h-screen bg-gray-900">
  
    

    <!-- Content Area -->
    <div class="flex-1 ml-64 p-4">
    <div class="p-4 border-2  border-dashed rounded-lg border-gray-700">
      <!-- Admin Dashboard Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <!-- Overview Card 1: Total Movies -->
        <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m4-4H8"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-100">Total Movies</span>
          </div>
          <p class="text-2xl font-bold text-gray-300">{{ totalMovies }}</p>
        </div>

        <!-- Overview Card 2: Total Directors -->
        <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l7 7 7-7"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-100">Total Directors</span>
          </div>
          <p class="text-2xl font-bold text-gray-300">{{ totalDirectors }}</p>
        </div>

        <!-- Overview Card 3: Total Stars -->
        <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-100">Total Stars</span>
          </div>
          <p class="text-2xl font-bold text-gray-300">{{ totalStars }}</p>
        </div>
      </div>

      <!-- Recent Activities -->
       <div>
    <h2 class="text-xl font-semibold text-gray-100 mb-4">Recent Activities</h2>
    <ul class="space-y-4">
      <li v-for="activity in recentActivities" :key="activity.title" class="p-4 bg-gray-800 rounded-lg shadow-md">
        <p class="font-medium text-gray-100">
          {{ activity.title }}
        </p>
        <p class="text-sm text-gray-400">{{ activity.time }}</p>
      </li>
    </ul>
  </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { format } from 'date-fns'; // Import date-fns for date formatting

definePageMeta({
  layout: 'admin',
  // middleware: 'auth' // Apply the authentication middleware
});
// Reactive variables for counts
const totalMovies = ref(0);
const totalDirectors = ref(0);
const totalStars = ref(0); 
const recentActivities = ref([]); // Updated with fetched activities

// GraphQL queries
const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movie_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_STARS_QUERY = gql`
  query GetStars {
    star_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_DIRECTORS_QUERY = gql`
  query GetDirectors {
    director_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const GET_RECENT_ACTIVITIES_QUERY = gql`
  query GetRecentMovies {
    movie_aggregate(order_by: {created_at: desc}, limit: 4) {
      nodes {
        title
        created_at
      }
    }
  }
`;

// Use queries to fetch data
const { result: moviesResult } = useQuery(GET_MOVIES_QUERY);
const { result: starsResult } = useQuery(GET_STARS_QUERY);
const { result: directorsResult } = useQuery(GET_DIRECTORS_QUERY);
const { result: activitiesResult } = useQuery(GET_RECENT_ACTIVITIES_QUERY);

// Watch for changes in the movies query result and update local state
watch(
  () => moviesResult.value?.movie_aggregate?.aggregate?.count,
  (newCount) => {
    if (newCount !== undefined) {
      totalMovies.value = newCount;
    }
  }
);

// Watch for changes in the stars query result and update local state
watch(
  () => starsResult.value?.star_aggregate?.aggregate?.count,
  (newCount) => {
    if (newCount !== undefined) {
      totalStars.value = newCount;
    }
  }
);

// Watch for changes in the directors query result and update local state
watch(
  () => directorsResult.value?.director_aggregate?.aggregate?.count,
  (newCount) => {
    if (newCount !== undefined) {
      totalDirectors.value = newCount;
    }
  }
);

// Watch for changes in the recent activities query result and update local state
watch(
  () => activitiesResult.value?.movie_aggregate?.nodes,
  (newActivities) => {
    if (newActivities) {
      recentActivities.value = newActivities.map(activity => ({
        title: activity.title,
        time: format(new Date(activity.created_at), 'PPpp') // Format date as 'Aug 23, 2024, 7:34 PM'
      }));
    }
  }
);
</script>



<!-- <script setup>
definePageMeta({
  layout: 'admin'
})
import { ref } from 'vue';

// Example data
const totalMovies = ref(120);
const totalDirectors = ref(45);
const totalStars = ref([75]);

const GET_STARS_QUERY = gql`
  star_aggregate(distinct_on: created_at) {
    aggregate {
      count
    }
  }
`;

// const { result, loading, error } = useQuery(GET_STARS_QUERY);



// Watch for changes in the query result and update local state
watch(
  () => result.value?.star,
  (newStars) => {
    if (newStars) {
      totalStars.value = newStars.map(star => ({
        id: star.star_id,
        name: star.name
      }));
    }
  }
);



// Example activities
const recentActivities = ref([
  { title: 'Added new movie: "Inception"', time: '2 hours ago' },
  { title: 'Updated movie details: "The Matrix"', time: '1 day ago' },
   { title: 'Added new movie: "Inception"', time: '2 hours ago' },
  { title: 'Updated movie details: "The Matrix"', time: '1 day ago' }
]);
// You can add any setup code or imports here
</script> -->

<style scoped>
/* Add any scoped CSS styles here */
</style>
