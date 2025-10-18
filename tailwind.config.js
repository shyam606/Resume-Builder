/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: ['./src/**/*.{html,js,jsx,tsx,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'shining-gradient': 'linear-gradient(to bottom, #2d3748, #4a5568, #2d3748)', // Dark gray to a slightly lighter gray and back
        'shining-indigo-gradient': 'linear-gradient(to bottom, #1f2937, #374151, #4f46e5)', // Darker base with a vibrant indigo shine
      },
    },
  },
  plugins: [],
}

