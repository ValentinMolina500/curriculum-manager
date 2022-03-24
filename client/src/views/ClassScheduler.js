import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { TIME_INDEX_LOOKUP, minutesToTimeString} from "../utils/Time"

const PX_PER_ROW = 70;
const LEFT_LEGEND_PADX = 54;
const LEFT_TICK_PADX = 40;
const GRID_TICK_COLOR = "#d4d4d4";
const MAX_HEIGHT = PX_PER_ROW  * 24;

// 1 node [980, 1140], offset = 0
// ===
// 1 node [980, 1140], offset  = 0,
// 2 node [1040, 1140], offset = 1
//O [402] -> off = 0 O [121], off = 1 -> O [122] off = 2
// |
// V
// O [ENG 402], off = 0
const OFFERINGS = [
    {
        id: "123123",
        startTime: 980,
        endTime: 1140,
        className: "CPTS 121",
    },
    {
        id: "123900",
        startTime: 1040,
        endTime: 1140,
        className: "CPTS 122",
    },
    {
        id: "456456",
        startTime: 480,
        endTime: 600,
        className: "ENGLISH 402"
    },
    {
        id: "456555",
        startTime: 610,
        endTime: 660,
        className: "HISTORY 111"
    }
]
export default function ClassScheduler() {

    const [offeringsRender, setOfferingsRender] = useState([]);



    const renderGridLines = () => {
        const jsx = [];

        for (let i = 0; i < 24; i++)
        {
            jsx.push(
                <Box 
                left={`${LEFT_TICK_PADX}px`}
                w={`calc(100% - ${LEFT_TICK_PADX}px)`} h="1px" 
                bg={GRID_TICK_COLOR} 
                top={`${PX_PER_ROW * i}px`} 
                pos="absolute" />
            )

            if (i != 0) {
                jsx.push(
                    <Text 
                        color="#444" 
                        top={`${PX_PER_ROW * i - 9}px`}  
                        pos="absolute" 
                        fontSize={"13px"}
                    >  
                        {TIME_INDEX_LOOKUP[i]}
                    </Text>
                )
            }
        }

        return jsx;
    }

    const renderOfferings = () => {
        return OFFERINGS.map((off, index) => {
            const topValue = (off.startTime / (60 * 24)) * MAX_HEIGHT;
            const height = ((off.endTime - off.startTime) /(60 * 24)) * MAX_HEIGHT;
            return (
                <Box 
                    key={off.id}
                    bg="blue.500" 
                    color="white" 
                    w="140px"
                    top={`${topValue}px`} 
                    h={`${height}px`} 
                    borderRadius="md"
                    left={`${LEFT_LEGEND_PADX}px`}
                    padding="4px"
                    fontSize={"13px"}
                    pos="absolute">
                    <Text fontWeight={"semibold"} fontSize="13px">{off.className}</Text>
                    {`${minutesToTimeString(off.startTime)} - ${minutesToTimeString(off.endTime)}`}
                </Box>
            );
        })
    }
    return (
        //  Main schedule container 
        <Box height={`${MAX_HEIGHT}px`} w="100%"  pos="relative" >
            <Box height="100%" pos="absolute" bg={GRID_TICK_COLOR} w="1px" left={`${LEFT_LEGEND_PADX}px`}/>

            {/* Grid lines */}
            {renderGridLines()}

            {/* Render offerings */}
            {renderOfferings()}
        </Box>
    );
}