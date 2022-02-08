import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectInstructors, selectInstructorsById } from "../store/instructorsSlice";
import { useParams } from "react-router-dom";

function ViewInstructor(props) {
  const { instructorId } = useParams();
  const instructor = useSelector(state => selectInstructorsById(state, instructorId));
  return (
    <Stack bg="white" w="100%">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Instructors
      </Heading>

      <Text>{JSON.stringify(instructor)}</Text>
    </Stack>
  );
}

export default ViewInstructor;
