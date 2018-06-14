// staticmanual.js
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

app.use(function(req, res, next) {
  var filePath = path.join(__dirname, "static", req.url);
  console.log(filePath);
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
