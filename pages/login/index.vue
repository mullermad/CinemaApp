<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-800">
    <div class="w-full max-w-md bg-gray-900  p-8 rounded-lg shadow-lg">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h2 class="text-3xl font-bold text-center text-white">Welcome Back!</h2>

        <div v-if="error" class="text-xl font-semibold text-center text-red-500">
          {{ error }}
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
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" :disabled="isSubmitting">
            Login
          </button>
        </div>
      </form>

      <p class="text-center mt-6 text-white">or</p>
      <div class="text-center text-lg py-4 text-white">
        <p>
          Don&apos;t have an account? 
          <nuxt-link to="/signup" class="text-blue-600 font-semibold">Sign up</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';


const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Please enter your email address'),
  password: yup.string().min(5).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, 'Please create a stronger password').required('Please enter a password'),
});

const router = useRouter();
const showPassword = ref(false);
const error = ref('');
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});




const { value: email } = useField('email');
const { value: password } = useField('password');

const { setToken } = useAuthStore();
const { setUser } = useUserStore();


// Define the GraphQL mutation with correct variable type
const LOGIN_MUTATION = gql`
  mutation MyMutation($object: userLoginInput!) {
    userLogin(object: $object) {
      user_id
      token
      role
    }
  }
`;

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  // Prepare variables to be passed to the mutation
  const variables = {
    object: {
      email: values.email,
      password: values.password,
    },
  };

  console.log("variables:", variables);

  //Initialize the mutation
  // const { mutate } = useMutation(LOGIN_MUTATION);

  // Initialize the mutation with headers
  const { mutate } = useMutation(LOGIN_MUTATION, {
    context: {
      headers: {
        'Content-Type': 'application/json', // Specify content type if necessary
        // Include Authorization header if using tokens
        // 'Authorization': 'Bearer <your_token_if_needed>', // Replace with the token if you need to send it
      },
    },
  });
  // Initialize the mutation with headers

  try {
    // Execute the mutation with the variables
    const { data } = await mutate(variables);
    // Extract token and user_id from the response
    // const { user_id, token,role } = data.userLogin;
    // setToken(token);
    // setUser({ user_id, role });
        const { user_id, token, role, name, email } = data.userLogin;
        console.log("kkkkkkkkkkkkkkkk",data.userLogin);

    setToken(token);
    setUser({ user_id, role, name, email }); // Store the complete user info

    // Optionally, store user info in local storage
    // localStorage.setItem('user', JSON.stringify({ user_id, role, name, email }));
    

    console.log('Mutation response:', data);

   
  

   // Redirect based on user role after successful login
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  } catch (err) {
    error.value = 'An error occurred during login';
    console.error('Mutation error:', err);
  }
});


</script>
