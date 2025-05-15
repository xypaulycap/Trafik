/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#D4AF37', // Gold
          dark: '#B8860B', // Dark Gold
        },
        secondary: {
          light: '#F5F5F5', // Light Gray
          dark: '#333333', // Dark Gray
        },
        accent: {
          light: '#FFFFFF', // White
          dark: '#1A1A1A', // Near Black
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

