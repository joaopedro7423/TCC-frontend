import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors: {
    cinza: {
      "500": "#ddd",
      "600": "cinza",
    },
    amarelo: {
      "400": "#F2E94E",
      "500": "#FEC601",
    },
    azul: {
      "500": "#4056f4",
    },
  },
  styles: {
    global: {
      "a:hover": {
        textDecoration: "none !important",
      },
      body: {
        bg: "#ddd",
      },
    },
  },
  config,
});
