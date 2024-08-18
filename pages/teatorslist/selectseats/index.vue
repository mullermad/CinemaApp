<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white mt-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4">{{ movieTitle }}</h1>
      <h2 class="text-3xl font-semibold">{{ selectedTheater }}</h2>
      <p class="text-lg mt-2">{{ selectedTime }}</p>
    </div>

    <!-- Seat Map -->
    <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
      <div class="text-center mb-6 text-gray-400">
        <p>Select your seats</p>
      </div>

      <div class="grid grid-cols-8 gap-4">
        <div
          v-for="seat in seats"
          :key="seat.id"
          :class="[
            'w-12 h-12 flex items-center justify-center rounded-full cursor-pointer',
            seat.selected ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600',
            seat.occupied ? 'bg-gray-500 cursor-not-allowed' : ''
          ]"
          @click="selectSeat(seat)"
        >
          <span v-if="!seat.occupied">{{ seat.label }}</span>
        </div>
      </div>

      <div class="flex justify-between mt-8 text-gray-400">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-red-600 rounded-full mr-3"></div>
          <span>Selected</span>
        </div>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-500 rounded-full mr-3"></div>
          <span>Occupied</span>
        </div>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
          <span>Available</span>
        </div>
      </div>
    </div>

    <!-- Proceed Button -->
    <div class="text-center mt-12">
      <nuxt-link
        to="selectseats/checkout"
        class="px-8 py-4 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-300"
      >
        Proceed to Checkout
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const movieTitle = ref("Deadpool & Wolverine");
const selectedTheater = ref("AMC Newport Centre 11");
const selectedTime = ref("6:00 PM");

const seats = ref([
  { id: 1, label: "A1", occupied: false, selected: false },
  { id: 2, label: "A2", occupied: false, selected: false },
  { id: 3, label: "A3", occupied: true, selected: false },
  { id: 4, label: "A4", occupied: false, selected: false },
  { id: 5, label: "A5", occupied: false, selected: false },
  { id: 6, label: "B1", occupied: true, selected: false },
  { id: 7, label: "B2", occupied: false, selected: false },
  { id: 8, label: "B3", occupied: false, selected: false },
  { id: 9, label: "B4", occupied: true, selected: false },
  { id: 10, label: "B5", occupied: false, selected: false },
  { id: 11, label: "C1", occupied: false, selected: false },
  { id: 12, label: "C2", occupied: true, selected: false },
  { id: 13, label: "C3", occupied: false, selected: false },
  { id: 14, label: "C4", occupied: false, selected: false },
  { id: 15, label: "C5", occupied: false, selected: false },
]);

const selectSeat = (seat) => {
  if (!seat.occupied) {
    seat.selected = !seat.selected;
  }
};
</script>

<style scoped>
/* Additional styles to mimic the AMC style can go here */
</style>
