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
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Courses() {
  const [sections, setSections] = useState([]);
  const [labs, setLabs] = useState([]);

  const renderSections = () => {
    if (sections.length === 0) {
      return (
        <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0">
          No Sections
        </Center>
      )
    }

    return sections.map((section, index) => {
      return (
        <Grid 
          gridTemplateColumns={"1fr 1fr 1fr"} 
          border="1px solid #E2E8F0" 
          columnGap={"1rem"}
          rowGap={"1rem"}
          gridColumn="1 / 5" 
          key={section.id} 
          borderRadius={"md"} 
          p="1.5rem">
          <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>Section 0{index + 1}</Heading>
          <FormControl>
            <FormLabel htmlFor="title" fontSize="0.875rem">Class Number</FormLabel>
            <Input id="title" size="sm"/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title" fontSize="0.875rem">Credits</FormLabel>
            <Input id="title" size="sm"/>
          </FormControl>
         
          <FormControl gridRow="3" gridColumn={"1/3"}>
            <FormLabel htmlFor="title" fontSize="0.875rem">Instructor</FormLabel>
            <Select id="prefix" size="sm">
            <option>Luis De La Torre</option>
            <option>Bob Lewis</option>
          </Select>
          </FormControl>

          <FormControl gridRow="3" gridColumn={"3"}>
            <FormLabel htmlFor="title" fontSize="0.875rem">Building & Room</FormLabel>
            <Input id="title" size="sm"/>
          </FormControl>
        </Grid>
      );
    });
  }

  const renderLabs = () => {
    if (labs.length === 0) {
      return (
        <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0">
          No Labs
        </Center>
      )
    }

    return labs.map((section, index) => {
      return (
        <Grid 
          gridTemplateColumns={"1fr 1fr 1fr"} 
          border="1px solid #E2E8F0" 
          columnGap={"1rem"}
          rowGap={"1rem"}
          gridColumn="1 / 5" 
          key={section.id} 
          borderRadius={"md"} 
          p="1.5rem">
          <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>Section 0{index + 1} Lab</Heading>
          <FormControl>
            <FormLabel htmlFor="title" fontSize="0.875rem">Class Number</FormLabel>
            <Input id="title" size="sm"/>
          </FormControl>
        </Grid>
      );
    });
  }

  const addSection = () => {
    const newSection = {
      id: uuidv4(),
    }

    setSections(oldSections => oldSections.concat(newSection));
  }

  const addLab = () => {
    const newLab = {
      id: uuidv4(),
    }

    setLabs(oldLabs => oldLabs.concat(newLab))
  }

  return (
    <Box maxW="990px" margin="0 auto" w="100%" as="form">
      <Heading fontSize="1.75rem" mb="1rem" fontFamily={"Merriweather"}>
        Add Course
      </Heading>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
      >
        <FormControl gridRow="1">
          <FormLabel htmlFor="prefix">Prefix</FormLabel>
          <Select id="prefix">
            <option>CPT_S</option>
            <option>EE</option>
          </Select>
        </FormControl>

        <FormControl gridColumn={"2 / 5"}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" />
        </FormControl>

        <Flex
          gridRow="2"
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
          <Heading fontSize={"1.25rem"} fontFamily={"Merriweather"}>
            Sections
          </Heading>
          <Button size="sm" colorScheme="purple" onClick={addSection}>
            Add Section
          </Button>
        </Flex>
        {renderSections()}

        <Flex
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
          <Heading fontSize={"1.25rem"} fontFamily={"Merriweather"}>
            Labs
          </Heading>
          <Button size="sm" colorScheme="purple" onClick={addLab}>
            Add Lab
          </Button>
        </Flex>

        {renderLabs()}
        {/* <FormControl gridRow="2" gridColumn={"2"}>
          <FormLabel htmlFor="prefix">Class Number</FormLabel>
          <Input />
        </FormControl>
       
        <FormControl gridRow="2" gridColumn={"3"}>
          <FormLabel htmlFor="prefix">Credits</FormLabel>
          <Input />
        </FormControl> */}
      </Grid>
    </Box>
  );
}

export default Courses;
