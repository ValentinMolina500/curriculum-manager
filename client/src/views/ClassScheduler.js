import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ClassScheduler() {
  const svgRef = useRef();

  useEffect(() => {
    /** @type{HTMLElement} */


    // console.log(svgRef.current)

    // let data = [10, 15, 20, 25, 30];

    // var scale = d3.scaleLinear()
    //   .domain([d3.min(data), d3.max(data)])
    //   .range([0, width - 100]);

    // // Add scales to axis
    // var x_axis = d3.axisLeft()
    //   .scale(scale);

    // //Append group and insert axis
    // svgEl.append("g")
    //   .call(x_axis); var width = 400, height = 400;

    var data = [10, 15, 20, 25, 30];
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight * 4;


    const svgEl = d3.select(svgRef.current)
      .attr("height", height);
    
    const temp = new Date();
    temp.setHours(0, 0, 0);

    let scale = d3
      .scaleTime()
      .domain([temp.getTime() + 60 * 60 * 6 * 1000, temp.getTime() + (60 * 60 * 22 * 1000)])
      .range([0, height])
      .nice()

    var y_axis = d3.axisLeft().ticks(36)
      .scale(scale);

    //   var yAxisGrid = y_axis.ticks()
    // .tickSize(width, 0)
    // .tickFormat("")

    // svgEl.append("g")
    // .classed('y', true)
    // .classed('grid', true)
    // .call(yAxisGrid);

    svgEl.append("g")
      .attr("transform", "translate(50, 10)")
      .call(y_axis);

    
  }, [svgRef]);


  return (
    <svg ref={svgRef} width="100%" height="100%" style={{ zIndex: 5 }}>
      {/* <defs>
        <pattern
          id="smallGrid"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke="gray"
            stroke-width="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <rect width="80" height="80" fill="url(#smallGrid)" />
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="gray"
            stroke-width="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" /> */}
    </svg>
  );
}