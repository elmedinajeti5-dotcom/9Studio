/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#060606',
        outer: '#404040',
        panel: '#0f0f0f',
        ink: '#f4f4f2',
        mist: '#b7b7b2',
        haze: '#7b7b78',
        hero: '#f2f2ef',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', '"Inter Tight"', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        shell: '0 28px 60px rgba(0, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
}
