/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ruisu: {
          bg: '#050508',
          dark: '#0d0d18',
          card: '#12121f',
          purple: '#7B2FBE',
          neon: '#B721FF',
          cyan: '#00D4FF',
          border: 'rgba(183,33,255,0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Nunito Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}