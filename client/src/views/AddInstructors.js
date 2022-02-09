import {
  Heading,
  Box,
  Input,
  FormControl,
  FormLabel,
  Grid,
  Flex,
  Button,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Instructors() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wsuEmail, setWsuEmail] = useState('');
  const [isAdjunct, setIsAdjunct] = useState(false);
  const [hadSafetyOrientation, setHadSafetyOrientation] = useState(false);
  const isNoInput = firstName === '' || lastName === '' || wsuEmail === '';
  const toast = useToast();

  const renderAddInstructorForm = () => {
    const firstNameChangeHandler = (event) => {
      setFirstName(event.target.value);
    }

    const lastNameChangeHandler = (event) => {
      setLastName(event.target.value);
    }

    const wsuEmailChangeHandler = (event) => {
      setWsuEmail(event.target.value);
    }

    const isAdjunctChangeHandler = (event) => {
      setIsAdjunct(event.target.checked);
    }

    const hadSafetyOrientationChangeHandler = (event) => {
      setHadSafetyOrientation(event.target.checked);
    }

    return (
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        border="1px solid #E2E8F0"
        columnGap={"1rem"}
        rowGap={"1rem"}
        gridColumn="1 / 5"
        borderRadius={"md"}
        p="1.5rem"
        onSubmit={addInstructor}>
        <FormControl isRequired>
          <FormLabel htmlFor="firstName" fontSize="0.875rem">First Name</FormLabel>
          <Input id="firstName" size="sm" value={firstName} onChange={firstNameChangeHandler} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="lastName" fontSize="0.875rem">Last Name</FormLabel>
          <Input id="lastName" size="sm" value={lastName} onChange={lastNameChangeHandler} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="wsuEmail" fontSize="0.875rem">WSU Email</FormLabel>
          <Input id="wsuEmail" size="sm" type='email' value={wsuEmail} onChange={wsuEmailChangeHandler} />
        </FormControl>
        <FormControl gridRow="3" gridColumn={"1/2"}>
          <Checkbox id="isAdjunct" colorScheme='purple' isChecked={isAdjunct} onChange={isAdjunctChangeHandler}>Adjunct</Checkbox>
        </FormControl>
        <FormControl gridRow="3" gridColumn={"2/2"}>
          <Checkbox id="hadSafetyOrientation" colorScheme='purple' isChecked={hadSafetyOrientation} onChange={hadSafetyOrientationChangeHandler}>Safety Orientation</Checkbox>
        </FormControl>
        <Flex
          gridRow="3"
          gridColumn={"3 / 3"}
          justifyContent="right"
        >
          <Button isDisabled={isNoInput} type="submit" size="sm" colorScheme="purple" onClick={addInstructor}>
            Submit
          </Button>
        </Flex>
      </Grid>
    );
  }

  const addInstructor = (event) => {
    event.preventDefault();

    const instructorData = {
      id: uuidv4(),
      firstName: firstName,
      lastName: lastName,
      wsuEmail: wsuEmail,
      isAdjunct: isAdjunct,
      hadSafetyOrientation: hadSafetyOrientation
    }

    console.log(instructorData);

    toast({
      title: 'Success',
      description: "Instructor has been added!",
      position: 'top',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })

    setFirstName('');
    setLastName('');
    setWsuEmail('');
    setIsAdjunct(false);
    setHadSafetyOrientation(false);
  }

  return (
    <Box maxW="990px" margin="0 auto" w="100%" as="form">
      <Heading fontSize="1.75rem" mb="1rem" fontFamily={"Merriweather"}>
        Add Instructor
      </Heading>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
      >
        {renderAddInstructorForm()}
        <Flex
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
        </Flex>
        <Flex
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
        </Flex>
      </Grid>
    </Box>
  );
}

export default Instructors;
