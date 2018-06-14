// server.js
var express = require("express");
var morgan = require("morgan");
var app = express();

//  set format to 'short'
app.use(morgan("short"));

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
