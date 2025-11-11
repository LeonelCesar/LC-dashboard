/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",          
        backgroundLight: "#f8f9fa",  
        backgroundDark: "#1a1a1a",   
        textLight: "#1f2937",        
        textDark: "#f3f4f6"          
      }
    },
  },
  plugins: [],
};
