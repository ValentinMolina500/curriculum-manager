import {
  Flex,
  Stack,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  Text,
  Tag,
  Grid,
  FormControl,
  FormLabel,
  Select,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectOfferingsById } from "../store/offeringsSlice";
import { Link, useNavigate } from "react-router-dom";
import { selectCoursesById } from "../store/coursesSlice";
import ReactSelect from "react-select";
import { DAY_TIME_GRID_MAP, DAY_TEMP_LOOKUP } from "../utils/constants";
import OfferingsModal from "./OfferingsModal";
import { renderTime } from "../utils/Time";
import FilterableTable from "./FilterableTable";
import { useEffect, useMemo, useState } from 'react';
import * as types from '../store/actions';

function Offerings(props) {
  const semesterId = useSelector(state => state.semesters.selectedSemester);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { offerings, status: offeringsStatus, error: offeringError } = useSelector(state => selectOfferingsById(state, semesterId));
  const [selectedOffering, setSelectedOffering] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const renderOfferingTable = useMemo(() => {
    if (offeringsStatus === 'loading') {
      return (
        <Center p="2rem">
          <Spinner color="purple.600" size="xl" emptyColor='gray.200' thickness='3px' />
        </Center>
      );
    }

    if (offeringsStatus === 'error') {
      return <Text>{offeringError}</Text>
    }

    return <FilterableTable 
      tableItems={offerings} 
      tableColumns={OFFERING_COLUMNS} 
      showFilters={true} 
      onRowClick={(item) => { setSelectedOffering(item); onOpen(); }}
    />
  }, [offerings])

  const onOfferingDelete = () => {
    dispatch({
      type: types.DELETE_OFFERING,
      payload: {
        offeringId: selectedOffering.OffID,
        onSuccess: () => {
          toast({
            title: "Offering has been deleted!",
            position: "top",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          onClose();
        }
      }
    })
  }


  const { courses } = useSelector((state) =>
    selectCoursesById(state, semesterId)
  );
  const { instructors } = useSelector((state) => state.instructors);
  const [courseInstructor, setCourseInstructor] = useState();
  const [courseDays, setCourseDays] = useState({
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
  });
  const [courseStartTime, setCourseStartTime] = useState("");
  const [courseEndTime, setCourseEndTime] = useState("");
  const [building, setBuilding] = useState("TCIC");
  const [roomNum, setRoomNum] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseGrid, setSelectedCourseGrid] = useState("M_W_F");
  const [meetingTime, setMeetingTime] = useState({
    startTime: "08:10",
    endTime: "09:00",
  });

  useEffect(() => {
    if (!selectedOffering) {
      console.log("NO SEELLWE");
      return;
    }
    console.log("THIS IS SELECTED OFFERING: ", selectedOffering);

    setCourseInstructor(selectedOffering.InsID);
    setSelectedCourse(selectedOffering.CrsID);
    setRoomNum(selectedOffering.Room);
  }, [selectedOffering])



  const renderEditOfferingForm = () => {
    const buildingChangeHandler = (event) => {
      setBuilding(event.target.value);
    };

    const roomNumChangeHandler = (event) => {
      setRoomNum(event.target.value);
    };

    const getCourseSelectOptions = () => {
      return courses.map((course) => ({
        label: `${course.CrsSubject} ${course.CrsNumber} ${course.CrsName}`,
        value: course.CrsID,
      }));
    };

    const getInstructorSelectOptions = () => {
      return instructors.map((instr) => ({
        label: `${instr.InsFirstName} ${instr.InsMiddleName ?? ""} ${
          instr.InsLastName
        }`,
        value: instr.InsID,
      }));
    };

    const getMeetingTimeOptions = () => {
      const meetingTimes = DAY_TIME_GRID_MAP[selectedCourseGrid];
      if (!meetingTimes) {
        return [];
      }

      return meetingTimes.map((times) => (
        <option value={JSON.stringify(times.value)}>{times.label}</option>
      ));
    };

    const updateOffering = () => {

    }
    return (
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
        gridColumn="1 / 5"
        borderRadius={"md"}
        p="1.5rem"
        onSubmit={updateOffering}
      >
        <FormControl gridRow="1" gridColumn={"1/3"} isRequired>
          <FormLabel htmlFor="courseSelect" fontSize={"1rem"}>
            Courses
          </FormLabel>
          <ReactSelect
            value={selectedCourse}
            id="courseSelect"
            onChange={(opt) => setSelectedCourse(opt.value)}
            options={getCourseSelectOptions()}
          />
        </FormControl>

        <FormControl gridRow="2" gridColumn={"1/3"} isRequired>
          <FormLabel htmlFor="courseInstructor" fontSize="1rem">
            Instructor
          </FormLabel>

          <ReactSelect
            id="courseInstructor"
            options={getInstructorSelectOptions()}
            onChange={(opt) => setCourseInstructor(opt.value)}
          />
        </FormControl>

        <FormControl gridRow="3" gridColumn={"1"} isRequired>
          <FormLabel htmlFor="building" fontSize="1rem">
            Building
          </FormLabel>
          <Select
            id="building"
            value={building}
            onChange={buildingChangeHandler}
          >
            <option value="TCIC">CIC</option>
            <option value="EAST">East</option>
            <option value="TFLO">Floyd</option>
            <option value="TCOL">TCOL</option>
            <option value="TBSL">BSEL</option>
          </Select>
        </FormControl>

        <FormControl gridRow="3" gridColumn={"2"} isRequired>
          <FormLabel htmlFor="roomNum" fontSize="1rem">
            Room Number
          </FormLabel>
          <Input
            id="roomNum"
            type="number"
            value={roomNum}
            onChange={roomNumChangeHandler}
          />
        </FormControl>

        <FormControl gridRow="4" gridColumn={"1/3"} isRequired>
          <FormLabel fontSize={"1rem"}>Meeting Days</FormLabel>
          <Select onChange={(e) => setSelectedCourseGrid(e.target.value)}>
            <option value="M_W_F">Monday, Wednesday & Friday</option>
            <option value="T_TH">Tuesday & Thursday</option>
            <option value="OTH">Monday & Wednesday</option>
          </Select>
        </FormControl>
        <FormControl gridRow={"5"} gridColumn={"1/3"} isRequired>
          <FormLabel fontSize={"1rem"}>Meeting Time</FormLabel>
          <Select onChange={(e) => setMeetingTime(JSON.parse(e.target.value))}>
            {getMeetingTimeOptions()}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Offerings
        </Heading>
        <OfferingsModal />
      </Flex>

      
      {renderOfferingTable}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent     maxW="660px">
          <ModalHeader>Edit Offering</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderEditOfferingForm()}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onOfferingDelete} colorScheme={"red"}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

const OFFERING_COLUMNS = [
  {
    property: "CrsSubject",
    title: "Subject",
    render: (course, column) => {
      return (
        <Td py="0.25rem">
          <Tag key={`${course.id}${column.property}`}>
            {course[column.property]}
          </Tag>
        </Td>
      )
    },
  },
  {
    property: "CrsNumber",
    title: "Course #",
  },
  {
    property: "OffSection",
    title: "Section #",
  },
  {
    property: "CrsName",
    title: "Course Title",
  },
  {
    property: "Instructor",
    title: "Instructor",
  },
  {
    property: "OffDay",
    title: "Days",
  },
  {
    property: "OffStartTime",
    title: "Start Time",
    render: (time, column) => {
      return (
        <Td py="0.25rem">
          {renderTime(new Date(time[column.property]))}
        </Td>
      )
    },
    width: "10%"
  },
  {
    property: "OffEndTime",
    title: "End Time",
    render: (time, column) => {
      return (
        <Td py="0.25rem">
          {renderTime(new Date(time[column.property]))}
        </Td>
      )
    },
  },
  {
    property: "Room",
    title: "Room",
  },

];

export default Offerings;