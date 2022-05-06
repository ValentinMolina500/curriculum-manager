import { useEffect, useState } from 'react';
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
  Select
} from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectOfferingsById } from "../store/offeringsSlice";
import { MdPerson, MdBook } from "react-icons/md";
import { SUBJECTS } from "../utils/constants";
import { DAY_TIME_GRID_MAP, DAY_TEMP_LOOKUP } from "../utils/constants";
import API from "../utils/API";

const MEETING_DAY_OPTS = [
  {
    value: "M,W,F",
    label: "Monday, Wednesday & Friday"
  },
  {
    value: "TU,TH",
    label: "Tuesday & Thursday"
  },
  {
    value: "M,W",
    label: "Monday & Wednesday"
  },
  {
    value: "M",
    label: "Monday"
  },
  {
    value: "TU",
    label: "Tuesday"
  },
  {
    value: "W",
    label: "Wednesday"
  },
  {
    value: "TH",
    label: "Thursday"
  },
  {
    value: "F",
    label: "Friday"
  }
];


function ScheduleSidebar({ selectedOffering, setTempOffering, tempOffering }) {
  const [selectedCourseGrid, setSelectedCourseGrid] = useState(selectedOffering.OffDay);
  const [meetingTime, setMeetingTime] = useState(JSON.stringify({
    startTime: selectedOffering.startTime,
    endTime: selectedOffering.endTime
  }));

  useEffect(() => {
    setTempOffering(null);
    setSelectedCourseGrid(selectedOffering.OffDay);
    setMeetingTime(JSON.stringify({
      startTime: selectedOffering.startTime,
      endTime: selectedOffering.endTime
    }))
  },[selectedOffering])
  
  useEffect(() => {
    if (selectedCourseGrid != selectedOffering.OffDay) {
      setMeetingTime(getTimesForDays(selectedCourseGrid)[0]);
    }
  }, [selectedCourseGrid]);

  const renderDayOptions = () => {
    return MEETING_DAY_OPTS.map(opt => {
      return <option value={opt.value}>{opt.label}</option>
    })
  }


  const getMeetingTimeOptions = () => {
    const meetingTimes = getTimesForDays(selectedCourseGrid);
    if (!meetingTimes) {
      return [];
    }

    return meetingTimes.map((times) => (
      <option value={JSON.stringify(times.value)}>{times.label}</option>
    ));
  };

  const isTimeDifferent = () => {
    return selectedOffering.OffDay != selectedCourseGrid || 
    JSON.stringify({
      startTime: selectedOffering.startTime,
      endTime: selectedOffering.endTime
    }) != meetingTime
  }

  const handleTempOffering = () => {
    if (tempOffering) {
      setTempOffering(null);
      return;
    }
    const { startTime, endTime } = JSON.parse(meetingTime);
    setTempOffering({ 
      ...selectedOffering,
      startTime,
      endTime,
      OffDay: selectedCourseGrid,
      isSpecial: true
    })
  }
  const isDifferent = isTimeDifferent();

  return (
    <GridItem
    minH={"0"}
    overflowY="auto"
    gridColumn={3}
    gridRow={1}
    border="1px solid #dfdfdf"
    zIndex="100"
    borderRadius={"md"}
  >
    <Box p="1rem" as="aside" w="350px" h="100%">
      <Heading fontSize={"1rem"} fontFamily="Merriweather">
        View Offering
      </Heading>

      <Text fontSize="1rem">{selectedOffering.className}</Text>

      <Flex flexDir={"row"} alignItems="center">
        <MdBook />
        <Text fontSize="1rem">{selectedOffering.CrsName}</Text>
      </Flex>

      <Flex flexDir={"row"} alignItems="center">
        <MdPerson />
        <Text ml="0.5rem" fontSize="1rem">
          {selectedOffering.Instructor}
        </Text>
      </Flex>

      <Heading fontSize={"1rem"} fontFamily="Merriweather" mt="1rem">
        Edit Schedule
      </Heading>

      
      <FormControl>
        <FormLabel fontSize={"1rem"}>{`Meeting Days ${isDifferent ? "*" : ""}`}</FormLabel>
        <Select value={selectedCourseGrid} onChange={(e) => setSelectedCourseGrid(e.target.value)}>
            {renderDayOptions()}
        </Select>
      </FormControl>
      <FormControl mt="1rem">
        <FormLabel fontSize={"1rem"}>{`Meeting Time ${isDifferent ? "*" : ""}`}</FormLabel>
        <Select
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        >
          {getMeetingTimeOptions()}
        </Select>
      </FormControl>

      <Button mt="1rem" isDisabled={!isDifferent} onClick={handleTempOffering}>
        {tempOffering ? "Stop Previewing" : "Preview Changes"}
      </Button>
    </Box>
  </GridItem>
  )
}

const getTimesForDays = (dayString) => {
  switch (dayString) {
    case "M,W,F":
      return [
        {
          label: "8:10 - 9 AM",
          value: {
            startTime: 490,
            endTime: 540
          }
        },
        {
          label: "9:10 - 10 AM",
          value: {
            startTime: 550,
            endTime: 600
          }
        },
        {
          label: "10:10 - 11 AM",
          value: {
            startTime: 610,
            endTime: 660
          }
        },
        {
          label: "11:10 - 12 PM",
          value: {
            startTime: 670,
            endTime: 720
          }
        },
        {
          label: "12:10 - 1 PM",
          value: {
            startTime: 730,
            endTime: 780
          }
        },
        {
          label: "1:10 - 2 PM",
          value: {
            startTime: 790,
            endTime: 840
          }
        },
        {
          label: "2:10 - 3 PM",
          value: {
            startTime: 850,
            endTime: 900
          }
        },
        {
          label: "3:10 - 4 PM",
          value: {
            startTime: 910,
            endTime: 960
          }
        },
        {
          label: "4:10 - 5 PM",
          value: {
            startTime: 970,
            endTime: 1020
          }
        },
        {
          label: "12:10 - 1:20 PM",
          value: {
            startTime: 730,
            endTime: 800
          }
        }
      ]

    case "TU,TH":
      return [
        {
          label: "7:45 - 9 AM",
          value: {
            startTime: 465,
            endTime: 540
          }
        },
        {
          label: "9:10 - 10:25 AM",
          value: {
            startTime: 550,
            endTime: 625
          }
        },
        {
          label: "10:35 - 11:50 AM",
          value: {
            startTime: 635,
            endTime: 710
          }
        },
        {
          label: "12:05 - 1:20 PM",
          value: {
            startTime: 725,
            endTime: 800
          }
        },
        {
          label: "1:30 - 2:45 PM",
          value: {
            startTime: 810,
            endTime: 885
          }
        },
        {
          label: "2:55 - 4:10 PM",
          value: {
            startTime: 895,
            endTime: 970
          }
        },
        {
          label: "4:15 - 5:30 PM",
          value: {
            startTime: 975,
            endTime: 1050
          }
        },
        {
          label: "4:20 - 5:35 PM",
          value: {
            startTime: 980,
            endTime: 1055
          }
        },
        {
          label: "5:45 - 7 PM",
          value: {
            startTime: 1065,
            endTime: 1140
          }
        },
        {
          label: "7:15 - 8:30 PM",
          value: {
            startTime: 1140,
            endTime: 1230
          }
        }
      ]

    case "M,W":
      case "M":
        case "TU":
      case "W":
      case "TH":
      case "F":
      return [

        {
          label: "4:15 - 5:30 PM",
          value: {
            startTime: 975,
            endTime: 1050
          }
        },
        {
          label: "4:20 - 5:35 PM",
          value: {
            startTime: 980,
            endTime: 1055
          }
        },
        {
          label: "5:45 - 7 PM",
          value: {
            startTime: 1065,
            endTime: 1140
          }
        },
        {
          label: "7:15 - 8:30 PM",
          value: {
            startTime: 1140,
            endTime: 1230
          }
        }
      ]

 
  }
}

export default ScheduleSidebar;