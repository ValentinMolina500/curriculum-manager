import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const PX_PER_ROW = 80;

export default function ClassScheduler() {

  const renderTicks = () => {
    const jsx = [];

    for (let i = 0; i < 24; i++) {
      jsx.push(
      <>
      <Box h="1px" w="50rem" pos="absolute" left="4rem" bg="#aaa" top={`${PX_PER_ROW * i}px`} my="1rem" />
      <Text top={`${PX_PER_ROW * i - 12}px`} pos="absolute" left="0rem" my="1rem" zIndex="30">12PM</Text>
      </>
      )
    }

    return jsx;
  }

  return (

      <TransformWrapper style={{width: "100%", height: "100%"}}>
        <TransformComponent style={{width: "100%", height: "100%"}}>
          <Grid w="50rem" gridTemplateRows={`repeat(24, ${PX_PER_ROW}px)`} py="1rem" pos="relative" zIndex="30" paddingLeft="4rem">
            <GridItem gridRow="5" w="100%" bg="red" />
            {renderTicks()}
          </Grid>
        </TransformComponent>
      </TransformWrapper>


    // <svg ref={svgRef} width="100%" height="100%" style={{ zIndex: 5 }}>
    //   {/* <defs>
    //     <pattern
    //       id="smallGrid"
    //       width="8"
    //       height="8"
    //       patternUnits="userSpaceOnUse"
    //     >
    //       <path
    //         d="M 8 0 L 0 0 0 8"
    //         fill="none"
    //         stroke="gray"
    //         stroke-width="0.5"
    //       />
    //     </pattern>
    //     <pattern
    //       id="grid"
    //       width="80"
    //       height="80"
    //       patternUnits="userSpaceOnUse"
    //     >
    //       <rect width="80" height="80" fill="url(#smallGrid)" />
    //       <path
    //         d="M 80 0 L 0 0 0 80"
    //         fill="none"
    //         stroke="gray"
    //         stroke-width="1"
    //       />
    //     </pattern>
    //   </defs>

    //   <rect width="100%" height="100%" fill="url(#grid)" /> */}
    // </svg>


  );
}