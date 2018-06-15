//winston-config-file.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");

// ensure log directory exists
var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var options = {
  infofile: {
    level: "info",
    filename: path.resolve(logDirectory, "info.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  errorfile: {
    level: "error",
    filename: path.resolve(logDirectory, "error.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infofile),
    new winston.transports.File(options.errorfile)
  ]
});

module.exports = logger;
