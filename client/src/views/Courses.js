import {
  Box,
  Button,
  Heading
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Courses() {
  return (
    <Box>
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>Courses</Heading>
      <Button as={Link} to={"add-course"}>Add Course</Button>
    </Box>
    
  );
}

export default Courses;