/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sakthi: {
          charcoal: '#171717',
          forest: '#06110C',
          crimson: '#A31C1B',
          white: '#FFFFFF',
          offWhite: '#F7F7F5',
          lightGray: '#E5E5E5',
          muted: '#A3A3A3',
          border: '#E5E5E5',
          textMuted: '#666666',
        },
        brand: {
          charcoal: '#171717',
          forest: '#06110C',
          crimson: '#A31C1B',
          white: '#FFFFFF',
          offWhite: '#F7F7F5',
          lightGray: '#E5E5E5',
          muted: '#A3A3A3',
          bg: '#FFFFFF',
          bgSecondary: '#F7F7F5',
          surface: '#FFFFFF',
          surfaceLight: '#F7F7F5',
          text: '#171717',
          textMuted: '#666666',
          border: '#E5E5E5',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#A31C1B',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Poppins', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Poppins', 'Outfit', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
