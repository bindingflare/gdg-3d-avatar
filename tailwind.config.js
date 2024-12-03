/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./create/"], //, "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        korean: ['"Nanum Gothic"', "sans-serif"],
        english: ['"Poppins"', "sands-serif"],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1350px', // hotfix to prevent text wrapping in h2 component
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
