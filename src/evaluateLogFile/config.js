const { mean, std } = require("mathjs");

const config = {
  thermometer: {
    // index for sensor type in header to get reference value
    headerIndex: 1,
    // sensor type evaluation logic
    validate: (referenceValue, values) => {
      const meanValues = mean(values);
      const stdValues = std(values);
      const isMeanWithin = Math.abs(meanValues - referenceValue) <= 0.5;
      if (isMeanWithin && stdValues < 3) {
        return "ultra precise";
      }
      if (isMeanWithin && stdValues < 5) {
        return "very precise";
      }
      return "precise";
    }
  },
  humidity: {
    headerIndex: 2,
    validate: (referenceValue, values) => {
      const isOutsideLimit = values.some(v => Math.abs(v - referenceValue) > 1);
      if (isOutsideLimit) {
        return "discard";
      }
      return "keep";
    }
  },
  monoxide: {
    headerIndex: 3,
    validate: (referenceValue, values) => {
      const isOutsideLimit = values.some(v => Math.abs(v - referenceValue) > 3);
      if (isOutsideLimit) {
        return "discard";
      }
      return "keep";
    }
  }
};

module.exports = config;
