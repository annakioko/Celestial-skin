/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-mode": "#A6603A",
        "light-mode": "#F0E68C",
      },
    },
  },
  plugins: [],
};

