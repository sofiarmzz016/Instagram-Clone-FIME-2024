/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pink-button": "#D43A72",
        "yellow-button": "#F0B166",
        "base-color": "#FFFDFD",
      },
    },
    fontFamily:{
      Inter: ["Inter, sans-serif"],
    },
  },
  plugins: [],
};

