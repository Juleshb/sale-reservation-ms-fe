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
        bounceIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '80%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.4s ease-out',
        fadeIn: 'fadeIn 0.3s ease-in',
      },},
  },
  plugins: [],
};
