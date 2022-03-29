import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectOfferings, selectOfferingsById } from "../store/offeringsSlice";
import { useParams } from "react-router-dom";

function ViewOffering(props) {
  const { offeringId } = useParams();
  const offering = useSelector(state => selectOfferingsById(state, offeringId));
  return (
    <Stack bg="white" w="100%">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Offerings
      </Heading>

      <Text>{JSON.stringify(offering)}</Text>
    </Stack>
  );
}

export default ViewOffering;
