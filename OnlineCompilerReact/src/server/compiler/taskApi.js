const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;

const path = require('path');

module.exports = {
  // compile the given c source file and execute it.
  getTask(lang, callback) {
    let file = '';
    const language = lang.toLowerCase();
    if (language === 'java') {
      file = path.join(__dirname, 'Hello.java');
    } else if (language === 'c') {
      file = path.join(__dirname, 'Hello.c');
    } else if (language === 'c++') {
      file = path.join(__dirname, 'Hello.cpp');
    } else if (language === 'javascript') {
      file = path.join(__dirname, 'Hello.js');
    } else if (language === 'python') {
      file = path.join(__dirname, 'Hello.py');
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

  saveTask(file, code, callback) {
    // create parent directories if they doesn't exist.
    mkdirp(getDirName(file), (err) => {
      if (err) return callback(err);

      return fs.writeFile(file, code, (err2) => {
        if (err2) {
          throw err2;
        }

        callback();
      });
    });
  },
};
