/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      white: "#f0f0f0",
      "white-hover": "#c2c7cc",
      "placeholder-dark": "#636362",
      "dark-background2": "#222333",
      "dark-background": "#1b1b1b",
      "light-background2": "#f0f0f0",
      "light-background": "#e3e3e3",
      primary: "#EE964B",
      plight: "#f1ab6f",
      pdark: "#AB570F",
      secondary: "#2E8C90",
      slight: "#4BA2A6",
      sdark: "#0A6367",
      "pdark-hover": "#00acd639",
      "p2dark-hover": "#00acd670",
      "dark-drawer-background": "#222222ce",
      "light-drawer-background": "#e3e3e3ce",
      error: "#ff3b3b",
      warning: "#FF8800",
      success: "#007733",
      info: "#0099CC",
    },
    minHeight: {
      screen: "100vh",
      "40": "80px"
    }
  },
  plugins: [],
};
