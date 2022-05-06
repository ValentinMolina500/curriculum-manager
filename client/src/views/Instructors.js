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
  Tag
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectInstructorsById } from "../store/instructorsSlice";
import { Link, useNavigate } from "react-router-dom";
import InstructorsModal from './InstructorsModal';
import FilterableTable from "./FilterableTable";

function Instructors(props) {
  const semesterId = useSelector(state => state.semesters.selectedSemester);
  const { instructors, status: instructorsStatus, error: instructorError } = useSelector(state => state.instructors);

  const navigate = useNavigate();
  const renderInstructors = () => {

    return instructors.map((instructor) => {
      return (
        <Tr
          key={instructor.id}
          fontSize="1rem"
          transition="ease 250ms"
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => { 
            // setSelectedInstructorId(instructor.id); navigate(instructor.id) 
          }}
        >

          {INSTRUCTOR_COLUMNS.map(column => {
            if (column.render) {
              return column.render(instructor, column);
            }

            return <Td 
              py="0.25rem" 
              minHeight={0} 
              key={`${instructor.id}${column.property}`} 
              width={column.width}
              onClick={() => navigate(`${instructor.InsID}`)}
              >
                {instructor[column.property]}
              </Td>
          })}
        </Tr>
      );
    });
  }

  const renderInstructorTable = () => {
    if (instructorsStatus === 'loading') {
      return (
        <Center p="2rem">
          <Spinner color="purple.600" size="xl" emptyColor='gray.200' thickness='3px' />
        </Center>
      );
    }

    if (instructorsStatus === 'error') {
      return <Text>{instructorError}</Text>
    }

    return (
      <Table>
        <Thead>
          <Tr>
            {INSTRUCTOR_COLUMNS.map((column) => (
              <Th key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderInstructors()}</Tbody>
      </Table>
    )
  }

  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Instructors
        </Heading>
        <InstructorsModal />
      </Flex>
      <FilterableTable tableItems={instructors} tableColumns={INSTRUCTOR_COLUMNS} />
    </Stack>
  );
}

const INSTRUCTOR_COLUMNS = [
  {
    property: "InsFirstName",
    title: "First Name",
    width: "10%"
  },

  {
    property: "InsLastName",
    title: "Last Name",
    width: "10%"
  },
  {
    property: "InsEmail",
    title: "WSU Email",
  },

];

export default Instructors;