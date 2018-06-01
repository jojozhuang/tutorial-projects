const fs = require('fs');
const path = require('path');

module.exports = {
  // compile the given c source file and execute it.
  getQuestion(id, callback) {
    const file = path.join(__dirname, 'HelloJava2.java');
    console.log(`getQuestion:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },
  saveSolution(filename, solution, callback) {
    const file = path.join(__dirname, filename);
    fs.writeFile(file, solution, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  },
};
