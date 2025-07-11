/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/@heroicons/vue/**/*.{js,ts,vue}'],
  
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      backgroundColor: {
        gray: {
          900: '#0F0F0F',
          800: '#000000',
          700: '#1F1F1F',
        }
      }
    },
  },
  plugins: [],
}

