<template>
  <section class="bg-white   dark:bg-gray-900 relative w-full min-h-screen bg-cover bg-center pt-16" style="background-image: url('/path-to-your-image.jpg');">
    <div class="absolute inset-0  opacity-60 z-10"></div>

    <div class="relative z-20 flex flex-col justify-center items-center h-full px-4 text-center">
      <div class="absolute top-4 left-4 z-30 flex flex-col items-start space-y-2">
        <h2 class="text-2xl font-bold dark:text-white text-black drop-shadow-lg">MOVIES IN THEATERS</h2>
                <nuxt-link to="/movies-in-theaters" class="text-blue-400 hover:underline font-semibold mt-2">SEE ALL MOVIES</nuxt-link>

      </div>

      <div class="flex flex-col gap-4 p-4 w-full max-w-screen-lg mx-auto">
        <div class="mb-0 ml-3 p-6 mt-20 lg:mt-5 lg:ml-6 md:ml-10 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search movies by title"
            class="w-full border border-gray-300 shadow-md p-4 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 ring-blue-500"
          />
        </div>

      
      </div>

      <div class="w-full max-w-screen-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <nuxt-link
          v-for="(movie, index) in featuredMovies"
          :key="index"
          :to="getMovieLink(movie)"
          class="relative p-2 hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
        >
          <img :src="getImageUrl(movie.poster)" :alt="movie.title" class="w-full h-auto object-cover" />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p class="text-white text-lg font-semibold">{{ movie.title }}({{ movie.date }})</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue';



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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
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
    date:"2024",
    description: 'A high-octane action film about a retired cop who must confront a dangerous criminal organization from his past.',
    stars: ['Sylvester Stallone', 'Arnold Schwarzenegger', 'Dwayne Johnson'],
    schedule: [
      'Friday: 7:00 PM, 9:00 PM',
      'Saturday: 2:00 PM, 5:00 PM, 8:00 PM',
      'Sunday: 3:00 PM, 6:00 PM'
    ]
  },
];

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

input {
  background-color: white;
}

button {
  transition: background-color 0.3s;
}

button:hover {
  filter: brightness(0.9);
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
