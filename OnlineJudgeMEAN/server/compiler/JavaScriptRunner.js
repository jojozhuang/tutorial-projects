const { spawn } = require("child_process");
const Runner = require("./Runner");
const FileApi = require("../api/FileApi");

class JavaScriptRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.js";
    this.testfile = "SolutionTester.js";
  }

  run(file, directory, filename, extension, testcase, callback) {
    if (extension.toLowerCase() !== ".js") {
      console.log(`${file} is not a javascript file.`);
    }

    // get test cases
    FileApi.readFile(testcase, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      var lines = data.split("\n");
      for (let i = 0; i < lines.length; i = i+3) {
        const nums = lines[i];
        const target = lines[i + 1];
        const expected = lines[i+2];
        const params = (nums + ","+target).replace(","," ");
        //code here using lines[i] which will give you each line
        this.execute(file, directory, params, function(status, message) {
          if (status == "0") {
            if (expected == message) {
              continue;
            } else {
              const message = "[Fail]" + Arrays.toString(nums) + ", " + target + ";" + Arrays.toString(ret) + ";" + Arrays.toString(expected);
              callback(20, message);
            }
          } else {
            callback(status, message);
            break;
          }
        });
      }
      callback(10, "[Success]Your solution passed all " + (lines.length/3) +" test cases!");
    });
  }

  execute(file, directory, params, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    argsRun[0] = params;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);

    // node SolutionTester.js 1 0 -1 -1
    const executor = spawn("node", argsRun, options);
    executor.stdout.on("data", output => {
      console.log(String(output));
      callback("0", String(output)); // 0, no error
    });
    executor.stderr.on("data", output => {
      console.log(`stderr: ${String(output)}`);
      callback("2", String(output)); // 2, execution failure
    });
    executor.on("close", output => {
      this.log(`stdout: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaScriptRunner;
