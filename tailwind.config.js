/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        cozy: {
          cream: '#FDFCF0',
          peach: '#FFECD2',
          clay: '#D4A373',
          sage: '#CCD5AE',
          olive: '#E9EDC9',
          earth: '#606C38',
          dark: '#283618',
        }
      },
      fontFamily: {
        serif: ['"Quicksand"', 'sans-serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'sway': 'sway 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
