// Requires Express and puts it in a variable
var express = require("express");
// Calls express() and puts new Express application inside the app variable
var app = express();

// Sends “Hello, world!”
app.get("/", function(request, response) {
  response.send("Hello, world!");
});

//Starts the Express server on port 3000 and logs that it has started
app.listen(3000, function() {
  console.log("Express app started on port 3000.");
});
