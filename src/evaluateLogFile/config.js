const { mean, std } = require("mathjs");

const config = {
  thermometer: (referenceValue, values) => {
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
  },
  humidity: (referenceValue, values) => {
    const isOutsideLimit = values.some(v => Math.abs(v - referenceValue) > 1);
    if (isOutsideLimit) {
      return "discard";
    }
    return "keep";
  },
  monoxide: (referenceValue, values) => {
    const isOutsideLimit = values.some(v => Math.abs(v - referenceValue) > 3);
    if (isOutsideLimit) {
      return "discard";
    }
    return "keep";
  }
};

module.exports = config;