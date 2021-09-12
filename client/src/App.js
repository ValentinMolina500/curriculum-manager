import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/merriweather/700.css"

import { useState } from "react";

import {
  ChakraProvider,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/layout";


import theme from "./theme";

import Login from "./views/Login";
import Dashboard from './views/Dashboard'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const renderApp = () => {
    if (!isSignedIn) {
      return <Login onSignInClick={() => setIsSignedIn(true)}/>
    }

    return <Dashboard />
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid w="100vw" h="100vh">
        {renderApp()}
      </Grid>
    </ChakraProvider>
  );
}

export default App;
