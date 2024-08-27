<template>
  <div class="flex min-h-screen bg-gray-900">
    <!-- Main Content Area -->
    <main class="flex-1 p-4 lg:ml-64">
      <div class="p-4 rounded-lg border-gray-700">
        <h1 class="text-2xl font-bold mb-4 text-white">Manage Stars</h1>
        
        <!-- Add New Director Button -->
        <button
          @click="toggleForm"
          class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          {{ showForm ? 'Cancel' : 'Add New Star' }}
        </button>

        <!-- Add New Director Form -->
        <div v-if="showForm" class="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h2 class="dark:text-white text-xl font-semibold mb-4">Add New Star</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="directorName" class="block text-gray-300 mb-2">Name</label>
              <input
                id="directorName"
                v-model="newStarName"
                type="text"
                class="w-full p-2 border border-gray-600 rounded-lg"
                required
                placeholder="Enter director's name"
              />
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Star
            </button>
          </form>
        </div>
        
        <div>
          <table class="w-full bg-gray-800 border  border-gray-700">
            <thead class="bg-gray-700">
              <tr>
                <th class="p-3 text-left text-white">Name</th>
                <th class="p-3 text-right text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="star in paginateStars" :key="star.id">
                <td class="p-3 text-white">{{ star.name }}</td>
                <td class="p-3 text-right">
                  <button
                    class="text-red-600 hover:underline text-sm"
                    @click="showDeleteModal(star.id)"
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
          <span class="flex items-center px-3 h-8 leading-tight border rounded-s-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
            Showing {{ indexOfFirstItem + 1 }} -
            {{ Math.min(indexOfLastItem, stars.length) }} of
            {{ stars.length }}
          </span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                @click="paginate(currentPage - 1)"
                :disabled="currentPage === 1"
                class="flex items-center justify-center px-3 h-8 leading-tight  border rounded-s-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Previous
              </button>
            </li>
            <li v-for="n in totalPages" :key="n" class="flex items-center justify-center">
              <button
                @click="paginate(n)"
                :class="[
                  'px-3 h-8 leading-tight  border  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white',
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
                class="flex items-center justify-center px-3 h-8 leading-tight   border  rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
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
              <p>Are you sure you want to delete this star?</p>
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
// Define the GraphQL queries and mutations
const GET_STARS_QUERY = gql`
  query GetStars {
     star {
    star_id
    name
  }
  }
`;


const INSERT_STAR_MUTATION = gql`
  mutation InsertStar($object: star_insert_input!) {
    insert_star_one(object: $object) {
      star_id
    }
  }
`;


const DELETE_STAR_MUTATION = gql`
  mutation DeleteStar($star_id: uuid!) {
    delete_star_by_pk(star_id: $star_id) {
      star_id
      name
    }
  }
`;
// States
const showForm = ref(false);
const newStarName = ref('');
const showModal = ref(false);
const starToDelete = ref(null); // For storing the director to be deleted



const { result, loading, error } = useQuery(GET_STARS_QUERY);

const stars = ref([]);

// Watch for changes in the query result and update local state
watch(
  () => result.value?.star,
  (newStars) => {
    if (newStars) {
      stars.value = newStars.map(star => ({
        id: star.star_id,
        name: star.name
      }));
    }
  }
);

// Toggle form visibility
const toggleForm = () => {
  showForm.value = !showForm.value;
};


const handleSubmit = async () => {
  const variables = {
    object: {
      name: newStarName.value,
    },
  };

  const { mutate } = useMutation(INSERT_STAR_MUTATION);

  try {
    const { data } = await mutate(variables);
    const starId = data.insert_star_one.star_id;
console.log("hhhhhhhhhhhh",data);
    stars.value.push({ id: starId, name: newStarName.value });
    newStarName.value = ''; // Clear input field

  } catch (err) {
    console.error('Mutation error:', err);
  }
};

// Handle director deletion
const handleDelete = async () => {
  const { mutate } = useMutation(DELETE_STAR_MUTATION);

  try {
    if (starToDelete.value) {
     const  variables={ star_id: starToDelete.value }
      const { data } = await mutate(variables);
      const deletedStarId = data.delete_star_by_pk.star_id;
console.log('deleteeeeeee',data);
      // Update the local state
      stars.value = stars.value.filter(star => star.id !== deletedStarId);
      showModal.value = false; // Close the modal
    }
  } catch (err) {
    console.error('Mutation error:', err);
  }
};

// Paginate stars
const itemsPerPage = 5;
const currentPage = ref(1);
const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
const paginateStars = computed(() =>
  stars.value.slice(indexOfFirstItem.value, indexOfLastItem.value)
);
const totalPages = computed(() => Math.ceil(stars.value.length / itemsPerPage));

// Handle pagination
const paginate = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};


// Show delete modal
const showDeleteModal = (id) => {
  starToDelete.value = id;
  showModal.value = true;
};


// Confirm deletion
const confirmDelete = () => {
  
  handleDelete();


};
</script>
