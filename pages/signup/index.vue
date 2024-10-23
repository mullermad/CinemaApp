<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-800">
    <div class="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h2 class="text-3xl font-bold text-center text-white">Create Your Account</h2>

        <div v-if="error" class="text-xl font-semibold text-center text-red-500">
          {{ error }}
        </div>

        <div>
          <label for="username" class="block text-gray-300 text-sm font-bold mb-2">Username</label>
          <Field name="username" type="text" placeholder="Enter your username" class="w-full p-3 border border-gray-700 rounded-lg shadow-sm" />
          <ErrorMessage name="username" class="text-red-500 text-sm italic" />
        </div>

        <div>
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <Field name="email" type="email" placeholder="Enter your email" class="w-full p-3 border border-gray-700 rounded-lg shadow-sm" />
          <ErrorMessage name="email" class="text-red-500 text-sm italic" />
        </div>

<div>
    <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Password</label>
    <div class="relative">
      <Field
        name="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg
          v-if="showPassword"
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19.5c5.5 0 10-7.5 10-7.5s-4.5-7.5-10-7.5-10 7.5-10 7.5 4.5 7.5 10 7.5zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          />
        </svg>
        <svg
          v-else
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 9.5a5.978 5.978 0 0 0-2.118-3.118A5.978 5.978 0 0 0 12 5.5c-3.09 0-5.623 2.684-6.279 3.542M12 12.5a2 2 0 0 1-1.733-3.278m4.466 0A2 2 0 0 1 12 12.5m7.721-3.24c1.118.973 2.062 2.293 2.572 3.737m-2.53 5.486c-.978-1.15-2.287-2.423-3.741-3.283M12 17.5c-3.09 0-5.623-2.684-6.279-3.542"
          />
        </svg>
      </button>
    </div>
    <ErrorMessage name="password" class="text-red-500 text-sm italic" />
  </div>
       <div>
  <label for="confirmPassword" class="block text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
  <div class="relative">
    <Field
      name="confirmPassword"
      :type="showConfirmPassword ? 'text' : 'password'"
      placeholder="Confirm your password"
      class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
    />
    <button
      type="button"
      @click="showConfirmPassword = !showConfirmPassword"
      class="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      <svg
        v-if="showConfirmPassword"
        class="w-8 h-8 text-gray-400" 
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 19.5c5.5 0 10-7.5 10-7.5s-4.5-7.5-10-7.5-10 7.5-10 7.5 4.5 7.5 10 7.5zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
      </svg>
   
      <svg
        v-else
        class="w-8 h-8 text-gray-400" 
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 9.5a5.978 5.978 0 0 0-2.118-3.118A5.978 5.978 0 0 0 12 5.5c-3.09 0-5.623 2.684-6.279 3.542M12 12.5a2 2 0 0 1-1.733-3.278m4.466 0A2 2 0 0 1 12 12.5m7.721-3.24c1.118.973 2.062 2.293 2.572 3.737m-2.53 5.486c-.978-1.15-2.287-2.423-3.741-3.283M12 17.5c-3.09 0-5.623-2.684-6.279-3.542"
        />
      </svg> 
    </button>
  </div>
  <ErrorMessage name="confirmPassword" class="text-red-500 text-sm italic" />
</div>

        <div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" :disabled="isSubmitting">
            Sign Up
          </button>
        </div>
      </form>

      <p class="text-center mt-6 text-white">or</p>
      <div class="text-center text-lg py-4 text-white">
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
import { useRouter } from 'vue-router';
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
const showConfirmPassword = ref(false);

const error = ref('');
const router = useRouter();

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: username } = useField('username');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');

// Define the GraphQL mutation
const SIGNUP_MUTATION = gql`
  mutation MyMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      user_id
    }
  }
`;

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  // Define variables to be passed to the mutation
  const variables = {
    email: values.email,
    password: values.password,
    username: values.username,
  };

  // Initialize the mutation
  // const { mutate } = useMutation(SIGNUP_MUTATION,{variables});
// Initialize the mutation with the headers
  const { mutate } = useMutation(SIGNUP_MUTATION, {
    variables,
    context: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  try {
    console.log(variables);
    // Execute the mutation with the variables
    const { data } = await mutate();
    console.log('Mutation response:', data);

    // Redirect to the login page after successful signup
    router.push('/login');
  } catch (err) {
    error.value = 'An error occurred during signup';
    console.error('Mutation error:', err);
  }
});


</script>
