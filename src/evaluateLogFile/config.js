const { mean, std } = require("mathjs");
const 

const config = {
  thermometer: (referenceValue, values) => {
    const meanValues = mean(values);
    const stdValues = std(values);
    const isMeanWithin = Math.abs(meanValues - referenceValue) < 0.5;
    if(isMeanWithin  && stdValues < 3) {
      return "ultra precise";
    }
    if(isMeanWithin && stdValues < 5) {
      return "very precise";
    }
    return "precise"
  }
}