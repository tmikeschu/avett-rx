import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "'Poppins', system-ui, sans-serif",
    heading: "'Arapey', Georgia, serif",
    mono: "Menlo, monospace",
  },

  components: {
    Heading: {
      baseStyle: {
        letterSpacing: "tighter",
      },
    },
  },
});
