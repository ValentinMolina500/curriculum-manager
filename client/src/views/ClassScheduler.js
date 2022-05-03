import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid, GridItem, Text, Flex } from "@chakra-ui/react";
import {
  TIME_INDEX_LOOKUP,
  minutesToTimeString,
  TimeTree,
} from "../utils/Time";

const PX_PER_ROW = 80;
const LEFT_LEGEND_PADX = 54;
const LEFT_TICK_PADX = 40;
const GRID_TICK_COLOR = "#d4d4d4";
const MAX_HEIGHT = PX_PER_ROW * 24;

export default function ClassScheduler(props) {
  const { 
    selectedOffering, 
    setSelectedOffering, 
    offerings, 
    currentDay 
  } = props;

  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(() => {
    if (!offerings.length) return;

    const filteredResults = offerings.filter((off) => {
      if (!off.OffDay) {
        return false;
      }

      return off.OffDay.includes(currentDay);
    });

    const tree = new TimeTree();
    for (const offer of filteredResults) {
      tree.insertTimeNode(offer);
    }

    setItemsToRender(tree.getItems());
  }, [offerings, currentDay]);

  const renderGridLines = () => {
    const jsx = [];

    for (let i = 0; i < 24; i++) {
      jsx.push(
        <Box
          left={`${LEFT_TICK_PADX}px`}
          w={`calc(100% - ${LEFT_TICK_PADX}px)`}
          h="1px"
          bg={GRID_TICK_COLOR}
          top={`${PX_PER_ROW * i}px`}
          pos="absolute"
        />
      );

      if (i != 0) {
        jsx.push(
          <Text
            color="#444"
            top={`${PX_PER_ROW * i - 9}px`}
            pos="absolute"
            fontSize={"12px"}
          >
            {TIME_INDEX_LOOKUP[i]}
          </Text>
        );
      }
    }

    return jsx;
  };

  const renderOfferings = () => {
    return itemsToRender.map((off, index) => {
      const isLab = off.OffSection.includes("L");
      const topValue = (off.startTime / (60 * 24)) * MAX_HEIGHT;
      const height = ((off.endTime - off.startTime) / (60 * 24)) * MAX_HEIGHT;
      return (
        <Box
          key={off.id}
          bg={isLab ? "purple.500" : "blue.500"}
          color="white"
          w="120px"
          top={`${topValue}px`}
          h={`${height}px`}
          // outline={
          //   selectedOffering?.id === off.id ? "2px dashed black" : null}
          onClick={() => setSelectedOffering(off)}
          borderRadius="md"
          boxShadow={"md"}
          _hover={{ cursor: "pointer", background: isLab ? "purple.600" : "blue.600" }}
          left={`${LEFT_LEGEND_PADX + 128 * off.offset}px`}
          padding="4px"
          fontSize={"11px"}
          transition="background 200ms ease"
          pos="absolute"
        >
          <Flex flexDir={"column"}>
            <Text fontWeight={"semibold"} fontSize="12px">
              {`${off.className}`}
            </Text>
            <Text fontSize="12px">{`Section ${off.OffSection}`}</Text>
          </Flex>

          {`${minutesToTimeString(off.startTime)} - ${minutesToTimeString(
            off.endTime
          )}`}
        </Box>
      );
    });
  };
  return (
    //  Main schedule container
    <Box
      height={`${MAX_HEIGHT}px`}
      w="100%"
      pos="relative"
      minH={0}
      overflowY="auto"
    >
      <Box
        height="100%"
        pos="absolute"
        bg={GRID_TICK_COLOR}
        w="1px"
        left={`${LEFT_LEGEND_PADX}px`}
      />

      {/* Grid lines */}
      {renderGridLines()}

      {/* Render offerings */}
      {renderOfferings()}
    </Box>
  );
}
