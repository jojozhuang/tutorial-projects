// server.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

//var winston = require("./config/winston-config-stream");
//var winston = require("./config/winston-config-streamconsole");
var winston = require("./config/winston-config-rotate");

var app = express();
app.use(morgan("short"));

var logDirectory = path.join(__dirname, "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// setup the winston stream
app.use(morgan("combined", { stream: winston.stream }));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res, next) {
  //res.status(404).send("File not found!");
  next(new Error("File not found"));
});

app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  res.status(err.status || 500).send("Internal server error.");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
