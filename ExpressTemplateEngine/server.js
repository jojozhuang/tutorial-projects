// server.js
var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", {
    message: "Hey everyone! This is my webpage."
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    about: "This website demonstrates how ejs works!"
  });
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
