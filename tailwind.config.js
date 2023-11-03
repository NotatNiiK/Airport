/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "auth-bg-color": "#093545",
        "auth-input-color": "#224957",
        "auth-btn-color": "#20df7f",
      },
      boxShadow: {
        "auth-btn": "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
        "auth-input": "0px 0px 5px rgba(255,255,255, 0.6)",
      },
      borderColor: {
        "auth-btn": "#20df7f",
      },
      colors: {
        "nav-link": "#20df7f",
        "custom-green": "#093545",
      },
      inset: {
        hidden: "100%",
      },
      translate: {
        "reverse-half": "-50%",
      },
    },
  },
  plugins: [],
};
