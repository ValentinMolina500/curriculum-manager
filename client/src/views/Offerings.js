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
import { selectOfferingsById } from "../store/offeringsSlice";
import { Link, useNavigate } from "react-router-dom";
import OfferingsModal from "./OfferingsModal";
import { renderTime } from "../utils/Time";

function Offerings(props) {
  const semesterId = useSelector(state => state.semesters.selectedSemester);
  const { offerings, status: offeringsStatus, error: offeringError } = useSelector(state => selectOfferingsById(state, semesterId));
  // const {
  //   selectedOfferingId,
  //   setSelectedOfferingId
  // } = props;

  // const offerings = useSelector(selectOfferings);
  // const navigate = useNavigate();

  const renderOfferings = () => {
    return offerings.map((offering) => {

      return (
        <Tr
          key={offering.id}
          fontSize="1rem"
          transition="ease 250ms"

          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => {
            // setSelectedOfferingId(offering.id); navigate(offering.id) 
          }}
        >

          {OFFERING_COLUMNS.map(column => {
            if (column.render) {
              return column.render(offering, column);
            }

            return <Td py="0.25rem" key={`${offering.id}${column.property}`}>{offering[column.property]}</Td>
          })}
        </Tr>
      );
    });
  }

  const renderOfferingTable = () => {
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

    return (
      <Table>
        <Thead>
          <Tr>
            {OFFERING_COLUMNS.map((column) => (
              <Th key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderOfferings()}</Tbody>
      </Table>
    )
  }

  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Offerings
        </Heading>
        <OfferingsModal />
      </Flex>
      {renderOfferingTable()};
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
          <Tag key={`${course.id}${column.property}`} colorScheme={"purple"}>
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
    property: "OffSection",
    title: "Section #",
    width: "10%"
  },
  {
    property: "CrsName",
    title: "Course Title",
    width: "10%"
  },
  {
    property: "Instructor",
    title: "Instructor",
    width: "10%"
  },
  {
    property: "OffDay",
    title: "Days",
    width: "10%"
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
    width: "10%",
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
    width: "10%"
  },

];

export default Offerings;