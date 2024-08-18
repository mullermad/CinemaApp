<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Profile</h1>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-2">User Information</h2>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <form @submit.prevent="saveChanges" class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>

      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input id="username" v-model="formData.username" type="text" placeholder="Enter your username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input id="email" v-model="formData.email" type="email" placeholder="Enter your email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <router-link to="/dashboared" type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</router-link>
    </form>
  </div>
</template>

<script setup>
const user = ref({
  username: 'JohnDoe',
  email: 'johndoe@example.com'
});

const formData = ref({
  username: '',
  email: ''
});

const saveChanges = () => {
  // Simulate saving changes
  console.log('Saving changes with:', formData.value);
  // Replace with actual logic to update user data
  user.value = { ...user.value, ...formData.value };
};
</script>
