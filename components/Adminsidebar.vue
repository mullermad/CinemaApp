
<template>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen  bg-gray-800 transition-transform">
      <div class="h-full px- py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
           <li>
           <h1 class="text-white text-bold text-2xl p-4">Admin Dashboard</h1>
          </li>
          <li>
            <NuxtLink to="/admin" class="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group">
              <svg class="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>
              <span class="ms-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/managemovie" class="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
              <svg class="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>
              <span class="ms-3">Manage Movies</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/managedirector" class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
              <svg class="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>
              <span class="ms-3">Manage Directors</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/managestar" class="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group">
              <svg class="w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>
              <span class="ms-3">Manage Stars</span>
            </NuxtLink>
          </li>
          <!-- Add more sidebar items here -->
        </ul>
      </div>
    </aside>
</template>
