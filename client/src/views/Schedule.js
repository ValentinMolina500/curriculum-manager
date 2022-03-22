import { useState } from 'react';
import {
  Heading,
  Stack,
  Button,
  Flex,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  IconButton,
  Icon
} from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";
import { MdOutlineFullscreen, MdOutlineFullscreenExit} from "react-icons/md";

const MAXIMIZE_STYLES = {
  zIndex: 50,
  position: "absolute",
  minWidth: "100vw",
  height: "100vh",
  background: "white",
  left: 0,
  top: 0,
  padding: "1rem"
}

const RESET_STYLES = {
  zIndex: "unset",
  position: "unset",
  height: "100%",
}
export default function Schedule() {
  const [value, setValue] = useState('1');
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Grid bg="white" w="100%" mt="2rem" gridTemplateRows={"auto minmax(0, 1fr)"} minH={0}
      style={isMaximized ? MAXIMIZE_STYLES : undefined}
    >
      <GridItem>
      <Flex mb="1rem" alignItems={"center"}>
        <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
          Schedule
        </Heading>

        <RadioGroup onChange={setValue} value={value} marginLeft="1rem">
          <Stack direction='row'>
            <Radio value='1'>Monday</Radio>
            <Radio value='2'>Tuesday</Radio>
            <Radio value='3'>Wednesday</Radio>
            <Radio value='4'>Thursday</Radio>
            <Radio value='5'>Friday</Radio>
          </Stack>
        </RadioGroup>
        <IconButton 
                  onClick={() => setIsMaximized(!isMaximized)}
          marginLeft="auto" 
          icon={<Icon boxSize="1.5rem" 
          as={isMaximized ? MdOutlineFullscreenExit : MdOutlineFullscreen} 
 />}></IconButton>
      </Flex>

      {/* <Heading as="h2" fontSize="1.75rem">Monday</Heading> */}
      </GridItem>
      <GridItem h="100%" paddingLeft="1rem" overflowY={"auto"}>
        <ClassScheduler />

      </GridItem>
    </Grid>
  )
}