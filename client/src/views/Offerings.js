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
import { selectOfferings } from "../store/offeringsSlice";
import { Link, useNavigate } from "react-router-dom";
import OfferingsModal from "./OfferingsModal";

function Offerings(props) {
  const {
    selectedOfferingId,
    setSelectedOfferingId
  } = props;

  const offerings = useSelector(selectOfferings);
  const navigate = useNavigate();

  const renderOfferings = () => {
    return offerings.map((offering) => {
      return (
        <Tr
          key={offering.id}
          fontSize="1rem"
          transition="ease 250ms"

          _hover={{ bg: "#efefef", cursor: "pointer" }}
          onClick={() => { setSelectedOfferingId(offering.id); navigate(offering.id) }}
        >

          {OFFERING_COLUMNS.map(column => {
            return <Td py="0.25rem" key={`${offering.id}${column.property}`}>{offering[column.property]}</Td>
          })}
        </Tr>
      );
    });
  }

  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Offerings
        </Heading>
        <OfferingsModal />
      </Flex>
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
    </Stack>
  );
}

const OFFERING_COLUMNS = [
  {
    property: "subject",
    title: "Subject",
  },
  {
    property: "courseNum",
    title: "Course Number",
  },
  {
    property: "courseTitle",
    title: "Course Title",
  },
  {
    property: "courseInstructor",
    title: "Instructor",
  },
  {
    property: "courseDays",
    title: "Days",
  },
  {
    property: "startTime",
    title: "Start Time",
  },
  {
    property: "endTime",
    title: "End Time",
  },
  {
    property: "room",
    title: "Room",
  },

];

export default Offerings;