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
import InstructorsModal from './InstructorsModal';
import FilterableTable from "./FilterableTable";

function Instructors(props) {
  const {
    selectedInstructorId,
    setSelectedInstructorId
  } = props;

  const instructors = useSelector(selectInstructors);
  const navigate = useNavigate();

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
    property: "firstName",
    title: "First Name",
    width: "20%"
  },
  {
    property: "lastName",
    title: "Last Name",
    width: "20%"
  },
  {
    property: "wsuEmail",
    title: "WSU Email",
  },

];

export default Instructors;