function DrawStats({ data, overallStats, padding, chartWidth }) {
  return (
    <>
      <g transform={`translate(${padding},${2 * padding})`}>
        {" "}
        <text className='ride-stats' dy='0em'>
          Ride data
        </text>
        <text className='ride-stats' dy='2em'>
          Distance: {data.stats.distance} km
        </text>
        <text className='ride-stats' dy='4em'>
          FTP: {data.stats.ftp} W
        </text>
        <text className='ride-stats' dy='6em'>
          Avg Speed: {data.stats.speed} kph
        </text>
        <text className='ride-stats' dy='8em'>
          Avg HR: {data.stats.heart_rate}
        </text>
      </g>
      <g transform={`translate(${chartWidth - padding},${2 * padding})`}>
        {" "}
        <text className='overall-stats' dy='0em'>
          Overall ({overallStats.no_rides} rides)
        </text>
        <text className='overall-stats' dy='2em'>
          Distance: {overallStats.distance} km
        </text>
        <text className='overall-stats' dy='4em'>
          Avg FTP: {overallStats.ftp} W
        </text>
        <text className='overall-stats' dy='6em'>
          Avg Speed: {overallStats.speed} kph
        </text>
        <text className='overall-stats' dy='8em'>
          Avg HR: {overallStats.heart_rate}
        </text>
      </g>
    </>
  );
}

export default DrawStats;
