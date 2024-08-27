<template>
  <nav class=" bg-gray-800 border-gray-700 fixed top-0 left-0 w-full z-50 mb-5">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <nuxt-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">MovieVerse</span>
      </nuxt-link>
      <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-solid-bg" :aria-expanded="isMenuOpen">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="{'hidden': !isMenuOpen, 'w-full': true, 'md:block': true, 'md:w-auto': true}" id="navbar-solid-bg">
        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          <li>
            <nuxt-link to="/" class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" exact-active-class="bg-blue-700" aria-current="page">Home</nuxt-link>
          </li>
         
          <li>
            <nuxt-link to="/signup" class="block py-2 px-3 md:p-0  rounded  md:border-0  text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Signup</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/login" class="block py-2 px-3 md:p-0  rounded   md:border-0  text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Login</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// Toggle menu visibility for mobile view
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Ensures the navigation bar stays fixed at the top */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50; /* Ensures the navigation bar is above other content */
}
</style>
