import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useMemo, useState } from "react";

import { ParameterDropdown } from "./components/dropdowns";
import { readFit, readFile } from "./rideanalysis/readfit";
import RideAnalysis from "./rideanalysis/rideanalysis";

import {
  calcCyclingStats,
  calcOverallStats,
} from "./calculations/cyclingstats";

// overall dimensions
const padding = { vertical: 100 };

// setup arrays for the attributes and intervals
const attributes = [
  { value: "power", label: "Power" },
  { value: "altitude", label: "Altitude" },
  { value: "distance", label: "Distance" },
  { value: "grade", label: "Grade" },
  { value: "heart_rate", label: "Heart Rate" },
  { value: "speed", label: "Speed" },
];
const intervals = [
  { value: "1", label: "1s" },
  { value: "3", label: "3s" },
  { value: "10", label: "10s" },
  { value: "60", label: "60s" },
  { value: "600", label: "10m" },
  { value: "1200", label: "20m" },
  { value: "3600", label: "1h" },
];

// function to get a label
const getLabel = (value, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return array[i].label;
    }
  }
};

function App() {
  // data object is a dictionary containing all processed fit files
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [overallStats, setOverallStats] = useState({});
  const [noFiles, setNoFiles] = useState(0);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState(null);
  const [interval, setInterval] = useState("60");
  const [attribute, setAttribute] = useState("power");

  // change to event listener to resize on window resize
  const width = window.innerWidth;
  const height = window.innerHeight - padding.vertical;

  // check if any data is loaded
  useMemo(() => setDataLoaded(Object.keys(data).length > 0), [data]);

  useMemo(() => {
    if (dataLoaded && Object.keys(data).length === noFiles) {
      // once all data loaded perform the overall stats calculations
      setOverallStats({});
      setOverallStats(calcOverallStats(data));
    }
  }, [data, noFiles, dataLoaded]);
  // get labels fot the chart
  const attributelabel = getLabel(attribute, attributes);
  const intervallabel = getLabel(interval, intervals);

  // function to append each fit file to the data object
  // and update the rides array for the dropdown
  const appendData = (fitData) => {
    const id = fitData.activity.timestamp.toString();
    const data = fitData;
    calcCyclingStats(data);
    setData((prevData) => ({
      ...prevData,
      [id]: data,
    }));
    setRides((rides) => [
      ...rides,
      {
        label: id,
        value: id,
      },
    ]);
  };

  // read multiple fit files
  const Input = () => (
    <div className=''>
      <input
        type='file'
        onChange={(e) => {
          setDataLoaded(false);
          setData({});
          setRides([]);
          let files = [...e.target.files] || [];
          setNoFiles(files.length);
          files.forEach((item, index) => {
            readFile(files[index], (e) => {
              const fitData = readFit(e.target.result);
              appendData(fitData);
            });
          });
        }}
        multiple
      />
    </div>
  );

  // jsx for the dropdowns
  const Dropdowns = () => {
    return !dataLoaded ? null : (
      <div className='d-flex'>
        <ParameterDropdown
          title={"Ride"}
          values={rides}
          onSelect={setSelectedRide}
        />
        <ParameterDropdown
          title={"Chart"}
          values={attributes}
          onSelect={setAttribute}
        />
        <ParameterDropdown
          title={"Interval"}
          values={intervals}
          onSelect={setInterval}
        />
      </div>
    );
  };

  const LoadingIndicator = () => {
    const LoadingString =
      Object.keys(data).length === noFiles
        ? "Loaded " + noFiles + " FIT files"
        : "Loading... " + Object.keys(data).length + " of " + noFiles;
    return dataLoaded ? (
      <div className='d-flex justify-content-end'>{LoadingString}</div>
    ) : null;
  };

  return (
    <div>
      <div className='container pt-1'>
        <div className='row d-flex align-items-center'>
          <div className='col'>
            <Input />
          </div>
          <div className='col'>
            <Dropdowns />
          </div>
          <div className='col'>
            <LoadingIndicator />
          </div>
        </div>
      </div>
      <RideAnalysis
        data={data ? data[selectedRide] : null}
        width={width}
        height={height}
        interval={interval}
        intervallabel={intervallabel}
        attribute={attribute}
        attributelabel={attributelabel}
        overallStats={overallStats}
      />
    </div>
  );
}

export default App;
