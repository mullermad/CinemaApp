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
        <input
          type="number"
          v-model="ticketQuantity"
          min="1"
          class="w-20 text-center rounded-lg border border-gray-600 p-2 text-gray-900"
        />
        <span class="ml-3 text-lg">Tickets</span>
      </div>

      <div class="text-xl text-gray-400">
        Total Price: <span class="text-red-600">{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Proceed Button -->
    <div class="text-center mt-12">
      <nuxt-link
        :to="{
          path: '/teatorslist/selectseats/checkout',
          query: {
            title: movieTitle,
            theater: selectedTheater,
            time: selectedTime,
            ticketQuantity: ticketQuantity,
            totalPrice: totalPrice.toFixed(2) // Ensure it's formatted as a string
          }
        }"
        class="px-8 py-4 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-300"
      >
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
const totalPrice = computed(() => ticketQuantity.value * ticketPrice);
</script>
