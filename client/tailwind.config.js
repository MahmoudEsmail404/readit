module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        70: "17.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
