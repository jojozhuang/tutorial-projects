var express = require("express");
var app = express();

app.use(function(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world(express)!");
});

app.listen(3000, function() {
  console.log("http server started on port 3000.");
});
