var express = require("express");
var path = require("path");
var app = express();

app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
