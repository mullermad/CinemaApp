<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white mt-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4">{{ movieTitle }}</h1>
      <h2 class="text-3xl font-semibold">{{ selectedTheater }}</h2>
      <p class="text-lg mt-2">{{ formattedSelectedTime }}</p>
    </div>

    <!-- Ticket Quantity -->
    <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl text-center">
      <div class="text-center mb-6 text-gray-400">
        <p>Enter the quantity of tickets:</p>
      </div>

      <div class="flex justify-center items-center mb-6">
        <input type="number" data-cy="quantity-input" v-model="ticketQuantity" min="1" @input="validateQuantity"
          class=" w-20 text-center rounded-lg border border-gray-600 p-2 text-gray-900" />
        <span class="ml-3 text-lg">Tickets</span>
      </div>

      <!-- <div v-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</div>

      <div class="text-xl text-gray-400">
        Total Price: <span class="text-red-600">{{ totalPrice.toFixed(2) }}</span>
      </div> -->

      <!-- <div class="text-xl text-gray-400">
        Total Price: <span class="text-red-600">{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div> -->
      <div v-if="errorMessage" class="error-message text-red-600 mb-4">{{ errorMessage }}</div>

      <div class="text-xl text-gray-400">
        Total Price: <span class="text-red-600">{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>
    <!-- Proceed Button -->
    <div class="text-center mt-12 v-if=" v-if="!errorMessage">
      <nuxt-link :to="{
        path: '/teatorslist/selectseats/checkout',
        query: {
          title: movieTitle,
          theater: selectedTheater,
          time: selectedTime,
          ticketQuantity: ticketQuantity,
          totalPrice: totalPrice.toFixed(2) // Ensure it's formatted as a string
        }
      }"
        class="proceed-to-checkout px-8 py-4 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-300">
        Proceed to Checkout
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { parseISO, format } from 'date-fns';

const route = useRoute();

const movieTitle = ref(route.query.title || "Unknown Movie");
const selectedTheater = ref(route.query.theater || "Unknown Theater");
const selectedTime = ref(route.query.time || "Unknown Time");
const ticketPrice = 15.0;
const ticketQuantity = ref(1); // Default ticket quantity
const errorMessage = ref(''); // Error message for input validation

// Function to format time
const formatTime = (isoDate) => {
  try {
    const date = parseISO(isoDate);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return 'Invalid Time';
  }
};

// Computed property for formatted time
const formattedSelectedTime = computed(() => formatTime(selectedTime.value));

// Compute total price based on quantity
// const totalPrice = computed(() => ticketQuantity.value * ticketPrice);
const totalPrice = computed(() => Math.max(ticketQuantity.value * ticketPrice, 0));

const validateQuantity = () => {
  if (ticketQuantity.value < 1) {
    errorMessage.value = 'Please enter a positive number of tickets.';
  } else {
    errorMessage.value = '';
  }
};
</script>
