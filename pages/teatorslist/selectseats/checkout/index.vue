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
          <p class="text-md text-gray-400">Ticket Quantity: {{ ticketQuantity }}</p>
          <p class="text-md text-gray-400">Total Price: ${{ totalPrice }}</p>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="isProcessing" class="flex justify-center items-center mb-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      <p class="ml-4 text-lg">Processing your payment...</p>
    </div>

    <!-- Payment Success Message -->
    <div v-if="isPaymentSuccessful" class="flex justify-center items-center mb-12">
      <div class="bg-green-600 p-4 rounded-lg">
        <p class="text-xl">🎉 Payment Successful! Your tickets are ready.</p>
      </div>
    </div>

    <!-- Confirm and Pay Button -->
    <div v-if="!isProcessing && !isPaymentSuccessful" class="text-center">
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

const route = useRoute();
const { user } = useUserStore();
const showTicketModal = ref(false);
const isProcessing = ref(false);  // Tracks payment processing
const isPaymentSuccessful = ref(false); // Tracks payment success
const ticketId = ref("");
const movieTitle = ref(route.query.title || "Unknown Movie");
const selectedTheater = ref(route.query.theater || "Unknown Theater");
const selectedTime = ref(route.query.time || "Unknown Time");
const totalPrice = ref(parseFloat(route.query.totalPrice || 0));
const ticketQuantity = ref(parseFloat(route.query.ticketQuantity || 0));

// GraphQL Mutation for Chapa Payment
const PAYMENT_HANDLER_MUTATION = gql`
  mutation MyMutation($phoneNumber: String!, $amount: String!) {
    paymentHandler(arg1: { phoneNumber: $phoneNumber, amount: $amount }) {
      checkoutUrl
      message
      tx_ref
    }
  }
`;

// GraphQL Mutation for Checkout Data
const INSERT_CHECKOUT_MUTATION = gql`
  mutation InsertCheckout(
    $CVV: String!
    $cinema: String!
    $movie: String!
    $payment_method: String!
    $showtime: timestamptz!
    $totalPrice: Int!
    $user_id: uuid!
  ) {
    insert_checkout_one(
      object: {
        CVV: $CVV
        cinema: $cinema
        movie: $movie
        payment_method: $payment_method
        showtime: $showtime
        totalPrice: $totalPrice
        user_id: $user_id
      }
    ) {
      checkout_id
    }
  }
`;

const token = localStorage.getItem("authToken");

// Mutations
const { mutate: paymentHandler } = useMutation(PAYMENT_HANDLER_MUTATION, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

const { mutate: insertCheckout } = useMutation(INSERT_CHECKOUT_MUTATION, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

// Handle Checkout Process
async function handleCheckout() {
  try {
    if (!user?.user_id) {
      console.error("User ID not found. Please log in.");
      return;
    }

    isProcessing.value = true;

    const dummyPhoneNumber = "0943438385"; // Use your dummy number
    const paymentVariables = {
      phoneNumber: dummyPhoneNumber,
      amount: totalPrice.value.toString()
    };

    const paymentResponse = await paymentHandler(paymentVariables);
    console.log("Chapa payment response:", paymentResponse);

    const checkoutUrl = paymentResponse.data.paymentHandler.checkoutUrl;

    if (checkoutUrl) {
      const checkoutVariables = {
        CVV: "123",
        cinema: selectedTheater.value,
        movie: movieTitle.value,
        payment_method: "Chapa",
        showtime: new Date(selectedTime.value).toISOString(),
        totalPrice: totalPrice.value,
        user_id: user.user_id,
      };

      const checkoutResponse = await insertCheckout(checkoutVariables);
      console.log("Checkout data saved:", checkoutResponse);

      window.location.href = checkoutUrl;
    } else {
      console.error("Checkout URL not found.");
      alert("Checkout URL not found.");
    }

    isProcessing.value = false;

  } catch (error) {
    console.error("Checkout error:", error);
    isProcessing.value = false;
    alert("An error occurred during the checkout process. Please try again.");
  }
}
</script>
