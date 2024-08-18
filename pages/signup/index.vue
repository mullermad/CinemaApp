<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
    <div class="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-8 rounded-lg shadow-lg">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h2 class="text-3xl font-bold text-center">Create Your Account</h2>

        <div v-if="error" class="text-xl font-semibold text-center text-red-500">
          {{ error }}
        </div>

        <div>
          <label for="username" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
          <Field name="username" type="text" placeholder="Enter your username" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm" />
          <ErrorMessage name="username" class="text-red-500 text-sm italic" />
        </div>

        <div>
          <label for="email" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <Field name="email" type="email" placeholder="Enter your email" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm" />
          <ErrorMessage name="email" class="text-red-500 text-sm italic" />
        </div>

        <div>
          <label for="password" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
          <div class="relative">
            <Field name="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm" />
           
          </div>
          <ErrorMessage name="password" class="text-red-500 text-sm italic" />
        </div>

        <div>
          <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
          <div class="relative">
            <Field name="confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Confirm your password" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm" />
          
          </div>
          <ErrorMessage name="confirmPassword" class="text-red-500 text-sm italic" />
        </div>

      
        <div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" :disabled="isSubmitting">
            Sign Up
          </button>
        </div>
      </form>

      <p class="text-center mt-6">or</p>
      <div class="text-center text-lg py-4">
        <p>
          Already have an account? 
          <nuxt-link to="/login" class="text-blue-600 font-semibold">Login</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useField, useForm, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';


// Validation schema
const schema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Please enter your username'),
  email: yup.string().email('Please enter a valid email').required('Please enter your email address'),
  password: yup.string().min(5).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, 'Please create a stronger password').required('Please enter a password'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
});

const showPassword = ref(false);
const error = ref('');
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: username } = useField('username');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');




const onSubmit = handleSubmit(async (values) => {
  console.log(values); // Log the form values
  router.push('/login');
  // Add your signup logic here
});
</script>
