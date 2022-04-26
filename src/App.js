import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';

import { ParameterDropdown } from './dropdowns';
import { readFit, readFile, readFileMultiple  } from './rideanalysis/readfit';
import RideAnalysis from './rideanalysis/index'

// overall dimensions
const padding = { vertical: 100 };
const width = window.innerWidth;
const height = window.innerHeight - padding.vertical;

const attributes = [
  { value: 'power', label: 'Power' },
  { value: 'altitude', label: 'Altitude' },
  { value: 'distance', label: 'Distance' },
  { value: 'grade', label: 'Grade' },
  { value: 'heart_rate', label: 'Heart Rate' },
  { value: 'speed', label: 'Speed' },
];

const intervals = [
  { value: '1', label: '1s' },
  { value: '3', label: '3s' },
  { value: '10', label: '10s' },
  { value: '60', label: '60s' },
  { value: '600', label: '10m' },
  { value: '1200', label: '20m' },
  { value: '3600', label: '1h' },
];

const getLabel = (value, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return array[i].label;
    }
  }
};

function App() {
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState('60');
  const [attribute, setAttribute] = useState('power');
  const attributelabel = getLabel(attribute, attributes)
  const intervallabel = getLabel(interval, intervals);

  const Dropdowns = () => {
    return !data ? null :  
    <>
      <ParameterDropdown 
        title={"Select Attribute"}
        values={attributes}
        onSelect={setAttribute}
      />
      <ParameterDropdown 
        title={"Select Interval"}
        values={intervals}
        onSelect={setInterval}
      />
    </>
  }
  return (
    <div >
      <input type="file" onChange={ e => readFile(e.target.files[0], e => setData(readFit(e.target.result))) } />
      <input type="file" onChange={ e => readFileMultiple(e) } multiple />
      <Dropdowns />
      <RideAnalysis 
        data={data}
        width={width}
        height={height}
        interval={interval}
        intervallabel={intervallabel}
        attribute={attribute}
        attributelabel={attributelabel}
      />
    </div>
  )
}

export default App;