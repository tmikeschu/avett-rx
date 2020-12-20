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
    Spinner: {
      baseStyle: {
        color: "purple.500",
      },
    },
    Text: {
      baseStyle: {
        fontSize: "md",
      },
    },
  },

  layerStyles: {
    multiline: {
      whiteSpace: "pre-wrap",
      p: 4,
    },
  },

  textStyles: {
    warning: {
      color: "yellow.700",
      backgroundColor: "yellow.100",
      px: 4,
      py: 2,
      rounded: "md",
    },
    error: {
      color: "red.600",
      backgroundColor: "red.100",
      px: 4,
      py: 2,
      rounded: "md",
    },
  },
});
