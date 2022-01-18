import {
  Box,
  Button,
  Heading
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Instructors() {
  return (
    <Box>
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>Instructors</Heading>
      <Button as={Link} to={"add-instructors"}>Add Instructors</Button>
    </Box>
  );
}

export default Instructors;