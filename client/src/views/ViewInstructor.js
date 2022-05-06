import React from "react";
import {
  Stack,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Grid,
  Box,
  Flex,
  Tag,
  HStack,
  Td,
  GridItem,
  Divider
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSingleInstructorById } from "../store/instructorsSlice";
import { useParams, useNavigate } from "react-router-dom";
import * as types from "../store/actions";
import { useDispatch } from "react-redux";
import FilterableTable from "./FilterableTable";
import { selectCoursesById } from "../store/coursesSlice";
import { selectOfferingsById } from "../store/offeringsSlice";
import { renderTime } from "../utils/Time";
import {
  MdDateRange,
  MdBook,
  MdPeople,
  MdManageAccounts,
  MdArrowBack,
  MdLocalOffer,
} from "react-icons/md";
function ViewInstructor(props) {
  const { instructorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const instructor = useSelector((state) =>
    selectSingleInstructorById(state, instructorId)
  ) ?? {};

  const semesterId = useSelector((state) => state.semesters.selectedSemester);

  const { courses } = useSelector((state) =>
    selectCoursesById(state, semesterId)
  );
  const { offerings } = useSelector((state) =>
    selectOfferingsById(state, semesterId)
  );

  const getCoursesByInstructor = () => {
    const offeringsFromInstructor = offerings.filter(
      (offering) => offering.InsID == instructorId
    );

    return offeringsFromInstructor;
  };
  const handleDelete = async (event) => {
    event.preventDefault();

    dispatch({
      type: types.DELETE_INSTRUCTOR,
      payload: {
        instructorId: instructorId,
        onSuccess: () => {
          navigate(-1);
          toast({
            title: "Instructor has been deleted!",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      },
    });
  };

  return (
    <Grid
      // bg="red"
      w="100%"
      mt="2rem"
      gridTemplateRows={"auto minmax(0, 1fr) auto"}
      minH={0}
      rowGap="2rem"
    >
      <Box>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          View Instructor
        </Heading>

        <Text mt="1rem" fontSize={"1.375rem"} fontFamily={"Merriweather"}>{`${
          instructor.InsFirstName
        } ${instructor.InsMiddleName ?? ""} ${instructor.InsLastName}`}</Text>
        <HStack alignItems={"center"} mb="1rem">
          <Text
            fontSize={"1rem"}
            color="gray.500"
          >{`${instructor.InsEmail ?? ""}`}</Text>
          {/* {<Tag>Adjunct</Tag>} */}
        </HStack>
        <Divider />
      </Box>

      <GridItem minH={0} h="100%">
        <Heading mb="0.5rem" fontSize="1rem" fontFamily={"Merriweather"}>Assigned Offerings</Heading>
        <FilterableTable
          tableItems={getCoursesByInstructor()}
          tableColumns={OFFERING_COLUMNS}
          allowSearching={false}
        />

        <Button mt="2rem" colorScheme={"red"} onClick={onOpen}>Delete Instructor</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="410px">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this instructor?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </GridItem>

      
    </Grid>
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
      );
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
    property: "OffDay",
    title: "Days",
  },
  {
    property: "OffStartTime",
    title: "Start Time",
    render: (time, column) => {
      return (
        <Td py="0.25rem">{renderTime(new Date(time[column.property]))}</Td>
      );
    },
    width: "10%",
  },
  {
    property: "OffEndTime",
    title: "End Time",
    render: (time, column) => {
      return (
        <Td py="0.25rem">{renderTime(new Date(time[column.property]))}</Td>
      );
    },
  },
  {
    property: "Room",
    title: "Room",
  },
];

export default ViewInstructor;
