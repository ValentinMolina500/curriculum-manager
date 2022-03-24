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
  Text
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectCoursesById } from "../store/coursesSlice";
import { Link } from "react-router-dom";
import CoursesModal from "./CoursesModal";

function Courses() {
  const semesterId = useSelector(state => state.semesters.selectedSemester);

  const { courses, status: coursesStatus, error: courseError } = useSelector(state => selectCoursesById(state, semesterId));

  const renderCourses = () => {

    return courses.map((course) => {
      return (
        <Tr
          key={course.id}
          fontSize="1rem"
          transition="ease 250ms"
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          minHeight={0}
          onClick={() => {
            // navigate(semester.id)
          }}
        >

          {COURSES_COLUMNS.map(column => {
            if (column.render) {
              return column.render(course, column);
            }

            return <Td py="0.25rem" minHeight={0} key={`${course.id}${column.property}`} width={column.width}>{course[column.property]}</Td>
          })}
        </Tr>
      );
    });
  }

  const renderCourseTable = () => {
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
      <Table>
        <Thead>
          <Tr>
            {COURSES_COLUMNS.map((column) => (
              <Th key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderCourses()}</Tbody>
      </Table>
    )
  }
  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Courses
        </Heading>
        <CoursesModal />
      </Flex>
      {renderCourseTable()}

    </Stack>

  );
}

const COURSES_COLUMNS = [
  {
    property: "Subject",
    title: "Subject",
    render: (course, column) => {
      return (
        <Td py="0.25rem">
          <Tag key={`${course.id}${column.property}`} colorScheme={"purple"}>
            {course[column.property]}
          </Tag>
        </Td>
      )
    },
    width: "10%"
  },

  {
    property: "Class #",
    title: "Course #",
    width: "10%"
  },
  {
    property: "Title",
    title: "Course Title",
  },

];

export default Courses;