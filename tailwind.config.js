/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141718",
        background: "#FFFFFF",
        secondary: "#F3F5F7",
        card: "#F9FAFB",
        color: "#141718",
        button: "#141718",
        hover: "#E5E7EB",
        "button-hover": "#353935",
        lightText: "#6C7275",
        error: "#FF5630",
        success: "#38CB89",
        border: " #E8ECEF",
        light: {
          background: "#FFFFFF",
          primaryText: "#0C1421",
          secondaryText: "#313957",
          primary: "#162D3A",
          linkButton: "#1E4AE9",
          inputColor: "#F7FBFF",
          inputBorderColor: "#D4D7E3",
          placeHolderColor: "#8897AD",
          lightPrimary: "#667B8D",
          darkPrimary: "#020A17",
        },

        dark: {
          background: "#1A1A1A", // Dark background color
          text: "#FFFFFF", // Dark text color
          primary: "#FF69B4", // Dark primary color
          linkButton: "#1E4AE9",
        },
      },
    },
  },
  plugins: [],
};
