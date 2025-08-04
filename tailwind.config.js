/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          500: '#8B4513',
        },
        lightBlue: {
          300: '#87CEEB',
        },
        pink: {
          400: '#FF69B4',
        },
        orange: {
          500: '#FFA500',
        },
        red: {
          500: '#FF0000',
        },
        yellow: {
          400: '#FFFF00',
        },
        green: {
          500: '#008000',
        },
        darkBlue: {
          800: '#00008B',
        },
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}