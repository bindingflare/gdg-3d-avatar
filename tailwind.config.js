/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./create/"], //, "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "korean": ['"Nanum Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
