/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deera: {
          purple: '#8B008B', // Violet DEERA
          blue: '#000080',   // Bleu marine DEERA
        }
      },
    },
  },
  plugins: [],
};