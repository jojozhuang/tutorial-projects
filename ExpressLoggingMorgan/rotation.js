// rotation.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");
var rfs = require("rotating-file-stream");

var app = express();
app.use(morgan("short"));

var logDirectory = path.join(__dirname, "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs("minute.log", {
  interval: "1m", // rotate by one minute
  path: logDirectory
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
