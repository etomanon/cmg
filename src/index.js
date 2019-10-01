const fs = require("fs-extra");
const path = require("path");

const evaluateLogFile = require("./evaluateLogFile/evaluateLogFile");

const main = async () => {
  try {
    const filePath = path.join(__dirname, "sample", "sample.txt");
    const logContentsStr = await fs.readFile(filePath, { encoding: "utf-8" });
    const evaluated = evaluateLogFile(logContentsStr);
    console.log('Result: ', evaluated)
  }
  catch(e) {
    console.log('Error: ', e)
  }
};

main();
