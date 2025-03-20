/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0079BF',
        secondary: '#EBECF0',
        darkBg: '#1A1A1A',
      },
    },
  },
  plugins: [],
};