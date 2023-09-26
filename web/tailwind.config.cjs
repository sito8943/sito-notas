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
      primary: "#f1ab6f",
      plight: "#EE964B",
      pdark: "#a66934",
      secondary: "#D62246",
      slight: "#951731",
      sdark: "#de4e6b",
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
