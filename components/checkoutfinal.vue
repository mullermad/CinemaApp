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
          <h3 class="text-2xl font-semibold">{{ movieTitle }}</h3>
          <p class="text-sm text-gray-400">{{ selectedTheater }}</p>
          <p class="text-sm text-gray-400">Showtime: {{ selectedTime }}</p>
        </div>
        <div class="text-right">
          <p class="text-md text-gray-400">ticketQuantity: {{ ticketQuantity }}</p>
          <p class="text-md text-gray-400">Total Price :$ {{ totalPrice }}</p>
        </div>
      </div>

      <!-- Payment Options -->
      <div class="mb-6">
        <h4 class="text-xl font-semibold mb-2">Payment Method</h4>
        <div class="flex flex-col gap-4">
          <label class="flex items-center">
            <input
              type="radio"
              value="creditCard"
              v-model="payment_method"
              class="mr-3"
            >
            Credit Card
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              value="paypal"
              v-model="payment_method"
              class="mr-3"
            >
            PayPal
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              value="applePay"
              v-model="payment_method"
              class="mr-3"
            >
            Apple Pay
          </label>
        </div>
      </div>

      <!-- Billing Information -->
      <div>
        <h4 class="text-xl font-semibold mb-2">Billing Information</h4>
        <div class="grid grid-cols-2 gap-4">
          <input
            v-model="cardNumber"
            type="text"
            placeholder="Card Number"
            class="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            v-model="cvv"
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
        @click="handleCheckout"
        class="px-8 py-4 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition duration-300"
      >
        Confirm and Pay
      </button>
    </div>

    <!-- Ticket Modal -->
    <TicketModal
      :show="showTicketModal"
      :movieTitle="movieTitle"
      :ticketId="ticketId"
      :selectedTheater="selectedTheater"
      :selectedTime="selectedTime"
      :ticketQuantity="ticketQuantity"
      :totalPrice="totalPrice"
      :payment_method="payment_method"
      @close="showTicketModal = false"
    />
  </div>
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../../../stores/userStore';
import { parseISO, formatISO } from 'date-fns';

const route = useRoute();
const { user } = useUserStore();
const showTicketModal = ref(false);
const ticketId = ref("");
const payment_method = ref("");
const cardNumber = ref('');
const cvv = ref('');
const movieTitle = ref(route.query.title || "Unknown Movie");
const selectedTheater = ref(route.query.theater || "Unknown Theater");
const selectedTime = ref(route.query.time || "Unknown Time");
const totalPrice = ref(parseFloat(route.query.totalPrice || 0));
const ticketQuantity = ref(parseFloat(route.query.ticketQuantity || 0));

// Define the GraphQL mutation
const INSERT_CHECKOUT_MUTATION = gql`
  mutation InsertCheckout(
    $CVV: String!
    $card_number: Int!
    $cinema: String!
    $movie: String!
    $payment_method: String!
    $showtime: timestamptz!
    $totalPrice:Int!
    $user_id: uuid!
  ) {
    insert_checkout_one(
      object: {
        CVV: $CVV
        card_number: $card_number
        cinema: $cinema
        movie: $movie
        payment_method: $payment_method
        showtime: $showtime
        totalPrice:$totalPrice
        user_id: $user_id
      }
    ) {
      checkout_id
    }
  }
`;

const token = localStorage.getItem("authToken");

const { mutate: insertCheckout } = useMutation(INSERT_CHECKOUT_MUTATION, {
   context: {
    headers: {
      'Content-Type': 'application/json', // Specify content type if necessary
      Authorization: token ? `Bearer ${token}` : '' // Include Authorization header if token exists
    },
  },
});

async function handleCheckout() {
  try {
    if (!user?.user_id) {
      console.error("User ID not found. Please log in.");
      return;
    }
    console.log("User ID found:", user.user_id);

    const showtimeISO = formatISO(parseISO(selectedTime.value));
    const variables = {
      CVV: cvv.value,
       totalPrice: totalPrice.value,
      card_number: parseInt(cardNumber.value, 10),
      cinema: selectedTheater.value,
      movie: movieTitle.value,
      payment_method: payment_method.value,
      showtime: showtimeISO,
      user_id: user.user_id
    };

    console.log("Variables for mutation:", variables);
console.log("kkkkkkkkkkkkkkkkkkkkkkkk totalPrice",variables.totalPrice);

    const { data } = await insertCheckout(variables);
    console.log("Checkout data:", data);

    ticketId.value = data.insert_checkout_one.checkout_id;
    console.log("Checkout ID is", ticketId.value);

    cardNumber.value = '';
    cvv.value = '';
    payment_method.value = '';

    showTicketModal.value = true;

  } catch (error) {
    console.error("Checkout error:", error);
  }
}
</script>
