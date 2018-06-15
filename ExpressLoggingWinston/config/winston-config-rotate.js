//winston-config-rotate.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");
require("winston-daily-rotate-file");

// ensure log directory exists
var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var transport = new winston.transports.DailyRotateFile({
  filename: path.resolve(logDirectory, "application-%DATE%.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d" // keep logs for 14 days
});

transport.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});

const logger = winston.createLogger({
  transports: [transport]
});

module.exports = logger;
