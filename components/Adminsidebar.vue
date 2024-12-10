<template>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen  bg-gray-800 transition-transform">
    <div class="h-full px- py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li>
          <h1 class="text-white text-bold text-2xl p-4">Admin Dashboard</h1>
        </li>
        <li>
          <NuxtLink to="/admin" class="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
            </svg>

            <span class="ms-3">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/addmovie" class="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2zm-6-8H5V5h14v4h-2zM5 11h14v4H5v-4z" />
            </svg>

            <span class="ms-3">Add Movies</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/managemovie"
            class=" flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 1.5C6.66 1.5 2 6.16 2 12c0 5.44 4.18 10 9 10 1.55 0 3.02-.37 4.33-1.01l4.17 4.17c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-4.17-4.17C20.63 15.02 21 13.55 21 12c0-5.44-4.18-10-9-10zm0 2c3.91 0 7 3.09 7 7s-3.09 7-7 7-7-3.09-7-7 3.09-7 7-7zm-.5 3.5H11v2.5H9.5v1h1.5v2.5h1V12h1.5v-1h-1.5V8.5zM17.79 16.79c-.4.4-.93.61-1.41.61-.51 0-1.04-.22-1.42-.61l-1.09-1.09c-.39-.39-.61-.92-.61-1.41s.22-1.02.61-1.41l1.09-1.09c.38-.39.91-.61 1.42-.61.51 0 1.04.22 1.41.61l1.09 1.09c.39.39.61.92.61 1.41s-.22 1.02-.61 1.41l-1.09 1.09z" />
            </svg>

            <span class="manage-movie ms-3">Manage Movies</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/managedirector"
            class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-3 8c-2.76 0-5 2.24-5 5v1h16v-1c0-2.76-2.24-5-5-5H9zm-4 3c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1H8v-1zm9-12H7v2h9V3zm2 2H5v2h13V5zm-2 3H7v2h9V8zm2 3H5v2h13v-2z" />
            </svg>

            <span class="ms-3">Manage Directors</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/managestar" class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
            <svg class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.75L12 2 11.19 8.49 2 9.24l5.46 4.73L5.82 21z" />
              <path
                d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
              <path
                d="M12 8.27L15.09 11 14.54 13.74 18 16.5 15.5 18.16 12 15.27 8.5 18.16 6 16.5l3.46-2.76L8.91 11 12 8.27z" />
            </svg>

            <span class="ms-3">Manage Stars</span>
          </NuxtLink>
        </li>
        <!-- Add more sidebar items here -->
      </ul>
    </div>
  </aside>
</template>
