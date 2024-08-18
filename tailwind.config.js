// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./pages/**/*.{js,ts,vue}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
