const fs = require("fs-extra");
const path = require("path");

const evaluateLogFile = require("./evaluateLogFile/evaluateLogFile");

const filePath = path.join(__dirname, "sample", "sample.txt");
const main = async () => {
  try {
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    evaluateLogFile(content);
  }
  catch(e) {
    console.log('Error: ', e)
  }
};

main();
