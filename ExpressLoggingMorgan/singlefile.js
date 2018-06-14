// singlefile.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(morgan("short"));

var logDirectory = path.join(__dirname, "logs");
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var logFile = path.join(logDirectory, "app.log");
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(logFile, {
  flags: "a"
});

// setup the logger with stream
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
