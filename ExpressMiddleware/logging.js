// logging.js
var express = require("express");
var app = express();

app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.get("/", function(request, response) {
  response.send("Hello, world!");
});

app.listen(3000, function() {
  console.log("Web server started on port 3000.");
});
