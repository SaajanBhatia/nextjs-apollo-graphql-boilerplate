import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Define the initial color mode in theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true, // This enables automatic color mode switching based on the user's system preference
};

const colors = {
  brand: {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3", // Main brand color
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
  },
};

const fonts = {
  heading: "'Helvetica Neue', sans-serif",
  body: "'Helvetica Neue', sans-serif",
  mono: "Menlo, monospace",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      solid: ({ colorMode }: { colorMode: string }) => ({
        bg: colorMode === "dark" ? "brand.300" : "brand.500",
        color: "white",
        _hover: {
          bg: colorMode === "dark" ? "brand.400" : "brand.600",
        },
      }),
    },
  },
};

// Adjusting global styles for better light and dark mode support
const styles = {
  global: (props: any) => ({
    body: {
      color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
    },
    // You can add more global styles here
  }),
};

const theme = extendTheme({ config, colors, fonts, components, styles });

export default theme;
