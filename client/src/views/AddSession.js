import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  Text,
  NumberDecrementStepper,
  Button,
  HStack,
  Tag
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom"


const FAKE_INSTR_COLUMNS = [
  {
    title: "Full Name",
    property: "fullName",
  },
  {
    title: "Email",
    property: "email",
  },
  {
    title: "Type",
    property: "type",
    render: (value) => {
      return <Tag size="sm" colorScheme={"purple"}>{value}</Tag>
    }
  }
];

const FAKE_INSTR_ITEMS = [
  {
    fullName: "Luis DeLaTorre",
    email: "luisdelatorre@wsu.edu",
    type: "Adjunct"
  },
  {
    fullName: "Bob Lewis",
    email: "bobl@wsu.edu",
    type: "Full Time"
  },
  {
    fullName: "John Miller",
    email: "jmiller@wsu.edu",
    type: "Full Time"
  }
];

const FAKE_COURSE_COLUMNS = [
  {
    title: "Course Title",
    property: "title",
  },
  {
    title: "Credits",
    property: "credits",
  },
  {
    title: "S/N",
    property: "sn",
   
  },
  {
    title: "Subject",
    property: "subject",
    render: (value) => {
      return <Tag size="sm" colorScheme={"purple"}>{value}</Tag>
    }
  }
];

const FAKE_COURSE_ITEMS = [
  {
    title: "Program Design and Development C/C++",
    credits: 4,
    sn: "CPT_S 121",
    subject: "CPT_S",
  },
  {
    title: "Data Structures C/C++",
    credits: 4,
    sn: "CPT_S 122",
    subject: "CPT_S",
  },
  {
    title: "Data Structures C/C++",
    credits: 4,
    sn: "CPT_S 122",
    subject: "CPT_S",
  },
  {
    title: "Data Structures C/C++",
    credits: 4,
    sn: "CPT_S 122",
    subject: "CPT_S",
  }

];

function AddSession() {

  const navigate = useNavigate();

  return (
    <Stack w="100%">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"} mb="0.5rem">Add Session</Heading>

      <form>
        <Stack spacing={"1.75rem"}>
          <FormControl>
            <FormLabel fontSize={"0.875rem"} htmlFor="season">Season</FormLabel>
            <Select id="season" fontSize={"0.875rem"}>
              <option value="spring">Spring</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"0.875rem"} htmlFor="year">Year</FormLabel>
            <NumberInput id="year" step={1} defaultValue={new Date().getFullYear()}  id="year">
              <NumberInputField fontSize={"0.875rem"}  />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Box>
            <Heading fontFamily={"Merriweather"} fontSize={"1rem"}>Instructors</Heading>
            <Text mb="0.5rem" fontSize={"0.875rem"} color="#5e5e5e">Choose which instructors to add to this session.</Text>

            <Box maxHeight="500px" overflow={"scroll"}>
            {/* <Table items={FAKE_INSTR_ITEMS} columns={FAKE_INSTR_COLUMNS} /> */}

            </Box>
          </Box>

        
          <Box>
            <Heading fontFamily={"Merriweather"} fontSize={"1rem"}>Courses</Heading>
            <Text mb="0.5rem" fontSize={"0.875rem"} color="#5e5e5e">Choose which courses to add to this session.</Text>

            {/* <Table items={FAKE_COURSE_ITEMS} columns={FAKE_COURSE_COLUMNS} /> */}
          </Box>

          <HStack>
          <Button size="sm" colorScheme={"purple"} width={"max-content"}>Add new session</Button>

          <Button size="sm" onClick={() => navigate(-1)} width={"max-content"}>Cancel</Button>
          </HStack>
        </Stack>
      </form>
    </Stack>
  )
}

export default AddSession;