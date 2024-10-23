<template>
  <div class="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Rate this</h2>
    <div class="stars mb-6 flex items-center justify-center space-x-1">
      <span
        v-for="star in maxRating"
        :key="star"
        class="star"
        :class="{ 'text-gold': star <= (hoverRating || rating) }"
        @mouseover="hoverRating = star"
        @mouseleave="hoverRating = 0"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
    <p v-if="rating" class="text-center text-gray-600 mb-4">
      You selected a rating of: <span class="font-bold text-gray-800">{{ rating }}</span> out of {{ maxRating }}
    </p>
    <button 
      @click="submitRating" 
      :disabled="!rating || loading"
      class="w-full bg-blue-500 text-white py-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 disabled:bg-gray-400 disabled:hover:scale-100"
    >
      Submit Rating
    </button>
    <button 
      @click="cancelRating" 
      class="w-full mt-2 bg-gray-600 text-white py-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-gray-700"
    >
      Cancel
    </button>
    <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 mt-4 text-center">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const props = defineProps({
  movieId: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['closeModal']);

const INSERT_RATING = gql`
  mutation InsertRating($movieId: uuid!, $rating: Int!) {
    insert_rating_one(object: {movie_id: $movieId, rating: $rating}) {
      movie_id
      rating
      user_id
    }
  }
`;

const rating = ref(0);
const hoverRating = ref(0);
const maxRating = 10;
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);
const token = localStorage.getItem("authToken");

// const { mutate: insertRating } = useMutation(INSERT_RATING);
const { mutate: insertRating } = useMutation(INSERT_RATING, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});
const setRating = (value) => {
  rating.value = value;
};

const submitRating = async () => {
  if (!rating.value) return;
  try {
    loading.value = true;
    await insertRating({
      movieId: props.movieId,
      rating: rating.value,
    });

    successMessage.value = 'Rating submitted successfully!';
    errorMessage.value = '';

    setTimeout(() => {
      emit('closeModal');
    }, 900);

    rating.value = 0;
  } catch (error) {
    errorMessage.value = error.message || 'Failed to submit rating';
    successMessage.value = '';
  } finally {
    loading.value = false;
  }
};

const cancelRating = () => {
  emit('closeModal');
};
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc; /* Default star color */
  transition: color 0.2s ease-in-out;
}

.star.text-gold {
  color: #FFD700; /* Golden color for selected or hovered stars */
}
</style>
