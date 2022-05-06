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
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
} from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectOfferingsById } from "../store/offeringsSlice";
import { MdPerson, MdBook } from "react-icons/md";
import { SUBJECTS } from "../utils/constants";
import API from "../utils/API";

import ScheduleSidebar from "./ScheduleSidebar";

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
  const [subjectFilters, setSubjectFilters] = useState([]);
  const [tempOffering, setTempOffering] = useState(null);

  const semesterId = useSelector((state) => state.semesters.selectedSemester);
  const {
    offerings,
    status: offeringsStatus,
    error: offeringError,
  } = useSelector((state) => selectOfferingsById(state, semesterId));

  const renderMenuItemOptions = (subject) => {
    return <MenuItemOption value={subject}>{subject}</MenuItemOption>;
  };

  const renderConflictStats = () => {
    const offeringsConflictsSelected = offerings.filter((offering) => {
      if (offering.OffID == selectedOffering.OffID) {
        return false;
      }

      if (!selectedOffering.OffDay || !offering.OffDay) {
        return false;
      }

      const selDays = selectedOffering.OffDay.split(",");
      const offDays = offering.OffDay.split(",");

      if (!offDays.some((day) => selDays.some((day2) => day2 == day))) {
        return false;
      }

      if (
        offering.startTime <= selectedOffering.startTime &&
        offering.endTime >= selectedOffering.endTime
      ) {
        return true;
      }

      if (
        offering.startTime > selectedOffering.startTime &&
        selectedOffering.endTime < offering.startTime
      ) {
        return false;
      }

      if (
        offering.endTime < selectedOffering.endTime &&
        selectedOffering.startTime < offering.startTime
      ) {
        return true;
      }

      return false;
    });

    const offeringsConflictsTemp = offerings.filter((offering) => {
      if (offering.OffID == selectedOffering.OffID) {
        return false;
      }

      if (!offering.OffDay || !tempOffering.OffDay) {
        return false;
      }

      const selDays = tempOffering.OffDay.split(",");
      const offDays = offering.OffDay.split(",");

      if (!offDays.some((day) => selDays.some((day2) => day2 == day))) {
        return false;
      }

      if (
        offering.startTime <= tempOffering.startTime &&
        offering.endTime >= tempOffering.endTime
      ) {
        return true;
      }

      if (
        offering.startTime > tempOffering.startTime &&
        tempOffering.endTime < offering.startTime
      ) {
        return false;
      }

      if (
        offering.endTime < tempOffering.endTime &&
        tempOffering.startTime < offering.startTime
      ) {
        return true;
      }

      return false;
    });

    console.log("this is: ", offeringsConflictsSelected);

    return (
      <GridItem
        gridRow={"2"}
        gridColumn={"2"}
        bg="white"
        border="1px solid #efefef"
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        padding="0.5rem 1rem"
        borderRadius="0.5rem"
      >
        <Heading fontSize="1rem" mb="1rem" fontFamily={"Merriweather"}>
          Stats for Previewed Offering
        </Heading>

        <Flex>
          <Stat>
            <StatLabel>Current Conflicts</StatLabel>
            <StatNumber>{offeringsConflictsSelected.length}</StatNumber>
            <StatHelpText>offerings</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Preview Conflicts</StatLabel>
            <StatNumber>{offeringsConflictsTemp.length}</StatNumber>
            <StatHelpText>offerings</StatHelpText>
          </Stat>
        </Flex>
      </GridItem>
    );
  };

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
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme="blue" ml="2rem">
              Subject Filter
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                type="checkbox"
                onChange={(filters) => setSubjectFilters(filters)}
              >
                {SUBJECTS.map(renderMenuItemOptions)}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
        gridRowGap={"2rem"}
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
            subjectFilters={subjectFilters}
            offerings={offerings}
            currentDay={currentDay}
            selectedOffering={selectedOffering}
            setSelectedOffering={setSelectedOffering}
            tempOffering={tempOffering}
          />
        </GridItem>

        {/* Right panel */}
        {selectedOffering && (
          <ScheduleSidebar
            selectedOffering={selectedOffering}
            setTempOffering={setTempOffering}
            tempOffering={tempOffering}
          />
        )}

        {tempOffering && renderConflictStats()}
      </GridItem>
    </Grid>
  );
}
