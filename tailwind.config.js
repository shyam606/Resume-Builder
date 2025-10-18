/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  darkMode:'class',
  content: ['./src/**/*.{html,js,jsx,tsx,ts}'],
  theme: {
    extend: {
      boxShadow:{
        darkInputShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
      }
    },
  },
  plugins: [],
}

