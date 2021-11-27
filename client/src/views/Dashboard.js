import {
  Grid,
  Box,
  Flex,
  Text,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/layout";
import {
  GridItem,
  Icon,
  Image,
  ScaleFade,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { useState } from "react";

import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";
import ArrowRight from "@material-ui/icons/ArrowForward";
import ArrowLeft from "@material-ui/icons/ArrowBack"
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import PlusIcon from "@material-ui/icons/Add";
import ProfileImage from "../images/bob.jpeg";
const SIDEBAR_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    selected: true,
  },
  {
    title: "Sessions",
    icon: DateRangeIcon,
  },
  {
    title: "Instructors",
    icon: PeopleIcon,
  },
  {
    title: "Notifications",
    icon: AnnouncementOutlinedIcon,
  },
];

const DEMO_STATES = {
  INIT: "INIT",
  ADD_SESSION: "ADD_SESSION",
  ADD_INSTRUCTORS: "ADD_INSTRUCTORS",
  ADD_COURSES: "ADD_COURSES",
};

function Dashboard() {
  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item) => {
      const Icon = item.icon;
      const selectedStyles = item.selected
        ? {
            color: "purple.500",
            borderLeftColor: "purple.500",
            borderLeftWidth: "3px",
          }
        : {};
      return (
        <Flex
          transition="background ease 250ms"
          cursor="pointer"
          alignItems="center"
          color="#868e96"
          p="0.5rem 0.75rem"
          minW="12rem"
          fontSize="1.25rem"
          borderRadius={"0 0.5rem 0.5rem 0"}
          _hover={{ background: "gray.100" }}
          {...selectedStyles}
        >
          <Icon fontSize="inherit" />

          <Text
            ml="0.5rem"
            fontWeight={item.selected ? "700" : "600"}
            fontSize="1rem"
          >
            {item.title}
          </Text>
        </Flex>
      );
    });
  };

  const [currState, setCurrState] = useState(DEMO_STATES.INIT);
  const [instructors, setInstructors] = useState([
    {
      name: "Luis De La Torre",
      email: "luis.delatorre@wsu.edu",
      isAdjunct: false
    },
    {
      name: "John Miller",
      email: "jmiller16@wsu.edu",
      isAdjunct: false
    },
  ])
  const addSession = () => {
    /* Fake form for now but you get the idea sir */
    return (
      <Box h="100%" w="100%" p="4rem 2rem" maxW="40rem">
        <Heading as="h2" fontSize="2rem" fontFamily="Merriweather">
          Specify Time
        </Heading>
        <Text color="gray.600">Use season and year.</Text>
        <Grid mt="2rem" gridTemplateColumns={"1fr 1fr"} columnGap={"1rem"}>
          <Text fontWeight={"semibold"} gridColumn={"1/3"}>
            Semester
          </Text>

          <FormControl id="season">
            <FormLabel color="gray.600" fontSize={"0.825rem"}>
              Season
            </FormLabel>
            <Select placeholder="Select option">
              <option value="option1">Spring</option>
              <option value="option2">Summer</option>
              <option value="option3">Fall</option>
              <option value="winter">Winter</option>
            </Select>
          </FormControl>

          <FormControl id="email">
            <FormLabel color="gray.600" fontSize={"0.825rem"}>
              Year
            </FormLabel>
            <NumberInput
              defaultValue={parseInt(new Date().getFullYear())}
              min={parseInt(new Date().getFullYear())}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Grid>

        <Button
          onClick={() => setCurrState(DEMO_STATES.ADD_INSTRUCTORS)}
          mt="2rem"
          w="100%"
          colorScheme={"purple"}
          rightIcon={<ArrowRight />}
        >
          Continue
        </Button>
      </Box>
    );
  };

  const addInstructors = () => (
    <Box h="100%" w="100%" p="4rem 2rem">
      <Heading as="h2" fontSize="2rem" fontFamily="Merriweather">
        Specify Instructors
      </Heading>
      <Text color="gray.600">Add or remove instructors.</Text>
      <Button m="2rem 0 1rem 0" leftIcon={<PlusIcon />}>Add Instructor</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Is Adjunct?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instructors.map((item) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.isAdjunct ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
        
      </Table>
      
      <Flex justifyContent={"space-between"}>
      <Button
        mt="2rem"
        colorScheme={"purple"}
        leftIcon={<ArrowLeft />}
        onClick={() => setCurrState(DEMO_STATES.ADD_SESSION)}
      >
        Back
      </Button>
      <Button
        mt="2rem"
        colorScheme={"purple"}
        rightIcon={<ArrowRight />}
      >
        Continue
      </Button>
      </Flex>
      
    </Box>
  );

  const renderContent = () => {
    switch (currState) {
      case DEMO_STATES.INIT:
        return <Text>Nothing to see here...</Text>;

      case DEMO_STATES.ADD_SESSION:
        return addSession();

      case DEMO_STATES.ADD_INSTRUCTORS:
        return addInstructors();
    }
  };

  return (
    <ScaleFade initialScale={0.9} in={true} w="100%" h="100%">
      <Grid w="100%" h="100%" bg="#f9f9fd" templateColumns="18rem 1fr">
        {/* Sidebar */}
        <GridItem
          as="aside"
          bg="white"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        >
          <Box p="2rem 1.5rem">
            <Heading
              fontSize="1.5rem"
              as="h2"
              fontWeight="700"
              mb="1rem"
              fontFamily="Merriweather"
            >
              Curriculum
            </Heading>
            <Stack spacing="0.75rem">{renderSidebarItems()}</Stack>
            <Divider my="1rem" />
            <Button
              onClick={() => setCurrState(DEMO_STATES.ADD_SESSION)}
              colorScheme="purple"
              w="100%"
              leftIcon={<PlusIcon />}
            >
              Add Session
            </Button>
          </Box>
        </GridItem>

        {/* Main content */}
        <GridItem as="main">
          <Grid
            rowGap="1rem"
            gridTemplateRows="auto 1fr"
            p="2rem"
            h="100%"
            w="100%"
          >
            <Flex alignItems="center">
              {/* User profile items */}
              <Grid
                ml="auto"
                gridTemplateRows="auto auto"
                columnGap="1rem"
                bg="white"
                boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                padding="0.5rem 1rem"
                borderRadius="0.5rem"
                gridTemplateColumns="auto auto"
              >
                <GridItem
                  alignSelf="end"
                  gridRow="1"
                  gridColumn="1"
                  justifySelf="right"
                  fontWeight="700"
                  fontSize="0.875rem"
                  fontFamily="Merriweather"
                >
                  Bob Lewis
                </GridItem>
                <GridItem
                  alignSelf="start"
                  gridRow="2"
                  gridColumn="1"
                  fontSize="0.875rem"
                  color="gray.500"
                >
                  bob.lewis@wsu.edu
                </GridItem>

                {/* */}
                <GridItem gridRow="1 / 3" gridColumn="2">
                  <Image
                    src={ProfileImage}
                    borderRadius="100%"
                    h="48px"
                    w="48px"
                  />
                </GridItem>
              </Grid>
            </Flex>
            <GridItem
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              gridRow="2"
              bg="white"
              borderRadius="0.5rem"
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              {renderContent()}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </ScaleFade>
  );
}

export default Dashboard;
