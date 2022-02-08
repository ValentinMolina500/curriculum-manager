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
  Td
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectInstructors } from "../store/instructorsSlice";
import { Link, useNavigate } from "react-router-dom";

function Instructors(props) {
  const {
    selectedInstructorId,
    setSelectedInstructorId
  } = props;

  const instructors = useSelector(selectInstructors);
  const navigate = useNavigate();

  const renderInstructors = () => {
    return instructors.map((instructor) => {
      return (
        <Tr
          key={instructor.id}
          fontSize="0.875rem"
          transition="ease 250ms"
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => { setSelectedInstructorId(instructor.id); navigate(instructor.id) }}
        >

          {INSTRUCTOR_COLUMNS.map(column => {
            return <Td key={`${instructor.id}${column.property}`}>{instructor[column.property]}</Td>
          })}
        </Tr>
      );
    });
  }
  return (
    <Stack bg="white" w="100%">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Instructors
        </Heading>
        <Button as={Link} to={"add-instructors"} colorScheme={"purple"} size="sm">
          Add Instructor
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr >
            {INSTRUCTOR_COLUMNS.map((column) => (
              <Th key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderInstructors()}</Tbody>
      </Table>
    </Stack>
  );
}

const INSTRUCTOR_COLUMNS = [
  {
    property: "firstName",
    title: "First Name",
  },
  {
    property: "lastName",
    title: "Last Name",
  },
  {
    property: "wsuEmail",
    title: "WSU Email",
  },

];

export default Instructors;