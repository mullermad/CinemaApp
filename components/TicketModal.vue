<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div class="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">Your Ticket:
          <p class="text-sm">{{ticketId}}</p> </h2>
        <p class="text-lg">Thank you</p> <!-- Display user's name -->
      </div>
      <div class="border-b-2 border-gray-300 pb-4 mb-4">
        <h3 class="text-2xl font-semibold">Film : <span>{{ movieTitle }}</span></h3>
        <p class="text-sm text-gray-600">Theators: <span>{{  selectedTheater  }}</span></p>
        <p class="text-sm text-gray-600">Showtime: <span>{{ selectedTime }}</span> </p>
        <p class="text-sm text-gray-600">Tickets: {{ selectedSeats.length }}</p>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold">Selected Seats:</h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="seat in selectedSeats"
            :key="seat.id"
            class="px-3 py-1 bg-red-600 text-white rounded-lg"
          >
            {{ seat.label }}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold">Total Price:</h4>
        <p class="text-xl font-bold">$ {{ totalPrice }}</p>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold">Payment Method:</h4>
        <p>{{ payment_method }}</p>
      </div>
      <div class="text-center">
        <button @click="close" class="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';


const props = defineProps({
  show: Boolean,
  movieTitle: String,
   ticketId:String,
  selectedTheater: String,
  selectedTime: String,
  selectedSeats: Array,
  totalPrice: Number,
  payment_method: String,
});
 console.log("checkoutId  is kkkkkkkk in modal    ",props.ticketId);
const emit = defineEmits(['close']);



function close() {
  emit('close');

  
}
</script>
