const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(__dirname, "sample", "sample.txt");
const main = async () => {
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  console.log("content", content);
};

main();
