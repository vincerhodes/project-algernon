import React from 'react';

import './styles.css';

import { DrawRide } from './ride/drawride';
import { DrawChart } from './chart/drawchart';

const markRadius = 2;

const RideAnalysis = ({ 
    data, 
    width, 
    height, 
    interval, 
    intervallabel, 
    attribute, 
    attributelabel
  }) => {
  // guard clause
  if(!data){ return null }

  // const controlsWidth = 190;
  const mapWidth = width;
  const mapHeight = 0.7 * height;
  const chartWidth = mapWidth;
  const chartHeight = height - mapHeight;
  
  const coords = {
    type: 'LineString',
    coordinates: data.records.map((d) => [
      d.position_long,
      d.position_lat,
    ]),
  };

  const result = 
  <div id="content">
    <div id="controls">
    </div>
    <div id="svgs">
      <div>
        <svg
          width={mapWidth}
          height={mapHeight}
        >
          <DrawRide
            width={mapWidth}
            height={mapHeight}
            data={coords}
          />
        </svg>
      </div>
      <div>
        <svg
          width={chartWidth}
          height={chartHeight}
        >
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

  return result
}

export default RideAnalysis