/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        space: '"Space Mono", monospace',
        matemasie: '"Matemasie", sans-serif',
      },
    },
  },
  plugins: [require('daisyui')],
};
