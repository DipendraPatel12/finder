// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         // Include the main index.html file
    "./src/**/*.{js,jsx}",  // Include all JS/JSX files in the src directory
  ],
  theme: {
    extend: {},              // Customize the theme if needed
  },
  plugins: [],               // Add Tailwind plugins here (e.g., forms, typography)
};
