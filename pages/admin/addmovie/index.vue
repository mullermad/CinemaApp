<!-- manage movie -->
<template>
  <div class="flex min-h-screen bg-gray-900">
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4  rounded-lg border-gray-700 bg-gray-800 shadow-lg">
        <h1 class="text-2xl font-bold mb-4 text-white">Add Movie</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Movie Title -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Movie Title:</label>
            <input v-model="movie.title" type="text" class="text-white w-full p-3 border rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Description:</label>
            <textarea v-model="movie.description" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" rows="5" required></textarea>
          </div>

          <!-- Featured Image -->
          <!-- <div>
            <label class="block text-lg text-gray-300 mb-2">Featured Image:</label>
            <input type="file" @change="handleFeaturedImageChange" class="text-white w-full p-3 border  rounded-lg border-gray-700" />
          </div> -->
<!-- Featured Images -->
<div>
  <label class="block text-lg text-gray-300 mb-2">Featured Images:</label>
  <input type="file" @change="handleFeaturedImagesChange" multiple class="text-white w-full p-3 border rounded-lg border-gray-700" />
</div>

          <!-- Director -->
           <!-- Director -->
  <div>
    <label class="block text-lg text-gray-300 mb-2">Director:</label>
    <select v-model="movie.director_id" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required>
      <option value="" disabled>Select a director</option>
      <option v-for="director in directors" :key="director.id" :value="director.id">
        {{ director.name }}
      </option>
    </select>
  </div>
         

          <!-- Stars -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Stars (enter star names):</label>
            <div class="space-y-2">
              <div class="flex items-center">
                <input v-model="newStar" type="text" placeholder="Enter star name" class="text-white w-full p-3 border rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" />
                <button type="button" @click="addStar" class="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Add</button>
              </div>

              <div class="mt-2">
                <ul>
                  <li v-for="star in manuallyAddedStars" :key="star" class="text-gray-700 dark:text-gray-300">
                    {{ star }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Duration -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Duration (in minutes):</label>
            <input v-model.number="movie.duration" type="number" min="0" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

        
               <!-- Genre -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Genre:</label>
            <select v-model="movie.genre_name" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required>
              <option value="" disabled>Select a genre</option>
              <option v-for="genre in genres" :key="genre" :value="genre">
                {{ genre }}
              </option>
            </select>
          </div>
          <!-- Release Date -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Release Date:</label>
            <input v-model="movie.release_date" type="date" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

            <!-- Schedules -->
          <div>
            <label class="block text-lg text-gray-300 mb-2">Schedules:</label>
            <div v-for="(schedule, index) in movie.schedules" :key="index" class="mb-4">
              <div class="flex items-center space-x-4">
                <select v-model="schedule.theatre" class="text-white w-full p-3 border rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required>
                  <option value="" disabled>Select a theater</option>
                  <option v-for="theatre in theatres" :key="theatre" :value="theatre">
                    {{ theatre }}
                  </option>
                </select>
                <input v-model="schedule.showtime" type="datetime-local" class="text-white w-full p-3 border  rounded-lg bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500" required />
                <button type="button" @click="removeSchedule(index)" class="ml-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300">Remove</button>
              </div>
            </div>
            <button type="button" @click="addSchedule" class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Add Schedule</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Save Movie</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
import { ref } from 'vue';
import { gql } from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
const authStore = useAuthStore();
const token = authStore.getToken();

 const userJson = localStorage.getItem("user");
    const userData = userJson ? JSON.parse(userJson) : null;
    const userRole = userData?.role;
        const userId= userData?.user_id;


    console.log("ppppppppppppppppppppp userRole",userRole);
        console.log("ppppppppppppppppppppp userId",userId);

// Define the mutation query
const ADD_MOVIE_MUTATION = gql`
mutation AddMovie($input: movie_insert_input!) {
  insert_movie_one(object: $input) {
    movie_id
    title
    description
    director {
      director_id
      name
    }
    duration
    genre {
      name
    }
    poster_url
    stars
    release_date
    schedules {
      Theatres
      showtime
    }
  }
}

`;


  // mutation AddMovie($input: movie_insert_input!) {
  //   insert_movie_one(object: $input) {
  //     movie_id
  //     title
  //     description
  //     director {
  //       name
  //     }
  //     duration
  //     genre {
  //       name
  //     }
  //     poster_url
  //     stars
  //     release_date
  //      schedules {
  //       Theatres
  //       showtime
  //     }
  //   }
  // }
// Define the GraphQL queries and mutations
const GET_DIRECTORS_QUERY = gql`
  query GetDirectors {
    director {
      director_id
      name
    }
  }
`;


// Define the list of theaters
const theatres = [
  'Cineworld', 'Odeon', 'Vue', 'Empire', 'Regal', 'AMC'
];

// Reactive references for movie form and directors
const movie = ref({
  title: '',
  description: '',
  genre_name: '',
  director_name: '',
  stars: [],
  duration: 0,
  // poster_url: '',
  poster_url: [],  // Store multiple image URLs as an array
  release_date: '',
  schedules: [{ theatre: '', showtime: '' }]
});

// Define the list of genres
const genres = [
  'Action', 'Drama', 'Comedy', 'Kids', 'Horror', 'Romance',
  'Animated', 'Documentaries',
  'Foreign', 'Special Events', 'Western', 'Spy Film', 'Drama,History',
  'Classic', 'Sci-Fi'
];

// Use the useQuery hook to fetch directors
const { result, loading, error } = useQuery(GET_DIRECTORS_QUERY);

const directors = ref([]);

// Watch for changes in the query result and update local state
watch(
  () => result.value?.director,
  (newDirectors) => {
    if (newDirectors) {
      directors.value = newDirectors.map(director => ({
        id: director.director_id,
        name: director.name
      }));
    }
  }
);

const manuallyAddedStars = ref([]);
const newStar = ref('');

// Add a star to the manuallyAddedStars array
function addStar() {
  const star = newStar.value.trim();
  if (star && !manuallyAddedStars.value.includes(star)) {
    manuallyAddedStars.value.push(star);
    newStar.value = '';
  }
}
function addSchedule() {
  movie.value.schedules.push({ theatre: '', showtime: '' });
}

function removeSchedule(index) {
  movie.value.schedules.splice(index, 1);
}



async function handleFeaturedImagesChange(event) {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    try {
      // Upload each file to Cloudinary and get their URLs
      const imageUrls = await Promise.all(files.map(uploadImageToCloudinary));
      console.log('Uploaded image URLs:', imageUrls);

       movie.value.poster_url = imageUrls;

      // You could also use these URLs to display a preview of the images on the UI
    } catch (error) {
      console.error('Error handling multiple image uploads:', error);
    }
  } else {
    console.warn('No files selected for upload');
  }
}

// Upload image to Cloudinary
async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Use your Cloudinary upload preset

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dtyywkiyq/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    console.log("the image url are llllllllllllllllllllll ",data.secure_url);
    return data.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// // Initialize the mutation function
// const { mutate } = useMutation(ADD_MOVIE_MUTATION);
const { mutate } = useMutation(ADD_MOVIE_MUTATION, {
  context: {
   headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
       
        
      },
  },
});

async function handleSubmit() {
  const variables = {
    input: {
      title: movie.value.title || "",
      description: movie.value.description || "",
      genre: {
        data: {
          name: movie.value.genre_name || ""
        }
      },
      director_id: movie.value.director_id,  // Use director_id here
      stars: manuallyAddedStars.value.length ? manuallyAddedStars.value.join(', ') : "",
      duration: movie.value.duration || 0,
      // poster_url: movie.value.poster_url || "",
      poster_url: movie.value.poster_url || [],  // Send poster_urls as an array

      release_date: movie.value.release_date || "",
      schedules: {
        data: movie.value.schedules.map(schedule => ({
          Theatres: schedule.theatre || "",
          showtime: schedule.showtime || ""
        }))
      }
    }
  };

  try {
    const { data } = await mutate(variables);
    console.log('Movie added successfully:', data);
    // Clear form fields after successful mutation
    movie.value = {
      title: '',
      description: '',
      genre_name: '',
      director_id: '',  // Reset director_id
      stars: [],
      duration: 0,
      poster_url: [],
      release_date: '',
      schedules: [{ theatre: '', showtime: '' }]
    };
    manuallyAddedStars.value = [];
    newStar.value = '';
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}

</script>



