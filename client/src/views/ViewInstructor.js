import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSingleInstructorById } from "../store/instructorsSlice";
import { useParams } from "react-router-dom";

function ViewInstructor(props) {
  const { instructorId } = useParams();

  console.log("INSTURCTIRI", instructorId);
  const instructor = useSelector(state => selectSingleInstructorById(state, instructorId));
  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Instructors
      </Heading>

      <Text>{JSON.stringify(instructor)}</Text>
    </Stack>
  );
}

export default ViewInstructor;
