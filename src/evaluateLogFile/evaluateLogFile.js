const endOfLine = require("os").EOL;

const config = require("./config");

const evaluateLogFile = logContentsStr => {
  const lines = logContentsStr.split(endOfLine);
  const header = lines[0].split(" ");
  const content = lines.slice(1);
  const sensorTypes = Object.keys(config);

  // final result with sensor names & quality control evaluations
  let result = {};
  // which config to use for evaluation
  let configCurrent = null;
  // name of evaluated sensor
  let sensorName = null;
  // all values of evaluated sensor
  let sensorValues = [];
  // reference value for evaluated sensor
  let referenceValue = null;

  // add new evaluated sensor
  const updateResult = () => {
    result = {
      [sensorName]: configCurrent.validate(referenceValue, sensorValues),
      ...result
    };
  };

  content.forEach((lineString, index) => {
    const line = lineString.split(" ");
    // if no more lines then evaluate last sensor and exit
    if (index === content.length - 1) {
      updateResult();
      return;
    }
    // if line has sensor type then evaluate previous sensor (if exists)
    // and then update previous sensor variables with new ones
    const maybeType = line[0];
    if (sensorTypes.includes(maybeType)) {
      if (configCurrent) {
        updateResult();
      }
      sensorValues = [];
      configCurrent = config[maybeType];
      sensorName = line[1];
      referenceValue = Number(header[configCurrent.headerIndex]);
    }
    // else add value for current sensor
    else {
      sensorValues = [Number(line[1]), ...sensorValues];
    }
  });

  return result;
};

module.exports = evaluateLogFile;
