/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        light: {
          background: '#FFFFFF',
          primaryText: '#0C1421',
          secondaryText: '#313957',
          primary: '#162D3A',
          linkButton:"#1E4AE9",
          inputColor: "#F7FBFF",
          inputBorderColor: "#D4D7E3",
          placeHolderColor:"#8897AD",
          lightPrimary: "#667B8D",
          darkPrimary: "#020A17",

        },
        dark: {
          background: '#1A1A1A', // Dark background color
          text: '#FFFFFF', // Dark text color
          primary: '#FF69B4', // Dark primary color
          linkButton:"#1E4AE9"
        },
      }
    },
  },
  plugins: [],
}

