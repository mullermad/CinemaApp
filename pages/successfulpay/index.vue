<template>
  <div class="success-container">
    <div class="success-card">
      <h1 class="success-title">Payment Successful</h1>
      <p class="success-message">Thank you for your payment!</p>

      <div class="button-container">
        <router-link to="/" class="btn-home">Return to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const transactionId = ref("");
</script>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0e0d0d; /* Light background for contrast */
}

.success-card {
  background-color: #fff; /* White card for content */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 40px; /* Padding for spacing */
  text-align: center;
  max-width: 900px; /* Limit card width */
  width: 98%; /* Responsive width */
  min-height: 400px; /* Set a minimum height for the card */
  display: flex; /* Use flexbox for vertical alignment */
  flex-direction: column; /* Align content vertically */
  justify-content: center; /* Center content vertically */
}

.success-title {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50; /* Green color for the title */
  margin-bottom: 10px; /* Space below title */
}

.success-message {
  font-size: 18px;
  margin-bottom: 20px; /* Space below message */
  color: #333; /* Darker text for better readability */
}

.button-container {
  display: flex; /* Use flexbox to center the button */
  justify-content: center; /* Center the button horizontally */
}

.btn-home {
  padding: 8px 12px; /* Adjusted padding for a smaller button */
  background-color: #4caf50; /* Green */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s; /* Transition effects */
  display: inline-block; /* Ensure padding works correctly */
  max-width: 150px; /* Set a maximum width for the button */
  text-align: center; /* Center text within the button */
}

.btn-home:hover {
  background-color: #45a049; /* Darker green */
  transform: scale(1.05); /* Slight scaling effect on hover */
}

.btn-home:focus {
  outline: none; /* Remove outline on focus */
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5); /* Highlight on focus */
}
</style>
