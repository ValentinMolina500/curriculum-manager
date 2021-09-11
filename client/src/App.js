import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import {
  ChakraProvider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Button
} from "@chakra-ui/react";
import { Box, Grid, Heading, Text } from "@chakra-ui/layout";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid w="100vw" h="100vh" bg="gray.900" placeItems="center">
        <Box
          p="2.5rem"
          bg="gray.700"
          borderRadius="0.25rem"
          w="100%"
          mx="2rem"
          maxW="40rem"
          boxShadow="lg"
        >
          <Text
            textTransform="uppercase"
            textAlign="center"
            fontWeight="semibold"
            color="gray.500"
            marginBottom="0.25rem"
            fontSize="1rem"
          >
            Welcome Back
          </Text>
          <Heading
            textAlign="center"
            as="h1"
            color="gray.50"
            fontWeight="600"
            fontSize="1.75rem"
            marginBottom="2rem"
          >
            Log into Curriculum Manager
          </Heading>

          {/* Login form */}

          <Stack spacing="1.5rem">
            <FormControl id="email">
              <FormLabel color="white">E-Mail address</FormLabel>
              <Input  borderColor="gray.500" color="white"  placeholder="Enter your e-mail address" type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel  color="white" >Password</FormLabel>
              <Input  borderColor="gray.500" color="white" placeholder="Enter your password" type="password" />
            </FormControl>

            <Button colorScheme="blue" h="3rem" fontWeight="600">Login now</Button>
          </Stack>
          
        </Box>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
