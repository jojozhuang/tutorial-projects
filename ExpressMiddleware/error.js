var express = require("express");
var path = require("path");
var app = express();

var filePath = path.join(__dirname, "johnny.jpg");

app.use(function(req, res, next) {
  res.sendFile(filePath, function(err) {
    if (err) {
      next(new Error("Failed to send file: " + err));
    }
  });
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500);
  res.send("Internal server error.");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
