const validateSensor = (
  sensorName,
  configCurrent,
  referenceValue,
  sensorValues
) => {
  return {
    [sensorName]: configCurrent.validate(referenceValue, sensorValues)
  };
};

module.exports = {
  validateSensor
};
