/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    // screens: {},
    // fontFamily: {},
    extend: {
      colors: {},
      animation: {
        "appear-from-left": "appear-from-left 1.6s ease-in-out both",
        "disappear-to-left": "disappear-to-left 1.6s ease-in-out both",
        "appear-from-right": "appear-from-right 1.6s ease-in-out both",
        "disappear-to-right": "disappear-to-right 1.6s ease-in-out both",
        "appear-from-top": "appear-from-top 1.6s ease-in-out both",
        "disappear-to-top": "disappear-to-top 1.6s ease-in-out both",
        "appear-from-bottom": "appear-from-bottom 1.6s ease-in-out both",
        "disappear-to-bottom": "disappear-to-bottom 1.6s ease-in-out both",
      },
      keyframes: {
        "appear-from-left": {
          "0%": {
            transform: "translate(-200px, 0px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-left": {
          "100%": {
            transform: "translate(-200px, 0px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-right": {
          "0%": {
            transform: "translate(200px, 0px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-right": {
          "100%": {
            transform: "translate(200px, 0px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-top": {
          "0%": {
            transform: "translate(0px, -200px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-top": {
          "100%": {
            transform: "translate(0px, -200px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-bottom": {
          "0%": {
            transform: "translate(0px, 200px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-bottom": {
          "100%": {
            transform: "translate(0px, 200px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}
