/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add the paths to your files
  ],
  theme: {
    extend: {
      animation: {
        "slide-fade": "slide-fade-up 1s ease-out forwards",
      },
      keyframes: {
        "slide-fade-up": {
          "0%": {
            transform: "translateY(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
