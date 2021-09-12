import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/merriweather/700.css"

import {
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/layout";

import theme from "./theme";

import Login from "./views/Login";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid w="100vw" h="100vh">
        <Login />
      </Grid>
    </ChakraProvider>
  );
}

export default App;
