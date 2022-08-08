const d3 = require("d3");
const { geoPath } = d3;

export const DrawRide = ({ height, width, data }) => {
  // Create a unit projection.
  const projection = d3.geoMercator().scale(1).translate([0, 0]);

  // Create a path generator.
  const path = geoPath(projection);

  // Compute the bounds of a feature of interest, then derive scale & translate.
  const b = path.bounds(data),
    s =
      0.95 /
      Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [
      (width - s * (b[1][0] + b[0][0])) / 2,
      (height - s * (b[1][1] + b[0][1])) / 2,
    ];

  // Update the projection to use computed scale & translate.
  projection.scale(s).translate(t);
  return (
    <g className='marks'>
      <path className='ride' d={path(data)} />
    </g>
  );
};
