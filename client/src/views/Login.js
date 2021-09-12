import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Grid,
  Link
} from "@chakra-ui/react";

import mountainsImage from "../images/background.jpg";

import { Box, GridItem, Heading, Text } from "@chakra-ui/layout";

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

  const { onSignInClick } = props;

  const _onSignInClick = async () => {
    setIsLoading(true);
    await onSignInClick();
    setIsLoading(false);
  }

  return (
    <Grid
      background={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${mountainsImage})`}
      backgroundPosition="50% 12%"
      w="100%"
      h="100%"
      gridTemplateColumns="1fr 1fr"
      alignItems="center"
    >
      <GridItem gridColumn="1" justifySelf="center">
        <Box>
          <Text color="white" fontSize="1.75rem" fontFamily="Merriweather">Curriculum Manager</Text>
          <Text color="white" fontSize="1.25rem">Sign in or create account</Text>
        </Box>
      </GridItem>
      <GridItem gridColumn="2">
        <Box h="100%" ml="2rem" maxW="500px" bg="white" px="3.5rem" pt="3.5rem" pb="7rem" borderRadius="0.5rem" boxShadow="lg">
          <Heading fontSize="1.75rem" fontFamily="Merriweather" fontWeight="700" as="h1" mb="1.5rem">Sign In</Heading>
          <Stack spacing="1.5rem">
            <FormControl id="email">
              <FormLabel>E-Mail address</FormLabel>
              <Input
                placeholder="Enter your e-mail address"
                type="email"
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter your password"
                type="password"
              />
            </FormControl>

          </Stack>

          <Button
            w="100%"
            h="3rem"
            marginTop="2rem"
            colorScheme="purple"
            fontWeight="600"
            isLoading={isLoading}
            loadingText="Signing in"
            onClick={_onSignInClick}
          >
            Sign in now
          </Button>
          <Text fontSize="0.875rem" mt="0.5rem">Need an account? <Link color="blue.500">Request an account</Link>
          </Text>
        </Box>


      </GridItem>
    </Grid>

  );
}

export default Login;