//winston-config-console.js
var path = require("path");
var winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true
    })
  ]
});

module.exports = logger;
