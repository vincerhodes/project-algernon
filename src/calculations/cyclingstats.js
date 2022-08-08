import { mean, max as d3max, sum as d3sum } from "d3";
import slidingAvg from "./slidingwindow";

function calcCyclingStats(data) {
  data.stats = {};
  data.stats.ftp = FTP(data.records);
  data.stats.speed = average(data.records, "speed", 1);
  data.stats.heart_rate = average(data.records, "heart_rate", 0);
  data.stats.distance = max(data.records, "distance", 0);
  // console.log(data.stats);
}

function calcOverallStats(data) {
  // loop through dictionary and create array of stats data
  var stats = Object.entries(data).map((d) => {
    return d[1].stats;
  });
  return {
    no_rides: stats.length,
    ftp: average(stats, "ftp", 0),
    speed: average(stats, "speed", 1),
    heart_rate: average(stats, "heart_rate", 0),
    distance: sum(stats, "distance", 0),
  };
}

const FTP = (data) => {
  slidingAvg(data, 1200, "power", "20m power");
  const FTP = d3max(data, (x) => x["20m power"]) * 0.95;
  return +FTP.toFixed(0);
};

const average = (data, measure, decimals) =>
  +mean(data, (x) => x[measure]).toFixed(decimals);

const sum = (data, measure, decimals) =>
  +d3sum(data, (x) => x[measure]).toFixed(decimals);

const max = (data, measure, decimals) =>
  +d3max(data, (x) => x[measure]).toFixed(decimals);

export { calcCyclingStats, calcOverallStats };
