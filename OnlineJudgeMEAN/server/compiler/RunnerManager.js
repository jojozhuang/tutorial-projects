const path = require("path");
const FileApi = require("../api/FileApi");
const CRunner = require("./CRunner");
const CppRunner = require("./CppRunner");
const JavaRunner = require("./JavaRunner");
const JavaScriptRunner = require("./JavaScriptRunner");
const PythonRunner = require("./PythonRunner");
const appRoot = require("app-root-path");
const moment = require("moment");

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === "c") {
      runner = new CRunner();
    } else if (lang === "c++") {
      runner = new CppRunner();
    } else if (lang === "java") {
      runner = new JavaRunner();
    } else if (lang === "javascript") {
      runner = new JavaScriptRunner();
    } else if (lang === "python") {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(question, lang, solution, callback) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    // copy all files in the question folder from solution folder
    const sourceDir = path.resolve(
      `${appRoot}`,
      "server",
      "solution",
      question
    );
    const targetDir = path.resolve(
      `${appRoot}`,
      "server",
      "compiler",
      "temp",
      question + "_" + lang + "_" + moment().toISOString() // 2013-02-04T22:44:30.652Z
    );

    FileApi.copyDirectory(sourceDir, targetDir, err => {
      if (err) {
        callback("99", String(err)); // 99, system error
      }
      //const directory = path.resolve(`${appRoot}`, "server", "compiler", "src");

      // save the solution to Solution.java
      const sourceFile = path.resolve(targetDir, runner.sourceFile());
      console.log(`source file: ${sourceFile}`);
      const filename = path.parse(sourceFile).name; // main
      const extension = path.parse(sourceFile).ext; // .java
      console.log(`filename: ${filename}`);
      console.log(`extension: ${extension}`);

      FileApi.saveFile(sourceFile, solution, () => {
        const testFile = path.resolve(targetDir, runner.testFile());
        const testFileName = path.parse(testFile).name; // main
        runner.run(testFile, targetDir, testFileName, extension, function(
          status,
          message
        ) {
          callback(status, message);
          /*
          // compiled and executed successfully
          if (status == "0") {
            // read the test result
            const resultFile = path.resolve(targetDir, "testresult.txt");
            FileApi.readFile(resultFile, data => {
              console.log("read result file:" + data);
              if (data) {
                if (data.startsWith("[Success]")) {
                  callback("0", data.slice(9)); // 10, pass
                } else {
                  callback("1", data.slice(6)); // 11, fail
                }
              }
              callback("15", "No test result!"); // 15, not test result
            });
          } else {
            callback(status, message);
          }
          */
        });
      });
    });
  }
};
