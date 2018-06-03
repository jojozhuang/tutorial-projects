const fs = require('fs');
const path = require('path');

module.exports = {
  // compile the given c source file and execute it.
  getTask(lang, callback) {
    let file = '';
    if (lang.toLowerCase() === 'java') {
      file = path.join(__dirname, 'HelloJava2.java');
    } else if (lang.toLowerCase() === 'c') {
      file = path.join(__dirname, 'HelloC.c');
    } else {
      callback('');
      return;
    }
    console.log(`getTask:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },

  saveTask(filename, code, callback) {
    const file = path.join(__dirname, filename);
    fs.writeFile(file, code, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  },
};
