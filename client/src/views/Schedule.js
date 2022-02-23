import { Heading, Stack, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";

export default function Schedule() {
  return (
    <Grid bg="white" w="100%" mt="2rem" gridTemplateRows={"auto 1fr"}>
      <Flex mb="1rem" alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Schedule
        </Heading>
      </Flex>

      <GridItem h="100%">
      <ClassScheduler />

      </GridItem>
    </Grid>
  )
}