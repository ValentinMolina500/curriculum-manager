import {
  Heading,
  Flex,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSemesters } from "../store/semestersSlice";
import { Link, useNavigate } from "react-router-dom";

function Semesters(props) {
  const {
    selectedSemesterId,
    setSelectedSemesterId
  } = props;

  const { semesters, status: semestersStatus } = useSelector(state => state.semesters);
  const navigate = useNavigate();

  const renderSemesters = () => {
    return semesters.map((semester) => {
      return (
        <Tr
          key={semester.id}
          fontSize="0.875rem"
          transition="ease 250ms"
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => { setSelectedSemesterId(semester.id); navigate(semester.id) }}
        >

          {SEMESTER_COLUMNS.map(column => {
            return <Td key={`${semester.id}${column.property}`}>{semester[column.property]}</Td>
          })}
        </Tr>
      );
    });
  }
  return (
    <Stack bg="white" w="100%">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Semesters
        </Heading>
        <Button as={Link} to={"add"} colorScheme={"purple"} size="sm">
          Add Semester
        </Button>
      </Flex>
      {
        semestersStatus === 'loading' ? (
          <Center p="2rem">
            <Spinner color="purple.600" size="xl" emptyColor='gray.200' thickness='3px' />
          </Center>
        )
          : (
            <Table>
              <Thead>
                <Tr >
                  {SEMESTER_COLUMNS.map((column) => (
                    <Th key={column.property}>{column.title}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>{renderSemesters()}</Tbody>
            </Table>
          )
      }

    </Stack>
  );
}

const SEMESTER_COLUMNS = [
  {
    property: "school",
    title: "School",
  },
  {
    property: "season", // the property for the object
    title: "Season",
  },
  {
    property: "year", // the property for the object
    title: "Year",
  },

];
export default Semesters;
