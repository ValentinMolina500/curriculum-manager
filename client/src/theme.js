import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Inter",
    body: "Inter"
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            border: "#A60F2D",
            bg: "#A60F2D",
            _hover: {
              border: "#A60F2D",
              bg: "#A60F2D",
            }
          }
        }
      }
    }
  }
});

export default theme;