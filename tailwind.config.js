/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A1B9A ", // Example primary color (adjust based on actual Figma color)
        highlight: "#DDCDE7",
        purpleSecondary: "#4A0072",
        purpleHighlight: "#6A1A9A",
        grayBg: "#dfdfdf",
        borderPrimary: "#D2D2D2",
        backgroundOffWhite: "#FAFAFA",
        secondaryWhite: "#FFFFFF", // White for text/backgrounds
        highlightYellow: "#F9D703",
        highlightYellowPrimary: "#FFD700",
        accent: "#c264fc", // Adjust based on button or accent colors in Figma
        background: "#F3E8FF", // Light background color
        textPrimary: "#333333", // Primary text color
        textSecondary: "#7A7A7A", // Secondary text color
        borderSecondary: "#D9D9D9",
        textGray: "#757575",
        textLightGray: "#7575751A",
        textYellow: "#FFE500",
        hoverYellow: "#CBAB00",
      },
    },
    fontSize: {
      esm: "0.6rem",
      sm: "0.875rem",
      normal: "1rem",
      base: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
