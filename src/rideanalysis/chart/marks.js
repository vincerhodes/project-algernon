const d3 = require('d3')
const { line } = d3

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  radius,
  labelFormat,
}) => (
  <g className="marks">
    <path
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))(data)
        }
      stroke="url(#svgGradient)"
    />
  </g>
);

// {data.map((d) => (
//   <circle
//     cx={xScale(xValue(d))}
//     cy={yScale(yValue(d))}
//     r={5}
//     opacity={0}
//   >
//     <title>
//       {labelFormat(xValue(d)) +
//         ' : ' +
//         yValue(d) +
//         ' Watts'}
//     </title>
//   </circle>
// ))}