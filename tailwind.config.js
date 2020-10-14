module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      display: ["Arapey", "serif"],
      body: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        /**
         * primary and secondary: https://www.colourlovers.com/palette/4667031/Kannamma_Maurie
         * success, error, warning: https://www.colourlovers.com/palette/629637/(%E2%97%95%E3%80%9D%E2%97%95)
         */
        primary: {
          default: "#131665",
        },
        secondary: {
          default: "BDB5F5",
        },
        success: {
          default: "#83AF9B",
        },
        error: {
          default: "#FE4365",
        },
        warning: {
          default: "#F9CDAD",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
