<template>
  <section class="bg-white   dark:bg-gray-900 relative w-full min-h-screen bg-cover bg-center pt-16" style="background-image: url('/path-to-your-image.jpg');">
    <div class="absolute inset-0 opacity-60 z-10"></div>

    <div class="relative z-20 flex flex-col justify-center items-center h-full px-4 text-center">
      <div class="absolute top-4 left-4 z-30 flex flex-col items-start space-y-2">
        <h2 class="text-3xl font-bold dark:text-white text-black drop-shadow-lg">MOVIES IN THEATERS</h2>
      </div>

      <div class="flex flex-col gap-4 p-4 w-full max-w-screen-lg mx-auto">
        <div class="mb-0 ml-3 p-6 mt-20 lg:mt-5 lg:ml-6 md:ml-10 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search movies by title"
            class="w-full border border-gray-300 shadow-md p-4 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue-500"
          />
        </div>
        <h5 class="text-xl font-bold dark:text-white text-black drop-shadow-lg">FILTER MOVIE BY GENRE</h5>
        <div class="flex flex-wrap gap-2 justify-center max-w-screen-lg">
          <button
            v-for="genre in genres"
            :key="genre"
            @click="filterByGenre(genre)"
            :class="{
              'bg-blue-400': activeGenre === genre,
              'bg-blue-500': activeGenre !== genre
            }"
            class="px-4 py-2 rounded-full text-white font-semibold focus:outline-none hover:bg-blue-00 transition duration-300"
          >
            {{ genre }}
          </button>
        </div>
      </div>

      <!-- Conditional rendering for filtered movies -->
      <div class="w-full max-w-screen-xl">
        <div v-if="filteredMovies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <nuxt-link
            v-for="(movie, index) in filteredMovies"
            :key="index"
            :to="getMovieLink(movie)"
            class="relative p-2 hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
          >
            <img :src="getImageUrl(movie.poster)" :alt="movie.title" class="w-full h-auto object-cover" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p class="text-white text-lg font-semibold">{{ movie.title }}</p>
            </div>
          </nuxt-link>
        </div>
        <div v-else class="text-white text-lg font-semibold text-center mt-8">
          No movies found for the selected genre.
        </div>
      </div>
      

    </div>
  
  </section>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Initialize router and route
const router = useRouter();
const route = useRoute();

// List of genres
const genres = [
  'Action', 'Drama', 'Comedy', 'Kids', 'Horror', 'Romance',
  'Animated', 'Documentaries',
  'Foreign', 'Special Events', 'Western', 'Spy Film', 'Historical Film',
  'Classic', 'War'
];

const activeGenre = ref('');

// Function to filter movies by genre
const filterByGenre = (genre) => {
  activeGenre.value = genre;
  router.push({ query: { genre } });
};

// Sample movie data including genres
const featuredMovies = [
 {
    title: 'The Silent Forest',
    poster: 'poster1.jpeg',
    description: 'An intriguing movie about a forest with secrets. Follow the journey of the protagonist as they uncover the mysteries hidden within.',
    stars: ['Alice Johnson', 'Bob Smith', 'Charlie Brown'],
    schedule: [
      'Monday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Tuesday: 1:00 PM, 4:00 PM, 7:00 PM',
      'Wednesday: 2:00 PM, 5:00 PM, 8:00 PM'
    ]
  },
  {
    title: 'Lost in Time',
    poster: 'poster2.webp',
    description: 'A time-traveling adventure that explores different eras and dimensions.',
    stars: ['David Wilson', 'Eva Green', 'Frank Harris'],
    schedule: [
      'Monday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Tuesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Wednesday: 3:00 PM, 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Galactic Odyssey',
    poster: 'poster1.jpeg',
    description: 'Join the crew of a spaceship as they navigate through uncharted galaxies and face unknown threats.',
    stars: ['Samuel Lee', 'Nina Patel', 'John Doe'],
    schedule: [
      'Friday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Sunday: 3:00 PM, 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Whispering Shadows',
    poster: 'poster2.webp',
    description: 'A chilling horror film that follows a group of friends who encounter supernatural forces in an abandoned mansion.',
    stars: ['Laura Lee', 'Mark Thompson', 'Sophia Williams'],
    schedule: [
      'Thursday: 8:00 PM, 10:00 PM',
      'Friday: 7:00 PM, 9:00 PM',
      'Saturday: 8:00 PM, 10:00 PM'
    ]
  },
  {
    title: 'Eternal Love',
    poster: 'poster1.jpeg',
    description: 'A heartwarming romance about two souls destined to find each other across time and space.',
    stars: ['Emily Adams', 'Ryan Baker', 'Olivia Martinez'],
    schedule: [
      'Monday: 1:00 PM, 4:00 PM, 7:00 PM',
      'Wednesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Friday: 6:00 PM, 9:00 PM'
    ]
  },{
    title: 'Underworld Chronicles',
    poster: 'poster2.webp',
    description: 'An action-packed film that delves into the hidden world of underground fighters and their battles for supremacy.',
    stars: ['Chris Evans', 'Scarlett Johansson', 'Tom Hardy'],
    schedule: [
      'Tuesday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Thursday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 5:00 PM, 8:00 PM'
    ]
  },

  {
    title: 'Underworld Chronicles',
    poster: 'poster2.webp',
    description: 'An action-packed film that delves into the hidden world of underground fighters and their battles for supremacy.',
    stars: ['Chris Evans', 'Scarlett Johansson', 'Tom Hardy'],
    schedule: [
      'Tuesday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Thursday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 5:00 PM, 8:00 PM'
    ]
  },
    {
    title: 'City of Dreams',
    poster: 'poster1.jpeg',
    description: 'A gripping drama about a young journalist who uncovers a web of corruption in a bustling metropolis.',
    stars: ['Rachel Adams', 'James Lee', 'Michael Thompson'],
    schedule: [
      'Monday: 5:00 PM, 8:00 PM',
      'Wednesday: 4:00 PM, 7:00 PM',
      'Friday: 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Hidden Realms',
    poster: 'poster2.webp',
    description: 'An epic fantasy adventure where a group of heroes embark on a quest to save their world from an ancient evil.',
    stars: ['Emma Watson', 'Daniel Radcliffe', 'Rupert Grint'],
    schedule: [
      'Tuesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Thursday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Saturday: 4:00 PM, 7:00 PM'
    ]
  },
  {
    title: 'The Last Stand',
    poster: 'poster1.jpeg',
    description: 'A high-octane action film about a retired cop who must confront a dangerous criminal organization from his past.',
    stars: ['Sylvester Stallone', 'Arnold Schwarzenegger', 'Dwayne Johnson'],
    schedule: [
      'Friday: 7:00 PM, 9:00 PM',
      'Saturday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Sunday: 3:00 PM, 6:00 PM'
    ]
  },
];

const filteredMovies = computed(() => {
  if (!activeGenre.value || activeGenre.value === 'All') {
    return featuredMovies;
  }
  return featuredMovies.filter(movie => movie.genre === activeGenre.value);
});

const getImageUrl = (filename) => {
  return new URL(`../assets/img/${filename}`, import.meta.url).href;
};

const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
    query: {
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
      stars: movie.stars.join(','),
      schedule: movie.schedule.join('|')
    }
  };
};

// On component mount, read the genre from the query and set the active genre
onMounted(() => {
  const queryGenre = route.query.genre;
  if (queryGenre && genres.includes(queryGenre)) {
    activeGenre.value = queryGenre;
  }
});
</script>


<!-- <script setup>
import { ref, computed } from 'vue';

// List of genres
const genres = [
  'Action', 'Drama', 'Comedy', 'Kids', 'Horror', 'Romance', 'Sci-Fi',
  'Animated', 'Documentaries', 'IMAX 3D', 'Suspense', 'Indie',
  'Foreign', 'Special Events', 'Western', 'Spy Film', 'Historical Film',
  'Classic', 'War'
];

const activeGenre = ref('');

// Sample movie data including genres
const featuredMovies = [
  {
    title: 'The Silent Forest',
    poster: 'poster1.jpeg',
    description: 'An intriguing movie about a forest with secrets. Follow the journey of the protagonist as they uncover the mysteries hidden within.',
    stars: ['Alice Johnson', 'Bob Smith', 'Charlie Brown'],
    schedule: [
      'Monday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Tuesday: 1:00 PM, 4:00 PM, 7:00 PM',
      'Wednesday: 2:00 PM, 5:00 PM, 8:00 PM'
    ]
  },
  {
    title: 'Lost in Time',
    poster: 'poster2.webp',
    description: 'A time-traveling adventure that explores different eras and dimensions.',
    stars: ['David Wilson', 'Eva Green', 'Frank Harris'],
    schedule: [
      'Monday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Tuesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Wednesday: 3:00 PM, 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Galactic Odyssey',
    poster: 'poster1.jpeg',
    description: 'Join the crew of a spaceship as they navigate through uncharted galaxies and face unknown threats.',
    stars: ['Samuel Lee', 'Nina Patel', 'John Doe'],
    schedule: [
      'Friday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Sunday: 3:00 PM, 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Whispering Shadows',
    poster: 'poster2.webp',
    description: 'A chilling horror film that follows a group of friends who encounter supernatural forces in an abandoned mansion.',
    stars: ['Laura Lee', 'Mark Thompson', 'Sophia Williams'],
    schedule: [
      'Thursday: 8:00 PM, 10:00 PM',
      'Friday: 7:00 PM, 9:00 PM',
      'Saturday: 8:00 PM, 10:00 PM'
    ]
  },
  {
    title: 'Eternal Love',
    poster: 'poster1.jpeg',
    description: 'A heartwarming romance about two souls destined to find each other across time and space.',
    stars: ['Emily Adams', 'Ryan Baker', 'Olivia Martinez'],
    schedule: [
      'Monday: 1:00 PM, 4:00 PM, 7:00 PM',
      'Wednesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Friday: 6:00 PM, 9:00 PM'
    ]
  },{
    title: 'Underworld Chronicles',
    poster: 'poster2.webp',
    description: 'An action-packed film that delves into the hidden world of underground fighters and their battles for supremacy.',
    stars: ['Chris Evans', 'Scarlett Johansson', 'Tom Hardy'],
    schedule: [
      'Tuesday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Thursday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 5:00 PM, 8:00 PM'
    ]
  },

  {
    title: 'Underworld Chronicles',
    poster: 'poster2.webp',
    description: 'An action-packed film that delves into the hidden world of underground fighters and their battles for supremacy.',
    stars: ['Chris Evans', 'Scarlett Johansson', 'Tom Hardy'],
    schedule: [
      'Tuesday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Thursday: 4:00 PM, 7:00 PM, 10:00 PM',
      'Saturday: 5:00 PM, 8:00 PM'
    ]
  },
    {
    title: 'City of Dreams',
    poster: 'poster1.jpeg',
    description: 'A gripping drama about a young journalist who uncovers a web of corruption in a bustling metropolis.',
    stars: ['Rachel Adams', 'James Lee', 'Michael Thompson'],
    schedule: [
      'Monday: 5:00 PM, 8:00 PM',
      'Wednesday: 4:00 PM, 7:00 PM',
      'Friday: 6:00 PM, 9:00 PM'
    ]
  },
  {
    title: 'Hidden Realms',
    poster: 'poster2.webp',
    description: 'An epic fantasy adventure where a group of heroes embark on a quest to save their world from an ancient evil.',
    stars: ['Emma Watson', 'Daniel Radcliffe', 'Rupert Grint'],
    schedule: [
      'Tuesday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Thursday: 3:00 PM, 6:00 PM, 9:00 PM',
      'Saturday: 4:00 PM, 7:00 PM'
    ]
  },
  {
    title: 'The Last Stand',
    poster: 'poster1.jpeg',
    description: 'A high-octane action film about a retired cop who must confront a dangerous criminal organization from his past.',
    stars: ['Sylvester Stallone', 'Arnold Schwarzenegger', 'Dwayne Johnson'],
    schedule: [
      'Friday: 7:00 PM, 9:00 PM',
      'Saturday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Sunday: 3:00 PM, 6:00 PM'
    ]
  },
];

const filteredMovies = computed(() => {
  if (!activeGenre.value || activeGenre.value === 'All') {
    return featuredMovies;
  }
  return featuredMovies.filter(movie => movie.genre === activeGenre.value);
});

const filterByGenre = (genre) => {
  activeGenre.value = genre;
};

// Example function to get movie URL
const getImageUrl = (filename) => {
  return new URL(`../assets/img/${filename}`, import.meta.url).href;
};

const getMovieLink = (movie) => {
  return {
    path: `/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
    query: {
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
      stars: movie.stars.join(','),
      schedule: movie.schedule.join('|')
    }
  };
};
</script> -->


<style scoped>
section {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

input {
  background-color: white;
}

button {
  transition: background-color 0.3s, filter 0.3s;
}

button:hover {
  filter: brightness(0.9);
}

button.bg-blue-800 {
  background-color: #2c5282; /* Darker blue for active state */
}

img {
  border-radius: 0.5rem;
}

img:hover {
  transform: scale(1.05);
}

.movie-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
