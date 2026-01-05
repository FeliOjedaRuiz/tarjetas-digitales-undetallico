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
          yellow: '#FFDC42',
          green: '#A8CC67',
          cyan: '#0AA5AC',
          purple: '#954892',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        brand: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FFDC42 0%, #A8CC67 25%, #0AA5AC 50%, #954892 75%, #F7067F 100%)',
      }
    }
  },
  plugins: [],
}
