import {
  Heading,
  Flex,
  Stack,
  Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import Table from "./Table";

const FAKE_ITEMS = [
  {
    title: "This is an example",
    season: "Summer",
    year: "2018",
    createdBy: "3b349db-1brie"
  }, 
  {
    title: "First year back from Pandemic",
    season: "Fall",
    year: "2021"
  }, 
  {
    title: "WiP",
    season: "Spring",
    year: "2022"
  }, 
];

const FAKE_COLUMNS = [
  {
    property: "title",
    title: "Title"
  },
  {
    property: "season", // the property for the object
    title: "Season"
  },
  {
    property: "year", // the property for the object
    title: "Year"
  },
  {
    property: "createdBy",
    title: "Created By"
  }
]
function Sessions() {
  return (
    <Stack bg="white" w="100%">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>Sessions</Heading>
        <Button as={Link} to={"add"} colorScheme={"purple"} size="sm">Add Session</Button>
      </Flex>
      <Table items={FAKE_ITEMS} columns={FAKE_COLUMNS} />
    </Stack>
  );
}

export default Sessions;