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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSessions } from "../store/sessionsSlice";
import { Link, useNavigate } from "react-router-dom";

function Sessions(props) {
  const {
    selectedSessionId,
    setSelectedSessionId
  } = props;

  const sessions = useSelector(selectSessions);
  const navigate = useNavigate();

  const renderSessions = () => {
    return sessions.map((session) => {
      return (
        <Tr 
          key={session.id} 
          fontSize="0.875rem" 
          transition="ease 250ms" 
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => { setSelectedSessionId(session.id); navigate(session.id) }}
        >
         
        {SESSION_COLUMNS.map(column => {
          return <Td key={`${session.id}${column.property}`}>{session[column.property]}</Td>
        })}
      </Tr>
      );
    });
  }
  return (
    <Stack bg="white" w="100%">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Sessions
        </Heading>
        <Button as={Link} to={"add"} colorScheme={"purple"} size="sm">
          Add Session
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr >
            {SESSION_COLUMNS.map((column) => (
              <Th key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderSessions()}</Tbody>
      </Table>
    </Stack>
  );
}

const SESSION_COLUMNS = [
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
export default Sessions;
