import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSessions, selectSessionsById } from "../store/sessionsSlice";
import { useParams } from "react-router-dom";

function ViewSession(props) {
  const { sessionId } = useParams();
  const session = useSelector(state => selectSessionsById(state, sessionId));
  return (
    <Stack bg="white" w="100%">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Sessions
      </Heading>

      <Text>{JSON.stringify(session)}</Text>
    </Stack>
  );
}

export default ViewSession;
