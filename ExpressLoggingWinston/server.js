// server.js
var express = require("express");
//var logger = require("./config/winston-config-console");
var logger = require("./config/winston-config-file");
//var logger = require("./config/winston-config-rotate");

var app = express();

app.get("/", function(req, res) {
  logger.info("Hello world");
  res.send("hello, world!");
});

app.use(function(req, res) {
  logger.error("File not found");
  res.status(404).send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
