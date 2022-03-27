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
    Icon,
    Box,
    Text
} from "@chakra-ui/react";
import ClassScheduler from "./ClassScheduler";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";

const MAXIMIZE_STYLES = {
    zIndex: 50,
    position: "absolute",
    minWidth: "100vw",
    height: "100vh",
    background: "white",
    left: 0,
    top: 0,
    padding: "1rem",
    margin: 0
}

const RESET_STYLES = {
    zIndex: "unset",
    position: "unset",
    height: "100%",
}
export default function Schedule() {
    const [value, setValue] = useState('1');
    const [isMaximized, setIsMaximized] = useState(false);
    const [selectedOffering, setSelectedOffering] = useState(null);

    return (
        <Grid
          bg="white"
          w="100%"
          mt="2rem"
          gridTemplateRows={"auto minmax(0, 1fr)"}
          minH={0}
          style={isMaximized ? MAXIMIZE_STYLES : undefined}
        >
            <GridItem>
                <Flex mb="1rem" alignItems={"center"}>
                    <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
                        Schedule
                    </Heading>

                    <RadioGroup
                      onChange={setValue}
                      value={value}
                      marginLeft="1rem">
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
                            as={isMaximized ?
                              MdOutlineFullscreenExit : MdOutlineFullscreen}
                        />}></IconButton>
                </Flex>

            </GridItem>
            <GridItem h="100%" paddingLeft="1rem" minH={0} w="100%"
                d="grid"
                gridTemplateColumns="auto minmax(0, 1fr) auto"
                gridTemplateRows={"minmax(0, 1fr) auto"} gridColumnGap="2rem">
                <GridItem
                  minH={"0"}
                  overflowY="auto"
                  gridColumn={2}
                  gridRow={1}
                  h="100%">
                    <ClassScheduler
                      selectedOffering={selectedOffering}
                      setSelectedOffering={setSelectedOffering}
                    />

                </GridItem>



                {/* Left panel */}
                <GridItem
                  minH={"0"}
                  overflowY="auto"
                  gridColumn={1}
                  gridRow={1}
                  border="1px solid #dfdfdf"
                  zIndex="100"
                  borderRadius={"md"}>
                    <Box as="aside" w="200px" h="100%" >
                    <Heading
                      p="0.5rem"
                      fontSize={"1rem"}
                      fontFamily="Merriweather">
                      Offerings
                    </Heading>
                    </Box>
                </GridItem>

                {/* Right panel */}
                {selectedOffering && (
                 <GridItem
                  minH={"0"}
                  overflowY="auto"
                  gridColumn={3}
                  gridRow={1}
                  border="1px solid #dfdfdf"
                  zIndex="100"
                  borderRadius={"md"}>
                    <Box as="aside" w="200px" h="100%">
                    <Heading
                      p="0.5rem"
                      fontSize={"1rem"}
                      fontFamily="Merriweather">
                      Edit Offering
                    </Heading>

                    <Text
                      px="0.5rem"
                      fontSize="1rem">
                      {selectedOffering.className}
                    </Text>
                    </Box>
                </GridItem> )}


            </GridItem>
        </Grid>
    )
}
