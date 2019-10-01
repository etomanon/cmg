const endOfLine = require("os").EOL;

const { validateSensor } = require("./utils");
const config = require("./config");

const evaluateLogFile = logContentsStr => {
  const lines = logContentsStr.split(endOfLine);
  const header = lines[0].split(" ");
  const content = lines.slice(1);
  const sensorTypes = Object.keys(config);
  let result = {};
  let configCurrent = null;
  let sensorName = null;
  let sensorValues = [];
  let referenceValue = null;
  const updateResult = () => {
    const validatedSensor = validateSensor(
      sensorName,
      configCurrent,
      referenceValue,
      sensorValues
    );
    result = {
      ...validatedSensor,
      ...result
    };
  };
  content.forEach((lineString, index) => {
    const line = lineString.split(" ");
    if (index === content.length - 1) {
      updateResult();
      return;
    }
    const maybeType = line[0];
    if (sensorTypes.includes(maybeType)) {
      if (configCurrent) {
        updateResult();
      }
      sensorValues = [];
      configCurrent = config[maybeType];
      sensorName = line[1];
      referenceValue = Number(header[configCurrent.headerIndex]);
    } else {
      sensorValues = [Number(line[1]), ...sensorValues];
    }
  });
  return result;
};

module.exports = evaluateLogFile;
