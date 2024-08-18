<template>
  <footer class="bg-white  shadow dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <nuxt-link to="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movie</span>
        </nuxt-link>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <nuxt-link to="#" class="hover:underline me-4 md:me-6">About</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline me-4 md:me-6">Privacy Policy</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline me-4 md:me-6">Licensing</nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline">Contact</nuxt-link>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024 <nuxt-link to="/" class="hover:underline">Movie</nuxt-link>. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>

<script setup>
// No script is needed for this footer component
</script>

<style scoped>
footer {
  width: 100%;
  position: relative;
  bottom: 0;
}
</style>
