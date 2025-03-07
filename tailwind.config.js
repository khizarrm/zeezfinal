/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f6ede4',
        secondary: '#231f20',
        accent: {
          sage: '#8A9A5B',
          terra: '#C67D5B',
          sand: '#D4C5B2',
        }
      },
      fontFamily: {
        argent: ['Argent CF', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};