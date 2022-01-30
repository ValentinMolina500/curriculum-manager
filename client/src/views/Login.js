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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as types from "../store/actions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, isAutheticated } = useSelector(state => state.auth);
  
  const onSignInClick = () => {
    const credentials = {
      email,
      password
    };

    dispatch({
      type: types.LOGIN_REQUEST,
      payload: {
        credentials,
        onLoginSuccess: () => {
          navigate("/");
        }
      }
    })
  }
  // const _onSignInClick = async () => {
  //   setIsLoading(true);
  //   await onSignInClick();
  //   setIsLoading(false);
  //   navigate(`/`);
  // }

  return (
    <Box w="100%"
      h="100%" background="black">

      <Grid
        background={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${mountainsImage})`}
        backgroundPosition="50% 12%"
        backgroundRepeat="no-repeat"
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
                  disabled={status === "loading"}
                  placeholder="Enter your e-mail address"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  disabled={status === "loading"}
                  placeholder="Enter your password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>

            </Stack>

            <Button
              id='sign-in-btn'
              w="100%"
              h="3rem"
              marginTop="2rem"
              colorScheme="purple"
              fontWeight="600"
              isLoading={status === "loading"}
              loadingText="Signing in"
              onClick={onSignInClick}
            >
              Sign in now
            </Button>
            <Text fontSize="0.875rem" mt="0.5rem">Need an account? <Link color="blue.500">Request an account</Link>
            </Text>
          </Box>


        </GridItem>
      </Grid>
    </Box>

  );
}

export default Login;