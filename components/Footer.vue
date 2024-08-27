<template>
  <footer class="text-white bg-gray-800 border-gray-700  py-6">
    <div class="w-full max-w-screen-xl mx-auto px-4">
      <div class="flex flex-col md:flex-row md:justify-between items-center">
        <!-- Brand Section -->
        <div class="flex items-center mb-4 md:mb-0">
          <nuxt-link to="/" class="flex items-center">
            <span class="text-xl font-bold whitespace-nowrap">MovieVerse</span>
          </nuxt-link>
        </div>

        <!-- Navigation Links -->
        <ul class="flex flex-wrap items-center text-sm font-medium space-x-4">
          <li>
            <nuxt-link to="#" class="hover:underline">About Us</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline">Privacy Policy</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline">Terms & Conditions</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline">Contact Us</nuxt-link>
          </li>
        </ul>

        <!-- Social Media Links -->
        <div class="flex space-x-4 mt-4 md:mt-0">
          <nuxt-link to="https://github.com/mullermad" aria-label="Github" class="hover:text-gray-400">
            <i class="fab fa-facebook-f">Github</i>
          </nuxt-link>
          <nuxt-link to="https://github.com/mullermad" aria-label="Twitter" class="hover:text-gray-400">
            <i class="fab fa-twitter">linkedin</i>
          </nuxt-link>
          
         
        </div>
      </div>

      <!-- Footer Bottom Section -->
      <div class="text-center mt-6 text-sm">
        <span>© {{ currentYear }} <nuxt-link to="/" class="hover:underline">MovieVerse</nuxt-link>. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

// Get the current year
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>

footer .fab {
  font-size: 1.25rem; /* Adjust size of social media icons */
}
</style>
