var express = require("express");
var app = express();

// logging
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

// authentication
app.use(function(request, response, next) {
  if (request.url.startsWith("/hello")) {
    next();
  } else {
    response.statusCode = 403;
    response.end("Not authorized.");
  }
});

app.get("/", function(request, response) {
  response.send("Hello, world!");
});

app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + ".");
});

app.listen(3000, function() {
  console.log("Web server started on port 3000.");
});
