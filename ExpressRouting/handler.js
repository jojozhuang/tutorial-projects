var express = require("express");
var path = require("path");
var app = express();

// A single callback function can handle a route.
app.get("/example/a", function(req, res) {
  console.log("[a] the response is being processed ...");
  res.send("Hello from A!");
});
// More than one callback function can handle a route (make sure you specify the next object).
app.get(
  "/example/b",
  function(req, res, next) {
    console.log("[b] the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from B!");
  }
);

// An array of callback functions can handle a route.
var cb0 = function(req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function(req, res, next) {
  console.log("CB1");
  next();
};

var cb2 = function(req, res) {
  console.log("[c] the response is being processed ...");
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);

// A combination of independent functions and arrays of functions can handle a route.
app.get(
  "/example/d",
  [cb0, cb1],
  function(req, res, next) {
    console.log("[d]the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from D!");
  }
);

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
