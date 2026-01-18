/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#F7067F',
          yellow: '#F9D423',
          green: '#A8CC67',
          cyan: '#0AA5AC',
          purple: '#954892',
        }
      },
      screens: {
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        brand: ['Pacifico', 'cursive'], // Actualizado desde App.css
      },
      backgroundImage: {
        // Actualizado desde App.css
        'brand-gradient': 'linear-gradient(45deg, #F7067F, #F9D423)',
      }
    }
  },
  plugins: [],
}
