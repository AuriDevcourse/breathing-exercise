/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'blob-purple': {
          DEFAULT: '#bca5e3',
          light: '#d4c1f0',
          dark: '#a174db',
          deepest: '#40245e'
        },
        'blob-background': {
          DEFAULT: '#0f0c24',
          light: '#1b1648'
        }
      },
      borderRadius: {
        'blob': '63% 37% 54% 46% / 55% 48% 52% 45%'
      },
      boxShadow: {
        'blob-inset': 'inset 10px 0 40px #a174db, inset -10px 0 20px #40245e, inset -40px 10px 110px #1b1648'
      },
      keyframes: {
        transform: {
          '0%, 100%': { borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' },
          '14%': { borderRadius: '40% 60% 54% 46% / 49% 60% 40% 51%' },
          '28%': { borderRadius: '54% 46% 38% 62% / 49% 70% 30% 51%' },
          '42%': { borderRadius: '61% 39% 55% 45% / 61% 38% 62% 39%' },
          '56%': { borderRadius: '61% 39% 67% 33% / 70% 50% 50% 30%' },
          '70%': { borderRadius: '50% 50% 34% 66% / 56% 68% 32% 44%' },
          '84%': { borderRadius: '46% 54% 50% 50% / 35% 61% 39% 65%' }
        },
        movement: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'translateY(20%) rotateY(10deg)' }
        }
      },
      animation: {
        blob: 'transform 50s ease-in-out infinite alternate, movement 40s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
