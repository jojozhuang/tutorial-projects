var express = require("express");
var app = express();

app.get("/", function(request, response) {
  response.end("Welcome to my homepage!");
});
app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});
app.get("/weather", function(request, response) {
  response.end("The current weather is NICE.");
});
app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + "."); // parameter
});
app.use(function(request, response) {
  response.statusCode = 404;
  response.end("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
