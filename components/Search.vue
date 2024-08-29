<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Main Content Area -->
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4 border-gray-200 rounded-lg dark:border-gray-700">
        <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Directors</h1>
        
        <!-- Add New Director Button -->
        <button
          @click="toggleForm"
          class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          {{ showForm ? 'Cancel' : 'Add New Director' }}
        </button>

        <!-- Add New Director Form -->
        <div v-if="showForm" class="mb-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 class="dark:text-white text-xl font-semibold mb-4">Add New Director</h2>
          <form @submit.prevent="logDirector">
            <div class="mb-4">
              <label for="directorName" class="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                id="directorName"
                v-model="newDirectorName"
                type="text"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                required
                placeholder="Enter director's name"
              />
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Director
            </button>
          </form>
        </div>
        
        <div>
          <table class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th class="p-3 text-left text-gray-800 dark:text-white">Name</th>
                <th class="p-3 text-right text-gray-800 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="director in paginatedDirectors" :key="director.id">
                <td class="p-3 text-gray-800 dark:text-white">{{ director.name }}</td>
                <td class="p-3 text-right">
                  <button
                    class="text-red-600 hover:underline text-sm"
                    @click="showDeleteModal(director.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span class="flex items-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Showing {{ indexOfFirstItem + 1 }} -
            {{ Math.min(indexOfLastItem, directors.length) }} of
            {{ directors.length }}
          </span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                @click="paginate(currentPage - 1)"
                :disabled="currentPage === 1"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            <li v-for="n in totalPages" :key="n" class="flex items-center justify-center">
              <button
                @click="paginate(n)"
                :class="[
                  'px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                  currentPage === n ? 'text-blue-600 bg-blue-50' : ''
                ]"
              >
                {{ n }}
              </button>
            </li>
            <li>
              <button
                @click="paginate(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <!-- Delete Confirmation Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto"
        >
          <div class="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
            <svg
              @click="showModal = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 cursor-pointer fill-black hover:fill-red-500 absolute top-3 right-3"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              ></path>
            </svg>
            <div class="my-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-16 fill-red-500 inline"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                />
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                />
              </svg>
              <h2 class="text-lg font-semibold mb-2">Confirm Deletion</h2>
              <p>Are you sure you want to delete this director?</p>
              <div class="flex justify-center mt-4">
                <button
                  @click="confirmDelete"
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  @click="showModal = false"
                  class="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'admin'
})
import { ref, computed } from 'vue';

// States
const showForm = ref(false);
const newDirectorName = ref('');
const showModal = ref(false);
const directors = ref([
   { id: 1, name: 'Steven Spielberg' },
  { id: 2, name: 'Christopher Nolan' },
  { id: 3, name: 'Martin Scorsese' },
  { id: 4, name: 'Quentin Tarantino' },
  { id: 5, name: 'James Cameron' },
]);


// Toggle form visibility
const toggleForm = () => {
  showForm.value = !showForm.value;
};

// Log director name
const logDirector = () => {
  console.log('New Director:', newDirectorName.value);
  newDirectorName.value = ''; // Clear input field
};

// Paginate directors
const itemsPerPage = 5;
const currentPage = ref(1);
const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
const paginatedDirectors = computed(() =>
  directors.value.slice(indexOfFirstItem.value, indexOfLastItem.value)
);
const totalPages = computed(() => Math.ceil(directors.value.length / itemsPerPage));

// Handle pagination
const paginate = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};

// Show delete modal
const showDeleteModal = (id) => {
  // Set the director to be deleted
  showModal.value = true;
};

// Confirm deletion
const confirmDelete = () => {
  // Implement the deletion logic here
  showModal.value = false;
};
</script>


















<!-- <template>
  <div>
    <!-- Render nothing until loading is complete to prevent flashing -->
    <div v-if="loading" class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <!-- Optional: Add a loading spinner or message here -->
      <span>Loading...</span>
    </div>

    <div v-else class="bg-gray-900 min-h-screen">
      <!-- Navigation Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 mb-5 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <!-- Conditional rendering based on screen size -->
          <div>
            <!-- Hamburger Menu Button - visible on small screens -->
            <button
              v-if="isSmallScreen"
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>

            <!-- "Admin Page" Header - visible on large screens -->
            <h1 v-else class="text-xl font-semibold text-gray-900 dark:text-white">Admin Page</h1>
          </div>
        </div>
      </nav>

      <!-- Conditionally render LoginNavbar if authenticated, otherwise render Nav -->
      <LoginNavbar v-if="isAuthenticated" :user="user" />
      <Nav v-else />

      <!-- Sidebar - Hidden by default on small screens, shown when isSidebarOpen is true -->
      <div 
        :class="{
          'block': !isSmallScreen || isSidebarOpen,
          'hidden': isSmallScreen && !isSidebarOpen
        }"
        class="fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 sm:relative sm:block sm:w-auto"
      >
        <Adminsidebar />
      </div>

      <!-- Main Content -->
      <div class="pt-16"> <!-- Adjust for the fixed navbar height -->
        <slot />
        <Footer />
      </div>
    </div>
  </div>
</template> -->















<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <span>Loading...</span>
    </div>

    <div v-else class="bg-gray-900 min-h-screen flex flex-col lg:flex-row">
      <!-- Navigation Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <!-- Hamburger Menu Button - visible on medium and small screens -->
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white lg:hidden">Admin Page</h1>
        </div>
      </nav>

      <!-- Sidebar - Hidden on small/medium screens, shown on large screens or when isSidebarOpen is true -->
      <div
        :class="{
          'lg:w-64': true, // Fixed width on large screens
          'w-64': isSidebarOpen && isMediumOrSmallScreen, // Show sidebar when open on small/medium screens
          'hidden': isMediumOrSmallScreen && !isSidebarOpen // Hide sidebar on small/medium screens when closed
        }"
        class="bg-gray-800 transition-all duration-300 ease-in-out"
      >
        <Adminsidebar v-if="!isMediumOrSmallScreen || isSidebarOpen" />
      </div>

      <!-- Main Content -->
      <div :class="{'flex-1': true, 'ml-0 lg:ml-0': true} " class="pt-16 pl-0">
        <slot />
        <Footer />
      </div>
    </div>
  </div>
</template>



<template>
  <div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <span>Loading...</span>
    </div>

    <div v-else class="bg-gray-900 min-h-screen flex flex-col lg:flex-row">
      <!-- Navigation Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <!-- Hamburger Menu Button - visible on medium and small screens -->
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white lg:hidden">Admin Page</h1>
        </div>
      </nav>

      <!-- Sidebar - Hidden on small/medium screens, shown on large screens or when isSidebarOpen is true -->
      <div
        :class="{
          'lg:w-64': true, // Fixed width on large screens
          'w-64': isSidebarOpen && isMediumOrSmallScreen, // Show sidebar when open on small/medium screens
          'hidden': isMediumOrSmallScreen && !isSidebarOpen // Hide sidebar on small/medium screens when closed
        }"
        class="bg-gray-800 transition-all duration-300 ease-in-out"
      >
        <Adminsidebar v-if="!isMediumOrSmallScreen || isSidebarOpen" />
      </div>

      <!-- Main Content -->
      <div :class="{'flex-1': true, 'ml-0 lg:ml-0': true} " class="pt-16 pr">
        <slot />
        <Footer />
      </div>
    </div>
  </div>
</template>