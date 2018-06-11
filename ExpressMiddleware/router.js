var express = require("express");
var path = require("path");
var app = express();

app.get("/", function(request, response) {
  response.end("Welcome to my homepage!");
});
app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});
app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + ".");
});
app.get("/go", function(request, response) {
  // redirect
  response.redirect("http://expressjs.com");
});
app.get("/image", function(request, response) {
  // file
  const file = path.resolve("public", "wii.jpg");
  response.sendFile(file);
});
