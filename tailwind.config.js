/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "lexend-deca": '"Lexend Deca", Arial, Helvetica, sans-serif',
      },
      boxShadow: {
        "opacity-black": "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
        "opacity-white": "0px 0px 5px rgba(255,255,255, 0.6)",
      },
      colors: {
        "dark-green": "#093545",
        "light-dark-green": "#224957",
        "bright-green": "#20df7f",
      },
    },
  },
  plugins: [],
};
