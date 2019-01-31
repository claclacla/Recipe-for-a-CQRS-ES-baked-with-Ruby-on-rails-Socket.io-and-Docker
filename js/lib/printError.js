function printError(code, error) {
  console.log("===============================================");
  console.log("Error time: " + new Date());
  console.log("Error code: " + code);
  console.log("");
  console.log(error);
  console.log("");
  console.log("===============================================");
}

module.exports = printError;