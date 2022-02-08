import {
  Heading,
  Box,
  Input,
  FormControl,
  FormLabel,
  Select,
  Grid,
  Flex,
  Button,
  Center,
  Text,
  Checkbox
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Instructors() {
  const [instructors, setInstructors] = useState([]);

  const renderInstructors = () => {
    if (instructors.length === 0) {
      return (
        <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0">
          No Instructors
        </Center>
      )
    }

    return instructors.map((instructor, index) => {
      const instructorCount = index + 1;
      let instructorLabel;

      if (instructorCount > 9) {
        instructorLabel = `Instructor ${instructorCount}`
      } else {
        instructorLabel = `Instructor 0${instructorCount}`;
      }

      return (
        <Grid
          gridTemplateColumns={"1fr 1fr 1fr"}
          border="1px solid #E2E8F0"
          columnGap={"1rem"}
          rowGap={"1rem"}
          gridColumn="1 / 5"
          key={instructor.id}
          borderRadius={"md"}
          p="1.5rem">
          <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>{instructorLabel}</Heading>
          <FormControl isRequired>
            <FormLabel htmlFor="firstName" fontSize="0.875rem">First Name</FormLabel>
            <Input id="firstName" size="sm" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="lastName" fontSize="0.875rem">Last Name</FormLabel>
            <Input id="lastName" size="sm" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="wsuEmail" fontSize="0.875rem">WSU Email</FormLabel>
            <Input id="wsuEmail" size="sm" type='email' />
          </FormControl>
          <FormControl gridRow="3" gridColumn={"1/2"}>
            <Checkbox id="isAdjunct" colorScheme='purple'>Adjunct</Checkbox>
          </FormControl>
          <FormControl gridRow="3" gridColumn={"2/2"}>
            <Checkbox id="hadSafetyOrientation" colorScheme='purple'>Safety Orientation</Checkbox>
          </FormControl>
        </Grid>
      );
    });
  }

  const addInstructor = () => {
    const newInstructor = {
      id: uuidv4(),
    }

    setInstructors(oldInstructors => oldInstructors.concat(newInstructor));
  }

  return (
    <Box maxW="990px" margin="0 auto" w="100%" as="form">
      <Heading fontSize="1.75rem" mb="1rem" fontFamily={"Merriweather"}>
        Instructors
      </Heading>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
      >

        <Flex
          gridRow="1"
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="right"
        >
          <Button size="sm" colorScheme="purple" onClick={addInstructor}>
            Add Instructor
          </Button>
        </Flex>
        {renderInstructors()}

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
