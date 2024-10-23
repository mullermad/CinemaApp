<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div class="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">
          Your Ticket:
          <p class="text-sm">{{ ticketId }}</p>
        </h2>
        <p class="text-lg">Thank you</p>
      </div>
      <div class="border-b-2 border-gray-300 pb-4 mb-4">
        <h3 class="text-2xl font-semibold">
          Film: <span>{{ movieTitle }}</span>
        </h3>
        <p class="text-sm text-gray-600">
          Theaters: <span>{{ selectedTheater }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Showtime: <span>{{ formattedSelectedTime }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Tickets: {{ ticketQuantity }}
        </p>
      </div>
      <div class="mb-4">
        <h4 class="text-lg font-semibold">Total Price:</h4>
        <p class="text-xl font-bold">$ {{ totalPrice }}</p>
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
import { ref, computed } from 'vue';
import { parseISO, format } from 'date-fns';

const props = defineProps({
  show: Boolean,
  movieTitle: String,
  ticketId: String,
  selectedTheater: String,
  selectedTime: String, // Expected to be in ISO format
  ticketQuantity: Number,
  totalPrice: Number,
  payment_method: String,
});

const emit = defineEmits(['close']);

// Function to format time using date-fns
const formatTime = (isoDate) => {
  try {
    const date = parseISO(isoDate);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return 'Invalid Time';
  }
};

// Computed property for formatted selected time
const formattedSelectedTime = computed(() => formatTime(props.selectedTime));

// Close the modal
function close() {
  emit('close');
}
</script>
