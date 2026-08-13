/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deera: {
          purple: '#7B2FBE',
          blue: '#2A1F8F',
        }
      },
    },
  },
  plugins: [],
};