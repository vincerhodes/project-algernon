import React from "react";

import { AxisBottom, AxisLeft } from "./axes";
import { Marks } from "./marks";
import { Gradient } from "./gradient";

import slidingAvg from "../../calculations/slidingwindow";

const d3 = require("d3");
const { timeFormat, scaleLinear, scaleTime, extent } = d3;

const margin = {
  top: 20,
  right: 60,
  bottom: 40,
  left: 70,
};
// const xAxisLabelOffset = 45;
const yAxisLabelOffset = 45;
const xTextOffset = 20;
const yTextOffset = 10;

const xAxisTickFormat = timeFormat("%H:%M");
const labelFormat = timeFormat("%H:%M:%S");

const yTickCount = 5;

export const DrawChart = ({
  data,
  width,
  height,
  markRadius,
  sampleWindow,
  intervallabel,
  attribute,
  attributelabel,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const samples = data.records;

  // add rolling samples window, if samplewindow
  const samplelabel = intervallabel + " " + attributelabel;
  slidingAvg(samples, sampleWindow, attribute, samplelabel);

  // console.log(samples);

  const xValue = (d) => d.timestamp;
  const xScale = scaleTime()
    .domain(extent(samples, xValue))
    .range([0, innerWidth])
    .nice();

  const yValue = (d) => d[samplelabel];
  const yScale = scaleLinear()
    .domain(extent(samples, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <svg width={width} height={height}>
        <Gradient />
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            textOffset={xTextOffset}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            textOffset={yTextOffset}
            yTickCount={yTickCount}
          />
          <Marks
            data={samples}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            labelFormat={labelFormat}
            radius={markRadius}
          />
          <text
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
            className='axis-label'
            textAnchor='middle'
          >
            {samplelabel}
          </text>
        </g>
      </svg>
    </>
  );
};
