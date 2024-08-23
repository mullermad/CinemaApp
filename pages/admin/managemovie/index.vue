<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4 border-gray-200 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add Movie</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Movie Title -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Movie Title:</label>
            <input v-model="movie.title" type="text" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Description:</label>
            <textarea v-model="movie.description" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" rows="5" required></textarea>
          </div>

          <!-- Featured Image -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Featured Image:</label>
            <input type="file" @change="handleFeaturedImageChange" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700" />
          </div>

          <!-- Director -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Director:</label>
            <select v-model="movie.director_name" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" required>
              <option value="" disabled>Select a director</option>
              <option v-for="director in directors" :key="director.id" :value="director.name">
                {{ director.name }}
              </option>
            </select>
          </div>

          <!-- Stars -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Stars (enter star names):</label>
            <div class="space-y-2">
              <div class="flex items-center">
                <input v-model="newStar" type="text" placeholder="Enter star name" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" />
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
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Duration (in minutes):</label>
            <input v-model.number="movie.duration" type="number" min="0" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Genre -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Genre:</label>
            <input v-model="movie.genre_name" type="text" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Release Date -->
          <div>
            <label class="block text-lg text-gray-700 dark:text-gray-300 mb-2">Release Date:</label>
            <input v-model="movie.release_date" type="date" class="dark:text-white w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full bg-blue-500 dark:text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">Save Movie</button>
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

// Define the mutation query
const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: movie_insert_input!) {
    insert_movie_one(object: $input) {
      movie_id
      title
      description
      director {
        name
      }
      duration
      genre {
        name
      }
      poster_url
      stars
      release_date
    }
  }
`;


// Define the GraphQL queries and mutations
const GET_DIRECTORS_QUERY = gql`
  query GetDirectors {
    director {
      director_id
      name
    }
  }
`;
// Reactive references for movie form and directors
const movie = ref({
  title: '',
  description: '',
  genre_name: '',
  director_name: '',
  stars: [],
  duration: 0,
  poster_url: '',
  release_date: ''
});
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

// Handle featured image change event
function handleFeaturedImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    uploadImageToCloudinary(file);
  }
}

// Upload image to Cloudinary
async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dtyywkiyq/image/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    movie.value.poster_url = data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Initialize the mutation function
const { mutate } = useMutation(ADD_MOVIE_MUTATION);

// Handle form submission
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
      director: {
        data: {
          name: movie.value.director_name || ""
        }
      },
      stars: manuallyAddedStars.value.length ? manuallyAddedStars.value.join(', ') : "",
      duration: movie.value.duration || 0,
      poster_url: movie.value.poster_url || "",
      release_date: movie.value.release_date || ""
    }
  };

  console.log('Variables for mutation:', variables);

  try {
    const { data } = await mutate(variables);
    console.log('Movie added successfully:', data);
// Clear form fields after successful mutation
    movie.value = {
      title: '',
      description: '',
      genre_name: '',
      director_name: '',
      stars: [],
      duration: 0,
      poster_url: '',
      release_date: ''
    };
    manuallyAddedStars.value = [];
    newStar.value = '';
    // Optionally redirect or update the UI
    // router.push('/movies'); // Example redirect to movies list page
  } catch (error) {
    console.error('Error adding movie:', error);
    // Optionally display an error message to the user
  }
}
</script>





<!-- <script setup>
import { ref } from 'vue';

// Define the GraphQL mutation for adding a movie
const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: movie_insert_input!) {
    insert_movie_one(object: $input) {
      movie_id
      title
      description
      director {
        name
      }
      duration
      genre {
        name
      }
      poster_url
      stars
      release_date
    }
  }
`;

const movie = ref({
  title: '',
  description: '',
  genre: {
    name: ''
  },
  director: {
    name: ''
  },
  stars: [],
  duration: 0,
  poster_url: '',
  release_date: ''
});

const directors = ref([
  { id: '1e1c7b23-8cfa-4c4b-9c4b-9f0c1a58d70e', name: 'Quentin Tarantino' },
  { id: '2e6b6d12-75a6-4b19-9d9e-47d382cde5b8', name: 'Christopher Nolan' },
  { id: '3cdbd90c-7b3d-4f8a-a9d2-cf6d10f07f79', name: 'Steven Spielberg' },
  { id: '4a7b8c5f-8270-4878-b8de-4cdbdb9a6de1', name: 'Martin Scorsese' },
  { id: '5d1236b1-7a7e-4b45-a6b2-6c86e72fdded', name: 'James Cameron' }
]);

const manuallyAddedStars = ref([]);
const newStar = ref('');

function addStar() {
  const star = newStar.value.trim();
  if (star && !manuallyAddedStars.value.includes(star)) {
    manuallyAddedStars.value.push(star);
    newStar.value = '';
  }
}

function handleFeaturedImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    uploadImageToCloudinary(file);
  }
}

async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dtyywkiyq/image/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    movie.value.poster_url = data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
const { mutate } = useMutation(ADD_MOVIE_MUTATION);

async function handleSubmit() {
  // Prepare variables
  const variables = {
    input: {
      title: movie.value.title,
      description: movie.value.description,
      genre: {
        data: {
          name: movie.value.genre.name
        }
      },
      director: {
        data: {
          name: movie.value.director.name
        }
      },
      stars: manuallyAddedStars.value.join(', '),
      duration: movie.value.duration,
      poster_url: movie.value.poster_url,
      release_date: movie.value.release_date
    }
  };
  console.log("variables are   :",variables.input);

  try {
    // Execute the mutation with variables
    const { data } = await mutate({ variables });

    console.log('Input data:', variables);
    console.log('Movie added successfully:', data);

    // Optionally redirect or update the UI
    // router.push('/movies'); // Example redirect to movies list page
  } catch (error) {
    console.error('Error adding movie:', error);
    // Optionally display an error message to the user
  }
}
</script> -->

<style scoped>
/* Add any additional styles you need here */
</style>



<!-- <script setup>
definePageMeta({
  layout: 'admin'
})
import { ref } from 'vue';

// Define the GraphQL mutation for adding a movie
const ADD_MOVIE_MUTATION = gql`
  mutation AddMovie($input: movie_insert_input!) {
    insert_movie_one(object: $input) {
      movie_id
      title
      description
      director {
        name
      }
      duration
      genre {
        name
      }
      poster_url
      stars
      release_date
    }
  }
`;

const movie = ref({
  title: '',
  description: '',
  genre: { data: { name: '' } }, // Ensure genre is a nested object
  director: { data: { name: '' } }, // Ensure director is a nested object
  starIds: [],
  duration: 0,
  poster_url: '',
  release_date: '' // Added release_date field
});

const directors = ref([
  { id: '1e1c7b23-8cfa-4c4b-9c4b-9f0c1a58d70e', name: 'Quentin Tarantino' },
  { id: '2e6b6d12-75a6-4b19-9d9e-47d382cde5b8', name: 'Christopher Nolan' },
  { id: '3cdbd90c-7b3d-4f8a-a9d2-cf6d10f07f79', name: 'Steven Spielberg' },
  { id: '4a7b8c5f-8270-4878-b8de-4cdbdb9a6de1', name: 'Martin Scorsese' },
  { id: '5d1236b1-7a7e-4b45-a6b2-6c86e72fdded', name: 'James Cameron' }
]);

const manuallyAddedStars = ref([]);
const newStar = ref('');

function addStar() {
  const star = newStar.value.trim();
  if (star && !manuallyAddedStars.value.includes(star)) {
    manuallyAddedStars.value.push(star);
    newStar.value = ''; // Clear the input field after adding
  }
}

function handleFeaturedImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    uploadImageToCloudinary(file);
  }
}

async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dtyywkiyq/image/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    movie.value.poster_url = data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

const { mutate: addMovie, onDone, onError } = useMutation(ADD_MOVIE_MUTATION);

async function handleSubmit() {
  movie.value.starIds = [...manuallyAddedStars.value];
  console.log('Input data:', {
    title: movie.value.title,
    description: movie.value.description,
    genre: { data: { name: movie.value.genre.data.name } }, // Nested genre
    director: { data: { name: movie.value.director.data.name } }, // Nested director
    stars: movie.value.starIds.join(', '),
    duration: movie.value.duration,
    poster_url: movie.value.poster_url,
    release_date: movie.value.release_date // Added release_date
  });

  try {
    const { data: movieData } = await addMovie({
      variables: {
        input: {
          title: movie.value.title,
          description: movie.value.description,
          genre: { data: { name: movie.value.genre.data.name } }, // Ensure genre is nested
          director: { data: { name: movie.value.director.data.name } }, // Ensure director is nested
          stars: movie.value.starIds.join(', '),
          duration: movie.value.duration,
          poster_url: movie.value.poster_url,
          release_date: movie.value.release_date // Ensure release_date is included
        }
      }
    });

    console.log('Movie added successfully:', movieData);
    
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}
</script> -->

