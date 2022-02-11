import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSemestersById } from "../store/semestersSlice";
import { useParams } from "react-router-dom";

function ViewSemester(props) {
  const { semesterId } = useParams();
  const semester = useSelector(state => selectSemestersById(state, semesterId));
  return (
    <Stack bg="white" w="100%">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Semester
      </Heading>

      <Text>{JSON.stringify(semester)}</Text>
    </Stack>
  );
}

export default ViewSemester;
