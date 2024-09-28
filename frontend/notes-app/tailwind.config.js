/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // Path to your HTML file
    "./src/**/*.{js,jsx,ts,tsx}",],

  theme: {
    extend: {
      colors:{
        primary:"#2b85FF",
        secondary:"#EF863E"
      }
    },
  },
  plugins: [],
}
