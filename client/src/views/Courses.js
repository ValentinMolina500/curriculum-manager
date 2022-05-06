import {
  Box,
  Button,
  Heading,
  Stack,
  Flex,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Tag,
  Text,

} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectCoursesById } from "../store/coursesSlice";
import { Link } from "react-router-dom";
import FilterableTable from "./FilterableTable";
import CoursesModal from "./CoursesModal";
import { useMemo } from 'react';

function Courses() {
  const semesterId = useSelector(state => state.semesters.selectedSemester);

  const { courses, status: coursesStatus, error: courseError } = useSelector(state => selectCoursesById(state, semesterId));

  const renderCourseTable = useMemo(() => {
    if (coursesStatus === 'loading') {
      return (
        <Center p="2rem">
          <Spinner color="purple.600" size="xl" emptyColor='gray.200' thickness='3px' />
        </Center>
      );
    }

    if (coursesStatus === 'error') {
      return <Text>{courseError}</Text>
    }

    return (
      <FilterableTable tableColumns={COURSES_COLUMNS} tableItems={courses} showFilters={true} />
    )
  }, [courses, coursesStatus])
  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Courses
        </Heading>
        <CoursesModal />
        
      </Flex>
      {renderCourseTable}

    </Stack>

  );
}

const COURSES_COLUMNS = [
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
    width: "10%"
  },

  {
    property: "CrsNumber",
    title: "Course #",
    width: "10%"
  },
  {
    property: "CrsName",
    title: "Course Title",
  },

];

export default Courses;