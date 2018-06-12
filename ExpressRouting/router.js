var express = require("express");
var app = express();
var users = require("./router/users");
var products = require("./router/products");

app.use("/users", users);
app.use("/products", products);

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
