import { DrawRide } from "./ride/drawride";
import { DrawChart } from "./chart/drawchart";
import DrawStats from "./drawstats";

const markRadius = 2;

const RideAnalysis = ({
  data,
  overallStats,
  width,
  height,
  interval,
  intervallabel,
  attribute,
  attributelabel,
}) => {
  // console.log(data);
  // guard clause
  if (!data) {
    return null;
  }

  // const controlsWidth = 190;
  const mapWidth = width;
  const mapHeight = 0.7 * height;
  const chartWidth = mapWidth;
  const chartHeight = height - mapHeight;
  const padding = 0.03 * height;

  const coords = {
    type: "LineString",
    coordinates: data.records.map((d) => [d.position_long, d.position_lat]),
  };

  const result = (
    <div id='content'>
      <div className='info'>Ride: {data.activity.timestamp.toString()}</div>
      <div id='svgs'>
        <div>
          <svg width={mapWidth} height={mapHeight}>
            <DrawStats
              data={data}
              overallStats={overallStats}
              padding={padding}
              chartWidth={chartWidth}
            />
            <DrawRide width={mapWidth} height={mapHeight} data={coords} />
          </svg>
        </div>
        <div>
          <svg width={chartWidth} height={chartHeight}>
            <DrawChart
              data={data}
              width={chartWidth}
              height={chartHeight}
              markRadius={markRadius}
              sampleWindow={+interval}
              intervallabel={intervallabel}
              attribute={attribute}
              attributelabel={attributelabel}
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return result;
};

export default RideAnalysis;
