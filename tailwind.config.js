/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-mode": "#a6603a",
        "light-mode": "#efe3b8",
      },
    },
  },
  plugins: [],
};

