// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enable dark mode by using a class
  theme: {
   
    extend: {
      colors: {
        primary: '#2E6B57',
        secondary: '#CEF1E6',
        textcol: '#726E6E',
      },
      keyframes: {
        move: {
          "50%": { transform: "translateY(-1rem)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(0.8)" },
        },
      },
      animation: {
        movingY: "move 3s linear infinite",
        rotating: "rotate 15s linear infinite",
        scalingUp: "scaleUp 3s linear infinite",
      },
      fontFamily: {
        Jost: ["Jost", "sans-serif"],
        Lobster: [ "Lobster","sans-seri"]
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "12px",
          md: "32px"
        }
      },},
  },

  plugins: [],
};
