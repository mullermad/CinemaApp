<template>
  <section class="bg-gray-800">
  <div class="user-info bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
    <!-- User Information Section -->
    <h2 class="text-2xl font-bold mb-6 text-gray-200">User Information</h2>

    <!-- Show loading while waiting or if no data after timeout -->
    <div v-if="userLoading">
      <p v-if="!errorMessage" class="text-gray-300">Loading user information...</p>
      <p v-else class="text-red-400">{{ errorMessage }}</p>
    </div>

    <!-- Display user data when loaded -->
    <div v-else class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">User Information</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg shadow">
          <label class="block text-gray-600 font-semibold">Username:</label>
          <p class="text-gray-800 text-lg">{{ user.username }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg shadow">
          <label class="block text-gray-600 font-semibold">Email:</label>
          <p class="text-gray-800 text-lg">{{ user.email }}</p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg shadow col-span-1 sm:col-span-2">
          <label class="block text-gray-600 font-semibold">Role:</label>
          <p class="text-gray-800 text-lg">{{ user.role }}</p>
        </div>
      </div>
    </div>

    <!-- Ticket Information Section -->
    <h2 class="text-2xl font-bold mb-6 text-gray-200 mt-6">Purchased Tickets</h2>

    <!-- Show loading while fetching tickets or no data after timeout -->
    <div v-if="ticketLoading">
      <p v-if="!ticketErrorMessage" class="text-gray-300">Loading tickets...</p>
      <p v-else class="text-red-400">{{ ticketErrorMessage }}</p>
    </div>

    <!-- Display tickets data when loaded -->
    <div v-else-if="tickets.length > 0" class="space-y-6 mt-6">
      <div
        v-for="ticket in tickets"
        :key="ticket.showtime"
        class="ticket-info bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col relative"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">{{ ticket.movie }}</h3>
          <span class="text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1">Ticket</span>
        </div>

        <div class="mt-2 text-gray-700">
          <p><strong>Ticket ID:</strong> {{ ticket.checkout_id }}</p>
          <p><strong>User:</strong> {{ user.username }}</p>
          <p><strong>Cinema:</strong> {{ ticket.cinema }}</p>
          <p><strong>Showtime:</strong> {{ new Date(ticket.showtime).toLocaleString() }}</p>
          <p><strong>Pay:</strong> {{ ticket.totalPrice }}</p>
          <p><strong>Payment Method:</strong> {{ ticket.payment_method }}</p>
          <p><strong>CVV:</strong> {{ ticket.CVV }}</p>
          <p><strong>Last Updated:</strong> {{ new Date(ticket.updated_at).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-300">No tickets purchased yet.</p>
    </div>
  </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// GraphQL query to get user details
const GET_USER_QUERY = gql`
  query GetUser($userId: uuid!) {
    user(where: { user_id: { _eq: $userId } }) {
      username
      email
      role
    }
  }
`;

// GraphQL query to get user tickets
const GET_USER_TICKETS_QUERY = gql`
  query GetUserTickets($userId: uuid!) {
    checkout(where: { user_id: { _eq: $userId } }) {
      checkout_id
      cinema
      movie
      showtime
      payment_method
      CVV
      totalPrice
      updated_at
    }
  }
`;

// Initialize user and tickets data
const user = ref({
  username: '',
  email: '',
  role: '',
});
const tickets = ref([]);
const userLoading = ref(true); // Loading state for user
const ticketLoading = ref(true); // Loading state for tickets
const errorMessage = ref(''); // Error message for user data
const ticketErrorMessage = ref(''); // Error message for tickets

// Get user_id from localStorage
const users = JSON.parse(localStorage.getItem('user')); // Parse the JSON string
const userId = users ? users.user_id : null;

// Define authorization token (optional, in case you need it for headers)
const token = localStorage.getItem('auth_token');

// Fetch user data using Apollo useQuery with headers
const { result: userResult, loading: gqlUserLoading } = useQuery(GET_USER_QUERY, { userId }, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

// Fetch user tickets using Apollo useQuery with headers
const { result: ticketResult, loading: gqlTicketLoading } = useQuery(GET_USER_TICKETS_QUERY, { userId }, {
  context: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
  },
});

// Fetch user info and tickets when the component is mounted
onMounted(() => {
  // Set a timeout for user data
  setTimeout(() => {
    if (!gqlUserLoading.value && userResult.value) {
      user.value = userResult.value.user[0];
      userLoading.value = false; // Set loading state to false
    } else if (!user.value.username) {
      errorMessage.value = 'No user data available';
      userLoading.value = false; // Set loading state to false after timeout
    }
  }, 5000); // Wait for 5 seconds before displaying error if no data

  // Set a timeout for ticket data
  setTimeout(() => {
    if (!gqlTicketLoading.value && ticketResult.value) {
      tickets.value = ticketResult.value.checkout;
      ticketLoading.value = false; // Set loading state to false
    } else if (tickets.value.length === 0) {
      ticketErrorMessage.value = 'No tickets purchased yet';
      ticketLoading.value = false; // Set loading state to false after timeout
    }
  }, 5000); // Wait for 5 seconds before displaying error if no data
});
</script>

<style scoped>
.user-info {
  background-color: #1f2937; /* gray-800 */
}

.ticket-info {
  background-color: #edf2f7; /* you can adjust this color if needed */
}
</style>
