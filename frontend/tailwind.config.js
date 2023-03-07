/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "400px",
      },
      fontFamily: {
        "hongcha-nemo": ["nemo", "ui-sans-serif"],
        "hongcha-lefthand": ["lefthand", "ui-sans-serif"],
        "dolbom-bold": ["dolbomB", "ui-sans-serif"],
        "dolbom-regular": ["dolbomR", "ui-sans-serif"],
        jalnan: ["jalnan", "ui-sans-serif"],
        "hopang-black": ["hopangB", "ui-sans-serif"],
        "hopang-white": ["hopangW", "ui-sans-serif"],
      },
      colors: {
        custom: {
          100: "#ff1256",
          200: "#ff1256",
        },
      },
      animation: {
        "appear-from-left": "appear-from-left 1.6s ease-in-out both",
        "disappear-to-left": "disappear-to-left 1.6s ease-in-out both",
        "appear-from-right": "appear-from-right 1.6s ease-in-out both",
        "disappear-to-right": "disappear-to-right 1.6s ease-in-out both",
        "appear-from-top": "appear-from-top 1.6s ease-in-out both",
        "disappear-to-top": "disappear-to-top 1.6s ease-in-out both",
        "appear-from-bottom": "appear-from-bottom 1.6s ease-in-out both",
        "disappear-to-bottom": "disappear-to-bottom 1.6s ease-in-out both",
        "shiny-btn": "shiny-btn 3s ease-in-out both",
      },
      spacing: {
        vh: "1vh",
        vw: "1vw",
        pc: "1%",
      },
      keyframes: {
        "appear-from-left": {
          "0%": {
            transform: "translate(-150px, 0px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-left": {
          "100%": {
            transform: "translate(-150px, 0px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-right": {
          "0%": {
            transform: "translate(150px, 0px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-right": {
          "100%": {
            transform: "translate(150px, 0px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-top": {
          "0%": {
            transform: "translate(0px, -150px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-top": {
          "100%": {
            transform: "translate(0px, -150px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "appear-from-bottom": {
          "0%": {
            transform: "translate(0px, 150px)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "disappear-to-bottom": {
          "100%": {
            transform: "translate(0px, 150px)",
            opacity: 0,
          },
          "0%": {
            transform: "translate(0px, 0px)",
            opacity: 1,
          },
        },
        "shiny-btn": {
          "0%": { transform: "scale(0) rotate(45deg)", opacity: 0 },
          "80%": { transform: "scale(0) rotate(45deg)", opacity: 0.5 },
          "81%": { transform: "scale(4) rotate(45deg)", opacity: 1 },
          "100%": { transform: "scale(50) rotate(45deg)", opacity: 0 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
