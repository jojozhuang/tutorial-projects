// winston-config-stream.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");
var clfDate = require("clf-date");

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
  },
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.simple(), // disable json format
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infofile),
    new winston.transports.File(options.errorfile)
    //new winston.transports.Console(options.console)
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

// create a format method for winston, it is similar with 'combined' format in morgan
logger.combinedFormat = function(err, req, res) {
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
    500} - ${req.headers["user-agent"]}`;
};

module.exports = logger;
