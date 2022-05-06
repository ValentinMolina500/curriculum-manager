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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  CheckboxGroup,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoursesById } from "../store/coursesSlice";
import ReactSelect from "react-select";
import { DAY_TIME_GRID_MAP, DAY_TEMP_LOOKUP } from "../utils/constants";
import * as types from "../store/actions";

const OfferingsModal = (props) => {
  const semesterId = useSelector((state) => state.semesters.selectedSemester);

  const { courses } = useSelector((state) =>
    selectCoursesById(state, semesterId)
  );
  const { instructors } = useSelector((state) => state.instructors);
  const dispatch = useDispatch();
  const [courseInstructor, setCourseInstructor] = useState(null);
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

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseGrid, setSelectedCourseGrid] = useState("M_W_F");
  const [meetingTime, setMeetingTime] = useState({
    startTime: "08:10",
    endTime: "09:00",
  });

  const isNoInput =
    courseInstructor === null ||
    building === "" ||
    roomNum === "" ||
    meetingTime === null ||
    selectedCourse === null;
  const renderAddOfferingForm = () => {
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
    return (
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
        gridColumn="1 / 5"
        borderRadius={"md"}
        p="1.5rem"
        onSubmit={addOffering}
      >
        <FormControl gridRow="1" gridColumn={"1/3"} isRequired>
          <FormLabel htmlFor="courseSelect" fontSize={"1rem"}>
            Courses
          </FormLabel>
          <ReactSelect
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
  };

  const addOffering = (event) => {
    event.preventDefault();

    const offeringData = {
      courseID: selectedCourse,
      instructorID: courseInstructor,
      building: building,
      roomNum: roomNum,
      credits: 4,
      meetingDays: DAY_TEMP_LOOKUP[selectedCourseGrid],
      courseStartTime: meetingTime.startTime,
      courseEndTime: meetingTime.endTime,
    };
    console.log(offeringData);

    dispatch({
      type: types.ADD_OFFERING,
      payload: {
        offering: offeringData,
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Offering has been added!",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          onClose();
        },
      },
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color="white"
        backgroundColor="#A60F2D"
        _hover={{ bg: "#A60F2D", filter: "brightness(125%)" }}
      >
        Add Offering
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="660px">
          <ModalHeader>Add Offering</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{renderAddOfferingForm()}</ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              isDisabled={isNoInput}
              type="submit"
              color="white"
              backgroundColor="#A60F2D"
              _hover={{ bg: "#A60F2D", filter: "brightness(125%)" }}
              onClick={addOffering}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OfferingsModal;
