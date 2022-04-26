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
  // e.preventDefault();
  var result = '';
  fitParser.parse(e, function (error, data) {
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

export const readFileMultiple = (e) => {
  e.preventDefault();
  //Get the files
  let file = [...e.target.files] || [];

  file.forEach((item, index) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      console.log(readFit(reader.result));
    };
    reader.readAsArrayBuffer(file[index]);
  });

};