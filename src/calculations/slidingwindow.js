import { mean } from "d3";

function slidingAvg(array, windowsize, attribute, label) {
  array.map((d, i) => {
    if (windowsize === 1) {
      d[label] = d[attribute];
    } else {
      const start = Math.max(0, i - windowsize);
      const end = i < windowsize - 1 ? windowsize - 1 : i;
      d[label] = Math.round(mean(array.slice(start, end), (x) => x[attribute]));
      // fix NaNs
      d[label] = d[label] ? d[label] : 0;
    }
    return null;
  });
}

export default slidingAvg;
