import { useState } from "react";
import {
  Heading,
  Stack,
  Button,
  Flex,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  IconButton,
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectOfferingsById } from "../store/offeringsSlice";
import { MdPerson,MdBook } from "react-icons/md";
const MAXIMIZE_STYLES = {
  zIndex: 50,
  position: "absolute",
  minWidth: "100vw",
  height: "100vh",
  background: "white",
  left: 0,
  top: 0,
  padding: "1rem",
  margin: 0,
};

const RESET_STYLES = {
  zIndex: "unset",
  position: "unset",
  height: "100%",
};
export default function Schedule() {
  const [currentDay, setCurrentDay] = useState("M");
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState(undefined);

  const semesterId = useSelector((state) => state.semesters.selectedSemester);
  const {
    offerings,
    status: offeringsStatus,
    error: offeringError,
  } = useSelector((state) => selectOfferingsById(state, semesterId));

  return (
    <Grid
      bg="white"
      w="100%"
      mt="2rem"
      gridTemplateRows={"auto minmax(0, 1fr)"}
      minH={0}
      style={isMaximized ? MAXIMIZE_STYLES : undefined}
    >
      <GridItem>
        <Flex mb="1rem" alignItems={"center"}>
          <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
            Schedule
          </Heading>

          <RadioGroup
            onChange={setCurrentDay}
            value={currentDay}
            marginLeft="1rem"
          >
            <Stack direction="row">
              <Radio value="M">Monday</Radio>
              <Radio value="TU">Tuesday</Radio>
              <Radio value="W">Wednesday</Radio>
              <Radio value="TH">Thursday</Radio>
              <Radio value="F">Friday</Radio>
            </Stack>
          </RadioGroup>
          <IconButton
            onClick={() => setIsMaximized(!isMaximized)}
            marginLeft="auto"
            icon={
              <Icon
                boxSize="1.5rem"
                as={isMaximized ? MdOutlineFullscreenExit : MdOutlineFullscreen}
              />
            }
          ></IconButton>
        </Flex>
      </GridItem>
      <GridItem
        h="100%"
        paddingLeft="1rem"
        minH={0}
        w="100%"
        d="grid"
        gridTemplateColumns="auto minmax(0, 1fr) auto"
        gridTemplateRows={"minmax(0, 1fr) auto"}
        gridColumnGap="2rem"
      >
        <GridItem
          minH={"0"}
          overflowY="auto"
          gridColumn={2}
          gridRow={1}
          h="100%"
        >
          <ClassScheduler
            offerings={offerings}
            currentDay={currentDay}
            selectedOffering={selectedOffering}
            setSelectedOffering={setSelectedOffering}
          />
        </GridItem>

        {/* Left panel */}
        {/* <GridItem
          minH={"0"}
          overflowY="auto"
          gridColumn={1}
          gridRow={1}
          border="1px solid #dfdfdf"
          zIndex="100"
          borderRadius={"md"}
        >
          <Box as="aside" w="300px" h="100%">
            <Heading p="0.5rem" fontSize={"1rem"} fontFamily="Merriweather">
              Offerings
            </Heading>
          </Box>
        </GridItem> */}

        {/* Right panel */}
        {selectedOffering && (
          <GridItem
            minH={"0"}
            overflowY="auto"
            gridColumn={3}
            gridRow={1}
            border="1px solid #dfdfdf"
            zIndex="100"
            borderRadius={"md"}
          >
            <Box as="aside" w="350px" h="100%">
              <Heading p="0.5rem" fontSize={"1rem"} fontFamily="Merriweather">
                Edit Offering
              </Heading>

              <Text px="0.5rem" fontSize="1rem">
                {selectedOffering.className}
              </Text>

              <Flex flexDir={"row"} alignItems="center" px="0.5rem">
                <MdBook />
              <Text px="0.5rem" fontSize="1rem">
                {selectedOffering.CrsName}
              </Text>
              </Flex>

              <Flex flexDir={"row"} alignItems="center" px="0.5rem">
                <MdPerson />
                <Text ml="0.5rem" fontSize="1rem">
                  {selectedOffering.Instructor}
                </Text>
              </Flex>
            </Box>
          </GridItem>
        )}
      </GridItem>
    </Grid>
  );
}
