const FitParser = require('../fitparse/fit-parser.js').default;

// Create a FitParser instance (options argument is optional)
const fitParser = new FitParser({
  force: true,
  speedUnit: 'km/h',
  lengthUnit: 'km',
  temperatureUnit: 'kelvin',
  elapsedRecordField: true,
  mode: 'both',
});

export const readFit = (e) => {
  e.preventDefault();
  var result = '';
  fitParser.parse(e.target.result, function (error, data) {
    // Handle result of parse method
    if (error) {
      console.log(error);
    } else {
      result = data
    }
  })
  return result;
}

export const readFile = (file, onLoadCallback) => {
  var reader = new FileReader();
  reader.onload = onLoadCallback;
  reader.readAsArrayBuffer(file);
}