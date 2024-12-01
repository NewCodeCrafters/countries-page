/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ligth: {
          input: " hsl(0, 0%, 52%)",
          text: " hsl(200, 15%, 8%)",
          background: "hsl(0, 0%, 98%)",
        },
        dark: {
          elements: "hsl(209, 23%, 22%)",
          background: "hsl(207, 26%, 17%)",
        },
      },
      fontFamily: {
        "nunito-sans": [`"Nunito Sans"`, "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
