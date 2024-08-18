<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white mt-8">
    <!-- Checkout Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4">Checkout</h1>
      <p class="text-lg">Confirm your details and proceed to payment</p>
    </div>

    <!-- Order Summary -->
    <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl mb-12">
      <h2 class="text-3xl font-semibold mb-4">Order Summary</h2>

      <!-- Movie Details -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-2xl font-semibold">Deadpool & Wolverine</h3>
          <p class="text-sm text-gray-400">AMC Newport Centre 11</p>
          <p class="text-sm text-gray-400">Showtime: 6:00 PM</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-400">Tickets: {{ selectedSeats.length }}</p>
          <p class="text-2xl font-bold">$ {{ ticketPrice * selectedSeats.length }}</p>
        </div>
      </div>

      <!-- Selected Seats -->
      <div class="mb-6">
        <h4 class="text-xl font-semibold mb-2">Selected Seats</h4>
        <div class="flex flex-wrap gap-4">
          <span
            v-for="seat in selectedSeats"
            :key="seat.id"
            class="px-4 py-2 bg-red-600 rounded-lg"
          >
            {{ seat.label }}
          </span>
        </div>
      </div>

      <!-- Payment Options -->
      <div class="mb-6">
        <h4 class="text-xl font-semibold mb-2">Payment Method</h4>
        <div class="flex flex-col gap-4">
          <label class="flex items-center">
            <input type="radio" name="paymentMethod" value="creditCard" class="mr-3">
            Credit Card
          </label>
          <label class="flex items-center">
            <input type="radio" name="paymentMethod" value="paypal" class="mr-3">
            PayPal
          </label>
          <label class="flex items-center">
            <input type="radio" name="paymentMethod" value="applePay" class="mr-3">
            Apple Pay
          </label>
        </div>
      </div>

      <!-- Billing Information -->
      <div>
        <h4 class="text-xl font-semibold mb-2">Billing Information</h4>
        <div class="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name on Card"
            class="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Card Number"
            class="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Expiration Date"
            class="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="CVV"
            class="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>

    <!-- Confirm and Pay Button -->
    <div class="text-center">
      <button
        class="px-8 py-4 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-300"
      >
        Confirm and Pay
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedSeats = ref([
  { id: 1, label: "A1" },
  { id: 2, label: "A2" },
  { id: 4, label: "B3" },
]);

const ticketPrice = ref(15.0); // Example ticket price per seat
</script>

<style scoped>
/* Additional styles to enhance the AMC-like appearance */
input[type="radio"] {
  accent-color: #dc2626; /* Red color for radio buttons */
}
</style>
